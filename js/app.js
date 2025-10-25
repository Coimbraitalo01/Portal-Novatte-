document.addEventListener('DOMContentLoaded', () => {
  initMainAd();
  initHighlightsCarousel();
  bindTabNav();
  bindFilters();
  bindJobsFilters();
  bindEventsFilters();
  bindServicesFilters();
  bindCompaniesFilters();
  loadProperties();
  loadJobs();
  loadEvents();
  loadServices();
  loadCompanies();
});

function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

function bindTabNav() {
  const tabs = qsa('.portal-tab');
  const sections = {
    portal: qs('#portal-content'),
    imoveis: qs('#portal-content'),
    vagas: qs('#vagas-content'),
    eventos: qs('#eventos-content'),
    servicos: qs('#servicos-content'),
    empresas: qs('#empresas-content'),
  };
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      qsa('.portal-content').forEach(c => c.classList.remove('active'));
      if (sections[key]) sections[key].classList.add('active');
      if (key === 'imoveis') loadProperties();
      if (key === 'vagas') loadJobs();
      if (key === 'eventos') loadEvents();
      if (key === 'servicos') loadServices();
      if (key === 'empresas') loadCompanies();
    });
  });
}

function bindFilters() {
  const form = qs('#filters');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    loadProperties();
  });
}

function bindJobsFilters() {
  const form = qs('#jobs-filters');
  if (!form) return;
  form.addEventListener('submit', (e) => { e.preventDefault(); loadJobs(); });
}

function bindEventsFilters() {
  const form = qs('#events-filters');
  if (!form) return;
  form.addEventListener('submit', (e) => { e.preventDefault(); loadEvents(); });
}

function bindServicesFilters() {
  const form = qs('#services-filters');
  if (!form) return;
  form.addEventListener('submit', (e) => { e.preventDefault(); loadServices(); });
}

function bindCompaniesFilters() {
  const form = qs('#companies-filters');
  if (!form) return;
  form.addEventListener('submit', (e) => { e.preventDefault(); loadCompanies(); });
}

async function loadProperties() {
  const grid = qs('#grid');
  const form = qs('#filters');
  if (!grid) return;

  const params = new URLSearchParams(new FormData(form || document.createElement('form')));
  const url = `${window.API_BASE}/imoveis?${params.toString()}`;

  grid.innerHTML = '<div class="text-sm text-gray-600">Carregando imóveis...</div>';
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('Falha ao buscar dados');
    const data = await res.json();
    renderProperties(grid, data.items || []);
  } catch (err) {
    grid.innerHTML = '<div class="text-sm text-red-600">Erro ao carregar imóveis. Verifique a API_BASE em preview/js/config.js</div>';
  }
}

function renderProperties(grid, items) {
  if (!items.length) {
    grid.innerHTML = '<div class="text-sm text-gray-600">Nenhum imóvel encontrado.</div>';
    return;
  }
  grid.innerHTML = items.map(p => cardHtml(p)).join('');
}

function cardHtml(p) {
  const price = `R$ ${p.price}${p.status==='Aluguel' ? '/mês' : ''}`;
  const city = p.city || '';
  const area = p.area || '-';
  return `
  <div class="card">
    <div class="card-image">
      <div class="card-badge">${p.status}</div>
      <i class="fas fa-home text-3xl"></i>
    </div>
    <div class="card-content">
      <h3 class="card-title">${p.title}</h3>
      <div class="card-meta">
        <span><i class="fas fa-map-marker-alt mr-1"></i> ${city}</span>
        <span><i class="fas fa-ruler-combined mr-1"></i> ${area} m²</span>
      </div>
      <p class="card-description">${p.description || ''}</p>
      <div class="card-footer">
        <div class="card-price">${price}</div>
        <div class="card-actions">
          <a class="btn btn-primary" href="#" onclick="alert('Abra a versão completa para ver detalhes: '+location.origin)">Ver Detalhes</a>
        </div>
      </div>
    </div>
  </div>`;
}

async function loadJobs() {
  const grid = qs('#jobs-grid');
  const form = qs('#jobs-filters');
  if (!grid) return;
  const params = new URLSearchParams(new FormData(form || document.createElement('form')));
  grid.innerHTML = '<div class="text-sm text-gray-600">Carregando vagas...</div>';
  try {
    const res = await fetch(`${window.API_BASE}/vagas?${params}`, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('fail');
    const data = await res.json();
    if (!data.items?.length) return grid.innerHTML = '<div class="text-sm text-gray-600">Nenhuma vaga encontrada.</div>';
    grid.innerHTML = data.items.map(j => `
      <div class=\"card\">
        <div class=\"card-image\" style=\"background-color:#e0f2fe\"><div class=\"card-badge\">${j.type||'-'}</div><i class=\"fas fa-user-tie text-3xl\" style=\"color:#0369a1;\"></i></div>
        <div class=\"card-content\">
          <h3 class=\"card-title\">${j.title}</h3>
          <div class=\"card-meta\"><span><i class=\"fas fa-building mr-1\"></i> ${j.company||''}</span><span><i class=\"fas fa-map-marker-alt mr-1\"></i> ${j.city||''}</span></div>
          <p class=\"card-description\">${j.description||''}</p>
          <div class=\"card-footer\"><div class=\"card-price\">${j.salary||'A combinar'}</div><div class=\"card-actions\"><a class=\"btn btn-primary\" href=\"#\">Ver Detalhes</a></div></div>
        </div>
      </div>`).join('');
  } catch (e) {
    grid.innerHTML = '<div class="text-sm text-red-600">Erro ao carregar vagas.</div>';
  }
}

async function loadEvents() {
  const grid = qs('#events-grid');
  const form = qs('#events-filters');
  if (!grid) return;
  const params = new URLSearchParams(new FormData(form || document.createElement('form')));
  grid.innerHTML = '<div class="text-sm text-gray-600">Carregando eventos...</div>';
  try {
    const res = await fetch(`${window.API_BASE}/eventos?${params}`, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('fail');
    const data = await res.json();
    if (!data.items?.length) return grid.innerHTML = '<div class="text-sm text-gray-600">Nenhum evento encontrado.</div>';
    grid.innerHTML = data.items.map(e => `
      <div class=\"card\">
        <div class=\"card-image\" style=\"background-color:#f3e8ff\"><div class=\"card-badge\">${e.price||'-'}</div><i class=\"fas fa-music text-3xl\" style=\"color:#7e22ce;\"></i></div>
        <div class=\"card-content\">
          <h3 class=\"card-title\">${e.title}</h3>
          <div class=\"card-meta\"><span><i class=\"fas fa-map-marker-alt mr-1\"></i> ${e.local||''} - ${e.city||''}</span><span><i class=\"fas fa-calendar mr-1\"></i> ${e.date||''}</span></div>
          <p class=\"card-description\">${e.description||''}</p>
          <div class=\"card-footer\"><div class=\"card-actions\"><a class=\"btn btn-primary\" href=\"#\">Ver Detalhes</a></div></div>
        </div>
      </div>`).join('');
  } catch (e) {
    grid.innerHTML = '<div class="text-sm text-red-600">Erro ao carregar eventos.</div>';
  }
}

async function loadServices() {
  const grid = qs('#services-grid');
  const form = qs('#services-filters');
  if (!grid) return;
  const params = new URLSearchParams(new FormData(form || document.createElement('form')));
  grid.innerHTML = '<div class="text-sm text-gray-600">Carregando serviços...</div>';
  try {
    const res = await fetch(`${window.API_BASE}/servicos?${params}`, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('fail');
    const data = await res.json();
    if (!data.items?.length) return grid.innerHTML = '<div class="text-sm text-gray-600">Nenhum serviço encontrado.</div>';
    grid.innerHTML = data.items.map(s => `
      <div class=\"card\">
        <div class=\"card-image\" style=\"background-color:#e0f2fe\"><div class=\"card-badge\">${s.category||'-'}</div><i class=\"fas fa-wrench text-3xl\" style=\"color:#0369a1;\"></i></div>
        <div class=\"card-content\">
          <h3 class=\"card-title\">${s.title}</h3>
          <p class=\"card-description\">${s.description||''}</p>
          <div class=\"card-footer\"><div class=\"card-actions\"><a class=\"btn btn-primary\" href=\"#\">Ver Detalhes</a></div></div>
        </div>
      </div>`).join('');
  } catch (e) {
    grid.innerHTML = '<div class="text-sm text-red-600">Erro ao carregar serviços.</div>';
  }
}

async function loadCompanies() {
  const grid = qs('#companies-grid');
  const form = qs('#companies-filters');
  if (!grid) return;
  const params = new URLSearchParams(new FormData(form || document.createElement('form')));
  grid.innerHTML = '<div class="text-sm text-gray-600">Carregando empresas...</div>';
  try {
    const res = await fetch(`${window.API_BASE}/empresas?${params}`, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('fail');
    const data = await res.json();
    if (!data.items?.length) return grid.innerHTML = '<div class="text-sm text-gray-600">Nenhuma empresa encontrada.</div>';
    grid.innerHTML = data.items.map(c => `
      <div class=\"card\">
        <div class=\"card-image\" style=\"background-color:#dbeafe\"><i class=\"fas fa-store text-3xl\" style=\"color:#1d4ed8;\"></i></div>
        <div class=\"card-content\">
          <h3 class=\"card-title\">${c.name}</h3>
          <div class=\"card-meta\"><span><i class=\"fas fa-map-marker-alt mr-1\"></i> ${c.city||''}</span><span><i class=\"fas fa-phone mr-1\"></i> ${c.phone||''}</span></div>
          <p class=\"card-description\">${c.description||''}</p>
          <div class=\"card-footer\"><div class=\"card-actions\"><a class=\"btn btn-primary\" href=\"#\">Ver Detalhes</a></div></div>
        </div>
      </div>`).join('');
  } catch (e) {
    grid.innerHTML = '<div class="text-sm text-red-600">Erro ao carregar empresas.</div>';
  }
}

function initMainAd() {
  const adMain = qs('.ad-main');
  if (!adMain) return;
  const slides = adMain.querySelectorAll('.ad-slide');
  const dots = adMain.querySelectorAll('.ad-dot');
  let currentSlide = 0;
  const showSlide = (i) => { slides.forEach(s=>s.classList.remove('active')); dots.forEach(d=>d.classList.remove('active')); slides[i].classList.add('active'); dots[i].classList.add('active'); currentSlide=i; };
  dots.forEach((d,i)=>d.addEventListener('click',()=>showSlide(i)));
  setInterval(()=>{ let n=currentSlide+1; if(n>=slides.length)n=0; showSlide(n); }, 5000);
}

function initHighlightsCarousel() {
  const car = qs('.highlights-carousel');
  if (!car) return;
  const slides = car.querySelectorAll('.highlight-slide');
  const dots = car.querySelectorAll('.highlight-dot');
  let currentSlide = 0;
  const showSlide = (i) => { slides.forEach(s=>s.classList.remove('active')); dots.forEach(d=>d.classList.remove('active')); slides[i].classList.add('active'); dots[i].classList.add('active'); currentSlide=i; };
  dots.forEach((d,i)=>d.addEventListener('click',()=>showSlide(i)));
}
