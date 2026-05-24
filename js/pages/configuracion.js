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

          <!-- Supabase Config -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">Conexión Supabase</div>
              <span class="badge badge-warning"><span class="badge-dot"></span>Demo Mode</span>
            </div>
            <p style="font-size: var(--font-size-sm); color: var(--color-surface-500); margin-bottom: var(--spacing-lg);">
              Configure las credenciales de Supabase para conectar con la base de datos real. Actualmente el sistema está en modo demo con datos simulados.
            </p>
            <div class="form-group" style="margin-bottom: var(--spacing-base);">
              <label class="form-label">Supabase URL</label>
              <input type="url" placeholder="https://your-project.supabase.co" />
            </div>
            <div class="form-group" style="margin-bottom: var(--spacing-lg);">
              <label class="form-label">Anon Key</label>
              <input type="password" placeholder="eyJhbGciOiJIUzI1NiIs..." />
            </div>
            <button class="btn btn-primary" onclick="Toast.info('Conexión a Supabase próximamente')">
              Conectar
            </button>
          </div>

          <!-- WhatsApp Config -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">Integración WhatsApp</div>
              <span class="badge badge-neutral"><span class="badge-dot"></span>No Configurado</span>
            </div>
            <p style="font-size: var(--font-size-sm); color: var(--color-surface-500); margin-bottom: var(--spacing-lg);">
              Configure la API de WhatsApp Business para envío automático de resultados.
            </p>
            <div class="form-group" style="margin-bottom: var(--spacing-base);">
              <label class="form-label">API Token</label>
              <input type="password" placeholder="Token de WhatsApp Business API" />
            </div>
            <div class="form-group" style="margin-bottom: var(--spacing-base);">
              <label class="form-label">Phone Number ID</label>
              <input type="text" placeholder="ID del número de teléfono" />
            </div>
            <div class="form-group" style="margin-bottom: var(--spacing-lg);">
              <label class="form-label">Template Name</label>
              <input type="text" placeholder="resultado_laboratorio" />
            </div>
            <button class="btn btn-primary" onclick="Toast.info('Integración WhatsApp próximamente')">
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
                <label class="form-label">Expiración de enlaces WhatsApp (horas)</label>
                <input type="number" value="24" min="1" max="72" />
                <span class="form-hint">Los enlaces de resultados expirarán tras este periodo</span>
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
