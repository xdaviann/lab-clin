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
        <style>
          .drop-zone {
            border: 2px dashed var(--color-primary-300);
            border-radius: 12px;
            padding: 32px 16px;
            text-align: center;
            cursor: pointer;
            background: var(--color-primary-50);
            transition: all 0.2s ease;
          }
          .drop-zone:hover, .drop-zone.dragover {
            border-color: var(--color-primary-500);
            background: var(--color-primary-100);
          }
          .drop-zone input[type="file"] { display: none; }
          .file-selected-info { display: none; margin-top: 12px; padding: 10px 14px; background: var(--color-success-50); border-radius: 8px; font-size: 0.85rem; color: var(--color-success-700); align-items: center; gap: 8px; }
          .upload-progress { display: none; margin-top: 16px; }
          .progress-bar-track { background: var(--color-surface-100); border-radius: 999px; height: 8px; overflow: hidden; }
          .progress-bar-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--color-primary-400), var(--color-secondary-400)); width: 0%; transition: width 0.1s linear; }
        </style>
        <div style="margin-bottom: 16px; padding: 10px 14px; background: var(--color-surface-50); border-radius: 8px; display: flex; align-items: center; gap: 10px;">
          <div class="avatar avatar-sm" style="background: ${getAvatarColor(order.paciente)};">${getInitials(order.paciente)}</div>
          <div>
            <div style="font-weight: 600; color: var(--color-surface-800);">${order.paciente}</div>
            <div style="font-size: 0.8rem; color: var(--color-surface-500);">${order.id}</div>
          </div>
        </div>
        <form id="register-result-form">
          <div class="form-group" style="margin-bottom: 20px;">
            <label class="form-label">Documento de Resultado <span class="required">*</span></label>
            <div class="drop-zone" id="drop-zone" onclick="document.getElementById('res-file').click()">
              <div style="font-size: 2.5rem; margin-bottom: 8px;">&#128196;</div>
              <div style="font-weight: 600; color: var(--color-primary-600); margin-bottom: 4px;">Haz clic o arrastra el archivo aquí</div>
              <div style="font-size: 0.8rem; color: var(--color-surface-400);">PDF, JPG, PNG — máx. 10MB</div>
              <input type="file" id="res-file" accept=".pdf,.jpg,.jpeg,.png" onchange="ResultadosPage.onFileSelected(event)" />
            </div>
            <div class="file-selected-info" id="file-selected-info">
              ${Icons.check()} <span id="file-name-display">archivo.pdf</span>
            </div>
            <div class="upload-progress" id="upload-progress">
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px; color: var(--color-surface-600);">
                <span>Subiendo archivo...</span>
                <span id="upload-pct">0%</span>
              </div>
              <div class="progress-bar-track"><div class="progress-bar-fill" id="progress-bar-fill"></div></div>
            </div>
            ${order.estado === 'Completado' || order.estado === 'Entregado' ? '<div style="font-size: 0.75rem; color: var(--color-success); margin-top: 6px;">Ya existe un documento adjunto. Al subir uno nuevo, se reemplazará.</div>' : ''}
          </div>
          <div class="form-group">
            <label class="form-label">Observaciones / Comentarios</label>
            <textarea id="res-nota" rows="4" placeholder="Observaciones del resultado (se incluirán en el correo al paciente)...">${order.resultadoNota || ''}</textarea>
          </div>
        </form>
      `,
      footer: `
        <button class="btn btn-secondary" onclick="Modal.close()">Cancelar</button>
        <button class="btn btn-primary" id="save-result-btn" onclick="ResultadosPage.saveResult('${orderId}')">
          ${Icons.check()} ${order.estado === 'En Proceso' ? 'Marcar como Completado' : 'Guardar Cambios'}
        </button>
      `,
    });

    // Drag & drop
    setTimeout(() => {
      const zone = document.getElementById('drop-zone');
      if (!zone) return;
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) {
          const dt = new DataTransfer();
          dt.items.add(file);
          const input = document.getElementById('res-file');
          if (input) {
            input.files = dt.files;
            ResultadosPage.onFileSelected({ target: input });
          }
        }
      });
    }, 50);
  }

  function onFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;
    const info = document.getElementById('file-selected-info');
    const nameDisplay = document.getElementById('file-name-display');
    if (info && nameDisplay) {
      nameDisplay.textContent = file.name;
      info.style.display = 'flex';
    }
  }

  function saveResult(orderId) {
    const fileInput = document.getElementById('res-file');
    const observaciones = document.getElementById('res-nota')?.value?.trim();
    const order = DemoData.getOrderById(orderId);

    if (!fileInput.files.length && order.estado === 'En Proceso') {
      Toast.error('Debe adjuntar un documento para completar el resultado.');
      return;
    }

    // Simulate upload progress
    const progress = document.getElementById('upload-progress');
    const fill = document.getElementById('progress-bar-fill');
    const pct = document.getElementById('upload-pct');
    const btn = document.getElementById('save-result-btn');
    if (fileInput.files.length && progress && fill) {
      progress.style.display = 'block';
      if (btn) btn.disabled = true;
      let val = 0;
      const interval = setInterval(() => {
        val += Math.random() * 18 + 5;
        if (val >= 100) { val = 100; clearInterval(interval); }
        fill.style.width = val + '%';
        if (pct) pct.textContent = Math.floor(val) + '%';
        if (val === 100) {
          setTimeout(() => {
            DemoData.updateOrderStatus(orderId, order.estado === 'Entregado' ? 'Entregado' : 'Completado', { resultadoNota: observaciones });
            Modal.close();
            Toast.success('Documento adjuntado y resultado de la orden completado.');
            refresh();
          }, 300);
        }
      }, 80);
      return;
    }

    DemoData.updateOrderStatus(orderId, order.estado === 'Entregado' ? 'Entregado' : 'Completado', {
      resultadoNota: observaciones
    });

    Modal.close();
    Toast.success('Observaciones guardadas.');
    refresh();
  }

  function sendEmail(orderId) {
    const order = DemoData.getOrderById(orderId);
    if (!order) return;

    const patient = DemoData.getPatientById(order.pacienteId);
    if (!patient || !patient.email) {
      Toast.error('El paciente no tiene correo electrónico registrado.');
      return;
    }

    const allPruebas = DemoData.getPruebas();
    const testNames = order.pruebas.map(id => {
      const p = allPruebas.find(pr => pr.id === id);
      return p ? p.nombre : id;
    }).join(', ');

    const notasText = order.resultadoNota
      ? `\n\nObservaciones del laboratorio:\n${order.resultadoNota}`
      : '';

    const subject = encodeURIComponent(`Sus resultados están listos — Orden ${order.id}`);
    const body = encodeURIComponent(
      `Estimado(a) ${patient.nombres} ${patient.apellidos},\n\n` +
      `Le informamos que los resultados de su orden ${order.id} ya están listos y disponibles para retiro en nuestras instalaciones.\n\n` +
      `Pruebas realizadas: ${testNames}\n` +
      `Fecha de la orden: ${order.fecha}\n` +
      notasText +
      `\n\nHorario de atención: Lunes a Viernes 7:00 AM — 5:00 PM.\n` +
      `Por favor presente su cédula de identidad al momento de retirar los resultados.\n\n` +
      `Atentamente,\nLaboratorio Clínico Ordeñoz VE, C.A.`
    );

    window.open(`mailto:${patient.email}?subject=${subject}&body=${body}`, '_blank');

    DemoData.updateOrderStatus(orderId, 'Entregado', { emailEnviado: true });
    order.emailEnviado = true;

    Toast.success(`Correo preparado para ${patient.email}. Revisa tu cliente de correo y envíalo.`);
    refresh();
  }

  function refresh() {
    window.dispatchEvent(new Event('hashchange'));
    setTimeout(() => Toast.success('Datos actualizados correctamente'), 50);
  }

  return { render, filterResults, openRegisterModal, onFileSelected, saveResult, sendEmail, refresh };
})();
