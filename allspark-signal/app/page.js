'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
    const [scanResult, setScanResult] = useState(null);
    const [scanTarget, setScanTarget] = useState('');
    const [scanning, setScanning] = useState(false);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setTick(p => p + 1), 1000);
        return () => clearInterval(t);
    }, []);

    // Energon Scanner — visible UI posts to /api/scan (dead end)
    // The REAL endpoint /api/sc4nn3r is buried in the bundled JS only
    async function handleScan(e) {
        e.preventDefault();
        setScanning(true);
        setScanResult(null);
        try {
            const res = await fetch('/api/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ target: scanTarget }),
            });
            const data = await res.json();
            setScanResult(data);
        } catch {
            setScanResult({ error: '[DECEPTICON LOG] SIGNAL-7C: Scan relay offline. Retry transmission.' });
        }
        setScanning(false);
    }

    return (
        <div className="page-wrapper">
            <div className="scanline-overlay" />
            <div className="decepticon-watermark">⬡</div>

            {/* Top Bar */}
            <nav className="top-bar">
                <span className="top-bar-brand">⬡ SOUNDWAVE INTELLIGENCE HUB v2.1</span>
                <div className="top-bar-status">
                    <span><span className="status-dot" />UPLINK ACTIVE</span>
                    <span><span className="status-dot cyan" />NODE: CY-7749</span>
                    <a href="/login" style={{ color: 'var(--text-dim)', letterSpacing: '0.1em', fontSize: '0.7rem', fontFamily: 'Share Tech Mono' }}>
                        [ AUTHENTICATE ]
                    </a>
                </div>
            </nav>

            {/* Hero */}
            <div className="hero">
                <div className="decepticon-icon">⬡</div>
                <h1 className="hero-title glitch">SOUNDWAVE<br />INTELLIGENCE HUB</h1>
                <p className="hero-subtitle">DECEPTICON NETWORK — CYBERTRONIAN SECTOR 7 — VERSION 2.1</p>
                <div className="hero-divider" />

                {/* Status row */}
                <div style={{ display: 'flex', gap: '24px', marginBottom: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {[
                        { label: 'OPERATIVES ONLINE', value: '247' },
                        { label: 'ENERGON CUBES', value: '14,882' },
                        { label: 'AUTOBOTS TRACKED', value: '31' },
                    ].map(s => (
                        <div key={s.label} className="stat-box" style={{ minWidth: 160 }}>
                            <div className="stat-value">{s.value}</div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Section */}
            <div className="section" style={{ paddingTop: 0 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>

                    {/* Energon Scanner */}
                    <div className="card">
                        <div className="card-header">
                            <span style={{ color: 'var(--accent-cyan)' }}>◈</span>
                            ENERGON SCANNER — FIELD ARRAY v3
                        </div>

                        <p className="terminal-line" style={{ marginBottom: '20px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                            Dispatch a signal burst to the specified sector coordinate.
                            Soundwave Intelligence Network will process and relay findings.
                        </p>

                        <form onSubmit={handleScan} id="energon-scanner-form">
                            <div className="form-group">
                                <label className="form-label" htmlFor="scan-target">
                                    ◈ TARGET COORDINATE / SIGNAL ID
                                </label>
                                <input
                                    id="scan-target"
                                    className="form-input"
                                    type="text"
                                    placeholder="e.g.  SECTOR-7G  |  IACON-RELAY-4"
                                    value={scanTarget}
                                    onChange={e => setScanTarget(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                id="scan-submit-btn"
                                className="btn btn-primary w-full"
                                disabled={scanning}
                                style={{ justifyContent: 'center' }}
                            >
                                {scanning ? '◈ SCANNING…' : '◈ INITIATE SCAN'}
                            </button>
                        </form>

                        {scanResult && (
                            <div className={`alert ${scanResult.error ? 'alert-error' : 'alert-info'}`}>
                                {scanResult.error || JSON.stringify(scanResult, null, 2)}
                            </div>
                        )}
                    </div>

                    {/* Intel Feed */}
                    <div className="card">
                        <div className="card-header">
                            <span>◎</span>
                            LIVE INTEL FEED — SOUNDWAVE RELAY
                        </div>
                        <div className="terminal-box" style={{ fontSize: '0.72rem', lineHeight: 2 }}>
                            {[
                                `[${String(tick % 60).padStart(2, '0')}s] SIGNAL-LOCK: IACON-GRID-09 — Energon signature detected`,
                                `[LOG] Optimus Prime last seen: AUTOBOT-BASE-ALPHA`,
                                `[WARN] Sector 7G radio silence — 14 cycles`,
                                `[REC] AllSpark fragment bearing 220°N transmitted`,
                                `[NET] Scrambulator array: 98.2% uptime`,
                                `[CRYPT] Flight protocol relay — awaiting sync`,
                                `[LOG] Megatron directive: OPERATION DARK ENERGON — ACTIVE`,
                            ].map((line, i) => (
                                <div key={i} className="terminal-line" style={{ color: i === 5 ? 'var(--decepticon-purple-bright)' : undefined }}>
                                    {line}
                                </div>
                            ))}
                            <div className="terminal-line cursor" style={{ color: 'var(--accent-cyan)' }}>&nbsp;</div>
                        </div>

                        <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <span className="badge badge-red">◈ CLASSIFIED</span>
                            <span className="badge badge-purple">DECEPTICON EYES ONLY</span>
                            <span className="badge badge-cyan">LIVE</span>
                        </div>
                    </div>
                </div>

                {/* Bottom grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '24px' }}>
                    {[
                        {
                            title: 'ENERGON LEVELS',
                            value: '78%',
                            detail: 'Refining at Kaon facility — ETA 2.4 vorns',
                            fill: 78,
                            color: 'var(--decepticon-purple-bright)',
                        },
                        {
                            title: 'NETWORK INTEGRITY',
                            value: '91%',
                            detail: 'Sector 7G anomaly under investigation',
                            fill: 91,
                            color: 'var(--accent-cyan)',
                        },
                        {
                            title: 'AUTOBOT THREAT',
                            value: '43%',
                            detail: 'Recon squadron deployed to Earth',
                            fill: 43,
                            color: 'var(--accent-red)',
                        },
                    ].map(s => (
                        <div key={s.title} className="card">
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'Share Tech Mono', letterSpacing: '0.15em', marginBottom: '8px' }}>
                                {s.title}
                            </div>
                            <div style={{ fontSize: '1.6rem', fontFamily: 'Orbitron', color: s.color, fontWeight: 900 }}>{s.value}</div>
                            <div className="progress-bar" style={{ marginTop: '10px' }}>
                                <div className="progress-fill" style={{ width: `${s.fill}%`, background: `linear-gradient(90deg, ${s.color}66, ${s.color})` }} />
                            </div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '8px', fontFamily: 'Share Tech Mono' }}>{s.detail}</div>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="footer">
                <span>SOUNDWAVE INTELLIGENCE HUB v2.1 — DECEPTICON EMPIRE</span>
                <span>NODE-CY7749 | CYCLE {tick.toString().padStart(6, '0')} | ALL HAIL MEGATRON</span>
            </footer>
        </div>
    );
}
