/* ============================================
   BODRÜM · booking.js
   Flujo de reserva en 3 pasos con acordeón de servicios
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('bookingForm');
  if (!form) return;

  const state = {
    selectedServices: new Map(), // id → { name, price }
    specialistId: null,
  };

  // ---------- Horarios ----------
  const timeSelect = document.getElementById('bookingTime');
  const dateInput  = document.getElementById('bookingDate');
  dateInput.min    = new Date().toISOString().split('T')[0];

  for (let h = 9; h <= 19; h++) {
    ['00', '30'].forEach(m => {
      if (h === 19 && m === '30') return;
      const t = `${String(h).padStart(2, '0')}:${m}`;
      timeSelect.insertAdjacentHTML('beforeend', `<option value="${t}">${t}</option>`);
    });
  }

  // ---------- Picker de servicios (acordeón por categoría) ----------
  const picker = document.getElementById('servicesPicker');

  // Aplanar BODRUM_MENU en servicios seleccionables (con precio)
  const allMenuItems = [];
  BODRUM_MENU.forEach(cat => {
    cat.groups.forEach(group => {
      group.items.forEach(item => {
        if (item.price) {
          allMenuItems.push({
            id: `${cat.id}-${allMenuItems.length}`,
            cat: cat.id,
            catTitle: cat.title,
            group: group.label || cat.title,
            name: item.name,
            price: item.price,
          });
        }
      });
    });
  });

  // Construir acordeón por categoría
  const cats = BODRUM_MENU.filter(c => c.id !== 'micropig' || true);
  picker.innerHTML = cats.map(cat => {
    const items = allMenuItems.filter(i => i.cat === cat.id);
    if (!items.length) return '';
    const rows = items.map(item => `
      <label class="pick" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
        <input type="checkbox" value="${item.id}" />
        <span class="pick__name">${item.name}</span>
        <span class="pick__price">${BODRUM_FMT(item.price)}</span>
      </label>
    `).join('');
    return `
      <div class="pick-group">
        <button type="button" class="pick-group__header" aria-expanded="false">
          <span>${cat.title}</span>
          <svg class="pick-group__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="pick-group__body"><div class="pick-items">${rows}</div></div>
      </div>`;
  }).join('');

  // Toggle acordeón
  picker.addEventListener('click', (e) => {
    const header = e.target.closest('.pick-group__header');
    if (header) {
      const group = header.closest('.pick-group');
      const isOpen = group.classList.contains('is-open');
      picker.querySelectorAll('.pick-group').forEach(g => g.classList.remove('is-open'));
      picker.querySelectorAll('.pick-group__header').forEach(h => h.setAttribute('aria-expanded','false'));
      if (!isOpen) {
        group.classList.add('is-open');
        header.setAttribute('aria-expanded', 'true');
      }
      return;
    }

    // Toggle selección de servicio
    const label = e.target.closest('.pick');
    if (!label) return;
    const id    = label.dataset.id;
    const input = label.querySelector('input');
    setTimeout(() => {
      if (input.checked) {
        state.selectedServices.set(id, { name: label.dataset.name, price: Number(label.dataset.price) });
        label.classList.add('is-selected');
      } else {
        state.selectedServices.delete(id);
        label.classList.remove('is-selected');
      }
      updateSummary();
    }, 0);
  });

  // ---------- Resumen ----------
  const summaryCount = document.getElementById('summaryCount');
  const summaryTotal = document.getElementById('summaryTotal');

  const updateSummary = () => {
    const total = [...state.selectedServices.values()].reduce((a, s) => a + s.price, 0);
    summaryCount.textContent = `${state.selectedServices.size} servicio${state.selectedServices.size === 1 ? '' : 's'}`;
    summaryTotal.textContent = BODRUM_FMT(total) || 'Gs. 0';
  };

  // ---------- Especialistas ----------
  const specGrid = document.getElementById('specialistsGrid');
  specGrid.innerHTML = BODRUM_SPECIALISTS.map(p => `
    <div class="specialist" data-id="${p.id}">
      <div class="specialist__avatar" ${p.avatar ? `style="background-image:url('${p.avatar}')"` : ''}></div>
      <h4 class="specialist__name">${p.name}</h4>
      <p class="specialist__role">${p.role}</p>
    </div>
  `).join('');

  specGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.specialist');
    if (!card) return;
    specGrid.querySelectorAll('.specialist').forEach(c => c.classList.remove('is-selected'));
    card.classList.add('is-selected');
    state.specialistId = card.dataset.id;
  });

  // ---------- Navegación de pasos ----------
  const panels = form.querySelectorAll('.booking__panel');
  const steps  = document.querySelectorAll('.booking__steps .step');

  const goTo = (n) => {
    panels.forEach(p => p.classList.toggle('is-active', Number(p.dataset.panel) === n));
    steps.forEach(s => {
      const num = Number(s.dataset.step);
      s.classList.toggle('is-active', num === n);
      s.classList.toggle('is-done', num < n);
    });
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const validateStep1 = () => {
    for (const n of ['name', 'email', 'phone', 'date', 'time']) {
      const f = form.elements[n];
      if (!f.value.trim()) { f.focus(); alert(`Por favor completá el campo: ${f.previousElementSibling?.textContent || n}`); return false; }
    }
    if (state.selectedServices.size === 0) { alert('Seleccioná al menos un servicio.'); return false; }
    return true;
  };

  document.getElementById('toStep2').addEventListener('click', () => { if (validateStep1()) goTo(2); });

  document.getElementById('toStep3').addEventListener('click', () => {
    if (!state.specialistId) { alert('Elegí una especialista (o "Sin preferencia").'); return; }
    renderConfirm(); goTo(3);
  });

  form.querySelectorAll('[data-back]').forEach(b => b.addEventListener('click', () => goTo(Number(b.dataset.back))));

  // ---------- Confirmación ----------
  const renderConfirm = () => {
    const data      = new FormData(form);
    const services  = [...state.selectedServices.values()];
    const total     = services.reduce((a, s) => a + s.price, 0);
    const specialist = BODRUM_SPECIALISTS.find(p => p.id === state.specialistId);
    document.getElementById('confirmBox').innerHTML = `
      <h3>Revisá tu reserva</h3>
      <div class="confirm__row"><span>Nombre</span><strong>${data.get('name')}</strong></div>
      <div class="confirm__row"><span>Correo</span><strong>${data.get('email')}</strong></div>
      <div class="confirm__row"><span>Teléfono</span><strong>${data.get('phone')}</strong></div>
      <div class="confirm__row"><span>Fecha</span><strong>${data.get('date')}</strong></div>
      <div class="confirm__row"><span>Hora</span><strong>${data.get('time')}</strong></div>
      <div class="confirm__row"><span>Especialista</span><strong>${specialist.name}</strong></div>
      <div class="confirm__row"><span>Servicios</span><strong>${services.map(s => s.name).join(', ')}</strong></div>
      <div class="confirm__total"><span>Total</span><span>${BODRUM_FMT(total)}</span></div>`;
  };

  // ---------- Submit ----------
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('confirmBtn');
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    setTimeout(() => {
      alert('✓ ¡Reserva registrada! Pronto te contactaremos para confirmar.\n\n(EmailJS se conectará en una siguiente fase).');
      btn.textContent = 'Confirmar reserva';
      btn.disabled = false;
      form.reset();
      state.selectedServices.clear();
      state.specialistId = null;
      picker.querySelectorAll('.pick').forEach(p => p.classList.remove('is-selected'));
      picker.querySelectorAll('input[type=checkbox]').forEach(cb => cb.checked = false);
      specGrid.querySelectorAll('.specialist').forEach(c => c.classList.remove('is-selected'));
      updateSummary();
      goTo(1);
    }, 900);
  });

});
