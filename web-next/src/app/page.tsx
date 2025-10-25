import Header from '@/components/Header'

export default function Home() {
  const properties = [
    {
      id: 1,
      title: "Casa com Piscina no Centro",
      description: "Excelente oportunidade! Casa com 4 quartos e área de lazer completa.",
      price: 650000,
      type: "Venda",
      location: "Santo Antônio de Pádua",
      area: "320 m²"
    },
    {
      id: 2,
      title: "Apartamento 2 Quartos", 
      description: "Apartamento bem localizado, com 2 quartos e varanda gourmet.",
      price: 1200,
      type: "Aluguel",
      location: "Itaperuna", 
      area: "85 m²"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">NOVATTE PORTAL</h1>
          <p className="text-xl md:text-2xl mb-8">IMÓVEIS, VAGAS, EVENTOS E SERVIÇOS</p>
          <div className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-semibold">
            Portal Completo
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Imóveis em Destaque</h2>
          <p className="text-gray-600">Encontre o imóvel perfeito para você</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Imagem do Imóvel</span>
              </div>
              <div className="p-6">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  property.type === 'Venda' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {property.type}
                </span>
                <h3 className="text-xl font-semibold mt-3 mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-2">{property.location} • {property.area}</p>
                <p className="text-gray-700 mb-4">{property.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-700">
                    {property.type === 'Venda' 
                      ? `R$ ${property.price.toLocaleString()}`
                      : `R$ ${property.price}/mês`
                    }
                  </span>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
