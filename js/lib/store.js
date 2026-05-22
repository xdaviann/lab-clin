/* ============================================================
   STORE — Simple immutable state management
   Principio de Inmutabilidad: todos los updates retornan nuevo estado
   ============================================================ */

const Store = (() => {
  const state = {
    currentUser: null,
    isAuthenticated: false,
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
