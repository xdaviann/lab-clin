/* ============================================================
   PAGE: RESULTADOS — Gestión de resultados de laboratorio
   Refactorizado: Las pruebas ahora se agrupan por orden
   ============================================================ */

const ResultadosPage = (() => {
  function render() {
    const orders = DemoData.getOrders();

    return `
      ${TopBar.render('Resultados')}
      <main class="content" id="page-content">
        <div class="page-header">
          <div>
            <h1 class="page-title">Resultados de Laboratorio</h1>
            <p class="page-subtitle">${orders.length} órdenes registradas</p>
          </div>
        </div>

        <!-- Status Summary Cards -->
        <div class="grid-stats stagger-children" style="margin-bottom: var(--spacing-xl);">
          ${renderStatusCard('En Proceso', orders.filter(o => o.estado === 'En Proceso').length, 'warning', Icons.activity())}
          ${renderStatusCard('Completados', orders.filter(o => o.estado === 'Completado').length, 'primary', Icons.check())}
          ${renderStatusCard('Entregados', orders.filter(o => o.estado === 'Entregado').length, 'success', Icons.messageCircle())}
        </div>

        <div class="page-actions" style="margin-bottom: var(--spacing-md); display: flex; justify-content: flex-end;">
          <button class="btn btn-secondary btn-sm" onclick="ResultadosPage.refresh()">
            ${Icons.refreshCw()} Actualizar
          </button>
        </div>

        <!-- Filters -->
        <div class="card" style="margin-bottom: var(--spacing-lg);">
          <div style="display: flex; gap: var(--spacing-base); align-items: center; flex-wrap: wrap;">
            <div class="search-input-wrapper" style="flex: 1; min-width: 220px;">
              <span class="search-icon">${Icons.search()}</span>
              <input type="text" placeholder="Buscar por paciente, ID..." id="result-search" oninput="ResultadosPage.filterResults()" />
            </div>
            <select id="result-status-filter" onchange="ResultadosPage.filterResults()" style="width: auto; min-width: 160px;">
              <option value="">Todos los estados</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Completado">Completado</option>
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
                  <th>Orden ID</th>
                  <th>Paciente</th>
                  <th>Pruebas (Resumen)</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Email</th>
                  <th style="text-align: center;">Acciones</th>
                </tr>
              </thead>
              <tbody id="results-tbody">
                ${renderResultRows(orders)}
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

  function renderResultRows(orders) {
    if (orders.length === 0) {
      return `<tr><td colspan="9"><div class="empty-state"><div class="empty-state-icon">${Icons.flask()}</div><div class="empty-state-title">No se encontraron órdenes</div></div></td></tr>`;
    }
    const allPruebas = DemoData.getPruebas();

    return orders.map(order => {
      const testNames = order.pruebas.map(id => {
        const p = allPruebas.find(p => p.id === id);
        return p ? p.nombre : id;
      }).join(', ');

      return `
        <tr>
          <td style="font-weight: var(--font-weight-semibold); color: var(--color-primary-600);">${order.id}</td>
          <td>
            <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
              <div class="avatar avatar-sm" style="background: ${getAvatarColor(order.paciente)};">${getInitials(order.paciente)}</div>
              <span>${order.paciente}</span>
            </div>
          </td>
          <td class="truncate" style="max-width: 250px;" title="${testNames}">${testNames}</td>
          <td>${getEstadoResultadoBadge(order.estado)}</td>
          <td style="color: var(--color-surface-500);">${formatDate(order.fecha)}</td>
          <td style="text-align: center;">
            ${order.emailEnviado
              ? `<span class="badge badge-success" style="font-size: 10px;"><span class="badge-dot"></span>Enviado</span>`
              : `<span class="badge badge-neutral" style="font-size: 10px;"><span class="badge-dot"></span>Pendiente</span>`
            }
          </td>
          <td style="text-align: center;">
            <div style="display: flex; justify-content: center; gap: 4px;">
              ${order.estado === 'En Proceso' ? `
                <button class="btn btn-ghost btn-icon" onclick="ResultadosPage.openRegisterModal('${order.id}')" title="Adjuntar Documento de Resultado">
                  ${Icons.edit()}
                </button>
              ` : ''}
              ${order.estado === 'Completado' || order.estado === 'Entregado' ? `
                <button class="btn btn-ghost btn-icon" onclick="ResultadosPage.openRegisterModal('${order.id}')" title="Editar / Re-adjuntar Documento">
                  ${Icons.edit()}
                </button>
              ` : ''}
              ${order.estado === 'Completado' || order.estado === 'Entregado' ? `
                <button class="btn btn-ghost btn-icon" onclick="ResultadosPage.sendEmail('${order.id}')" title="${order.emailEnviado ? 'Reenviar' : 'Enviar'} por correo al paciente" style="color: var(--color-success);">
                  ${Icons.mail()}
                </button>
              ` : ''}
              ${order.estado === 'Completado' || order.estado === 'Entregado' ? `
                <button class="btn btn-ghost btn-icon" title="Descargar / Ver Documento" onclick="Toast.info('Abriendo documento adjunto...')">
                  ${Icons.download()}
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function filterResults() {
    const searchQuery = (document.getElementById('result-search')?.value || '').toLowerCase();
    const statusFilter = document.getElementById('result-status-filter')?.value || '';

    let filtered = DemoData.getOrders();

    if (searchQuery) {
      filtered = filtered.filter(o =>
        o.paciente.toLowerCase().includes(searchQuery) ||
        o.id.toLowerCase().includes(searchQuery)
      );
    }
    if (statusFilter) {
      filtered = filtered.filter(o => o.estado === statusFilter);
    }

    const tbody = document.getElementById('results-tbody');
    if (tbody) tbody.innerHTML = renderResultRows(filtered);
  }

  function openRegisterModal(orderId) {
    const order = DemoData.getOrderById(orderId);
    if (!order) return;

    Modal.open({
      title: `Adjuntar Resultado — ${order.id}`,
      size: 'md',
      content: `
        <div style="margin-bottom: var(--spacing-lg); padding: var(--spacing-sm) var(--spacing-md); background: var(--color-surface-50); border-radius: var(--radius-md);">
          <div style="font-size: var(--font-size-sm); color: var(--color-surface-500);">Paciente: <strong>${order.paciente}</strong></div>
        </div>
        <form id="register-result-form">
          <div class="form-group" style="margin-bottom: var(--spacing-base);">
            <label class="form-label">Subir Documento o Recurso <span class="required">*</span></label>
            <input type="file" id="res-file" class="form-control" style="padding: 8px;" />
            ${order.estado === 'Completado' || order.estado === 'Entregado' ? '<div style="font-size: var(--font-size-xs); color: var(--color-success); margin-top: 4px;">Ya existe un documento adjunto. Al subir uno nuevo, se reemplazará.</div>' : ''}
          </div>
          <div class="form-group">
            <label class="form-label">Nota o Descripción</label>
            <textarea id="res-nota" rows="3" placeholder="Nota adicional (opcional)...">${order.resultadoNota || ''}</textarea>
          </div>
        </form>
      `,
      footer: `
        <button class="btn btn-secondary" onclick="Modal.close()">Cancelar</button>
        <button class="btn btn-primary" onclick="ResultadosPage.saveResult('${orderId}')">
          ${Icons.check()} ${order.estado === 'En Proceso' ? 'Marcar como Completado' : 'Guardar Cambios'}
        </button>
      `,
    });
  }

  function saveResult(orderId) {
    const fileInput = document.getElementById('res-file');
    const observaciones = document.getElementById('res-nota')?.value?.trim();
    const order = DemoData.getOrderById(orderId);

    if (!fileInput.files.length && order.estado === 'En Proceso') {
      Toast.error('Debe adjuntar un documento para completar el resultado.');
      return;
    }

    DemoData.updateOrderStatus(orderId, order.estado === 'Entregado' ? 'Entregado' : 'Completado', {
      resultadoNota: observaciones
    });

    Modal.close();
    Toast.success('Documento adjuntado y resultado de la orden completado.');
    refresh();
  }

  function sendEmail(orderId) {
    const order = DemoData.getOrderById(orderId);
    if (!order) return;

    // Buscar email del paciente
    const patient = DemoData.getPatientById(order.pacienteId);
    if (!patient || !patient.email) {
      Toast.error('El paciente no tiene correo electrónico registrado.');
      return;
    }

    // Armar pruebas
    const allPruebas = DemoData.getPruebas();
    const testNames = order.pruebas.map(id => {
      const p = allPruebas.find(pr => pr.id === id);
      return p ? p.nombre : id;
    }).join(', ');

    const subject = encodeURIComponent(`Resultados Listos — Orden ${order.id} | LabClínica`);
    const body = encodeURIComponent(
      `Estimado(a) ${patient.nombres} ${patient.apellidos},\n\n` +
      `Le informamos que los resultados de su orden ${order.id} ya están listos.\n\n` +
      `Pruebas realizadas: ${testNames}\n` +
      `Fecha de la orden: ${order.fecha}\n\n` +
      `Puede pasar a retirar sus resultados en el horario de atención del laboratorio, ` +
      `o solicitar que se los envíen como documento adjunto respondiendo a este correo.\n\n` +
      `Atentamente,\nLaboratorio Clínico LabClínica`
    );

    // Abrir cliente de correo
    window.open(`mailto:${patient.email}?subject=${subject}&body=${body}`, '_blank');

    // Marcar como enviado
    DemoData.updateOrderStatus(orderId, 'Entregado', { emailEnviado: true });
    order.emailEnviado = true;

    Toast.success(`Se abrió el correo para ${patient.email}. Orden marcada como Entregado.`);
    refresh();
  }

  function refresh() {
    window.dispatchEvent(new Event('hashchange'));
    setTimeout(() => Toast.success('Datos actualizados correctamente'), 50);
  }

  return { render, filterResults, openRegisterModal, saveResult, sendEmail, refresh };
})();
