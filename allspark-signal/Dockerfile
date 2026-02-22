FROM node:20-slim

WORKDIR /app

# Install only Next.js 16.0.6 — bundles vulnerable React 19 automatically
COPY package.json .
RUN npm install next@16.0.6 jsonwebtoken

COPY . .

# Build the Next.js app
RUN npm run build

# Remove package managers and download tools entirely
RUN rm -f /usr/bin/apt \
           /usr/bin/apt-get \
           /usr/bin/dpkg \
           /usr/bin/curl \
           /usr/bin/wget \
           /usr/bin/nc \
           /usr/bin/netcat \
           /usr/bin/ncat \
           /usr/bin/pip \
           /usr/bin/pip3 \
           /usr/local/bin/pip \
           /usr/local/bin/pip3 \
           /usr/bin/yarn

# Strip all SUID binaries to block local privilege escalation
RUN find / -perm /4000 -type f -exec chmod -s {} \; 2>/dev/null || true

# Create non-root restricted user
RUN useradd -m -u 1001 -s /bin/bash ctfuser

# Place the flag — read-only for everyone
RUN mkdir -p /opt/allspark && \
    echo "CYBERCOM{R34ct_Fl1ght_D3s3r14l1z4t10n_CVE_2025_55182}" \
    > /opt/allspark/flag.txt && \
    chmod 444 /opt/allspark/flag.txt && \
    chown root:root /opt/allspark/flag.txt

USER ctfuser

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
