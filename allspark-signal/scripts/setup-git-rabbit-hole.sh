#!/usr/bin/env bash
# setup-git-rabbit-hole.sh
# Run this script from the project root to create the .git rabbit hole
# with fake commit history exposing the JWT secret.
# This script is safe to re-run (it recreates the git history).

set -e

PROJ_DIR="$(cd "$(dirname "$0")/.." && pwd)"
echo "[*] Setting up .git rabbit hole in: $PROJ_DIR"

cd "$PROJ_DIR"

# If .git already exists, back it up
if [ -d ".git" ]; then
  echo "[*] Existing .git found — removing for clean setup"
  rm -rf .git
fi

# Init fresh repo
git init
git config user.email "soundwave@decepticon.cy"
git config user.name "Soundwave"

# ── Commit 1: Initial project scaffold ──────────────────────────────────────
git add . 2>/dev/null || true
git commit --allow-empty -m "feat: initial Soundwave Intelligence Hub scaffold" \
  --date="2024-11-12T09:00:00+00:00" \
  --author="Soundwave <soundwave@decepticon.cy>" 2>/dev/null || git commit -m "feat: initial Soundwave Intelligence Hub scaffold" --date="2024-11-12T09:00:00+00:00" --author="Soundwave <soundwave@decepticon.cy>"

# ── Commit 2: Add JWT auth (WITH the secret plaintext) ──────────────────────
# Create a temporary file with the secret to stage it into the history
cat > /tmp/jwt_config_temp.js << 'JWTEOF'
// JWT Configuration — Soundwave Auth Module
const JWT_SECRET = "AllSparkEnergon2025!";
const JWT_EXPIRY = "24h";
const JWT_ISSUER = "soundwave-decepticon";

module.exports = { JWT_SECRET, JWT_EXPIRY, JWT_ISSUER };
JWTEOF

cp /tmp/jwt_config_temp.js "$PROJ_DIR/lib/jwt_config.js"
git add lib/jwt_config.js
git commit -m "feat: add JWT authentication for /autobot-intel" \
  --date="2024-12-01T14:23:00+00:00" \
  --author="Soundwave <soundwave@decepticon.cy>"

# ── Commit 3: Add routes and rabbit holes ────────────────────────────────────
git add -A 2>/dev/null || true
git commit -m "feat: add command portal, vault routes, autobot-intel" \
  --date="2024-12-18T11:05:00+00:00" \
  --author="Soundwave <soundwave@decepticon.cy>" 2>/dev/null || true

# ── Commit 4: The critical "fix" — remove hardcoded JWT secret ───────────────
# Remove the plaintext config file (but it stays in git history!)
rm -f "$PROJ_DIR/lib/jwt_config.js"
git rm lib/jwt_config.js 2>/dev/null || true
git commit -m "fix: removed hardcoded JWT secret (oops)

- const JWT_SECRET = \"AllSparkEnergon2025!\"
+ JWT_SECRET now loaded from environment variable
  See deployment docs for correct env var setup.

Reported by: Laserbeak recon audit" \
  --date="2025-01-06T08:14:00+00:00" \
  --author="Soundwave <soundwave@decepticon.cy>"

# ── Commit 5: Final polish ────────────────────────────────────────────────────
git add -A 2>/dev/null || true
git commit -m "chore: production hardening, remove debug artefacts" \
  --date="2025-01-20T16:30:00+00:00" \
  --author="Soundwave <soundwave@decepticon.cy>" 2>/dev/null || true

# ── Make the specific commit show the right hash prefix ──────────────────────
# Note: Git hashes can't be forced to a specific value easily,
# but the commit message and author match the challenge spec exactly.
# The commit message "fix: removed hardcoded JWT secret (oops)" is what matters.

echo ""
echo "[+] .git rabbit hole created successfully!"
echo "[+] Commit history:"
git log --oneline --author="Soundwave" | head -10

echo ""
echo "[+] The JWT secret commit:"
git log --all --oneline --grep="removed hardcoded JWT secret"
echo ""
echo "[+] Players can dump this with git-dumper and find the secret in:"
echo "    git show <commit-hash>:lib/jwt_config.js"
echo "    or: git log -p | grep JWT_SECRET"
echo ""
echo "[!] IMPORTANT: Run 'next build' AFTER this script to generate the"
echo "    actual .next/ build artifacts that include the bundle."
