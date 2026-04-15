/* ========================================
   BODRUM | Main JS
   Navegacion, Hero, Scroll animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navegacion --- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll → navbar solido
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Hamburguesa mobile
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Cerrar menu al hacer click en link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id], .hero[id], footer[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height);
      }
    });
  });

  /* --- Hero Slideshow --- */
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;

  if (slides.length > 1) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 6000);
  }

  /* --- Hero Particles (Sparkles dorados) --- */
  const canvas = document.getElementById('heroParticles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 50;

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.3 - 0.2;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.fadeDir = Math.random() > 0.5 ? 1 : -1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.fadeDir * 0.005;
        if (this.opacity <= 0.1 || this.opacity >= 0.8) this.fadeDir *= -1;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
          this.y = canvas.height;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(182, 162, 82, ${this.opacity})`;
        ctx.fill();
        // Glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(182, 162, 82, ${this.opacity * 0.2})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* --- Scroll Reveal --- */
  const revealElements = document.querySelectorAll(
    '.service-card, .about-grid, .section-header, .booking-container, .footer-col'
  );
  revealElements.forEach(el => el.classList.add('scroll-reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));

  /* --- Counter Animation --- */
  const statNumbers = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current) + '+';
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  /* --- Servicios: Datos y render --- */
  window.BODRUM_SERVICES = [
    { id: 1, name: 'Manicure Clasica', category: 'unas', price: 25, duration: 30, desc: 'Limado, cutícula y esmaltado tradicional.' },
    { id: 2, name: 'Manicure Semipermanente', category: 'unas', price: 40, duration: 45, desc: 'Esmaltado en gel de larga duracion.' },
    { id: 3, name: 'Unas Acrilicas', category: 'unas', price: 60, duration: 90, desc: 'Extension y esculpido en acrilico.' },
    { id: 4, name: 'Diseno Nail Art', category: 'unas', price: 20, duration: 30, desc: 'Disenos personalizados sobre tus unas.' },
    { id: 5, name: 'Pedicure Clasica', category: 'unas', price: 30, duration: 40, desc: 'Tratamiento completo para tus pies.' },
    { id: 6, name: 'Pedicure Spa', category: 'unas', price: 50, duration: 60, desc: 'Pedicure con exfoliacion y masaje relajante.' },
    { id: 7, name: 'Limpieza Facial', category: 'facial', price: 55, duration: 60, desc: 'Limpieza profunda y tonificacion facial.' },
    { id: 8, name: 'Hidratacion Facial', category: 'facial', price: 65, duration: 50, desc: 'Tratamiento hidratante con mascarilla premium.' },
    { id: 9, name: 'Extension de Pestanas', category: 'pestanas', price: 70, duration: 90, desc: 'Pestanas pelo a pelo para una mirada impactante.' },
    { id: 10, name: 'Lifting de Pestanas', category: 'pestanas', price: 45, duration: 50, desc: 'Curvado y tinte para pestanas naturales.' },
    { id: 11, name: 'Depilacion Facial', category: 'depilacion', price: 15, duration: 15, desc: 'Depilacion con cera en rostro.' },
    { id: 12, name: 'Depilacion Corporal', category: 'depilacion', price: 35, duration: 30, desc: 'Depilacion con cera en zonas del cuerpo.' },
    { id: 13, name: 'Diseno de Cejas', category: 'cejas', price: 20, duration: 20, desc: 'Perfilado y diseno de cejas profesional.' },
    { id: 14, name: 'Tinte de Cejas', category: 'cejas', price: 15, duration: 15, desc: 'Coloracion semi-permanente para cejas.' },
    { id: 15, name: 'Laminado de Cejas', category: 'cejas', price: 40, duration: 40, desc: 'Alisado y fijacion para cejas perfectas.' },
  ];

  const CATEGORY_LABELS = {
    unas: 'Unas', facial: 'Facial', pestanas: 'Pestanas',
    depilacion: 'Depilacion', cejas: 'Cejas'
  };

  // Render service cards
  const servicesGrid = document.getElementById('servicesGrid');
  function renderServices(filter = 'all') {
    const filtered = filter === 'all'
      ? window.BODRUM_SERVICES
      : window.BODRUM_SERVICES.filter(s => s.category === filter);

    servicesGrid.innerHTML = filtered.map(s => `
      <div class="service-card scroll-reveal visible" data-category="${s.category}">
        <div class="service-card-img">
          <img src="assets/img/service-${s.category}.jpg" alt="${s.name}"
               onerror="this.style.display='none'">
        </div>
        <div class="service-card-body">
          <span class="service-card-category">${CATEGORY_LABELS[s.category]}</span>
          <h3 class="service-card-name">${s.name}</h3>
          <p class="service-card-desc">${s.desc}</p>
          <div class="service-card-footer">
            <span class="service-card-price">S/ ${s.price}</span>
            <span class="service-card-duration">${s.duration} min</span>
          </div>
        </div>
      </div>
    `).join('');
  }
  renderServices();

  // Filtros
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderServices(btn.dataset.filter);
    });
  });

  /* --- Especialistas datos --- */
  window.BODRUM_SPECIALISTS = [
    { id: 1, name: 'Ana Garcia', role: 'Especialista en Unas', img: 'assets/img/specialist-1.jpg' },
    { id: 2, name: 'Maria Lopez', role: 'Especialista Facial', img: 'assets/img/specialist-2.jpg' },
    { id: 3, name: 'Carmen Rodriguez', role: 'Pestanas y Cejas', img: 'assets/img/specialist-3.jpg' },
    { id: 4, name: 'Laura Martinez', role: 'Depilacion y Cejas', img: 'assets/img/specialist-4.jpg' },
  ];

});
