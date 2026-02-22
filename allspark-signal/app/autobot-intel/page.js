import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'AllSparkEnergon2025!';

// Fake Transformer location data
const TRANSFORMER_DATA = [
    { designation: 'OPTIMUS PRIME', bearing: '142.7°N 39.4°W', signal: '94 dBm', status: 'ACTIVE', faction: 'AUTOBOT', last_seen: '0.3 cycles ago' },
    { designation: 'BUMBLEBEE', bearing: '118.2°N 74.1°W', signal: '87 dBm', status: 'MOBILE', faction: 'AUTOBOT', last_seen: '1.1 cycles ago' },
    { designation: 'JAZZ', bearing: '155.9°N 21.8°W', signal: '71 dBm', status: 'ACTIVE', faction: 'AUTOBOT', last_seen: '2.4 cycles ago' },
    { designation: 'IRONHIDE', bearing: '99.3°N 85.6°W', signal: '83 dBm', status: 'STATIONARY', faction: 'AUTOBOT', last_seen: '0.8 cycles ago' },
    { designation: 'RATCHET', bearing: '167.4°N 12.2°W', signal: '66 dBm', status: 'UNKNOWN', faction: 'AUTOBOT', last_seen: '5.7 cycles ago' },
];

export default async function AutobotIntelPage() {
    const headersList = await headers();
    const authHeader = headersList.get('authorization') || '';
    const token = authHeader.replace(/^Bearer\s+/i, '');

    let authorized = false;
    let tokenPayload = null;

    try {
        tokenPayload = jwt.verify(token, JWT_SECRET);
        authorized = true;
    } catch {
        // Fall through — show 403
    }

    if (!authorized) {
        return (
            <div className="page-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div className="section" style={{ maxWidth: 560, textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '16px', filter: 'drop-shadow(0 0 15px rgba(239,68,68,0.7))' }}>⛔</div>
                    <h1 className="font-display" style={{ fontSize: '1rem', letterSpacing: '0.25em', color: 'var(--accent-red)', marginBottom: '12px' }}>
                        ACCESS DENIED
                    </h1>
                    <div className="alert alert-error">
                        [DECEPTICON LOG] SIGNAL-LOCK-403: Autobot Intel requires Bearer token authorization.
                        Unauthorized access attempt logged. Soundwave is watching.
                    </div>
                    <pre style={{ marginTop: '16px', fontFamily: 'Share Tech Mono', fontSize: '0.72rem', color: 'var(--text-dim)', textAlign: 'left', background: 'rgba(5,0,8,0.8)', padding: '16px', border: '1px solid var(--dark-border)' }}>
                        {`HTTP 403 — AUTHORIZATION REQUIRED
Endpoint: /autobot-intel
Method:   ALL
Auth:     Bearer <jwt_token>
Issued:   Soundwave Intelligence HQ`}
                    </pre>
                </div>
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <div className="scanline-overlay" />
            <nav className="top-bar">
                <span className="top-bar-brand">⬡ SOUNDWAVE INTELLIGENCE HUB v2.1</span>
                <div className="top-bar-status">
                    <span><span className="status-dot" />AUTHORIZED: {tokenPayload?.sub || 'DECEPTICON'}</span>
                    <span className="badge badge-purple">{tokenPayload?.role || 'INTEL-OFFICER'}</span>
                </div>
            </nav>

            {/* 
        TODO: remove debug endpoint /api/v1/diagnostics
      */}

            <div className="section">
                <h1 className="font-display" style={{ fontSize: '1rem', letterSpacing: '0.2em', marginBottom: '8px', color: 'var(--accent-cyan)' }}>
                    AUTOBOT INTELLIGENCE DOSSIER
                </h1>
                <p className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '24px' }}>
                    REALTIME TRACKING — DECEPTICON SURVEILLANCE NETWORK — OMEGA CLEARANCE
                </p>

                <div className="alert alert-info" style={{ marginBottom: '24px' }}>
                    [INTEL-FEED] Live telemetry from Soundwave&apos;s deep-space surveillance array. Data refreshed every 0.3 cycles.
                </div>

                <div className="card" style={{ marginBottom: '24px' }}>
                    <div className="card-header">
                        <span style={{ color: 'var(--accent-cyan)' }}>◎</span>
                        AUTOBOT SIGNAL TRACKING — LIVE
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Share Tech Mono', fontSize: '0.78rem' }}>
                        <thead>
                            <tr style={{ color: 'var(--text-dim)', borderBottom: '1px solid var(--dark-border)' }}>
                                {['DESIGNATION', 'BEARING', 'SIGNAL STR.', 'STATUS', 'LAST SEEN'].map(h => (
                                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', letterSpacing: '0.1em', fontSize: '0.65rem' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TRANSFORMER_DATA.map((t, i) => (
                                <tr key={t.designation} style={{ borderBottom: '1px solid rgba(45,27,78,0.5)', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '12px', color: 'var(--accent-cyan)', fontWeight: 700 }}>{t.designation}</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{t.bearing}</td>
                                    <td style={{ padding: '12px', color: 'var(--decepticon-purple-bright)' }}>{t.signal}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span className={`badge ${t.status === 'ACTIVE' || t.status === 'MOBILE' ? 'badge-red' : t.status === 'STATIONARY' ? 'badge-purple' : 'badge-cyan'}`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', color: 'var(--text-dim)' }}>{t.last_seen}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid-2">
                    <div className="card">
                        <div className="card-header">◈ SIGNAL RELAY MAP</div>
                        <div className="terminal-box" style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ color: 'var(--text-dim)', textAlign: 'center', fontSize: '0.72rem' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '8px', opacity: 0.4 }}>🌍</div>
                                <div>[MAP DATA] — Requires Tier-9 Holographic Module</div>
                                <div style={{ marginTop: '4px', color: 'var(--dark-border)' }}>Soundwave array not configured for this terminal</div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">◎ THREAT ASSESSMENT</div>
                        {[
                            { label: 'Omega threat level', value: 71, color: 'var(--accent-red)' },
                            { label: 'Network jamming', value: 43, color: 'var(--accent-amber)' },
                            { label: 'Recon coverage', value: 88, color: 'var(--decepticon-purple-bright)' },
                        ].map(s => (
                            <div key={s.label} style={{ marginBottom: '14px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', fontFamily: 'Share Tech Mono', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                    <span>{s.label.toUpperCase()}</span>
                                    <span style={{ color: s.color }}>{s.value}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${s.value}%`, background: `linear-gradient(90deg, ${s.color}44, ${s.color})` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="footer">
                <span>AUTOBOT-INTEL — DECEPTICON EYES ONLY | OMEGA CLEARANCE</span>
                <span>SOUNDWAVE SURVEILLANCE NETWORK v2.1</span>
            </footer>
        </div>
    );
}
