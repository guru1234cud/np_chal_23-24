/** @type {import('next').NextConfig} */
const nextConfig = {
    // Expose the .git directory over HTTP - required for rabbit hole #3
    async headers() {
        return [
            {
                source: '/.git/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'no-store' },
                ],
            },
        ];
    },
    // Do NOT block .git - intentionally exposed
    async rewrites() {
        return [];
    },
};

module.exports = nextConfig;
