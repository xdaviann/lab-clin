/* ============================================================
   PAGE: LOGIN — Autenticación de usuarios
   RF-SEC-001, RF-SEC-003
   ============================================================ */

const LoginPage = (() => {
  function render() {
    return `
      <div class="login-page">
        <div class="login-left">
          <img src="assets/Logo Clínica (1).png" alt="Logo Laboratorio Clínico" class="login-logo" style="width: 280px; height: auto; margin-bottom: 24px; filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.35));" />
          <div class="login-welcome">
            <h1 style="font-size: 1.15rem; font-weight: 700; line-height: 1.6; text-transform: uppercase; color: #ffffff; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.85); max-width: 520px; margin: 0 auto; letter-spacing: 0.8px; text-align: center; font-family: 'Inter', sans-serif;">
              Sistema Web para la Atención y Gestión<br>Administrativa del Laboratorio<br>Clínico Ordoñez VE, C.A.
            </h1>
          </div>
        </div>
        <div class="login-right">
          <div class="login-form-container">
            <h2>Iniciar Sesión</h2>
            <p class="login-subtitle">Ingrese sus credenciales para acceder al sistema</p>
            <form class="login-form" onsubmit="LoginPage.handleLogin(event)" id="login-form">
              <div class="form-group">
                <label class="form-label">Correo Electrónico</label>
                <input type="email" id="login-email" placeholder="usuario@labclinica.com" autocomplete="email" value="" />
                <div id="email-error-msg" style="display: none; color: var(--color-danger); font-size: 0.75rem; margin-top: 6px;"></div>
              </div>
              <div class="form-group">
                <label class="form-label">Contraseña</label>
                <div style="position: relative;">
                  <input type="password" id="login-password" placeholder="••••••••" autocomplete="current-password" value="" style="padding-right: 40px;" />
                  <button type="button" onclick="LoginPage.togglePasswordVisibility()" id="toggle-pwd-btn" aria-label="Mostrar contraseña" style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: transparent; border: none; cursor: pointer; color: var(--color-surface-500); display: flex; align-items: center; justify-content: center; padding: 4px; border-radius: var(--radius-md);">
                    ${Icons.eye()}
                  </button>
                </div>
                <div id="password-error-msg" style="display: none; color: var(--color-danger); font-size: 0.75rem; margin-top: 6px;"></div>
              </div>
              <div class="login-remember">
                <label>
                  <input type="checkbox" style="width: auto;" checked /> Recordarme
                </label>
              </div>
              <button class="btn btn-primary login-btn" type="submit" id="login-submit">
                Ingresar al Sistema
              </button>
            </form>
            <p style="text-align: center; margin-top: var(--spacing-xl); font-size: var(--font-size-xs); color: var(--color-surface-400);">
              Sistema protegido · Acceso autorizado únicamente
            </p>
          </div>
        </div>
      </div>
    `;
  }

  function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    const emailError = document.getElementById('email-error-msg');
    const pwdError = document.getElementById('password-error-msg');
    
    // Ocultar mensajes en cada intento
    if (emailError) emailError.style.display = 'none';
    if (pwdError) pwdError.style.display = 'none';

    let hasError = false;

    // Validación de usuario
    /* Usuarios desde DemoData (persistidos en localStorage) */
    const allUsers = DemoData.getUsers();
    const activeUser = allUsers.find(u => u.email === email && u.estado === 'Activo');

    if (!email) {
      if (emailError) {
        emailError.textContent = 'Ingrese su correo electrónico';
        emailError.style.display = 'block';
      }
      hasError = true;
    } else if (!activeUser) {
      if (emailError) {
        emailError.textContent = 'El usuario no existe o está inactivo';
        emailError.style.display = 'block';
      }
      hasError = true;
    }

    // Validación de contraseña
    if (!password) {
      if (pwdError) {
        pwdError.textContent = 'Ingrese su contraseña';
        pwdError.style.display = 'block';
      }
      hasError = true;
    } else if (activeUser && password !== activeUser.password) {
      if (pwdError) {
        pwdError.textContent = 'Contraseña incorrecta';
        pwdError.style.display = 'block';
      }
      hasError = true;
    }

    if (hasError) return;

    const userData = activeUser;

    // Demo authentication — en producción: Supabase Auth
    const submitBtn = document.getElementById('login-submit');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="animate-spin" style="display: inline-block;">⟳</span> Autenticando...';

    setTimeout(() => {
      Store.setState({
        isAuthenticated: true,
        currentUser: {
          id: userData.id,
          nombre: userData.nombre,
          email: userData.email,
          rol: userData.rol,
          permisos: userData.permisos
        },
      });

      Toast.success(`Bienvenido, ${userData.nombre}`);

      /* Solo el admin debe actualizar la tasa obligatoriamente */
      if (userData.rol === 'Administrador') {
        const lastUpdate = localStorage.getItem('lab_tasa_update');
        const hoy = new Date().toDateString();
        const tasaActualizada = lastUpdate && new Date(lastUpdate).toDateString() === hoy;

        if (!tasaActualizada) {
          Router.navigate('/dashboard');
          setTimeout(() => showMandatoryTasaModal(), 300);
        } else {
          Router.navigate('/dashboard');
        }
      } else {
        Router.navigate('/dashboard');
      }
    }, 800);
  }

  function togglePasswordVisibility() {
    const pwdInput = document.getElementById('login-password');
    const toggleBtn = document.getElementById('toggle-pwd-btn');
    if (pwdInput && toggleBtn) {
      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        toggleBtn.innerHTML = Icons.eyeOff();
        toggleBtn.style.color = 'var(--color-primary-500)';
      } else {
        pwdInput.type = 'password';
        toggleBtn.innerHTML = Icons.eye();
        toggleBtn.style.color = 'var(--color-surface-500)';
      }
    }
  }

  function showMandatoryTasaModal() {
    const tasaActual = CurrencyService.getTasa();

    /* Intentar obtener la tasa automáticamente primero */
    CurrencyService.fetchTasaBCV(true).then(fetchedTasa => {
      const lastUpdate = localStorage.getItem('lab_tasa_update');
      const hoy = new Date().toDateString();
      const tasaActualizada = lastUpdate && new Date(lastUpdate).toDateString() === hoy;

      /* Si la API logró actualizar la tasa hoy, no mostrar el modal */
      if (tasaActualizada) {
        Toast.success(`Tasa BCV actualizada automáticamente: Bs. ${fetchedTasa.toFixed(2)}`);
        window.dispatchEvent(new Event('hashchange'));
        return;
      }

      /* Mostrar modal bloqueante */
      renderMandatoryTasaModal(fetchedTasa || tasaActual);
    }).catch(() => {
      renderMandatoryTasaModal(tasaActual);
    });
  }

  function renderMandatoryTasaModal(tasaSugerida) {
    /* Remover modal previo si existe */
    const existing = document.getElementById('mandatory-tasa-backdrop');
    if (existing) existing.remove();

    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.id = 'mandatory-tasa-backdrop';
    backdrop.style.zIndex = '10000';
    /* No cerrar al clicar fuera */

    backdrop.innerHTML = `
      <div class="modal-content" style="max-width: 480px">
        <div class="modal-header" style="border-bottom: 2px solid var(--color-warning, #f59e0b);">
          <h3 style="display: flex; align-items: center; gap: 8px;">
            ${Icons.dollarSign()}
            Actualización Obligatoria de Tasa BCV
          </h3>
        </div>
        <div class="modal-body">
          <div style="padding: var(--spacing-base); background: linear-gradient(135deg, var(--color-warning-50, #fffbeb), var(--color-warning-100, #fef3c7)); border-radius: var(--radius-lg); margin-bottom: var(--spacing-lg); border-left: 4px solid var(--color-warning, #f59e0b);">
            <p style="font-size: var(--font-size-sm); color: var(--color-surface-700); margin: 0; line-height: 1.6;">
              <strong>Acción requerida:</strong> Debe ingresar la tasa del dólar BCV del día antes de continuar. 
              Este paso es obligatorio al inicio de cada jornada laboral.
            </p>
          </div>
          <div style="margin-bottom: var(--spacing-lg); padding: var(--spacing-base); background: var(--color-surface-50); border-radius: var(--radius-lg);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">Tasa almacenada</span>
              <span style="font-weight: var(--font-weight-bold); color: var(--color-surface-600);">Bs. ${tasaSugerida.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">Fecha</span>
              <span style="font-size: var(--font-size-sm); color: var(--color-surface-400);">${new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
          <div class="form-group" style="margin-bottom: var(--spacing-base);">
            <label class="form-label">Tasa BCV del día (Bs. por 1 USD) <span class="required">*</span></label>
            <input type="number" id="mandatory-tasa-input" step="0.01" min="0" placeholder="Ej: 65.50" value="" 
              style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); text-align: center;" 
              onkeydown="if(event.key==='Enter'){LoginPage.saveMandatoryTasa();}" />
          </div>
          <div style="padding: var(--spacing-sm) var(--spacing-md); background: var(--color-info-50, #e0f2fe); border-radius: var(--radius-md); font-size: var(--font-size-xs); color: var(--color-info-700, #0369a1);">
            ${Icons.activity()} Consulte la tasa oficial en <strong>bcv.org.ve</strong> e ingrese el valor actualizado del día.
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" onclick="LoginPage.saveMandatoryTasa()" style="width: 100%;">
            ${Icons.check()} Guardar Tasa y Continuar
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    /* Bloquear cierre por Escape */
    const blockEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        Toast.warning('Debe ingresar la tasa del día para continuar');
      }
    };
    document.addEventListener('keydown', blockEscape, true);
    backdrop._blockEscape = blockEscape;

    /* Enfocar el campo */
    setTimeout(() => {
      const input = document.getElementById('mandatory-tasa-input');
      if (input) input.focus();
    }, 100);
  }

  function saveMandatoryTasa() {
    const input = document.getElementById('mandatory-tasa-input');
    const nuevaTasa = parseFloat(input?.value);

    if (!nuevaTasa || nuevaTasa <= 0) {
      Toast.error('Por favor, ingrese una tasa válida mayor a cero');
      if (input) input.focus();
      return;
    }

    if (CurrencyService.setTasaManual(nuevaTasa)) {
      localStorage.setItem('lab_tasa_update', new Date().toISOString());

      /* Remover modal y su handler de escape */
      const backdrop = document.getElementById('mandatory-tasa-backdrop');
      if (backdrop) {
        if (backdrop._blockEscape) {
          document.removeEventListener('keydown', backdrop._blockEscape, true);
        }
        backdrop.style.opacity = '0';
        backdrop.querySelector('.modal-content').style.transform = 'scale(0.95)';
        setTimeout(() => backdrop.remove(), 150);
      }

      Toast.success(`Tasa BCV del día registrada: Bs. ${nuevaTasa.toFixed(2)}`);
      /* Refrescar la vista para que muestre la tasa actualizada */
      window.dispatchEvent(new Event('hashchange'));
    }
  }

  return { render, handleLogin, togglePasswordVisibility, showMandatoryTasaModal, saveMandatoryTasa };
})();
