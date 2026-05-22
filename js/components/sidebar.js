/* ============================================================
   SIDEBAR — Navegación principal (dark, como diseño_ux.png)
   ============================================================ */

const Sidebar = (() => {
  function getNavItems() {
    const pendingOrders = DemoData.getOrders().filter(o => o.estado === 'Pendiente').length;
    const pendingResults = DemoData.getResults().filter(r => r.estado === 'Pendiente' || r.estado === 'En Proceso').length;
    return [
      { section: 'Principal', items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'home', path: '/dashboard' },
        { id: 'pacientes', label: 'Pacientes', icon: 'users', path: '/pacientes' },
        { id: 'ordenes', label: 'Órdenes', icon: 'clipboard', path: '/ordenes', badge: pendingOrders || null },
        { id: 'resultados', label: 'Resultados', icon: 'flask', path: '/resultados', badge: pendingResults || null },
      ]},
      { section: 'Administración', items: [
        { id: 'pruebas', label: 'Pruebas', icon: 'activity', path: '/pruebas' },
        { id: 'facturacion', label: 'Facturación', icon: 'dollarSign', path: '/facturacion' },
        { id: 'reportes', label: 'Reportes', icon: 'barChart', path: '/reportes' },
        { id: 'analytics', label: 'Analytics BI', icon: 'pieChart', path: '/analytics' },
      ]},
      { section: 'Sistema', items: [
        { id: 'usuarios', label: 'Usuarios', icon: 'shieldCheck', path: '/usuarios' },
        { id: 'configuracion', label: 'Configuración', icon: 'settings', path: '/configuracion' },
      ]},
    ];
  }

  function render() {
    const currentPath = Router.getCurrentRoute()?.path || '/dashboard';

    return `
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">
            <img src="assets/logo.png" alt="Logo Clínica" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3));" />
          </div>
        </div>

        <nav class="sidebar-nav">
          ${getNavItems().map(section => `
            <div class="sidebar-section">
              <div class="sidebar-section-title">${section.section}</div>
              ${section.items.map(item => `
                <button
                  class="sidebar-item ${currentPath === item.path ? 'active' : ''}"
                  onclick="Router.navigate('${item.path}')"
                  id="nav-${item.id}"
                  aria-label="Navegar a ${item.label}"
                >
                  <span class="sidebar-item-icon">${Icons[item.icon]()}</span>
                  <span>${item.label}</span>
                  ${item.badge ? `<span class="sidebar-item-badge">${item.badge}</span>` : ''}
                </button>
              `).join('')}
            </div>
          `).join('')}
        </nav>

        <div class="sidebar-footer">
          <div class="sidebar-item" onclick="handleLogout()" id="nav-logout">
            <span class="sidebar-item-icon">${Icons.logOut()}</span>
            <span>Cerrar Sesión</span>
          </div>
          <div class="sidebar-user">
            <div class="sidebar-user-avatar">AD</div>
            <div class="sidebar-user-info">
              <div class="sidebar-user-name">Administrador</div>
              <div class="sidebar-user-role">Admin</div>
            </div>
          </div>
        </div>
      </aside>
    `;
  }

  function updateActiveItem(path) {
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.classList.remove('active');
    });
    const activeItem = document.querySelector(`.sidebar-item[onclick*="${path}"]`);
    if (activeItem) activeItem.classList.add('active');
  }

  return { render, updateActiveItem };
})();
