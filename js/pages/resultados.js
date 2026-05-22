/* ============================================================
   PAGE: RESULTADOS — Gestión de resultados de laboratorio
   RF-RES-001 a RF-RES-005
   ============================================================ */

const ResultadosPage = (() => {
  function render() {
    const results = DemoData.getResults();

    return `
      ${TopBar.render('Resultados')}
      <main class="content" id="page-content">
        <div class="page-header">
          <div>
            <h1 class="page-title">Resultados de Laboratorio</h1>
            <p class="page-subtitle">${results.length} resultados registrados</p>
          </div>
        </div>

        <!-- Status Summary Cards -->
        <div class="grid-stats stagger-children" style="margin-bottom: var(--spacing-xl);">
          ${renderStatusCard('Pendientes', results.filter(r => r.estado === 'Pendiente').length, 'warning', Icons.clock())}
          ${renderStatusCard('En Proceso', results.filter(r => r.estado === 'En Proceso').length, 'info', Icons.activity())}
          ${renderStatusCard('Validados', results.filter(r => r.estado === 'Validado').length, 'primary', Icons.userCheck())}
          ${renderStatusCard('Entregados', results.filter(r => r.estado === 'Entregado').length, 'success', Icons.check())}
        </div>

        <!-- Filters -->
        <div class="card" style="margin-bottom: var(--spacing-lg);">
          <div style="display: flex; gap: var(--spacing-base); align-items: center; flex-wrap: wrap;">
            <div class="search-input-wrapper" style="flex: 1; min-width: 220px;">
              <span class="search-icon">${Icons.search()}</span>
              <input type="text" placeholder="Buscar por paciente, prueba..." id="result-search" oninput="ResultadosPage.filterResults()" />
            </div>
            <select id="result-status-filter" onchange="ResultadosPage.filterResults()" style="width: auto; min-width: 160px;">
              <option value="">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Validado">Validado</option>
              <option value="Entregado">Entregado</option>
            </select>
          </div>
        </div>

        <!-- Table -->
        <div class="card" style="padding: 0; overflow: hidden;">
          <div style="overflow-x: auto;">
            <table class="data-table" id="results-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Orden</th>
                  <th>Paciente</th>
                  <th>Prueba</th>
                  <th>Bioanalista</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>WhatsApp</th>
                  <th style="text-align: center;">Acciones</th>
                </tr>
              </thead>
              <tbody id="results-tbody">
                ${renderResultRows(results)}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    `;
  }

  function renderStatusCard(label, count, variant, icon) {
    return `
      <div class="stat-card stat-${variant}">
        <div class="stat-icon icon-${variant}">${icon}</div>
        <div class="stat-content">
          <div class="stat-label">${label}</div>
          <div class="stat-value">${count}</div>
        </div>
      </div>
    `;
  }

  function renderResultRows(results) {
    if (results.length === 0) {
      return `<tr><td colspan="9"><div class="empty-state"><div class="empty-state-icon">${Icons.flask()}</div><div class="empty-state-title">No se encontraron resultados</div></div></td></tr>`;
    }
    return results.map(result => `
      <tr>
        <td style="font-weight: var(--font-weight-semibold); color: var(--color-primary-600);">${result.id}</td>
        <td>${result.ordenId}</td>
        <td>
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div class="avatar avatar-sm" style="background: ${getAvatarColor(result.paciente)};">${getInitials(result.paciente)}</div>
            <span>${result.paciente}</span>
          </div>
        </td>
        <td class="truncate" style="max-width: 160px;">${result.prueba}</td>
        <td>${result.bioanalista || '<span style="color: var(--color-surface-400);">Sin asignar</span>'}</td>
        <td>${getEstadoResultadoBadge(result.estado)}</td>
        <td style="color: var(--color-surface-500);">${formatDate(result.fechaRegistro)}</td>
        <td style="text-align: center;">
          ${result.whatsappEnviado
            ? `<span class="badge badge-success" style="font-size: 10px;"><span class="badge-dot"></span>Enviado</span>`
            : `<span class="badge badge-neutral" style="font-size: 10px;"><span class="badge-dot"></span>Pendiente</span>`
          }
        </td>
        <td style="text-align: center;">
          <div style="display: flex; justify-content: center; gap: 4px;">
            ${result.estado === 'Pendiente' || result.estado === 'En Proceso' ? `
              <button class="btn btn-ghost btn-icon" onclick="ResultadosPage.openRegisterModal('${result.id}')" title="Registrar resultado">
                ${Icons.edit()}
              </button>
            ` : ''}
            ${result.estado === 'En Proceso' ? `
              <button class="btn btn-ghost btn-icon" onclick="ResultadosPage.validateResult('${result.id}')" title="Validar" style="color: var(--color-secondary-500);">
                ${Icons.check()}
              </button>
            ` : ''}
            ${result.estado === 'Validado' ? `
              <button class="btn btn-ghost btn-icon" onclick="ResultadosPage.sendWhatsApp('${result.id}')" title="Enviar WhatsApp" style="color: var(--color-success);">
                ${Icons.messageCircle()}
              </button>
            ` : ''}
            <button class="btn btn-ghost btn-icon" title="Descargar PDF" onclick="ResultadosPage.downloadResultPdf('${result.id}', false)">
              ${Icons.download()}
            </button>
            <button class="btn btn-ghost btn-icon" title="Imprimir" onclick="ResultadosPage.downloadResultPdf('${result.id}', true)">
              ${Icons.printer()}
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function filterResults() {
    const searchQuery = (document.getElementById('result-search')?.value || '').toLowerCase();
    const statusFilter = document.getElementById('result-status-filter')?.value || '';

    let filtered = DemoData.getResults();

    if (searchQuery) {
      filtered = filtered.filter(r =>
        r.paciente.toLowerCase().includes(searchQuery) ||
        r.prueba.toLowerCase().includes(searchQuery) ||
        r.id.toLowerCase().includes(searchQuery)
      );
    }
    if (statusFilter) {
      filtered = filtered.filter(r => r.estado === statusFilter);
    }

    const tbody = document.getElementById('results-tbody');
    if (tbody) tbody.innerHTML = renderResultRows(filtered);
  }

  function openRegisterModal(resultId) {
    const result = DemoData.getResultById(resultId);
    if (!result) return;

    Modal.open({
      title: `Registrar Resultado — ${result.prueba}`,
      size: 'md',
      content: `
        <div style="margin-bottom: var(--spacing-lg); padding: var(--spacing-sm) var(--spacing-md); background: var(--color-surface-50); border-radius: var(--radius-md);">
          <div style="font-size: var(--font-size-sm); color: var(--color-surface-500);">Paciente: <strong>${result.paciente}</strong> · Orden: <strong>${result.ordenId}</strong></div>
        </div>
        <form id="register-result-form">
          <div class="form-group" style="margin-bottom: var(--spacing-base);">
            <label class="form-label">Bioanalista Responsable <span class="required">*</span></label>
            <input type="text" id="res-bioanalista" value="${result.bioanalista || ''}" placeholder="Lcda. / Lcdo." required />
          </div>
          <div class="form-group" style="margin-bottom: var(--spacing-base);">
            <label class="form-label">Valores del Resultado <span class="required">*</span></label>
            <textarea id="res-valores" rows="5" placeholder="Ingrese los valores obtenidos de la prueba..." required>${result.valores || ''}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Observaciones</label>
            <textarea id="res-observaciones" rows="2" placeholder="Observaciones adicionales...">${result.observaciones || ''}</textarea>
          </div>
        </form>
      `,
      footer: `
        <button class="btn btn-secondary" onclick="Modal.close()">Cancelar</button>
        <button class="btn btn-primary" onclick="ResultadosPage.saveResult('${resultId}')">
          ${Icons.check()} Guardar Resultado
        </button>
      `,
    });
  }

  function saveResult(resultId) {
    const bioanalista = document.getElementById('res-bioanalista')?.value?.trim();
    const valores = document.getElementById('res-valores')?.value?.trim();
    const observaciones = document.getElementById('res-observaciones')?.value?.trim();

    if (!bioanalista || !valores) {
      Toast.error('Complete el bioanalista y los valores del resultado');
      return;
    }

    DemoData.updateResult(resultId, {
      bioanalista,
      valores,
      observaciones,
      estado: 'En Proceso',
    });

    Modal.close();
    Toast.success(`Resultado ${resultId} registrado exitosamente`);
    Router.navigate('/resultados');
  }

  function validateResult(resultId) {
    const updated = DemoData.validateResult(resultId);
    if (updated) {
      Toast.success(`Resultado ${resultId} validado por bioanalista`);
      Router.navigate('/resultados');
    }
  }

  function sendWhatsApp(resultId) {
    const updated = DemoData.deliverResult(resultId);
    if (updated) {
      Toast.success(`Resultado ${resultId} marcado como enviado por WhatsApp`);
      Router.navigate('/resultados');
    }
  }

  function downloadResultPdf(resultId, shouldPrint = false) {
    const result = DemoData.getResultById(resultId);
    if (!result) return;
 
    if (!result.valores) {
      Toast.warning('El resultado aún no tiene valores registrados');
      return;
    }
 
    const order = DemoData.getOrderById(result.ordenId);
    PdfService.generateResultPdf(result, order, shouldPrint);
  }

  return { render, filterResults, openRegisterModal, saveResult, validateResult, sendWhatsApp, downloadResultPdf };
})();
