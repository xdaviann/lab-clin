/* ============================================================
   PAGE: USUARIOS — Gestión de usuarios y roles
   RF-SEC-001 a RF-SEC-005
   ============================================================ */

const UsuariosPage = (() => {
  const demoUsers = [
    { id: 1, nombre: 'Administrador', email: 'admin@labclinica.com', rol: 'Administrador', estado: 'Activo', ultimoAcceso: '2026-05-08' },
    { id: 2, nombre: 'Ana Morales', email: 'ana.morales@labclinica.com', rol: 'Bioanalista', estado: 'Activo', ultimoAcceso: '2026-05-08' },
    { id: 3, nombre: 'Pedro Fuentes', email: 'pedro.fuentes@labclinica.com', rol: 'Bioanalista', estado: 'Activo', ultimoAcceso: '2026-05-07' },
    { id: 4, nombre: 'Laura Gómez', email: 'laura.gomez@labclinica.com', rol: 'Recepcionista', estado: 'Activo', ultimoAcceso: '2026-05-08' },
    { id: 5, nombre: 'Carlos Méndez', email: 'carlos.mendez@labclinica.com', rol: 'Recepcionista', estado: 'Inactivo', ultimoAcceso: '2026-04-20' },
  ];

  function render() {
    return `
      ${TopBar.render('Usuarios')}
      <main class="content" id="page-content">
        <div class="page-header">
          <div>
            <h1 class="page-title">Gestión de Usuarios</h1>
            <p class="page-subtitle">${demoUsers.length} usuarios registrados</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="UsuariosPage.openNewUserModal()" id="btn-new-user">
              ${Icons.plus()} Nuevo Usuario
            </button>
          </div>
        </div>

        <!-- Role Summary -->
        <div class="grid-stats stagger-children" style="margin-bottom: var(--spacing-xl);">
          <div class="stat-card stat-primary">
            <div class="stat-icon icon-primary">${Icons.shieldCheck()}</div>
            <div class="stat-content">
              <div class="stat-label">Administradores</div>
              <div class="stat-value">${demoUsers.filter(u => u.rol === 'Administrador').length}</div>
            </div>
          </div>
          <div class="stat-card stat-success">
            <div class="stat-icon icon-success">${Icons.flask()}</div>
            <div class="stat-content">
              <div class="stat-label">Bioanalistas</div>
              <div class="stat-value">${demoUsers.filter(u => u.rol === 'Bioanalista').length}</div>
            </div>
          </div>
          <div class="stat-card stat-info">
            <div class="stat-icon icon-info">${Icons.users()}</div>
            <div class="stat-content">
              <div class="stat-label">Recepcionistas</div>
              <div class="stat-value">${demoUsers.filter(u => u.rol === 'Recepcionista').length}</div>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="card" style="padding: 0; overflow: hidden;">
          <div style="overflow-x: auto;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Último Acceso</th>
                  <th style="text-align: center;">Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${demoUsers.map(user => `
                  <tr>
                    <td>
                      <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                        <div class="avatar" style="background: ${getAvatarColor(user.nombre)};">${getInitials(user.nombre)}</div>
                        <span style="font-weight: var(--font-weight-medium);">${user.nombre}</span>
                      </div>
                    </td>
                    <td style="color: var(--color-surface-500);">${user.email}</td>
                    <td><span class="badge badge-primary">${user.rol}</span></td>
                    <td>
                      <span class="badge ${user.estado === 'Activo' ? 'badge-success' : 'badge-neutral'}">
                        <span class="badge-dot"></span>${user.estado}
                      </span>
                    </td>
                    <td style="color: var(--color-surface-500);">${formatDate(user.ultimoAcceso)}</td>
                    <td style="text-align: center;">
                      <div style="display: flex; justify-content: center; gap: 4px;">
                        <button class="btn btn-ghost btn-icon" title="Editar">
                          ${Icons.edit()}
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    `;
  }

  function openNewUserModal() {
    Modal.open({
      title: 'Nuevo Usuario',
      content: `
        <form id="new-user-form">
          <div class="form-group" style="margin-bottom: var(--spacing-base);">
            <label class="form-label">Nombre completo <span class="required">*</span></label>
            <input type="text" name="nombre" required placeholder="Nombre del usuario" />
          </div>
          <div class="form-group" style="margin-bottom: var(--spacing-base);">
            <label class="form-label">Correo electrónico <span class="required">*</span></label>
            <input type="email" name="email" required placeholder="usuario@labclinica.com" />
          </div>
          <div class="form-group" style="margin-bottom: var(--spacing-base);">
            <label class="form-label">Rol <span class="required">*</span></label>
            <select name="rol" required>
              <option value="">Seleccionar rol...</option>
              <option value="Administrador">Administrador</option>
              <option value="Bioanalista">Bioanalista</option>
              <option value="Recepcionista">Recepcionista</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Contraseña temporal <span class="required">*</span></label>
            <input type="password" name="password" required placeholder="Mínimo 8 caracteres" />
          </div>
        </form>
      `,
      footer: `
        <button class="btn btn-secondary" onclick="Modal.close()">Cancelar</button>
        <button class="btn btn-primary" onclick="Modal.close(); Toast.success('Usuario creado exitosamente');">
          ${Icons.check()} Crear Usuario
        </button>
      `,
    });
  }

  return { render, openNewUserModal };
})();
