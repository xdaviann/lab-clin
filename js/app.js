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

      /* Control de acceso dinámico */
      if (state.isAuthenticated && state.currentUser) {
        const allowedPaths = Sidebar.getAllowedPaths();
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
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Inicializar caché desde Firebase antes de arrancar la UI
    await DemoData._init();
    App.init();
  } catch (err) {
    console.error('Error al conectar con Firebase:', err);
    const appRoot = document.getElementById('app');
    if (appRoot) {
      appRoot.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: var(--color-surface-dark, #1A1D29);">
          <div style="text-align: center; padding: 40px; max-width: 480px;">
            <div style="font-size: 3rem; margin-bottom: 16px;">⚠️</div>
            <div style="color: #fff; font-family: 'Inter', sans-serif; font-size: 1.2rem; font-weight: 600; margin-bottom: 12px;">
              Error de Conexión
            </div>
            <div style="color: #94a3b8; font-family: 'Inter', sans-serif; font-size: 0.875rem; line-height: 1.6; margin-bottom: 24px;">
              No se pudo conectar con la base de datos Firebase.<br>
              Verifique su conexión a internet e intente recargar la página.
            </div>
            <button onclick="location.reload()" style="background: #6366f1; color: #fff; border: none; padding: 12px 24px; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer;">
              🔄 Recargar
            </button>
            <div style="color: #475569; font-size: 0.75rem; margin-top: 16px;">
              ${err.message || 'Firebase connection error'}
            </div>
          </div>
        </div>
      `;
    }
  }
});
