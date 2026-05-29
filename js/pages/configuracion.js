/* ============================================================
   PAGE: CONFIGURACIÓN — Ajustes del sistema
   ============================================================ */

const ConfiguracionPage = (() => {
  function render() {
    return `
      ${TopBar.render('Configuración')}
      <main class="content" id="page-content">
        <div class="page-header">
          <div>
            <h1 class="page-title">Configuración</h1>
            <p class="page-subtitle">Ajustes generales del sistema</p>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: var(--spacing-lg); max-width: 800px;">
          <!-- General Settings -->
          <div class="card">
            <div class="card-title" style="margin-bottom: var(--spacing-lg);">Información del Laboratorio</div>
            <div class="form-group" style="margin-bottom: var(--spacing-base);">
              <label class="form-label">Nombre del Laboratorio</label>
              <input type="text" value="Laboratorio Clínico LabClínica" />
            </div>
            <div class="form-row" style="margin-bottom: var(--spacing-base);">
              <div class="form-group">
                <label class="form-label">RIF / NIT</label>
                <input type="text" value="J-12345678-9" />
              </div>
              <div class="form-group">
                <label class="form-label">Teléfono Principal</label>
                <input type="tel" value="+58 212-5551234" />
              </div>
            </div>
            <div class="form-group" style="margin-bottom: var(--spacing-base);">
              <label class="form-label">Dirección</label>
              <textarea rows="2">Av. Principal, Centro Médico, Piso 2, Local 5</textarea>
            </div>
            <div class="form-group" style="margin-bottom: var(--spacing-lg);">
              <label class="form-label">Correo de contacto</label>
              <input type="email" value="info@labclinica.com" />
            </div>
            <button class="btn btn-primary" onclick="Toast.success('Configuración guardada')">
              ${Icons.check()} Guardar Cambios
            </button>
          </div>

          <!-- Email Config -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">Notificaciones por Correo Electrónico</div>
              <span class="badge badge-neutral"><span class="badge-dot"></span>No Configurado</span>
            </div>
            <p style="font-size: var(--font-size-sm); color: var(--color-surface-500); margin-bottom: var(--spacing-lg);">
              Configure el servicio de correo electrónico para el envío automático de notificaciones de resultados a los pacientes.
            </p>
            <div class="form-row" style="margin-bottom: var(--spacing-base);">
              <div class="form-group">
                <label class="form-label">Servidor SMTP</label>
                <input type="text" placeholder="smtp.gmail.com" />
              </div>
              <div class="form-group">
                <label class="form-label">Puerto</label>
                <input type="number" placeholder="587" />
              </div>
            </div>
            <div class="form-row" style="margin-bottom: var(--spacing-base);">
              <div class="form-group">
                <label class="form-label">Correo del Laboratorio</label>
                <input type="email" placeholder="resultados@labclinica.com" />
              </div>
              <div class="form-group">
                <label class="form-label">Contraseña / App Password</label>
                <input type="password" placeholder="Contraseña de la cuenta" />
              </div>
            </div>
            <div class="form-group" style="margin-bottom: var(--spacing-lg);">
              <label class="form-label">Nombre del Remitente</label>
              <input type="text" placeholder="Laboratorio Clínico LabClínica" />
            </div>
            <button class="btn btn-primary" onclick="Toast.info('Configuración de correo próximamente')">
              Guardar Configuración
            </button>
          </div>

          <!-- Session & Security -->
          <div class="card">
            <div class="card-title" style="margin-bottom: var(--spacing-lg);">Seguridad</div>
            <div class="form-row" style="margin-bottom: var(--spacing-base);">
              <div class="form-group">
                <label class="form-label">Tiempo de inactividad (minutos)</label>
                <input type="number" value="30" min="5" max="120" />
                <span class="form-hint">Sesión se cerrará automáticamente tras este periodo</span>
              </div>
              <div class="form-group">
                <label class="form-label">Copia de notificación por email</label>
                <input type="email" placeholder="admin@labclinica.com" />
                <span class="form-hint">Enviar copia de cada notificación a este correo (opcional)</span>
              </div>
            </div>
            <button class="btn btn-primary" onclick="Toast.success('Configuración de seguridad guardada')">
              ${Icons.check()} Guardar
            </button>
          </div>
        </div>
      </main>
    `;
  }

  return { render };
})();
