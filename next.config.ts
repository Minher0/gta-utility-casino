import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rockstaractu.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**.wikia.nocookie.net',
      },
      {
        protocol: 'https',
        hostname: '**.fandom.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
