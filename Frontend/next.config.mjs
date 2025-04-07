/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
      appDir: true, // active l'App Router
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000', // si tes images viennent de localhost:4000
      },
    ],
  },
};

export default nextConfig;