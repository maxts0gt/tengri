/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@calcom/embed-react'],
  images: {
    domains: ['cal.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false
    };
    return config;
  },
}

module.exports = nextConfig