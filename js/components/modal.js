/* ============================================================
   MODAL — Componente reutilizable de diálogos modales
   ============================================================ */

const Modal = (() => {
  function open({ title, content, footer, size = 'md', onClose }) {
    const sizeMap = { sm: '420px', md: '560px', lg: '720px', xl: '900px' };

    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.id = 'modal-backdrop';
    backdrop.onclick = (e) => {
      if (e.target === backdrop) close(onClose);
    };

    backdrop.innerHTML = `
      <div class="modal-content" style="max-width: ${sizeMap[size] || sizeMap.md}">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="btn btn-ghost btn-icon" onclick="Modal.close()" aria-label="Cerrar">
            ${Icons.x()}
          </button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
      </div>
    `;

    document.body.appendChild(backdrop);

    // Trap focus
    const firstFocusable = backdrop.querySelector('input, select, textarea, button');
    if (firstFocusable) firstFocusable.focus();

    // Close on Escape
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        close(onClose);
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  function close(callback) {
    const backdrop = document.getElementById('modal-backdrop');
    if (backdrop) {
      backdrop.style.opacity = '0';
      backdrop.querySelector('.modal-content').style.transform = 'scale(0.95)';
      setTimeout(() => {
        backdrop.remove();
        if (callback) callback();
      }, 150);
    }
  }

  return { open, close };
})();
