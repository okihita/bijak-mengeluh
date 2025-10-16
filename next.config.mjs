/** @type {import('next').NextConfig} */
// Don't worry, this only works on localhost. It's a part of the Next.js development server.
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/:path*`,
            },
        ];
    },
};

export default nextConfig;