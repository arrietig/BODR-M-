/* ============================================
   BODRÜM · booking.js
   Flujo de reserva en 3 pasos
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('bookingForm');
  if (!form) return;

  const state = {
    selectedServices: new Set(),
    specialistId: null,
  };

  // ---------- Horarios ----------
  const timeSelect = document.getElementById('bookingTime');
  const dateInput = document.getElementById('bookingDate');
  const today = new Date();
  dateInput.min = today.toISOString().split('T')[0];

  const fillTimes = () => {
    timeSelect.innerHTML = '<option value="">Selecciona una hora</option>';
    for (let h = 9; h <= 19; h++) {
      ['00', '30'].forEach(m => {
        if (h === 19 && m === '30') return;
        const t = `${String(h).padStart(2, '0')}:${m}`;
        timeSelect.insertAdjacentHTML('beforeend', `<option value="${t}">${t}</option>`);
      });
    }
  };
  fillTimes();

  // ---------- Picker de servicios ----------
  const picker = document.getElementById('servicesPicker');
  picker.innerHTML = BODRUM_SERVICES.map(s => `
    <label class="pick" data-id="${s.id}">
      <input type="checkbox" value="${s.id}" />
      <span class="pick__name">${s.name}</span>
      <span class="pick__price">${BODRUM_FMT(s.price)}</span>
    </label>
  `).join('');

  const summaryCount = document.getElementById('summaryCount');
  const summaryTotal = document.getElementById('summaryTotal');

  const updateSummary = () => {
    const list = BODRUM_SERVICES.filter(s => state.selectedServices.has(s.id));
    const total = list.reduce((a, s) => a + s.price, 0);
    summaryCount.textContent = `${list.length} servicio${list.length === 1 ? '' : 's'}`;
    summaryTotal.textContent = BODRUM_FMT(total);
  };

  picker.addEventListener('click', (e) => {
    const label = e.target.closest('.pick');
    if (!label) return;
    const id = label.dataset.id;
    const input = label.querySelector('input');
    // toggle visual
    setTimeout(() => {
      if (input.checked) {
        state.selectedServices.add(id);
        label.classList.add('is-selected');
      } else {
        state.selectedServices.delete(id);
        label.classList.remove('is-selected');
      }
      updateSummary();
    }, 0);
  });

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
  const steps = document.querySelectorAll('.booking__steps .step');

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
    const required = ['name', 'email', 'phone', 'date', 'time'];
    for (const n of required) {
      const f = form.elements[n];
      if (!f.value.trim()) {
        f.focus();
        alert(`Por favor completa el campo: ${f.previousElementSibling?.textContent || n}`);
        return false;
      }
    }
    if (state.selectedServices.size === 0) {
      alert('Selecciona al menos un servicio.');
      return false;
    }
    return true;
  };

  document.getElementById('toStep2').addEventListener('click', () => {
    if (validateStep1()) goTo(2);
  });

  document.getElementById('toStep3').addEventListener('click', () => {
    if (!state.specialistId) {
      alert('Elige una especialista (o selecciona "Sin preferencia").');
      return;
    }
    renderConfirm();
    goTo(3);
  });

  form.querySelectorAll('[data-back]').forEach(b => {
    b.addEventListener('click', () => goTo(Number(b.dataset.back)));
  });

  // ---------- Confirmación ----------
  const renderConfirm = () => {
    const data = new FormData(form);
    const services = BODRUM_SERVICES.filter(s => state.selectedServices.has(s.id));
    const total = services.reduce((a, s) => a + s.price, 0);
    const specialist = BODRUM_SPECIALISTS.find(p => p.id === state.specialistId);

    document.getElementById('confirmBox').innerHTML = `
      <h3>Revisa tu reserva</h3>
      <div class="confirm__row"><span>Nombre</span><strong>${data.get('name')}</strong></div>
      <div class="confirm__row"><span>Correo</span><strong>${data.get('email')}</strong></div>
      <div class="confirm__row"><span>Teléfono</span><strong>${data.get('phone')}</strong></div>
      <div class="confirm__row"><span>Fecha</span><strong>${data.get('date')}</strong></div>
      <div class="confirm__row"><span>Hora</span><strong>${data.get('time')}</strong></div>
      <div class="confirm__row"><span>Especialista</span><strong>${specialist.name}</strong></div>
      <div class="confirm__row"><span>Servicios</span><strong>${services.map(s => s.name).join(', ')}</strong></div>
      <div class="confirm__total"><span>Total</span><span>${BODRUM_FMT(total)}</span></div>
    `;
  };

  // ---------- Submit ----------
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // EmailJS se conectará después. Por ahora, confirmación visual.
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
      specGrid.querySelectorAll('.specialist').forEach(c => c.classList.remove('is-selected'));
      updateSummary();
      goTo(1);
    }, 900);
  });

});
