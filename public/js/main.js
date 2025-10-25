document.addEventListener('DOMContentLoaded', function() {
  initMainAd();
  initHighlightsCarousel();
  setupTabNavigation();
});

function initMainAd() {
  const adMain = document.querySelector('.ad-main');
  if (!adMain) return;
  const slides = adMain.querySelectorAll('.ad-slide');
  const dots = adMain.querySelectorAll('.ad-dot');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
  setInterval(() => {
    let next = currentSlide + 1;
    if (next >= slides.length) next = 0;
    showSlide(next);
  }, 5000);
}

function initHighlightsCarousel() {
  const carousel = document.querySelector('.highlights-carousel');
  if (!carousel) return;
  const slides = carousel.querySelectorAll('.highlight-slide');
  const dots = carousel.querySelectorAll('.highlight-dot');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
  setInterval(() => {
    let next = currentSlide + 1;
    if (next >= slides.length) next = 0;
    showSlide(next);
  }, 6000);
}

function setupTabNavigation() {
  const tabs = document.querySelectorAll('.portal-tab');
  const contents = document.querySelectorAll('.portal-content');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      if (!target) return;
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const el = document.getElementById(`${target}-content`);
      if (el) el.classList.add('active');
    });
  });
}
