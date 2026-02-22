export default function NotFound() {
    return (
        <div className="page-wrapper" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div className="scanline-overlay" />
            <div className="decepticon-watermark">⬡</div>

            <div style={{ textAlign: 'center', padding: '40px 24px', maxWidth: '560px' }}>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(4rem, 15vw, 8rem)', fontWeight: 900, color: 'rgba(124,58,237,0.15)', lineHeight: 1, marginBottom: '8px', letterSpacing: '-0.02em' }}>
                    404
                </div>

                <div style={{ fontSize: '3rem', marginBottom: '20px', filter: 'drop-shadow(0 0 12px rgba(168,85,247,0.7))' }}>⛔</div>

                <h1 className="font-display" style={{ fontSize: '1rem', letterSpacing: '0.25em', color: 'var(--decepticon-purple-bright)', marginBottom: '20px' }}>
                    SECTOR ACCESS DENIED
                </h1>

                <div style={{
                    fontFamily: 'Share Tech Mono',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    fontStyle: 'italic',
                    padding: '20px',
                    borderLeft: '3px solid var(--decepticon-purple)',
                    background: 'rgba(124,58,237,0.05)',
                    marginBottom: '24px',
                    textAlign: 'left',
                }}>
                    &quot;This sector is off-limits.&quot;<br />
                    <span style={{ color: 'var(--decepticon-purple-bright)', fontWeight: 700 }}>— Megatron</span>
                </div>

                <div className="terminal-box" style={{ textAlign: 'left', marginBottom: '24px' }}>
                    <div className="terminal-line" style={{ color: 'var(--text-dim)' }}>
                        [DECEPTICON LOG] ERR-404: Requested coordinates not found in Soundwave network
                    </div>
                    <div className="terminal-line" style={{ color: 'var(--accent-red)' }}>
                        [SECURITY] Unauthorized sector navigation attempt flagged
                    </div>
                    <div className="terminal-line" style={{ color: 'var(--text-dim)' }}>
                        [SYS] Returning operative to grid origin...
                    </div>
                </div>

                <a href="/" className="btn btn-secondary" style={{ display: 'inline-flex' }}>
                    ⬡ RETURN TO COMMAND HUB
                </a>
            </div>
        </div>
    );
}
