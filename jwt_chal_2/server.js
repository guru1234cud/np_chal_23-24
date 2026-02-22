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
    const base = `luna17_eclipse_${date}_${window}`;
    return crypto.createHash('sha256').update(base).digest('hex');
}

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'ethan' && password === 'luna2024') {
        const secret = getCurrentSecret();
        const token = jwt.sign(
            { username: 'ethan', role: 'user' },
            secret,
            { expiresIn: '1h' } // Expires in 1 hour
        );
        res.cookie('formula', '(hours * 60 + minutes) / 10', { httpOnly: false });
        res.json({ token, message: 'Welcome, Ethan' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Time endpoint
app.get('/api/time', (req, res) => {
    const now = new Date();
    res.json({
        utc: now.toISOString(),
        timestamp: Math.floor(now.getTime() / 1000)
    });
});

// Notes endpoint (admin only)
app.get('/api/notes', (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const secret = getCurrentSecret();
        console.log('Server Secret:', secret); // DEBUG

        const decoded = jwt.verify(token, secret);

        if (decoded.role !== 'admin') {
            return res.status(403).json({
                error: 'Access denied. Admin only.',
                hint: 'Time changes everything. Every 10 minutes, to be exact.'
            });
        }

        // Return notes with flag
        res.json({
            notes: [
                {
                    date: '2024-02-10',
                    title: "I can't keep pretending",
                    content: "Every time Ethan smiles at me, my heart races. I've tried to ignore it, but I can't anymore. I think I'm in love with him."
                },
                {
                    date: '2024-02-12',
                    title: 'Should I tell him?',
                    content: "Valentine's Day is in 2 days. Maybe that's my chance? But what if he doesn't feel the same way? I couldn't bear losing him as a friend."
                },
                {
                    date: '2024-02-14',
                    title: 'For Ethan',
                    content: `If you're reading this, you figured it out. You always were smarter than you gave yourself credit for.

I love you, Ethan. I have for a long time. Every coffee we shared, every late night conversation, every moment - they all meant everything to me.

I was too scared to say it out loud, so I'm saying it here, in the only way I know how.

Happy Valentine's Day.

CYBERCOM{t1m3_w4s_4ll_w3_h4d_but_l0v3_1s_3t3rn4l}

- Luna 💕`
                }
            ]
        });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

app.listen(3005, () => console.log('Server running on port 3005'));
