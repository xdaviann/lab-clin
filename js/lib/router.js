/* ============================================================
   ROUTER — Client-side hash-based SPA router
   Desacoplado: solo maneja rutas, no sabe de UI
   ============================================================ */

const Router = (() => {
  const routes = {};
  let currentRoute = null;
  let beforeNavigateHook = null;

  function register(path, handler) {
    routes[path] = handler;
  }

  function navigate(path) {
    if (beforeNavigateHook && !beforeNavigateHook(path)) return;
    window.location.hash = path;
  }

  function getCurrentRoute() {
    return currentRoute;
  }

  function setBeforeNavigate(hook) {
    beforeNavigateHook = hook;
  }

  function handleRouteChange() {
    const hash = window.location.hash.slice(1) || '/dashboard';
    const [basePath, ...paramParts] = hash.split('/').filter(Boolean);
    const fullPath = '/' + basePath;
    const params = paramParts.length > 0 ? paramParts : [];

    currentRoute = { path: fullPath, params, hash };

    const handler = routes[fullPath];
    if (handler) {
      handler(params);
    } else {
      // Fallback: try to find a matching parent route
      const parentPath = '/' + basePath;
      if (routes[parentPath]) {
        routes[parentPath](params);
      } else {
        navigate('/dashboard');
      }
    }
  }

  function init() {
    window.addEventListener('hashchange', handleRouteChange);
    handleRouteChange();
  }

  return { register, navigate, getCurrentRoute, setBeforeNavigate, init };
})();
