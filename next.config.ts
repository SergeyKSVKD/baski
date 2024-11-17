/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1650, 1920, 2048, 3840],
  },
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      "classnames",
      "framer-motion",
      "sass",
      "sharp",
    ],
  },
}

export default nextConfig;
