'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Hardcoded credentials — no real DB behind this
// SQL-style errors are purely cosmetic to waste attacker time on sqlmap
const VALID_CREDS = { username: 'soundwave', password: 'C0mmand_And_C0ntr0l' };

function getErrorMessage(field, value) {
    // Simulate MySQL-style errors for special characters
    const sqlTriggers = ["'", '"', '`', ';', '--', '/*', '#', '\\', '(', ')'];
    const hasSqlChars = sqlTriggers.some(c => value.includes(c));

    if (hasSqlChars) {
        return "SQL Error: unexpected token near '" + value.slice(-6).replace(/['"]/g, '') + "' in query";
    }

    if (field === 'username') {
        return `Unknown user '${value}' in datastore`;
    }
    return `Invalid credentials for user '${VALID_CREDS.username}' in tbl_decepticons`;
}

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate network delay for realism
        await new Promise(r => setTimeout(r, 900 + Math.random() * 400));

        if (username !== VALID_CREDS.username) {
            setError(getErrorMessage('username', username));
            setLoading(false);
            return;
        }

        if (password !== VALID_CREDS.password) {
            setError(getErrorMessage('password', password));
            setLoading(false);
            return;
        }

        // Store fake session
        sessionStorage.setItem('dc_session', JSON.stringify({
            status: 'authenticated',
            role: 'decepticon-grunt',
            access: 'none',
            user: username,
        }));

        router.push('/dashboard');
    }

    return (
        <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>

            {/* Nav */}
            <header className="nav-header" style={{ position: 'fixed', top: 0, width: '100%' }}>
                <div className="nav-brand">
                    <svg className="nav-brand-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 0, 60, 0.8))', fill: 'var(--danger)' }}>
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" fill="currentColor" />
                    </svg>
                    <div className="nav-brand-text" style={{ color: 'var(--text-main)' }}>SOUNDWAVE <span style={{ color: 'var(--danger)' }}>INTELLIGENCE HUD</span></div>
                </div>
                <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%', boxShadow: '0 0 10px var(--danger)', animation: 'pulse-glow 1s infinite alternate' }} />
                    UNAUTHENTICATED CACHE
                </div>
            </header>

            <div style={{ marginTop: '120px', width: '100%', maxWidth: '500px', padding: '0 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '1rem', filter: 'drop-shadow(0 0 20px rgba(255,0,60,0.5))', animation: 'float 4s ease-in-out infinite' }}>⬡</div>
                    <h1 className="font-orbitron" style={{ fontSize: '1.4rem', letterSpacing: '0.2em', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                        DECEPTICON COMMAND PORTAL
                    </h1>
                    <p className="font-rajdhani" style={{ fontSize: '0.9rem', color: 'var(--danger)', letterSpacing: '0.15em', fontWeight: 600 }}>
                        AUTHENTICATION REQUIRED — TIER-5 CLEARANCE
                    </p>
                </div>

                <div className="glass-card" style={{ padding: '2rem' }}>
                    <div className="font-orbitron" style={{ color: 'var(--danger)', fontSize: '0.9rem', letterSpacing: '0.2em', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
                        <span>◈</span> SECURE LOGIN — MYSQL AUTHENTICATION LAYER v7.4
                    </div>

                    <form onSubmit={handleLogin} id="decepticon-login-form">
                        <div className="form-group">
                            <label className="form-label" htmlFor="login-username" style={{ color: 'var(--text-muted)' }}>USERNAME</label>
                            <input
                                id="login-username"
                                className="form-input"
                                type="text"
                                placeholder="Decepticon designation"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                autoComplete="off"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="login-password" style={{ color: 'var(--text-muted)' }}>PASSWORD</label>
                            <input
                                id="login-password"
                                className="form-input"
                                type="password"
                                placeholder="Access code"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                autoComplete="off"
                                required
                            />
                        </div>

                        {error && (
                            <div className="alert alert-error" id="login-error-msg">
                                <strong>[DB-ERR]</strong> {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            id="login-submit-btn"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{ width: '100%', marginTop: '1.5rem', background: loading ? 'var(--text-muted)' : 'var(--danger)', color: '#fff' }}
                        >
                            {loading ? '◈ QUERYING DATASTORE…' : '◈ ACCESS COMMAND PORTAL'}
                        </button>
                    </form>
                </div>

                {/* Fake DB footer — makes it feel like a real MySQL-backed app */}
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    background: 'rgba(2, 6, 23, 0.6)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.8,
                    textAlign: 'center'
                }}>
                    <div>DB CONN: <span style={{ color: 'var(--primary-bright)' }}>mysql://172.21.0.4:3306/decepticon_intel</span></div>
                    <div>ENGINE: <strong>InnoDB 8.0.32</strong> | TABLE: <strong style={{ color: 'var(--danger)' }}>tbl_decepticons</strong> | CHARSET: <strong>utf8mb4</strong></div>
                    <div>POOL: 10/100 | SSL: ENABLED | LOG LEVEL: WARN</div>
                </div>
            </div>
        </div>
    );
}
