'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
    const router = useRouter();
    const [session, setSession] = useState(null);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const s = sessionStorage.getItem('dc_session');
        if (!s) { router.push('/login'); return; }
        setSession(JSON.parse(s));
        const t = setInterval(() => setTick(p => p + 1), 1200);
        return () => clearInterval(t);
    }, []);

    if (!session) return null;

    const energon = [82, 67, 91, 55, 78, 43, 88];
    const threats = ['SECTOR-7G', 'IACON-RELAY', 'EARTH-OPS', 'SPACE-BRIDGE', 'KAON-MINE'];

    return (
        <div className="app-container">
            {/* Header */}
            <header className="nav-header">
                <div className="nav-brand">
                    <svg className="nav-brand-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 0, 60, 0.8))', fill: 'var(--danger)' }}>
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" fill="currentColor" />
                    </svg>
                    <div className="nav-brand-text">ALLSPARK <span>COMMAND</span></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                        <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary)', animation: 'pulse-glow 1s infinite alternate' }} />
                        {session.user?.toUpperCase()}
                    </div>
                    <span style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', border: '1px solid var(--danger)', color: 'var(--danger)', borderRadius: 'var(--radius-sm)' }}>
                        GRUNT ACCESS
                    </span>
                </div>
            </header>

            <main className="section-padding" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', marginTop: '60px' }}>
                <h2 className="font-orbitron" style={{ fontSize: '1.5rem', letterSpacing: '0.2em', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                    DECEPTICON COMMAND DASHBOARD
                </h2>

                <div className="alert alert-warning" style={{ marginBottom: '2rem', borderColor: 'var(--accent-gold)', background: 'rgba(251, 191, 36, 0.1)', color: '#fde68a' }}>
                    <strong>[ACCESS CONTROL]</strong> Role: decepticon-grunt — Classified sectors are restricted. Consult Soundwave for elevated access.
                </div>

                <div className="features-grid" style={{ marginBottom: '3rem' }}>
                    {[
                        { label: 'ENERGON OUTPUT', value: `${energon[tick % energon.length]}%`, sub: 'Kaon Refinery Alpha', color: 'var(--primary-bright)' },
                        { label: 'ACTIVE OPERATIVES', value: '247', sub: 'Deployed across sectors', color: 'var(--text-main)' },
                        { label: 'THREAT LEVEL', value: 'OMEGA-4', sub: 'Elevated — Autobots active', color: 'var(--danger)' },
                    ].map(s => (
                        <div key={s.label} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                            <div className="font-orbitron" style={{ fontSize: '3rem', fontWeight: 900, color: s.color, textShadow: `0 0 15px ${s.color}`, marginBottom: '0.5rem' }}>{s.value}</div>
                            <div className="font-rajdhani" style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{s.label}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--border-glass)', fontFamily: 'Share Tech Mono, monospace', marginTop: '0.5rem' }}>{s.sub}</div>
                        </div>
                    ))}
                </div>

                <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
                    <div className="glass-card">
                        <h3 className="font-orbitron" style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
                            ◈ ENERGON FLOW METRICS
                        </h3>
                        {energon.map((val, i) => (
                            <div key={i} style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontFamily: 'Share Tech Mono, monospace', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                    <span>REFINERY-{String(i + 1).padStart(2, '0')}</span>
                                    <span>{(val + (tick % 5 - 2))}%</span>
                                </div>
                                <div style={{ height: '6px', background: 'var(--bg-base)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${val}%`, background: 'linear-gradient(90deg, transparent, var(--primary))', transition: 'width 1s ease' }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass-card">
                        <h3 className="font-orbitron" style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
                            ◎ MONITORED THREATS
                        </h3>
                        {threats.map((t, i) => (
                            <div key={t} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '1rem 0', borderBottom: '1px solid var(--border-glass)',
                                fontFamily: 'Share Tech Mono, monospace', fontSize: '0.9rem',
                            }}>
                                <span style={{ color: 'var(--text-muted)' }}>{t}</span>
                                <span style={{
                                    padding: '0.2rem 0.6rem',
                                    fontSize: '0.75rem',
                                    background: i % 3 === 0 ? 'rgba(255, 0, 60, 0.15)' : i % 3 === 1 ? 'rgba(251, 191, 36, 0.15)' : 'rgba(0, 240, 255, 0.15)',
                                    color: i % 3 === 0 ? 'var(--danger)' : i % 3 === 1 ? 'var(--accent-gold)' : 'var(--primary)',
                                    border: `1px solid ${i % 3 === 0 ? 'var(--danger)' : i % 3 === 1 ? 'var(--accent-gold)' : 'var(--primary)'}`,
                                    borderRadius: '2px'
                                }}>
                                    {['CRITICAL', 'HIGH', 'MEDIUM'][i % 3]}
                                </span>
                            </div>
                        ))}
                        <div className="alert alert-warning" style={{ marginTop: '2rem', fontSize: '0.8rem', background: 'rgba(2, 6, 23, 0.6)', borderColor: 'var(--border-glass)' }}>
                            [ACCESS RESTRICTED] Full threat matrix requires Soundwave-level clearance.
                        </div>
                    </div>
                </div>
            </main>

            <footer className="footer" style={{ marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', width: '100%', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.8rem' }}>
                    <span>SESSION: {session.role?.toUpperCase()} | ACCESS: {session.access?.toUpperCase()}</span>
                    <span>CYCLE {tick.toString().padStart(6, '0')}</span>
                </div>
            </footer>
        </div>
    );
}
