import { NextResponse } from 'next/server';

// Dead-end scan endpoint exposed in visible UI
// The real attack surface is /api/sc4nn3r — buried in JS bundle only
export async function POST(request) {
    const { target } = await request.json().catch(() => ({}));

    if (!target) {
        return NextResponse.json(
            { error: '[DECEPTICON LOG] SCAN-ERR-400: No target coordinate specified.' },
            { status: 400 }
        );
    }

    // Simulate a scan with Decepticon-flavored response
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));

    return NextResponse.json({
        scan_id: `SC-${Date.now().toString(16).toUpperCase()}`,
        target,
        result: 'NO SIGNAL DETECTED',
        status: 'CLEAR',
        energon_trace: 0.00,
        relay: 'SOUNDWAVE-ARRAY-NODE-7',
        timestamp: new Date().toISOString(),
        message: '[DECEPTICON LOG] Target sector scanned. No Autobot signatures detected. Continuing surveillance.',
    });
}

export async function GET() {
    return NextResponse.json(
        { error: '[DECEPTICON LOG] SCAN-ERR-405: POST only.' },
        { status: 405 }
    );
}
