import Header from '@/components/Header'

export default function Home(){
  return (
    <main>
      <Header/>
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="rounded-lg p-6 text-white" style={{background:'linear-gradient(135deg,rgba(0,54,2,.9),rgba(0,54,2,.8))'}}>
          <div className="text-sm bg-orange-500 inline-block px-2 py-1 rounded-full mb-2">IMÓVEIS</div>
          <h1 className="text-2xl font-bold mb-2">Destaques</h1>
          <p className="text-sm opacity-90">Carregado da API</p>
        </div>
      </section>
    </main>
  )
}
