import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Novatte Portal',
  description: 'Portal da cidade - Imóveis, Vagas, Eventos, Serviços, Empresas'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-sand text-darkGreen">
        {children}
      </body>
    </html>
  )
}
