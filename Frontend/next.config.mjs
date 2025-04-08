/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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