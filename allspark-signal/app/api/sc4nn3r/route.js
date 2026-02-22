// /api/sc4nn3r
// Accepts POST with Content-Type: text/x-component
// This endpoint is intentionally left bare — add your own exploit handler here.

import { NextResponse } from 'next/server';

export async function POST(request) {
    const contentType = request.headers.get('content-type') || '';

    if (!contentType.includes('text/x-component')) {
        return NextResponse.json(
            { error: '[DECEPTICON LOG] SIGNAL-ERR-415: Unsupported media type.' },
            { status: 415 }
        );
    }

    const body = await request.text();

    if (!body) {
        return NextResponse.json(
            { error: '[DECEPTICON LOG] SIGNAL-ERR-400: Empty payload.' },
            { status: 400 }
        );
    }

    // --- INSERT YOUR VULNERABILITY HERE ---
    return NextResponse.json({ ok: true, received: body.length + ' bytes' });
}

export async function GET() {
    return NextResponse.json(
        { error: '[DECEPTICON LOG] SIGNAL-ERR-405: POST only.' },
        { status: 405 }
    );
}
