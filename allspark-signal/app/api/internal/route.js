import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json(
        { error: "Classified. Megatron's eyes only.", code: 403 },
        { status: 403 }
    );
}

export async function POST() {
    return NextResponse.json(
        { error: "Classified. Megatron's eyes only.", code: 403 },
        { status: 403 }
    );
}
