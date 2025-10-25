// URL base da API. Será substituída no CI do GitHub Pages se o segredo PAGES_API_BASE estiver configurado.
// Em dev local, se não for substituída, cairá no fallback abaixo.
window.API_BASE = window.API_BASE || '__API_BASE__';
if (!window.API_BASE || window.API_BASE.includes('__API_BASE__')) {
  // Fallback local
  window.API_BASE = 'http://localhost:3001/api';
}
