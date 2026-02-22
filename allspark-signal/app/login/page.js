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
        <div className="page-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div className="scanline-overlay" />
            <div className="decepticon-watermark">⬡</div>

            {/* Nav */}
            <nav className="top-bar" style={{ position: 'fixed', top: 0, width: '100%' }}>
                <span className="top-bar-brand">⬡ SOUNDWAVE INTELLIGENCE HUB v2.1</span>
                <div className="top-bar-status">
                    <span><span className="status-dot red" />UNAUTHENTICATED</span>
                </div>
            </nav>

            <div style={{ marginTop: '80px', width: '100%', maxWidth: '480px', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '12px', filter: 'drop-shadow(0 0 15px rgba(168,85,247,0.7))' }}>⬡</div>
                    <h1 className="font-display" style={{ fontSize: '1.1rem', letterSpacing: '0.25em', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        DECEPTICON COMMAND PORTAL
                    </h1>
                    <p className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>
                        AUTHENTICATION REQUIRED — TIER-5 CLEARANCE
                    </p>
                </div>

                <div className="card">
                    <div className="card-header">
                        <span style={{ color: 'var(--accent-red)' }}>◈</span>
                        SECURE LOGIN — MYSQL AUTHENTICATION LAYER v7.4
                    </div>

                    <form onSubmit={handleLogin} id="decepticon-login-form">
                        <div className="form-group">
                            <label className="form-label" htmlFor="login-username">USERNAME</label>
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
                            <label className="form-label" htmlFor="login-password">PASSWORD</label>
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
                                <span style={{ color: 'var(--accent-red)' }}>[DB-ERR]</span> {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            id="login-submit-btn"
                            className="btn btn-primary w-full"
                            disabled={loading}
                            style={{ justifyContent: 'center', marginTop: '20px' }}
                        >
                            {loading ? '◈ QUERYING DATASTORE…' : '◈ ACCESS COMMAND PORTAL'}
                        </button>
                    </form>
                </div>

                {/* Fake DB footer — makes it feel like a real MySQL-backed app */}
                <div style={{
                    marginTop: '16px',
                    padding: '10px 14px',
                    background: 'rgba(5,0,8,0.8)',
                    border: '1px solid var(--dark-border)',
                    fontFamily: 'Share Tech Mono',
                    fontSize: '0.6rem',
                    color: 'var(--text-dim)',
                    lineHeight: 1.8,
                }}>
                    <div>DB CONN: mysql://172.21.0.4:3306/decepticon_intel</div>
                    <div>ENGINE: InnoDB 8.0.32 | TABLE: tbl_decepticons | CHARSET: utf8mb4</div>
                    <div>POOL: 10/100 | SSL: ENABLED | LOG LEVEL: WARN</div>
                </div>
            </div>
        </div>
    );
}
