/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/Portal-Novatte' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Portal-Novatte/' : '',
  images: {
    unoptimized: true,
  },
  // Adicione outras configurações do Next.js aqui, se necessário
}

export default nextConfig
