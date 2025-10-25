// Novatte Portal - Static Version for GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    console.log('Novatte Portal - Static Version Loaded');
    
    // Dados MOCK para imóveis
    const properties = [
        {
            id: 1,
            title: "Casa com Piscina no Centro",
            description: "Excelente oportunidade! Casa com 4 quartos e área de lazer completa.",
            price: 650000,
            type: "Venda",
            location: "Santo Antônio de Pádua",
            area: "320 m²",
            image: "./img/sample-house-1.jpg"
        },
        {
            id: 2,
            title: "Apartamento 2 Quartos",
            description: "Apartamento bem localizado, com 2 quartos e varanda gourmet.",
            price: 1200,
            type: "Aluguel", 
            location: "Itaperuna",
            area: "85 m²",
            image: "./img/sample-apartment-1.jpg"
        }
    ];

    // Função para carregar imóveis
    function loadProperties() {
        const propertiesGrid = document.getElementById('properties-grid');
        const featuredProperties = document.getElementById('featured-properties');
        
        if (propertiesGrid) {
            propertiesGrid.innerHTML = properties.map(property => `
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="${property.image}" alt="${property.title}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <span class="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">${property.type}</span>
                        <h3 class="font-semibold mt-2">${property.title}</h3>
                        <p class="text-gray-600 text-sm mt-1">${property.location} • ${property.area}</p>
                        <p class="text-gray-700 mt-2">${property.description}</p>
                        <div class="mt-3 flex justify-between items-center">
                            <span class="text-lg font-bold text-green-700">${property.type === 'Venda' ? 'R$ ' + property.price.toLocaleString() : 'R$ ' + property.price + '/mês'}</span>
                            <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Ver Detalhes</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Carregar dados
    loadProperties();

    // Remover mensagens de erro
    const errorElements = document.querySelectorAll('[id*="error"]');
    errorElements.forEach(el => el.style.display = 'none');
});
