/* ========================================
   BODRUM | Admin Dashboard
   Gestion de reservas
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Contrasena admin (cambiar en produccion)
  const ADMIN_PASS = 'bodrum2025';

  const loginSection = document.getElementById('adminLogin');
  const dashboard = document.getElementById('adminDashboard');
  const passInput = document.getElementById('adminPass');
  const loginError = document.getElementById('loginError');

  /* --- Login --- */
  function checkSession() {
    if (sessionStorage.getItem('bodrum_admin') === 'true') {
      showDashboard();
    }
  }
  checkSession();

  document.getElementById('btnLogin').addEventListener('click', doLogin);
  passInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doLogin(); });

  function doLogin() {
    if (passInput.value === ADMIN_PASS) {
      sessionStorage.setItem('bodrum_admin', 'true');
      loginError.style.display = 'none';
      showDashboard();
    } else {
      loginError.style.display = 'block';
    }
  }

  document.getElementById('btnLogout').addEventListener('click', () => {
    sessionStorage.removeItem('bodrum_admin');
    dashboard.style.display = 'none';
    loginSection.style.display = 'flex';
    passInput.value = '';
  });

  function showDashboard() {
    loginSection.style.display = 'none';
    dashboard.style.display = 'block';
    loadReservations();
  }

  /* --- Reservas --- */
  function getReservations() {
    return JSON.parse(localStorage.getItem('bodrum_reservations') || '[]');
  }

  function saveReservations(data) {
    localStorage.setItem('bodrum_reservations', JSON.stringify(data));
  }

  function loadReservations() {
    const all = getReservations();
    const filterDate = document.getElementById('filterDate').value;
    const filterStatus = document.getElementById('filterStatus').value;

    let filtered = all;
    if (filterDate) filtered = filtered.filter(r => r.date === filterDate);
    if (filterStatus !== 'all') filtered = filtered.filter(r => r.status === filterStatus);

    // Ordenar por fecha y hora (mas reciente primero)
    filtered.sort((a, b) => {
      const da = `${a.date} ${a.time}`;
      const db = `${b.date} ${b.time}`;
      return db.localeCompare(da);
    });

    updateStats(all);
    renderTable(filtered);
  }

  function updateStats(all) {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('statToday').textContent = all.filter(r => r.date === today).length;
    document.getElementById('statPending').textContent = all.filter(r => r.status === 'pendiente').length;
    document.getElementById('statConfirmed').textContent = all.filter(r => r.status === 'confirmada').length;
    document.getElementById('statTotal').textContent = all.length;
  }

  function renderTable(reservations) {
    const tbody = document.getElementById('reservationsBody');
    const empty = document.getElementById('adminEmpty');

    if (reservations.length === 0) {
      tbody.innerHTML = '';
      empty.style.display = 'block';
      return;
    }

    empty.style.display = 'none';
    tbody.innerHTML = reservations.map(r => {
      const [y, m, d] = r.date.split('-');
      const dateStr = `${d}/${m}/${y}`;
      const serviceNames = r.services.map(s => s.name).join(', ');

      return `
        <tr>
          <td>${dateStr}</td>
          <td>${r.time}</td>
          <td>
            <strong>${r.name}</strong><br>
            <small style="color:var(--cream-dk)">${r.email}</small>
          </td>
          <td>${r.phone}</td>
          <td><small>${serviceNames}</small></td>
          <td>${r.specialist}</td>
          <td><strong>S/ ${r.total.toFixed(2)}</strong></td>
          <td><span class="status-badge status-${r.status}">${r.status}</span></td>
          <td>
            <div class="admin-actions-cell">
              ${r.status === 'pendiente' ? `
                <button class="admin-action-btn confirm-btn" onclick="updateStatus(${r.id}, 'confirmada')">Confirmar</button>
                <button class="admin-action-btn cancel-btn" onclick="updateStatus(${r.id}, 'cancelada')">Cancelar</button>
              ` : ''}
              ${r.status === 'confirmada' ? `
                <button class="admin-action-btn confirm-btn" onclick="updateStatus(${r.id}, 'completada')">Completar</button>
                <button class="admin-action-btn cancel-btn" onclick="updateStatus(${r.id}, 'cancelada')">Cancelar</button>
              ` : ''}
              ${r.status === 'cancelada' || r.status === 'completada' ? `
                <button class="admin-action-btn" onclick="deleteReservation(${r.id})">Eliminar</button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  /* --- Acciones globales --- */
  window.updateStatus = function(id, newStatus) {
    const all = getReservations();
    const idx = all.findIndex(r => r.id === id);
    if (idx !== -1) {
      all[idx].status = newStatus;
      saveReservations(all);
      loadReservations();
    }
  };

  window.deleteReservation = function(id) {
    if (!confirm('Eliminar esta reserva?')) return;
    const all = getReservations().filter(r => r.id !== id);
    saveReservations(all);
    loadReservations();
  };

  /* --- Filtros --- */
  document.getElementById('filterDate').addEventListener('change', loadReservations);
  document.getElementById('filterStatus').addEventListener('change', loadReservations);
  document.getElementById('btnClearFilters').addEventListener('click', () => {
    document.getElementById('filterDate').value = '';
    document.getElementById('filterStatus').value = 'all';
    loadReservations();
  });

});
