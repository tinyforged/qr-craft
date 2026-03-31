/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable strict mode for better error detection
  reactStrictMode: true,
  // Production build optimizations
  swcMinify: true,
}

module.exports = nextConfig
