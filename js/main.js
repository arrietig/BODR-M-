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

  // ---- MENU GRID (acordeón de servicios) ----
  const menuGrid = document.getElementById('menuGrid');
  if (menuGrid && typeof BODRUM_MENU !== 'undefined') {
    let openId = null;

    const buildPanel = (cat) => {
      const groups = cat.groups.map(g => `
        <div class="price-group">
          ${g.label ? `<p class="price-group__label">${g.label}</p>` : ''}
          ${g.note  ? `<p class="price-group__note">* ${g.note}</p>` : ''}
          ${g.items.map(item => `
            <div class="price-row">
              <div>
                <div class="price-row__name">${item.name}</div>
                ${item.desc ? `<div class="price-row__desc">${item.desc}</div>` : ''}
              </div>
              <span class="price-row__price">${BODRUM_FMT(item.price)}</span>
            </div>
          `).join('')}
        </div>
      `).join('');
      return `
        <div class="menu-panel-wrap" id="panel-${cat.id}">
          <div class="menu-panel">
            <button class="menu-panel__close" data-close="${cat.id}">✕ &nbsp;Cerrar</button>
            ${groups}
          </div>
        </div>`;
    };

    BODRUM_MENU.forEach((cat, i) => {
      const card = document.createElement('div');
      card.className = 'menu-card reveal';
      card.dataset.id = cat.id;
      card.innerHTML = `
        <div class="menu-card__bg" style="background-image:url('${cat.img}')"></div>
        <div class="menu-card__overlay"></div>
        <div class="menu-card__label">
          <h3 class="menu-card__title">${cat.title}</h3>
          <span class="menu-card__hint">Ver precios</span>
        </div>`;
      menuGrid.appendChild(card);
      io.observe(card);

      // Panel va después de cada fila de 3 (col 3, 6, etc.) o al final
      const isLastInRow = (i + 1) % 3 === 0 || i === BODRUM_MENU.length - 1;
      if (isLastInRow) {
        const wrap = document.createElement('div');
        wrap.innerHTML = buildPanel(cat);
        // append panel placeholder for this row
        menuGrid.appendChild(wrap.firstElementChild);
        // pero necesitamos paneles para todos los de la fila
      }
    });

    // Rehacemos: insertar un panel por cada card, ocultar/mostrar con JS
    menuGrid.innerHTML = '';
    BODRUM_MENU.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'menu-card reveal';
      card.dataset.id = cat.id;
      card.innerHTML = `
        <div class="menu-card__bg" style="background-image:url('${cat.img}')"></div>
        <div class="menu-card__overlay"></div>
        <div class="menu-card__label">
          <h3 class="menu-card__title">${cat.title}</h3>
          <span class="menu-card__hint">Ver precios</span>
        </div>`;
      menuGrid.appendChild(card);
      io.observe(card);
    });

    // Un único panel reutilizable
    const panelWrap = document.createElement('div');
    panelWrap.className = 'menu-panel-wrap';
    panelWrap.id = 'menuPanelWrap';
    panelWrap.style.gridColumn = '1 / -1';
    panelWrap.innerHTML = '<div class="menu-panel" id="menuPanelInner"></div>';
    menuGrid.appendChild(panelWrap);

    const panelInner = panelWrap.querySelector('#menuPanelInner');

    const openPanel = (cat) => {
      const groups = cat.groups.map(g => `
        <div class="price-group">
          ${g.label ? `<p class="price-group__label">${g.label}</p>` : ''}
          ${g.note  ? `<p class="price-group__note">* ${g.note}</p>` : ''}
          ${g.items.map(item => `
            <div class="price-row">
              <div>
                <div class="price-row__name">${item.name}</div>
                ${item.desc ? `<div class="price-row__desc">${item.desc}</div>` : ''}
              </div>
              <span class="price-row__price">${BODRUM_FMT(item.price)}</span>
            </div>
          `).join('')}
        </div>
      `).join('');
      panelInner.innerHTML = `
        <button class="menu-panel__close" id="menuPanelClose">✕ &nbsp;Cerrar</button>
        ${groups}`;
      document.getElementById('menuPanelClose').addEventListener('click', closePanel);
      // Mover panel después de la fila de la card activa
      const cards = [...menuGrid.querySelectorAll('.menu-card')];
      const idx = cards.findIndex(c => c.dataset.id === cat.id);
      const rowLast = cards[Math.min(idx + (2 - idx % 3), cards.length - 1)];
      rowLast.after(panelWrap);
      panelWrap.classList.add('is-open');
      setTimeout(() => panelWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
    };

    const closePanel = () => {
      panelWrap.classList.remove('is-open');
      menuGrid.querySelectorAll('.menu-card').forEach(c => c.classList.remove('is-open'));
      openId = null;
    };

    menuGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.menu-card');
      if (!card) return;
      const id = card.dataset.id;
      menuGrid.querySelectorAll('.menu-card').forEach(c => c.classList.remove('is-open'));
      if (openId === id) { closePanel(); return; }
      openId = id;
      card.classList.add('is-open');
      const cat = BODRUM_MENU.find(c => c.id === id);
      openPanel(cat);
    });
  }

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
