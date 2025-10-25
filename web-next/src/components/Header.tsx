import React from 'react'

const Header = () => {
  return (
    <header className="sticky top-0 z-30" style={{backgroundColor: '#003602'}}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a className="flex items-center gap-3" href="/Portal-Novatte/">
            {/* Use imagem local ou remova temporariamente */}
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white/10">
              <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 28L32 12L56 28V48C56 54 50 60 44 60H20C14 60 8 54 8 48V28Z" fill="#FE4700"/>
              </svg>
            </div>
            <div className="text-white">
              <div className="text-base font-semibold tracking-widest">NOVATTE PORTAL</div>
              <div className="text-xs text-white/80 hidden sm:block">IMÓVEIS, VAGAS, EVENTOS E SERVIÇOS</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-white/90 text-sm">
            <a href="/Portal-Novatte/imoveis/">Imóveis</a>
            <a href="/Portal-Novatte/vagas/">Vagas</a>
            <a href="/Portal-Novatte/eventos/">Eventos</a>
            <a href="/Portal-Novatte/servicos/">Serviços</a>
            <a href="/Portal-Novatte/empresas/">Empresas</a>
            <a href="/Portal-Novatte/contato/">Contato</a>
          </nav>
          <button className="md:hidden text-white" aria-label="Abrir menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
