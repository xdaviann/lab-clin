/* ============================================================
   STORE — Simple immutable state management
   Principio de Inmutabilidad: todos los updates retornan nuevo estado
   ============================================================ */

const Store = (() => {
  /* ── Restaurar sesión guardada al cargar la página ── */
  let savedSession = null;
  try {
    const raw = localStorage.getItem('lab_session');
    if (raw) savedSession = JSON.parse(raw);
  } catch (_) { /* JSON corrupto, ignorar */ }

  const state = {
    currentUser: savedSession?.currentUser || null,
    isAuthenticated: savedSession?.isAuthenticated || false,
    patients: [],
    orders: [],
    results: [],
    invoices: [],
    users: [],
    sidebarOpen: true,
  };

  const listeners = new Set();

  function getState() {
    return Object.freeze({ ...state });
  }

  function setState(updates) {
    Object.assign(state, updates);

    /* ── Persistir sesión si cambia ── */
    if ('isAuthenticated' in updates || 'currentUser' in updates) {
      if (state.isAuthenticated && state.currentUser) {
        localStorage.setItem('lab_session', JSON.stringify({
          isAuthenticated: state.isAuthenticated,
          currentUser: state.currentUser,
        }));
      } else {
        localStorage.removeItem('lab_session');
      }
    }

    notifyListeners();
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function notifyListeners() {
    const frozen = getState();
    listeners.forEach(listener => listener(frozen));
  }

  return { getState, setState, subscribe };
})();
