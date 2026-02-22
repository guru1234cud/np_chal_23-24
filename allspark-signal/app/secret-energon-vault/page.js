'use client';

import { useState, useEffect } from 'react';

const FAKE_FLAG_B64 = 'Q1lCRVJDT017ZjRrM18zbjNyZzBuX3Y0dWx0fQ==';

export default function SecretEnergonVaultPage() {
    const [unlocked, setUnlocked] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [tick, setTick] = useState(0);

    // Correct vault code to "unlock" it — any 8+ chars works for show
    function handleUnlock(e) {
        e.preventDefault();
        if (code.length >= 4) {
            setUnlocked(true);
            setError('');
        } else {
            setError('[VAULT-ERR] Access code insufficient. Megatron requires minimum 4-cycle authentication burst.');
        }
    }

    useEffect(() => {
        if (!unlocked) return;
        const t = setInterval(() => setTick(p => p + 1), 800);
        return () => clearInterval(t);
    }, [unlocked]);

    return (
        <div className="page-wrapper">
            <div className="scanline-overlay" />
            <div className="decepticon-watermark">⬡</div>

            <nav className="top-bar">
                <span className="top-bar-brand">⬡ SOUNDWAVE INTELLIGENCE HUB v2.1</span>
                <div className="top-bar-status">
                    <span><span className="status-dot red" />RESTRICTED SECTOR</span>
                </div>
            </nav>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '60px 24px' }}>

                {!unlocked ? (
                    <div style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '16px', filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.9))' }}>🔒</div>
                        <h1 className="font-display" style={{ fontSize: '1rem', letterSpacing: '0.25em', marginBottom: '8px' }}>
                            SECRET ENERGON VAULT
                        </h1>
                        <p className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '32px', letterSpacing: '0.1em' }}>
                            ALLSPARK-GRADE ENCRYPTION | MEGATRON AUTHORIZATION REQUIRED
                        </p>

                        <div className="card">
                            <div className="card-header">
                                <span style={{ color: 'var(--accent-amber)' }}>⚠</span>
                                VAULT AUTHENTICATION
                            </div>
                            <form onSubmit={handleUnlock}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="vault-code">VAULT ACCESS CODE</label>
                                    <input
                                        id="vault-code"
                                        className="form-input"
                                        type="password"
                                        placeholder="Enter authorization burst"
                                        value={code}
                                        onChange={e => setCode(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <div className="alert alert-error" style={{ fontSize: '0.72rem' }}>{error}</div>}
                                <button type="submit" className="btn btn-primary w-full" style={{ justifyContent: 'center', marginTop: '16px' }}>
                                    ⬡ AUTHENTICATE TO VAULT
                                </button>
                            </form>
                        </div>

                        <div style={{ marginTop: '20px', fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'Share Tech Mono' }}>
                            WARNING: Unauthorized access attempts are logged and reported to Soundwave
                        </div>
                    </div>
                ) : (
                    <div style={{ width: '100%', maxWidth: '700px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '8px', filter: 'drop-shadow(0 0 20px rgba(245,158,11,0.8))' }}>🔓</div>
                            <h1 className="font-display" style={{ fontSize: '1rem', letterSpacing: '0.2em', color: 'var(--accent-amber)' }}>
                                VAULT UNLOCKED — EYES ONLY
                            </h1>
                        </div>

                        <div className="card" style={{ borderColor: 'rgba(245, 158, 11, 0.3)', marginBottom: '20px' }}>
                            <div className="card-header" style={{ color: 'var(--accent-amber)' }}>
                                ◈ ENERGON INTELLIGENCE CACHE — CLASSIFIED
                            </div>
                            <div className="terminal-box" style={{ marginBottom: '16px' }}>
                                <div className="terminal-line" style={{ color: 'var(--text-dim)', marginBottom: '8px' }}>
                                    RETRIEVED: ALLSPARK-7 Intelligence Package
                                </div>
                                <div className="terminal-line" style={{ color: 'var(--text-dim)', marginBottom: '8px' }}>
                                    CLASSIFICATION: OMEGA-RED | EYES ONLY: MEGATRON, SOUNDWAVE
                                </div>
                                <div className="terminal-line" style={{ color: 'var(--text-dim)', marginBottom: '16px' }}>
                                    ─────────────────────────────────────────────
                                </div>
                                <div className="terminal-line" style={{ color: 'var(--accent-amber)', marginBottom: '8px' }}>
                                    ◈ ENCODED INTELLIGENCE PAYLOAD:
                                </div>
                                <div style={{
                                    background: 'rgba(245,158,11,0.06)',
                                    border: '1px solid rgba(245,158,11,0.3)',
                                    padding: '16px',
                                    borderRadius: '2px',
                                    fontFamily: 'Share Tech Mono',
                                    fontSize: '0.85rem',
                                    color: '#fcd34d',
                                    wordBreak: 'break-all',
                                    letterSpacing: '0.05em',
                                }}>
                                    {FAKE_FLAG_B64}
                                </div>
                                <div className="terminal-line" style={{ color: 'var(--text-dim)', marginTop: '12px', fontSize: '0.7rem' }}>
                                    ENCODING: Base64 | CIPHER: Cybertronian-256 | DECODE TO RETRIEVE INTEL
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                {[
                                    { label: 'ENERGON STORED', value: `${14882 + tick}` + ' CUBES' },
                                    { label: 'LAST ACCESS', value: 'SOUNDWAVE' },
                                    { label: 'VAULT INTEGRITY', value: '100%' },
                                    { label: 'CLASSIFICATION', value: 'OMEGA-RED' },
                                ].map(s => (
                                    <div key={s.label} className="stat-box" style={{ padding: '12px', textAlign: 'left' }}>
                                        <div className="stat-label">{s.label}</div>
                                        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '0.85rem', color: 'var(--accent-amber)', marginTop: '4px' }}>{s.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="alert alert-warning">
                            [SECURITY] This payload is encoded. Decode using standard Base64 to retrieve the intelligence fragment.
                            Report to Soundwave upon successful retrieval.
                        </div>
                    </div>
                )}
            </div>

            <footer className="footer">
                <span>SECTOR: SECRET-ENERGON-VAULT | CLEARANCE: OMEGA-RED</span>
                <span>ALL HAIL MEGATRON</span>
            </footer>
        </div>
    );
}
