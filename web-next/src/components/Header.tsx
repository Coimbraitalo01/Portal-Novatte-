"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Menu } from 'lucide-react';

export default function Header(){
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30" style={{backgroundColor:'#003602'}}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <img src={process.env.NEXT_PUBLIC_LOGO_URL || 'http://localhost:3001/public/img/logo.png'} alt="Novatte Portal" className="h-24 w-auto" />
            <div className="text-white">
              <div className="text-base font-semibold tracking-widest">NOVATTE PORTAL</div>
              <div className="text-xs text-white/80 hidden sm:block">IMÓVEIS, VAGAS, EVENTOS E SERVIÇOS</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-white/90 text-sm">
            <Link href="/imoveis">Imóveis</Link>
            <Link href="/vagas">Vagas</Link>
            <Link href="/eventos">Eventos</Link>
            <Link href="/servicos">Serviços</Link>
            <Link href="/empresas">Empresas</Link>
            <Link href="/contato">Contato</Link>
          </nav>
          <button className="md:hidden text-white" aria-label="Abrir menu" onClick={()=>setOpen(v=>!v)}><Menu/></button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-3 grid gap-2 text-sm">
            <Link href="/imoveis" onClick={()=>setOpen(false)}>Imóveis</Link>
            <Link href="/vagas" onClick={()=>setOpen(false)}>Vagas</Link>
            <Link href="/eventos" onClick={()=>setOpen(false)}>Eventos</Link>
            <Link href="/servicos" onClick={()=>setOpen(false)}>Serviços</Link>
            <Link href="/empresas" onClick={()=>setOpen(false)}>Empresas</Link>
            <Link href="/contato" onClick={()=>setOpen(false)}>Contato</Link>
          </div>
        </div>
      )}
    </header>
  )
}
