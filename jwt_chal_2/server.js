const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Secret generation based on time
function getCurrentSecret() {
    const now = new Date();
    const window = Math.floor((now.getUTCHours() * 60 + now.getUTCMinutes()) / 10);
    const date = now.toISOString().split('T')[0];
    const base = `bee17_siege_${date}_${window}`;
    return crypto.createHash('sha256').update(base).digest('hex');
}

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'optimus' && password === 'bee2007') {
        const secret = getCurrentSecret();
        const token = jwt.sign(
            { username: 'optimus', role: 'user' },
            secret,
            { expiresIn: '1h' }
        );
        res.cookie('bee_sync', 'Bumblebee re-keys every 10 Earth minutes. Midnight resets the count. UTC only. B-127 counted how many full intervals had passed since the day began — not the time itself, the count.', { httpOnly: false });
        res.json({ token, message: 'Autobot signal authenticated. Welcome, Optimus.' });
    } else {
        res.status(401).json({ error: 'Signal authentication failed' });
    }
});

// Time endpoint
app.get('/api/time', (req, res) => {
    const now = new Date();
    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();
    const date = now.toISOString().split('T')[0];
    res.json({
        utc: now.toISOString(),
        timestamp: Math.floor(now.getTime() / 1000),
        date,
        hours,
        minutes
    });
});

// Energon-1 endpoint — partially recovered transmission fragments
app.get('/api/energon', (req, res) => {
    res.json({
        status: "PARTIAL_DECODE",
        source: "B-127 / Bumblebee — Field Datapad",
        recovered_fragments: [
            "...the key was born from the battle... B-127 always marked time by what he survived...",
            "...re-keyed itself... I counted... same window, every ten... then the cycle resets at zero...",
            "...don't transmit raw... the hash first, then the signature... Cybertronian standard...",
            "...three parts... underscore-linked... the name, the Earth date, the current window...",
        ],
        signal_quality: "61%",
        warning: "Fragments are out of order. Piece it together, Commander."
    });
});

// Transmission logs endpoint (admin only)
app.get('/api/notes', (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'No signal token provided' });
    }

    try {
        const secret = getCurrentSecret();
        console.log('Server Secret:', secret); // DEBUG

        const decoded = jwt.verify(token, secret);

        if (decoded.role !== 'admin') {
            return res.status(403).json({
                error: 'Access denied. Commander-level clearance required.',
                hint: 'Time changes everything. Every 10 minutes, to be exact.'
            });
        }

        // Return transmission logs with flag
        res.json({
            notes: [
                {
                    date: '2007-08-03',
                    title: 'Incoming Distress Beacon — Sector 7',
                    content: "Bumblebee's comm signal is fragmented. The Decepticons jammed his voice box during the initial assault on Mission City. He can't speak, but his beacon is still transmitting. We have to decipher it."
                },
                {
                    date: '2007-08-06',
                    title: 'Final Encrypted Transmission Detected',
                    content: "Our cryptographers managed to reconstruct the last burst signal Bumblebee sent before he went dark behind enemy lines. The encryption key rotates on a timed cycle — classic Cybertronian stealth protocol. Only those with Commander clearance can decode the full contents."
                },
                {
                    date: '2007-08-07',
                    title: 'For Optimus — From Bumblebee',
                    content: `Optimus.

If you're reading this, you cracked my cipher. I always knew you would.

I never had a voice, but I always had something to say.

You taught me that courage isn't the absence of fear — it's choosing to drive forward anyway, even when your engine is failing and the road is on fire.

I wasn't ready to go offline. But if I had to, I'm glad it was fighting beside you.

Tell the others: the Allspark isn't lost. It lives in every Autobot who chooses to stand.

Roll out, old friend. The universe still needs you.

CYBERCOM{t1m3_r4n_0ut_f0r_th3_b0y_wh0_n3v3r_sp0k3}

— B-127 / Bumblebee ⚡`
                }
            ]
        });
    } catch (err) {
        res.status(401).json({ error: 'Invalid signal token' });
    }
});

app.listen(3002, () => console.log('AllSpark Signal server running on port 3005'));
