'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
        <div className="page-wrapper">
            <div className="scanline-overlay" />
            <nav className="top-bar">
                <span className="top-bar-brand">⬡ SOUNDWAVE INTELLIGENCE HUB v2.1</span>
                <div className="top-bar-status">
                    <span><span className="status-dot" />AUTHENTICATED: {session.user?.toUpperCase()}</span>
                    <span className="badge badge-red" style={{ fontSize: '0.6rem' }}>GRUNT ACCESS</span>
                </div>
            </nav>

            <div className="section">
                <h2 className="font-display" style={{ fontSize: '1rem', letterSpacing: '0.2em', marginBottom: '8px', color: 'var(--text-dim)' }}>
                    DECEPTICON COMMAND DASHBOARD
                </h2>
                <div className="alert alert-warning" style={{ marginBottom: '24px' }}>
                    [ACCESS CONTROL] Role: decepticon-grunt — Classified sectors are restricted. Consult Soundwave for elevated access.
                </div>

                <div className="grid-3" style={{ marginBottom: '24px' }}>
                    {[
                        { label: 'ENERGON OUTPUT', value: `${energon[tick % energon.length]}%`, sub: 'Kaon Refinery Alpha' },
                        { label: 'ACTIVE OPERATIVES', value: '247', sub: 'Deployed across sectors' },
                        { label: 'THREAT LEVEL', value: 'OMEGA-4', sub: 'Elevated — Autobots active' },
                    ].map(s => (
                        <div key={s.label} className="stat-box">
                            <div className="stat-value" style={{ fontSize: '1.5rem' }}>{s.value}</div>
                            <div className="stat-label">{s.label}</div>
                            <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', fontFamily: 'Share Tech Mono', marginTop: '4px' }}>{s.sub}</div>
                        </div>
                    ))}
                </div>

                <div className="grid-2">
                    <div className="card">
                        <div className="card-header">◈ ENERGON FLOW METRICS</div>
                        {energon.map((val, i) => (
                            <div key={i} style={{ marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontFamily: 'Share Tech Mono', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                    <span>REFINERY-{String(i + 1).padStart(2, '0')}</span>
                                    <span>{(val + (tick % 5 - 2))}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${val}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="card">
                        <div className="card-header">◎ MONITORED THREATS</div>
                        {threats.map((t, i) => (
                            <div key={t} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '10px 0', borderBottom: '1px solid var(--dark-border)',
                                fontFamily: 'Share Tech Mono', fontSize: '0.75rem',
                            }}>
                                <span style={{ color: 'var(--text-secondary)' }}>{t}</span>
                                <span className={`badge ${i % 3 === 0 ? 'badge-red' : i % 3 === 1 ? 'badge-purple' : 'badge-cyan'}`}>
                                    {['CRITICAL', 'HIGH', 'MEDIUM'][i % 3]}
                                </span>
                            </div>
                        ))}
                        <div className="alert alert-warning" style={{ marginTop: '16px', fontSize: '0.7rem' }}>
                            [ACCESS RESTRICTED] Full threat matrix requires Soundwave-level clearance.
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <span>SESSION: {session.role?.toUpperCase()} | ACCESS: {session.access?.toUpperCase()}</span>
                <span>CYCLE {tick.toString().padStart(6, '0')}</span>
            </footer>
        </div>
    );
}
