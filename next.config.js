/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configuração para GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/Portal-Novatte' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Portal-Novatte/' : '',
  
  // Desativa a otimização de imagens para exportação estática
  images: {
    unoptimized: true,
  },
  
  // Desativa o webpack 5 (pode ajudar em alguns casos)
  webpack5: true,
  
  // Permite importação de módulos ES
  experimental: {
    esmExternals: true,
  },
  
  // Configuração de redirecionamentos (opcional)
  async redirects() {
    return [
      {
        source: '/',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
