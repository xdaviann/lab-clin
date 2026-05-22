/* ============================================================
   PAGE: LOGIN — Autenticación de usuarios
   RF-SEC-001, RF-SEC-003
   ============================================================ */

const LoginPage = (() => {
  function render() {
    return `
      <div class="login-page">
        <div class="login-left">
          <img src="assets/logo.png" alt="Logo Laboratorio Clínico" class="login-logo" />
          <div class="login-welcome">
            <h1>LabClínica</h1>
            <p>SISTEMA WEB PARA LA ATENCIÓN Y GESTIÓN ADMINISTRATIVA DEL LABORATORIO CLÍNICO ORDOÑEZ VE, C.A.</p>
          </div>
        </div>
        <div class="login-right">
          <div class="login-form-container">
            <h2>Iniciar Sesión</h2>
            <p class="login-subtitle">Ingrese sus credenciales para acceder al sistema</p>
            <form class="login-form" onsubmit="LoginPage.handleLogin(event)" id="login-form">
              <div class="form-group">
                <label class="form-label">Correo Electrónico</label>
                <input type="email" id="login-email" placeholder="usuario@labclinica.com" required autocomplete="email" value="admin@labclinica.com" />
              </div>
              <div class="form-group">
                <label class="form-label">Contraseña</label>
                <div style="position: relative;">
                  <input type="password" id="login-password" placeholder="••••••••" required autocomplete="current-password" value="admin123" style="padding-right: 40px;" />
                  <button type="button" onclick="LoginPage.togglePasswordVisibility()" id="toggle-pwd-btn" aria-label="Mostrar contraseña" style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: transparent; border: none; cursor: pointer; color: var(--color-surface-500); display: flex; align-items: center; justify-content: center; padding: 4px; border-radius: var(--radius-md);">
                    ${Icons.eye()}
                  </button>
                </div>
              </div>
              <div class="login-remember">
                <label>
                  <input type="checkbox" style="width: auto;" checked /> Recordarme
                </label>
                <a href="#" onclick="event.preventDefault(); Toast.info('Recuperación de contraseña próximamente')">¿Olvidó su contraseña?</a>
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

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
      Toast.error('Complete todos los campos');
      return;
    }

    // Demo authentication — en producción: Supabase Auth
    const submitBtn = document.getElementById('login-submit');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="animate-spin" style="display: inline-block;">⟳</span> Autenticando...';

    setTimeout(() => {
      Store.setState({
        isAuthenticated: true,
        currentUser: {
          id: 1,
          nombre: 'Administrador',
          email: email,
          rol: 'Administrador',
        },
      });

      Toast.success('Bienvenido al sistema');
      Router.navigate('/dashboard');
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

  return { render, handleLogin, togglePasswordVisibility };
})();
