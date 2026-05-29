/* ============================================================
   PAGE: USUARIOS — Gestión de usuarios y permisos dinámicos
   ============================================================ */

const UsuariosPage = (() => {
  const ALL_MODULES = [
    { id: '/dashboard', label: 'Dashboard' },
    { id: '/pacientes', label: 'Pacientes' },
    { id: '/ordenes', label: 'Órdenes' },
    { id: '/resultados', label: 'Resultados' },
    { id: '/pruebas', label: 'Pruebas' },
    { id: '/facturacion', label: 'Facturación' },
    { id: '/reportes', label: 'Reportes' },
    { id: '/usuarios', label: 'Usuarios' },
    { id: '/configuracion', label: 'Configuración' }
  ];

  function render() {
    const users = DemoData.getUsers();

    // Dynamically calculate stats
    const admins = users.filter(u => u.rol === 'Administrador').length;
    const operadores = users.filter(u => u.rol !== 'Administrador').length;

    return `
      <style>
        .permissions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; margin-top: 8px; }
        .permission-checkbox { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; cursor: pointer; }
      </style>
      ${TopBar.render('Usuarios')}
      <main class="content" id="page-content">
        <div class="page-header">
          <div>
            <h1 class="page-title">Gestión de Usuarios</h1>
            <p class="page-subtitle">${users.length} usuarios registrados en el sistema</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="UsuariosPage.openUserModal()" id="btn-new-user">
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
              <div class="stat-value">${admins}</div>
            </div>
          </div>
          <div class="stat-card stat-success">
            <div class="stat-icon icon-success">${Icons.users()}</div>
            <div class="stat-content">
              <div class="stat-label">Operadores</div>
              <div class="stat-value">${operadores}</div>
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
                  <th>Paneles Permitidos</th>
                  <th style="text-align: center;">Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${users.map(user => `
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
                      ${user.permisos === null 
                        ? '<span class="badge badge-success">Acceso Total</span>' 
                        : `<span class="badge badge-neutral">${user.permisos.length} Módulos</span>`
                      }
                    </td>
                    <td style="text-align: center;">
                      <div style="display: flex; justify-content: center; gap: 4px;">
                        <button class="btn btn-ghost btn-icon" title="Editar Permisos y Clave" onclick="UsuariosPage.openUserModal(${user.id})">
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

  function openUserModal(userId = null) {
    const isEdit = userId !== null;
    let user = null;
    if (isEdit) {
      user = DemoData.getUserById(userId);
      if (!user) return;
    }

    const isPrimaryAdmin = user && user.id === 1;

    Modal.open({
      title: isEdit ? `Editar Usuario: ${user.nombre}` : 'Nuevo Usuario',
      content: `
        <form id="user-form" onsubmit="event.preventDefault(); UsuariosPage.saveUser(${userId})">
          <div class="grid-2col" style="margin-bottom: var(--spacing-base);">
            <div class="form-group">
              <label class="form-label">Nombre completo <span class="required">*</span></label>
              <input type="text" id="user-nombre" required placeholder="Nombre del usuario" value="${user ? user.nombre : ''}" ${isPrimaryAdmin ? 'disabled' : ''} />
            </div>
            <div class="form-group">
              <label class="form-label">Correo electrónico <span class="required">*</span></label>
              <input type="email" id="user-email" required placeholder="usuario@labclinica.com" value="${user ? user.email : ''}" ${isPrimaryAdmin ? 'disabled' : ''} />
            </div>
          </div>
          <div class="grid-2col" style="margin-bottom: var(--spacing-base);">
            <div class="form-group">
              <label class="form-label">Rol <span class="required">*</span></label>
              <select id="user-rol" required onchange="UsuariosPage.handleRoleChange(this.value)" ${isPrimaryAdmin ? 'disabled' : ''}>
                <option value="Operador" ${user && user.rol === 'Operador' ? 'selected' : ''}>Operador</option>
                <option value="Administrador" ${user && user.rol === 'Administrador' ? 'selected' : ''}>Administrador</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">${isEdit ? 'Nueva Contraseña (dejar en blanco para no cambiar)' : 'Contraseña <span class="required">*</span>'}</label>
              <input type="text" id="user-password" placeholder="Mínimo 8 caracteres" ${!isEdit ? 'required' : ''} />
            </div>
          </div>
          
          <div class="form-group" style="margin-top: 24px;">
            <label class="form-label">Permisos de Acceso a Paneles</label>
            ${isPrimaryAdmin ? `
              <div style="padding: 12px; background: var(--color-success-50); border-radius: 8px; color: var(--color-success-700); font-size: 0.9rem;">
                El administrador principal tiene acceso total al sistema y no se le pueden restringir permisos.
              </div>
            ` : `
              <div class="permissions-grid" id="permissions-container">
                ${ALL_MODULES.map(mod => {
                  const isChecked = user ? (user.permisos === null || user.permisos.includes(mod.id)) : false;
                  return `
                    <label class="permission-checkbox">
                      <input type="checkbox" name="permissions" value="${mod.id}" ${isChecked ? 'checked' : ''} />
                      ${mod.label}
                    </label>
                  `;
                }).join('')}
              </div>
              <div style="margin-top: 12px; font-size: 0.8rem; color: var(--color-surface-500);">
                Nota: Si selecciona el rol "Administrador", el usuario tendrá acceso total automáticamente al guardar.
              </div>
            `}
          </div>
        </form>
      `,
      footer: `
        <button class="btn btn-secondary" onclick="Modal.close()">Cancelar</button>
        <button class="btn btn-primary" onclick="document.getElementById('user-form').requestSubmit()">
          ${Icons.check()} ${isEdit ? 'Guardar Cambios' : 'Crear Usuario'}
        </button>
      `,
    });

    if (user && !isPrimaryAdmin) {
      handleRoleChange(user.rol);
    }
  }

  function handleRoleChange(role) {
    const container = document.getElementById('permissions-container');
    if (!container) return;
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    if (role === 'Administrador') {
      checkboxes.forEach(cb => { cb.checked = true; cb.disabled = true; });
    } else {
      checkboxes.forEach(cb => { cb.disabled = false; });
    }
  }

  function saveUser(userId) {
    const isEdit = userId !== null;
    const nombreInput = document.getElementById('user-nombre');
    const emailInput = document.getElementById('user-email');
    const rolInput = document.getElementById('user-rol');
    const pwdInput = document.getElementById('user-password');

    let permisos = null;
    
    // Check if it's the primary admin
    const isPrimaryAdmin = isEdit && userId === 1;

    if (!isPrimaryAdmin) {
      if (rolInput.value === 'Administrador') {
        permisos = null;
      } else {
        const checkboxes = document.querySelectorAll('input[name="permissions"]:checked');
        permisos = Array.from(checkboxes).map(cb => cb.value);
        if (permisos.length === 0) {
          Toast.error('Debe asignar al menos un panel de acceso para el operador.');
          return;
        }
      }
    }

    if (isEdit) {
      const updates = {};
      if (!isPrimaryAdmin) {
        updates.nombre = nombreInput.value;
        updates.email = emailInput.value;
        updates.rol = rolInput.value;
        updates.permisos = permisos;
      }
      if (pwdInput.value) {
        updates.password = pwdInput.value;
      }
      
      DemoData.updateUser(userId, updates);
      Toast.success('Usuario actualizado exitosamente');
    } else {
      DemoData.addUser({
        nombre: nombreInput.value,
        email: emailInput.value,
        rol: rolInput.value,
        password: pwdInput.value,
        permisos: permisos
      });
      Toast.success('Usuario creado exitosamente');
    }

    Modal.close();
    window.dispatchEvent(new Event('hashchange'));
  }

  return { render, openUserModal, handleRoleChange, saveUser };
})();
