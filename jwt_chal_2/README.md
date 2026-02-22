# JWT CTF Challenge - Luna's Notes

A Valentine's Day themed CTF challenge featuring time-based JWT secret generation.

## Story

Luna has a crush on Ethan but never told him. She created a private notes website where she wrote her feelings. Only admins can read her personal notes, which contain a heartwarming confession and the flag.

## Setup

```bash
npm install
node server.js
```

Access at: `http://localhost:3000`

## Credentials

- **Username:** `ethan`
- **Password:** `luna2024`

## Challenge Overview

1. Login to get a JWT token with `role: "user"`
2. The JWT secret changes every 10 minutes based on UTC time
3. Forge an admin JWT to access the private notes
4. Read Luna's confession and capture the flag

## Flag

```
CYBERCOM{t1m3_w4s_4ll_w3_h4d_but_l0v3_1s_3t3rn4l}
```

## Solve Path

1. Login with `ethan:luna2024`
2. Decode the JWT to see `role: "user"`
3. Check cookies to find the `formula` for the time window
4. Find the base secret `luna17_eclipse` in the footer of the notes page
5. Check `/api/time` to get current UTC time
6. Calculate the current window using the formula: `(hours * 60 + minutes) / 10`
7. Construct the secret: `luna17_eclipse_YYYY-MM-DD_window`
8. Forge JWT with `role: "admin"` using the constructed secret
9. Access `/api/notes` → read confession + flag

## API Endpoints

- `POST /api/login` - Login and get JWT
- `GET /api/time` - Get current UTC time and window
- `GET /api/notes` - Get notes (requires admin JWT)

## Secret Generation Formula

```javascript
/* found in cookies after login */
const formula = "(hours * 60 + minutes) / 10";
```

## Hints

1. Check the footer of the notes page for a static secret part
2. Look at your cookies after logging in
3. The server uses UTC time (check `/api/time`)
4. Combine the static part, date, and calculated window to form the secret
