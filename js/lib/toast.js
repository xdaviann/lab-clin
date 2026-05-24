/* ============================================================
   TOAST — Global notification system
   Manejo de Errores: nunca silencia, siempre muestra al usuario
   ============================================================ */

const Toast = (() => {
  let container = null;

  function ensureContainer() {
    if (container) return container;
    container = document.createElement('div');
    container.className = 'toast-container';
    container.id = 'toast-container';
    document.body.appendChild(container);
    return container;
  }

  function show(message, type = 'info', duration = 4000) {
    const containerElement = ensureContainer();

    const iconMap = {
      success: '✓',
      danger: '✕',
      warning: '⚠',
      info: 'ℹ',
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${iconMap[type] || iconMap.info}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;

    containerElement.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 300ms ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  function success(message) { show(message, 'success'); }
  function error(message) { show(message, 'danger'); }
  function warning(message) { show(message, 'warning'); }
  function info(message) { show(message, 'info'); }

  return { show, success, error, warning, info };
})();
