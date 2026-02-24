'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
    const [scannedData, setScannedData] = useState(0);
    const [onlineNodes, setOnlineNodes] = useState(8472);

    useEffect(() => {
        const interval = setInterval(() => {
            setScannedData(prev => prev + Math.floor(Math.random() * 50));
            setOnlineNodes(prev => prev + (Math.floor(Math.random() * 3) - 1));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="app-container">

            {/* Header */}
            <header className="nav-header">
                <div className="nav-brand">
                    <svg className="nav-brand-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" fill="currentColor" />
                    </svg>
                    <div className="nav-brand-text">ALLSPARK <span>SIGNAL</span></div>
                </div>
                <nav className="nav-links">
                    <Link href="#intel" className="nav-link">Intel</Link>
                    <Link href="#network" className="nav-link">Network</Link>
                    <Link href="#archives" className="nav-link">Archives</Link>
                    <Link href="/login" className="btn btn-outline" style={{ padding: '0.5rem 1.5rem', fontSize: '1rem', marginLeft: '1rem' }}>Access</Link>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="hero-badge">CYBERTRONIAN SECURE NETWORK /// v9.0</div>
                        <h1 className="hero-title">ILLUMINATE<br />THE GRID.</h1>
                        <p className="hero-subtitle">
                            Welcome to the Allspark Signal Interface. Access real-time data from autonomous relays, monitor global energon distribution, and synchronize with the core intelligence matrix.
                        </p>
                        <div className="btn-group">
                            <Link href="#intel" className="btn btn-primary">Initialize Sync</Link>
                            <Link href="/login" className="btn btn-outline">Operator Login</Link>
                        </div>
                    </div>

                    {/* Interactive Hologram Graphic */}
                    <div className="core-hologram">
                        <div className="core-ring ring-1"></div>
                        <div className="core-ring ring-2"></div>
                        <div className="core-ring ring-3"></div>
                        <div className="core-center"></div>
                    </div>
                </div>
            </section>

            {/* Live Stats */}
            <section className="stats-container">
                <div className="stat-item">
                    <div className="stat-value">{scannedData.toLocaleString()} PB</div>
                    <div className="stat-label">Data Processed</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value" style={{ color: 'var(--primary-bright)', textShadow: '0 0 15px var(--primary-glow)' }}>{onlineNodes.toLocaleString()}</div>
                    <div className="stat-label">Active Relays</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value" style={{ color: 'var(--success)', textShadow: '0 0 15px rgba(16, 185, 129, 0.4)' }}>99.9%</div>
                    <div className="stat-label">Core Stability</div>
                </div>
            </section>

            {/* Features Matrix */}
            <section id="intel" className="section-padding">
                <h2 className="section-title font-orbitron">INTELLIGENCE MATRIX</h2>

                <div className="features-grid">
                    <div className="glass-card">
                        <svg className="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <h3 className="card-title font-orbitron">Secure Uplink</h3>
                        <p className="card-desc">End-to-end quantum encryption ensuring all intercepted signals and transmissions remain hidden from enemy sub-routines.</p>
                        <Link href="/login" className="nav-link" style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>Authenticate &rarr;</Link>
                    </div>

                    <div className="glass-card">
                        <svg className="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <h3 className="card-title font-orbitron">Energon Mapping</h3>
                        <p className="card-desc">Real-time topographical scanning to detect high-yield energon deposits across uncharted sectors and planetary surfaces.</p>
                        <Link href="#network" className="nav-link" style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>View Map &rarr;</Link>
                    </div>

                    <div className="glass-card">
                        <svg className="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        <h3 className="card-title font-orbitron">Synthesis Lab</h3>
                        <p className="card-desc">Advanced combinatorial algorithms for optimal energon refinement, boosting core outputs by up to 34% per cycle.</p>
                        <Link href="/login" className="nav-link" style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>Access Lab &rarr;</Link>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2024 AUTOBOT HIGH COMMAND // ALLSPARK SIGNAL. ALL RIGHTS RESERVED.</p>
                <p style={{ marginTop: '0.5rem', color: 'var(--border-glass)', fontSize: '0.8rem' }}>SIGNAL HUB: ONLINE</p>
            </footer>
        </div>
    );
}
