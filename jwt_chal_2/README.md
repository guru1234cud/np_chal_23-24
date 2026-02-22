# JWT CTF Challenge - Bumblebee's Last Transmission

A Transformers-themed CTF challenge featuring time-based JWT secret generation.

## Story

During the Battle of Mission City, Bumblebee's voice box was destroyed by the Decepticons. Unable to speak, he encoded a final encrypted transmission for Optimus Prime before going dark behind enemy lines. The signal is locked behind Commander-level clearance. Only an admin can decode Bumblebee's last words — and the flag hidden within.

## Setup

```bash
npm install
node server.js
```

Access at: `http://localhost:3000`

## Credentials

- **Username:** `optimus`
- **Password:** `bee2007`

## Challenge Overview

1. Login to get a JWT token with `role: "user"`
2. The JWT secret changes every 10 minutes based on UTC time
3. Forge an admin JWT to access Bumblebee's transmission logs
4. Read his final message and capture the flag

## Flag

```
CYBERCOM{t1m3_r4n_0ut_f0r_th3_b0y_wh0_n3v3r_sp0k3}
```

## Solve Path

1. Login with `optimus:bee2007`
2. Decode the JWT to see `role: "user"`
3. Check cookies to find the `formula` for the time window
4. Find the base secret `bee17_siege` in the footer of the transmission logs page
5. Check `/api/time` to get current UTC time
6. Calculate the current window using the formula: `(hours * 60 + minutes) / 10`
7. Construct the secret: `bee17_siege_YYYY-MM-DD_window`
8. Forge JWT with `role: "admin"` using the constructed secret
9. Access `/api/notes` → read Bumblebee's final transmission + flag

## API Endpoints

- `POST /api/login` - Login and get JWT
- `GET /api/time` - Get current UTC time and window
- `GET /api/notes` - Get transmission logs (requires admin JWT)

## Secret Generation Formula

```javascript
/* found in cookies after login */
const formula = "(hours * 60 + minutes) / 10";
```

## Hints

1. Check the footer of the transmission logs page for a static secret part
2. Look at your cookies after logging in
3. The server uses UTC time (check `/api/time`)
4. Combine the static part, date, and calculated window to form the secret
