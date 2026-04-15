/* ========================================
   BODRUM | Booking System
   Sistema de reservas multi-paso
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Estado de la reserva --- */
  const booking = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    services: [],
    specialistId: null,
    total: 0
  };

  /* --- Referencias DOM --- */
  const steps = document.querySelectorAll('.booking-steps .step');
  const stepLines = document.querySelectorAll('.step-line');
  const panels = document.querySelectorAll('.booking-panel');
  const timeSlots = document.getElementById('timeSlots');
  const bookingServices = document.getElementById('bookingServices');
  const specialistsGrid = document.getElementById('specialistsGrid');
  const totalAmount = document.getElementById('totalAmount');

  /* --- Generar horarios (09:00 - 19:00 cada 30 min) --- */
  function generateTimeSlots() {
    let html = '';
    for (let h = 9; h < 19; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = String(h).padStart(2, '0');
        const min = String(m).padStart(2, '0');
        const time = `${hour}:${min}`;
        html += `<button type="button" class="time-slot" data-time="${time}">${time}</button>`;
      }
    }
    // Ultima hora 19:00
    html += `<button type="button" class="time-slot" data-time="19:00">19:00</button>`;
    timeSlots.innerHTML = html;

    timeSlots.addEventListener('click', (e) => {
      const slot = e.target.closest('.time-slot');
      if (!slot) return;
      timeSlots.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
      booking.time = slot.dataset.time;
    });
  }
  generateTimeSlots();

  /* --- Set min date a hoy --- */
  const dateInput = document.getElementById('bookDate');
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);

  /* --- Render servicios en booking --- */
  function renderBookingServices() {
    const services = window.BODRUM_SERVICES || [];
    bookingServices.innerHTML = services.map(s => `
      <div class="booking-service-item" data-id="${s.id}">
        <div class="booking-service-check">&#10003;</div>
        <div class="booking-service-info">
          <div class="booking-service-name">${s.name}</div>
          <div class="booking-service-detail">${s.duration} min</div>
        </div>
        <div class="booking-service-price">S/ ${s.price}</div>
      </div>
    `).join('');

    bookingServices.addEventListener('click', (e) => {
      const item = e.target.closest('.booking-service-item');
      if (!item) return;
      const id = parseInt(item.dataset.id);
      item.classList.toggle('selected');

      if (item.classList.contains('selected')) {
        booking.services.push(id);
      } else {
        booking.services = booking.services.filter(sid => sid !== id);
      }
      updateTotal();
    });
  }
  renderBookingServices();

  function updateTotal() {
    const services = window.BODRUM_SERVICES || [];
    booking.total = booking.services.reduce((sum, id) => {
      const s = services.find(srv => srv.id === id);
      return sum + (s ? s.price : 0);
    }, 0);
    totalAmount.textContent = `S/ ${booking.total.toFixed(2)}`;
  }

  /* --- Render especialistas --- */
  function renderSpecialists() {
    const specialists = window.BODRUM_SPECIALISTS || [];
    specialistsGrid.innerHTML = specialists.map(sp => `
      <div class="specialist-card" data-id="${sp.id}">
        <div class="specialist-avatar">
          <img src="${sp.img}" alt="${sp.name}" onerror="this.style.display='none'">
        </div>
        <div class="specialist-name">${sp.name}</div>
        <div class="specialist-role">${sp.role}</div>
      </div>
    `).join('');

    specialistsGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.specialist-card');
      if (!card) return;
      specialistsGrid.querySelectorAll('.specialist-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      booking.specialistId = parseInt(card.dataset.id);
    });
  }
  renderSpecialists();

  /* --- Navegacion entre pasos --- */
  function goToStep(stepNum) {
    // Actualizar indicadores
    steps.forEach((step, i) => {
      const num = i + 1;
      step.classList.remove('active', 'completed');
      if (num < stepNum) step.classList.add('completed');
      if (num === stepNum) step.classList.add('active');
    });

    stepLines.forEach((line, i) => {
      line.classList.toggle('active', i < stepNum - 1);
    });

    // Mostrar panel
    panels.forEach(p => p.classList.remove('active'));
    const targetPanel = document.getElementById(`bookingStep${stepNum}`);
    if (targetPanel) targetPanel.classList.add('active');
  }

  /* --- Validacion paso 1 --- */
  function validateStep1() {
    const name = document.getElementById('bookName').value.trim();
    const email = document.getElementById('bookEmail').value.trim();
    const phone = document.getElementById('bookPhone').value.trim();
    const date = document.getElementById('bookDate').value;
    const errors = [];

    // Limpiar errores previos
    document.querySelectorAll('.form-group input').forEach(i => i.classList.remove('error'));

    if (!name) { errors.push('name'); document.getElementById('bookName').classList.add('error'); }
    if (!email || !email.includes('@')) { errors.push('email'); document.getElementById('bookEmail').classList.add('error'); }
    if (!phone) { errors.push('phone'); document.getElementById('bookPhone').classList.add('error'); }
    if (!date) { errors.push('date'); document.getElementById('bookDate').classList.add('error'); }
    if (!booking.time) { errors.push('time'); }
    if (booking.services.length === 0) { errors.push('services'); }

    if (errors.length > 0) {
      let msg = 'Por favor completa: ';
      const labels = {
        name: 'Nombre', email: 'Correo', phone: 'Telefono',
        date: 'Fecha', time: 'Horario', services: 'al menos un servicio'
      };
      msg += errors.map(e => labels[e]).join(', ');
      alert(msg);
      return false;
    }

    booking.name = name;
    booking.email = email;
    booking.phone = phone;
    booking.date = date;
    return true;
  }

  /* --- Validacion paso 2 --- */
  function validateStep2() {
    if (!booking.specialistId) {
      alert('Por favor selecciona una especialista.');
      return false;
    }
    return true;
  }

  /* --- Llenar confirmacion --- */
  function fillConfirmation() {
    const services = window.BODRUM_SERVICES || [];
    const specialists = window.BODRUM_SPECIALISTS || [];
    const specialist = specialists.find(sp => sp.id === booking.specialistId);

    document.getElementById('confirmName').textContent = booking.name;
    document.getElementById('confirmEmail').textContent = booking.email;
    document.getElementById('confirmPhone').textContent = booking.phone;

    // Formatear fecha
    const [y, m, d] = booking.date.split('-');
    document.getElementById('confirmDate').textContent = `${d}/${m}/${y}`;
    document.getElementById('confirmTime').textContent = booking.time;
    document.getElementById('confirmSpecialist').textContent = specialist ? specialist.name : '-';

    // Servicios seleccionados
    const selectedServices = booking.services.map(id => services.find(s => s.id === id)).filter(Boolean);
    document.getElementById('confirmServices').innerHTML = selectedServices.map(s =>
      `<div class="confirm-service-item">
        <span>${s.name}</span>
        <span>S/ ${s.price.toFixed(2)}</span>
      </div>`
    ).join('');

    document.getElementById('confirmTotal').textContent = `S/ ${booking.total.toFixed(2)}`;
  }

  /* --- Event: Paso 1 → 2 --- */
  document.getElementById('btnToStep2').addEventListener('click', () => {
    if (validateStep1()) goToStep(2);
  });

  /* --- Event: Paso 2 → 1 --- */
  document.getElementById('btnBackStep1').addEventListener('click', () => goToStep(1));

  /* --- Event: Paso 2 → 3 --- */
  document.getElementById('btnToStep3').addEventListener('click', () => {
    if (validateStep2()) {
      fillConfirmation();
      goToStep(3);
    }
  });

  /* --- Event: Paso 3 → 2 --- */
  document.getElementById('btnBackStep2').addEventListener('click', () => goToStep(2));

  /* --- Event: Confirmar reserva --- */
  document.getElementById('btnConfirm').addEventListener('click', () => {
    const services = window.BODRUM_SERVICES || [];
    const specialists = window.BODRUM_SPECIALISTS || [];
    const specialist = specialists.find(sp => sp.id === booking.specialistId);

    // Crear objeto de reserva
    const reservation = {
      id: Date.now(),
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      date: booking.date,
      time: booking.time,
      specialist: specialist ? specialist.name : '',
      services: booking.services.map(id => {
        const s = services.find(srv => srv.id === id);
        return s ? { name: s.name, price: s.price } : null;
      }).filter(Boolean),
      total: booking.total,
      status: 'pendiente',
      createdAt: new Date().toISOString()
    };

    // Guardar en localStorage
    const reservations = JSON.parse(localStorage.getItem('bodrum_reservations') || '[]');
    reservations.push(reservation);
    localStorage.setItem('bodrum_reservations', JSON.stringify(reservations));

    // Mostrar exito
    document.getElementById('successEmail').textContent = booking.email;
    panels.forEach(p => p.classList.remove('active'));
    const successPanel = document.getElementById('bookingSuccess');
    successPanel.style.display = 'block';
    successPanel.classList.add('active');

    // Ocultar indicadores de paso
    document.querySelector('.booking-steps').style.opacity = '0.3';

    // --- EmailJS (descomentar y configurar) ---
    // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    //   to_name: booking.name,
    //   to_email: booking.email,
    //   phone: booking.phone,
    //   date: booking.date,
    //   time: booking.time,
    //   specialist: specialist ? specialist.name : '',
    //   services: reservation.services.map(s => s.name).join(', '),
    //   total: booking.total.toFixed(2)
    // });
  });

  /* --- Event: Nueva reserva --- */
  document.getElementById('btnNewBooking').addEventListener('click', () => {
    // Reset
    booking.name = '';
    booking.email = '';
    booking.phone = '';
    booking.date = '';
    booking.time = '';
    booking.services = [];
    booking.specialistId = null;
    booking.total = 0;

    document.getElementById('bookName').value = '';
    document.getElementById('bookEmail').value = '';
    document.getElementById('bookPhone').value = '';
    document.getElementById('bookDate').value = '';
    totalAmount.textContent = 'S/ 0.00';

    timeSlots.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
    bookingServices.querySelectorAll('.booking-service-item').forEach(s => s.classList.remove('selected'));
    specialistsGrid.querySelectorAll('.specialist-card').forEach(c => c.classList.remove('selected'));

    document.getElementById('bookingSuccess').style.display = 'none';
    document.querySelector('.booking-steps').style.opacity = '1';
    goToStep(1);
  });

});
