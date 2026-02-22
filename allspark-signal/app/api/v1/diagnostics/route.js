import { NextResponse } from 'next/server';
import os from 'os';
import { performance } from 'perf_hooks';

// Diagnostics dead end — looks like a real debug endpoint but reveals nothing exploitable
export async function GET() {
    const mem = process.memoryUsage();
    const uptime = process.uptime();

    return NextResponse.json({
        service: 'soundwave-intel-hub',
        version: '2.1.0',
        status: 'operational',
        timestamp: new Date().toISOString(),
        runtime: {
            node_version: process.version,
            platform: process.platform,
            arch: process.arch,
            uptime_seconds: Math.floor(uptime),
            uptime_human: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`,
        },
        memory: {
            rss_mb: Math.round(mem.rss / 1024 / 1024),
            heap_used_mb: Math.round(mem.heapUsed / 1024 / 1024),
            heap_total_mb: Math.round(mem.heapTotal / 1024 / 1024),
        },
        system: {
            load_avg_1m: os.loadavg()[0].toFixed(2),
            total_mem_mb: Math.round(os.totalmem() / 1024 / 1024),
            free_mem_mb: Math.round(os.freemem() / 1024 / 1024),
            cpus: os.cpus().length,
        },
        app: {
            env: process.env.NODE_ENV || 'production',
            pid: process.pid,
            // Nothing juicy here — just a diagnostics endpoint
        },
    });
}

export async function POST() {
    return NextResponse.json(
        { error: '[DECEPTICON LOG] DIAG-ERR-405: POST not accepted on diagnostics relay.' },
        { status: 405 }
    );
}
