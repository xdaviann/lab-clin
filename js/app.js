/* ============================================================
   APP.JS — Punto de entrada principal de la aplicación
   Orquesta el routing, layout y renderizado de páginas
   ============================================================ */

const App = (() => {
  const appRoot = document.getElementById('app');

  function init() {
    // Register routes
    Router.register('/login', renderLoginPage);
    Router.register('/dashboard', renderAppPage(DashboardPage));
    Router.register('/pacientes', renderAppPage(PacientesPage));
    Router.register('/ordenes', renderAppPage(OrdenesPage));
    Router.register('/resultados', renderAppPage(ResultadosPage));
    Router.register('/facturacion', renderAppPage(FacturacionPage));
    Router.register('/reportes', renderAppPage(ReportesPage));
    Router.register('/analytics', renderAppPage(AnalyticsPage));
    Router.register('/usuarios', renderAppPage(UsuariosPage));
    Router.register('/configuracion', renderAppPage(ConfiguracionPage));
    Router.register('/pruebas', renderAppPage(PruebasPage));

    // Route guard: redirect to login if not authenticated + role-based access
    Router.setBeforeNavigate((path) => {
      const state = Store.getState();
      if (!state.isAuthenticated && path !== '/login') {
        Router.navigate('/login');
        return false;
      }
      if (state.isAuthenticated && path === '/login') {
        Router.navigate('/dashboard');
        return false;
      }

      /* Control de acceso por rol */
      if (state.isAuthenticated && state.currentUser) {
        const allowedPaths = Sidebar.ROLE_ROUTES[state.currentUser.rol];
        /* allowedPaths === null => acceso total (admin) */
        if (allowedPaths !== null) {
          /* Extraer ruta base para sub-rutas (ej: /ordenes/nueva → /ordenes) */
          const basePath = '/' + path.split('/').filter(Boolean)[0];
          if (!allowedPaths.includes(basePath)) {
            Toast.warning('No tiene permisos para acceder a esta sección');
            Router.navigate('/dashboard');
            return false;
          }
        }
      }

      return true;
    });

    // Check if there is an active session, otherwise router will default to /login

    // Start router
    Router.init();
  }

  function renderLoginPage() {
    appRoot.innerHTML = LoginPage.render();
  }

  function renderAppPage(pageModule) {
    return (params) => {
      const state = Store.getState();
      if (!state.isAuthenticated) {
        Router.navigate('/login');
        return;
      }

      const appShell = document.querySelector('.app-shell');
      if (appShell) {
        const mainArea = document.querySelector('.main-area');
        if (mainArea) {
          // Save scroll position of sidebar-nav
          const sidebarNav = document.querySelector('.sidebar-nav');
          const scrollTop = sidebarNav ? sidebarNav.scrollTop : 0;

          // Render only the main page area
          mainArea.innerHTML = pageModule.render(params);

          // Update sidebar badges/state by replacing it
          const sidebar = document.querySelector('.sidebar');
          if (sidebar) {
            sidebar.outerHTML = Sidebar.render();
          }

          // Restore scroll position
          const newSidebarNav = document.querySelector('.sidebar-nav');
          if (newSidebarNav) {
            newSidebarNav.scrollTop = scrollTop;
          }

          // Update active item in sidebar
          const currentRoute = Router.getCurrentRoute();
          if (currentRoute) {
            Sidebar.updateActiveItem(currentRoute.path);
          }

          // Re-bind global search
          bindGlobalSearch();
          return;
        }
      }

      // Initial full render
      appRoot.innerHTML = `
        <div class="app-shell">
          ${Sidebar.render()}
          <div class="main-area">
            ${pageModule.render(params)}
          </div>
        </div>
      `;

      // Update sidebar active state
      const currentRoute = Router.getCurrentRoute();
      if (currentRoute) {
        Sidebar.updateActiveItem(currentRoute.path);
      }

      // Bind global search
      bindGlobalSearch();
    };
  }

  function bindGlobalSearch() {
    const searchInput = document.getElementById('global-search');
    if (!searchInput) return;

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          Router.navigate('/pacientes');
          setTimeout(() => {
            const patientSearch = document.getElementById('patient-search');
            if (patientSearch) {
              patientSearch.value = query;
              PacientesPage.filterPatients();
            }
          }, 100);
        }
      }
    });
  }

  return { init };
})();

/* ── Global Functions ── */
function handleLogout() {
  Store.setState({ isAuthenticated: false, currentUser: null });
  Toast.info('Sesión cerrada');
  Router.navigate('/login');
}

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
