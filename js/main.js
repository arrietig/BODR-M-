/* ============================================
   BODRÜM · main.js
   Nav, hero video rotation, reveal, services grid
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav scroll
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Nav mobile toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav__links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('is-open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('is-open')));
  }

  // Hero rotation (videos o slides de imagen)
  const slides = document.querySelectorAll('.hero__video, .hero__slide');
  if (slides.length > 1) {
    let current = 0;
    const rotate = () => {
      const next = (current + 1) % slides.length;
      slides[current].classList.remove('active');
      slides[next].classList.add('active');
      if (slides[next].tagName === 'VIDEO') {
        slides[next].currentTime = 0;
        slides[next].play().catch(() => {});
      }
      current = next;
    };
    setInterval(rotate, 6500);
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .section__head, .service-card').forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    io.observe(el);
  });

  // Services grid
  const grid = document.getElementById('servicesGrid');
  const filters = document.getElementById('servicesFilters');
  const renderServices = (cat = 'all') => {
    if (!grid) return;
    const list = cat === 'all' ? BODRUM_SERVICES : BODRUM_SERVICES.filter(s => s.cat === cat);
    grid.innerHTML = list.map(s => `
      <article class="service-card reveal" data-cat="${s.cat}">
        <div class="service-card__img" style="background-image:linear-gradient(135deg, rgba(230,211,196,0.6), rgba(217,179,165,0.6)), url('${s.img}'); background-size:cover; background-position:center;"></div>
        <div class="service-card__body">
          <h3 class="service-card__title">${s.name}</h3>
          <p class="service-card__desc">${s.desc}</p>
          <div class="service-card__meta">
            <span class="service-card__price">${BODRUM_FMT(s.price)}</span>
          </div>
        </div>
      </article>
    `).join('');
    grid.querySelectorAll('.reveal').forEach(el => io.observe(el));
  };
  renderServices();

  // Products grid
  const productsGrid = document.getElementById('productsGrid');
  if (productsGrid && typeof BODRUM_PRODUCTS !== 'undefined') {
    productsGrid.innerHTML = BODRUM_PRODUCTS.map(p => `
      <article class="product-card reveal">
        <div class="product-card__img" style="background-image:url('${p.img}')"></div>
        <div class="product-card__body">
          ${p.brand ? `<span class="product-card__brand">${p.brand}</span>` : ''}
          <h3 class="product-card__title">${p.name}</h3>
          <p class="product-card__desc">${p.desc}</p>
        </div>
      </article>
    `).join('');
    productsGrid.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  if (filters) {
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      filters.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderServices(btn.dataset.filter);
    });
  }
});
