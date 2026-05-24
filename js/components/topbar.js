/* ============================================================
   TOPBAR — Barra superior con búsqueda, notificaciones y acciones
   ============================================================ */

const TopBar = (() => {
  function render(title = 'Dashboard') {
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const notifCount = getNotificationCount();

    return `
      <header class="topbar" id="topbar">
        <div class="topbar-left">
          <div class="topbar-search">
            <span class="search-icon">${Icons.search()}</span>
            <input type="text" placeholder="Buscar pacientes, órdenes..." id="global-search" autocomplete="off" />
          </div>
        </div>
        <div class="topbar-right">
          <span style="font-size: var(--font-size-xs); color: var(--color-surface-400); text-transform: capitalize;">${dateStr}</span>
          <div style="position: relative;" id="notif-wrapper">
            <button class="topbar-icon-btn" id="btn-notifications" onclick="TopBar.toggleNotifications()" aria-label="Notificaciones">
              ${Icons.bell()}
              ${notifCount > 0 ? `<span class="notification-dot">${notifCount}</span>` : ''}
            </button>
            <div class="notif-dropdown" id="notif-dropdown" style="display: none;">
              <!-- Se inyecta dinámicamente -->
            </div>
          </div>
        </div>
      </header>
    `;
  }

  function getNotifications() {
    const notifications = [];

    /* 1. Verificar si la tasa BCV fue actualizada hoy (solo admin) */
    if (Sidebar.isAdmin()) {
      const lastUpdate = localStorage.getItem('lab_tasa_update');
      const hoy = new Date().toDateString();
      const tasaActualizada = lastUpdate && new Date(lastUpdate).toDateString() === hoy;

      if (!tasaActualizada) {
        notifications.push({
          type: 'warning',
          icon: Icons.dollarSign(),
          title: 'Actualizar Tasa BCV',
          message: 'La tasa del día no ha sido registrada. Actualícela en Facturación.',
          action: "Router.navigate('/facturacion')"
        });
      }
    }

    /* 2. Resultados pendientes */
    try {
      const results = DemoData.getResults();
      const pendientes = results.filter(r => r.estado === 'En Proceso' || r.estado === 'Pendiente');
      if (pendientes.length > 0) {
        notifications.push({
          type: 'info',
          icon: Icons.clipboard(),
          title: `${pendientes.length} resultado(s) pendiente(s)`,
          message: 'Hay resultados que aún no han sido entregados.',
          action: "Router.navigate('/resultados')"
        });
      }
    } catch (e) {
      /* DemoData podría no estar cargado aún */
    }

    /* 3. Órdenes en proceso */
    try {
      const orders = DemoData.getOrders();
      const enProceso = orders.filter(o => o.estado === 'En Proceso');
      if (enProceso.length > 0) {
        notifications.push({
          type: 'info',
          icon: Icons.flask(),
          title: `${enProceso.length} orden(es) en proceso`,
          message: 'Hay órdenes pendientes de completar.',
          action: "Router.navigate('/ordenes')"
        });
      }
    } catch (e) {
      /* DemoData podría no estar cargado aún */
    }

    return notifications;
  }

  function getNotificationCount() {
    return getNotifications().length;
  }

  function toggleNotifications() {
    const dropdown = document.getElementById('notif-dropdown');
    if (!dropdown) return;

    const isVisible = dropdown.style.display !== 'none';

    if (isVisible) {
      dropdown.style.display = 'none';
      return;
    }

    /* Posicionar usando fixed para escapar cualquier overflow/stacking */
    const btn = document.getElementById('btn-notifications');
    if (btn) {
      const rect = btn.getBoundingClientRect();
      dropdown.style.position = 'fixed';
      dropdown.style.top = (rect.bottom + 8) + 'px';
      dropdown.style.right = (window.innerWidth - rect.right) + 'px';
      dropdown.style.left = 'auto';
    }

    /* Renderizar notificaciones */
    const notifications = getNotifications();

    if (notifications.length === 0) {
      dropdown.innerHTML = `
        <div style="padding: var(--spacing-lg); text-align: center; color: var(--color-surface-400);">
          ${Icons.check()} <br/>
          <span style="font-size: var(--font-size-sm); margin-top: 8px; display: inline-block;">Sin notificaciones pendientes</span>
        </div>
      `;
    } else {
      dropdown.innerHTML = `
        <div style="padding: var(--spacing-sm) var(--spacing-md); border-bottom: 1px solid var(--color-surface-100); font-weight: var(--font-weight-semibold); font-size: var(--font-size-sm); color: var(--color-surface-700);">
          Notificaciones (${notifications.length})
        </div>
        ${notifications.map(n => `
          <div class="notif-item notif-${n.type}" onclick="${n.action}; TopBar.toggleNotifications();" style="cursor: pointer;">
            <div class="notif-icon">${n.icon}</div>
            <div class="notif-body">
              <div class="notif-title">${n.title}</div>
              <div class="notif-message">${n.message}</div>
            </div>
          </div>
        `).join('')}
      `;
    }

    dropdown.style.display = 'block';

    /* Cerrar al hacer clic fuera */
    setTimeout(() => {
      const closeHandler = (e) => {
        const wrapper = document.getElementById('notif-wrapper');
        if (wrapper && !wrapper.contains(e.target)) {
          const dd = document.getElementById('notif-dropdown');
          if (dd) dd.style.display = 'none';
          document.removeEventListener('click', closeHandler);
        }
      };
      document.addEventListener('click', closeHandler);
    }, 10);
  }

  return { render, toggleNotifications, getNotificationCount };
})();
