/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/Portal-Novatte',
  assetPrefix: '/Portal-Novatte/',
};

export default nextConfig;
