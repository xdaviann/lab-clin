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

    // Route guard: redirect to login if not authenticated
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
      return true;
    });

    // Auto-login for demo purposes (remove in production)
    Store.setState({
      isAuthenticated: true,
      currentUser: {
        id: 1,
        nombre: 'Administrador',
        email: 'admin@labclinica.com',
        rol: 'Administrador',
      },
    });

    // Fetch current rate
    CurrencyService.fetchTasaBCV();

    // Fix for the user's current session if they have the old tasa stored
    setTimeout(() => {
      if (CurrencyService.getTasa() < 400) {
        CurrencyService.setTasaManual(500);
        // Refresh UI if on facturacion
        if (Router.getCurrentRoute()?.path === '/facturacion') {
          Router.navigate('/facturacion');
        }
      }
    }, 1000);

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
