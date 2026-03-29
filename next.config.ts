import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep dev output separate so `next build` doesn't clobber a running `next dev` server.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow access to remote image placeholder.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
};

export default nextConfig;
