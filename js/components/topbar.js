/* ============================================================
   TOPBAR — Barra superior con búsqueda y acciones rápidas
   ============================================================ */

const TopBar = (() => {
  function render(title = 'Dashboard') {
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

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
          <button class="topbar-icon-btn" id="btn-notifications" aria-label="Notificaciones">
            ${Icons.bell()}
            <span class="notification-dot"></span>
          </button>
        </div>
      </header>
    `;
  }

  return { render };
})();
