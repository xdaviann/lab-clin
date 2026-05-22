/* ============================================================
   PAGE: ÓRDENES — Gestión de órdenes de laboratorio
   RF-PAC-005 · Auto-genera factura y resultados pendientes
   ============================================================ */

const OrdenesPage = (() => {
  function render(params = []) {
    if (params[0] === 'nueva') return renderNewOrder();
    return renderList();
  }

  function renderList() {
    const orders = DemoData.getOrders();

    return `
      ${TopBar.render('Órdenes')}
      <main class="content" id="page-content">
        <div class="page-header">
          <div>
            <h1 class="page-title">Órdenes de Laboratorio</h1>
            <p class="page-subtitle">${orders.length} órdenes registradas</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="Router.navigate('/ordenes/nueva')" id="btn-new-order">
              ${Icons.plus()} Nueva Orden
            </button>
          </div>
        </div>

        <!-- Filters -->
        <div class="card" style="margin-bottom: var(--spacing-lg);">
          <div style="display: flex; gap: var(--spacing-base); align-items: center; flex-wrap: wrap;">
            <div class="search-input-wrapper" style="flex: 1; min-width: 220px;">
              <span class="search-icon">${Icons.search()}</span>
              <input type="text" placeholder="Buscar por ID, paciente..." id="order-search" oninput="OrdenesPage.filterOrders()" />
            </div>
            <select id="order-status-filter" onchange="OrdenesPage.filterOrders()" style="width: auto; min-width: 160px;">
              <option value="">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Completada">Completada</option>
              <option value="Validado">Validado</option>
              <option value="Entregado">Entregado</option>
            </select>
            <select id="order-priority-filter" onchange="OrdenesPage.filterOrders()" style="width: auto; min-width: 140px;">
              <option value="">Todas las prioridades</option>
              <option value="Normal">Normal</option>
              <option value="Urgente">Urgente</option>
            </select>
          </div>
        </div>

        <!-- Table -->
        <div class="card" style="padding: 0; overflow: hidden;">
          <div style="overflow-x: auto;">
            <table class="data-table" id="orders-table">
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Paciente</th>
                  <th>Médico</th>
                  <th>Pruebas</th>
                  <th>Total</th>
                  <th>Prioridad</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th style="text-align: center;">Acciones</th>
                </tr>
              </thead>
              <tbody id="orders-tbody">
                ${renderOrderRows(orders)}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    `;
  }

  function renderOrderRows(orders) {
    if (orders.length === 0) {
      return `<tr><td colspan="9"><div class="empty-state"><div class="empty-state-icon">${Icons.clipboard()}</div><div class="empty-state-title">No se encontraron órdenes</div></div></td></tr>`;
    }
    return orders.map(order => `
      <tr>
        <td style="font-weight: var(--font-weight-semibold); color: var(--color-primary-600);">${order.id}</td>
        <td>
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div class="avatar avatar-sm" style="background: ${getAvatarColor(order.paciente)};">${getInitials(order.paciente)}</div>
            <span>${order.paciente}</span>
          </div>
        </td>
        <td>${order.medicoRemitente}</td>
        <td style="text-align: center;">${order.pruebas.length}</td>
        <td style="font-weight: var(--font-weight-semibold);">${formatCurrencyUSD(order.total)}</td>
        <td>
          <span class="badge ${order.prioridad === 'Urgente' ? 'badge-danger' : 'badge-neutral'}">
            ${order.prioridad}
          </span>
        </td>
        <td>${getEstadoBadge(order.estado)}</td>
        <td style="color: var(--color-surface-500);">${formatDate(order.fecha)}</td>
        <td style="text-align: center;">
          <div style="display: flex; justify-content: center; gap: 4px;">
            <button class="btn btn-ghost btn-icon" onclick="OrdenesPage.viewOrder('${order.id}')" title="Ver detalle">
              ${Icons.eye()}
            </button>
            <button class="btn btn-ghost btn-icon" onclick="OrdenesPage.printOrder('${order.id}')" title="Descargar PDF">
              ${Icons.printer()}
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function renderNewOrder() {
    const patients = DemoData.getPatients();
    const pruebas = DemoData.getPruebas().filter(p => p.activa);
    const tasa = CurrencyService.getTasa();

    return `
      ${TopBar.render('Nueva Orden')}
      <main class="content" id="page-content">
        <div class="page-header">
          <div style="display: flex; align-items: center; gap: var(--spacing-base);">
            <button class="btn btn-ghost btn-icon" onclick="Router.navigate('/ordenes')">${Icons.chevronLeft()}</button>
            <div>
              <h1 class="page-title">Nueva Orden de Laboratorio</h1>
              <p class="page-subtitle">Complete los datos para crear la orden · Tasa BCV: Bs. ${tasa.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div class="grid-2col">
          <!-- Left: Order Info -->
          <div class="card">
            <div class="card-title" style="margin-bottom: var(--spacing-lg);">Información de la Orden</div>
            <div class="form-group" style="margin-bottom: var(--spacing-base);">
              <label class="form-label">Paciente <span class="required">*</span></label>
              <select id="order-patient-select" required>
                <option value="">Seleccionar paciente...</option>
                ${patients.map(p => `<option value="${p.id}">${p.nombres} ${p.apellidos} (${p.identificacion})</option>`).join('')}
              </select>
            </div>
            <div class="form-group" style="margin-bottom: var(--spacing-base);">
              <label class="form-label">Médico Remitente</label>
              <input type="text" id="order-medico" placeholder="Dr. / Dra." />
            </div>
            <div class="form-group">
              <label class="form-label">Prioridad</label>
              <select id="order-prioridad">
                <option value="Normal">Normal</option>
                <option value="Urgente">Urgente</option>
              </select>
            </div>
          </div>

          <!-- Right: Tests Selection -->
          <div class="card">
            <div class="card-title" style="margin-bottom: var(--spacing-lg);">Selección de Pruebas</div>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-sm); max-height: 320px; overflow-y: auto;" id="pruebas-list">
              ${pruebas.map(prueba => `
                <label style="display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-sm) var(--spacing-md); border-radius: var(--radius-md); cursor: pointer; transition: background var(--transition-fast);" onmouseover="this.style.background='var(--color-surface-50)'" onmouseout="this.style.background='transparent'">
                  <input type="checkbox" class="prueba-checkbox" value="${prueba.id}" data-precio="${prueba.precio}" onchange="OrdenesPage.updateTotal()" style="width: auto; accent-color: var(--color-primary-500);" />
                  <div style="flex: 1;">
                    <div style="font-size: var(--font-size-sm); font-weight: var(--font-weight-medium);">${prueba.nombre}</div>
                    <div style="font-size: var(--font-size-xs); color: var(--color-surface-400);">${prueba.categoria}</div>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-weight: var(--font-weight-semibold); color: var(--color-primary-600);">$${prueba.precio.toFixed(2)}</div>
                    <div style="font-size: var(--font-size-xs); color: var(--color-surface-400);">Bs. ${(prueba.precio * tasa).toFixed(2)}</div>
                  </div>
                </label>
              `).join('')}
            </div>
            <div style="margin-top: var(--spacing-lg); padding-top: var(--spacing-base); border-top: 1px solid var(--color-surface-200);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-size: var(--font-size-md); font-weight: var(--font-weight-semibold);">Total USD:</span>
                <span id="order-total-usd" style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-primary-600);">$0.00</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: var(--font-size-sm); color: var(--color-surface-500);">Total Bs.:</span>
                <span id="order-total-bs" style="font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); color: var(--color-surface-600);">Bs. 0.00</span>
              </div>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: var(--spacing-sm); margin-top: var(--spacing-lg);">
          <button class="btn btn-secondary" type="button" onclick="Router.navigate('/ordenes')">Cancelar</button>
          <button class="btn btn-primary btn-lg" type="button" onclick="OrdenesPage.saveNewOrder()">
            ${Icons.check()} Crear Orden
          </button>
        </div>
      </main>
    `;
  }

  function updateTotal() {
    const checkboxes = document.querySelectorAll('.prueba-checkbox:checked');
    let total = 0;
    checkboxes.forEach(cb => {
      total += parseFloat(cb.dataset.precio) || 0;
    });
    const tasa = CurrencyService.getTasa();
    const totalUSD = document.getElementById('order-total-usd');
    const totalBS = document.getElementById('order-total-bs');
    if (totalUSD) totalUSD.textContent = `$${total.toFixed(2)}`;
    if (totalBS) totalBS.textContent = `Bs. ${(total * tasa).toFixed(2)}`;
  }

  function saveNewOrder() {
    const pacienteId = document.getElementById('order-patient-select')?.value;
    const medicoRemitente = document.getElementById('order-medico')?.value || 'No especificado';
    const prioridad = document.getElementById('order-prioridad')?.value || 'Normal';

    const checkboxes = document.querySelectorAll('.prueba-checkbox:checked');
    const selectedPruebas = Array.from(checkboxes).map(cb => cb.value);

    /* Validaciones */
    if (!pacienteId) {
      Toast.error('Seleccione un paciente');
      return;
    }
    if (selectedPruebas.length === 0) {
      Toast.error('Seleccione al menos una prueba');
      return;
    }

    const patient = DemoData.getPatientById(pacienteId);
    if (!patient) {
      Toast.error('Paciente no encontrado');
      return;
    }

    let total = 0;
    checkboxes.forEach(cb => {
      total += parseFloat(cb.dataset.precio) || 0;
    });

    const newOrder = DemoData.addOrder({
      pacienteId,
      paciente: `${patient.nombres} ${patient.apellidos}`,
      pruebas: selectedPruebas,
      medicoRemitente,
      prioridad,
      total,
    });

    Toast.success(`Orden ${newOrder.id} creada · Factura y resultados generados automáticamente`);
    Router.navigate('/ordenes');
  }

  function filterOrders() {
    const searchQuery = (document.getElementById('order-search')?.value || '').toLowerCase();
    const statusFilter = document.getElementById('order-status-filter')?.value || '';
    const priorityFilter = document.getElementById('order-priority-filter')?.value || '';

    let filtered = DemoData.getOrders();

    if (searchQuery) {
      filtered = filtered.filter(o =>
        o.id.toLowerCase().includes(searchQuery) ||
        o.paciente.toLowerCase().includes(searchQuery)
      );
    }
    if (statusFilter) {
      filtered = filtered.filter(o => o.estado === statusFilter);
    }
    if (priorityFilter) {
      filtered = filtered.filter(o => o.prioridad === priorityFilter);
    }

    const tbody = document.getElementById('orders-tbody');
    if (tbody) tbody.innerHTML = renderOrderRows(filtered);
  }

  function viewOrder(orderId) {
    const order = DemoData.getOrderById(orderId);
    if (!order) return;

    const pruebas = DemoData.getPruebas();
    const orderPruebas = order.pruebas.map(id => pruebas.find(p => p.id === id)).filter(Boolean);
    const tasa = CurrencyService.getTasa();

    Modal.open({
      title: `Detalle de Orden ${order.id}`,
      size: 'md',
      content: `
        <div style="display: flex; flex-direction: column; gap: var(--spacing-lg);">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-base);">
            <div><span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">Paciente</span><div style="font-weight: var(--font-weight-medium);">${order.paciente}</div></div>
            <div><span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">Médico</span><div>${order.medicoRemitente}</div></div>
            <div><span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">Fecha</span><div>${formatDate(order.fecha)}</div></div>
            <div><span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">Estado</span><div>${getEstadoBadge(order.estado)}</div></div>
            <div><span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">Prioridad</span><div><span class="badge ${order.prioridad === 'Urgente' ? 'badge-danger' : 'badge-neutral'}">${order.prioridad}</span></div></div>
            <div>
              <span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">Total</span>
              <div style="font-weight: var(--font-weight-bold); font-size: var(--font-size-lg); color: var(--color-primary-600);">$${order.total.toFixed(2)}</div>
              <div style="font-size: var(--font-size-xs); color: var(--color-surface-400);">Bs. ${(order.total * tasa).toFixed(2)}</div>
            </div>
          </div>
          <div>
            <div style="font-weight: var(--font-weight-semibold); margin-bottom: var(--spacing-sm);">Pruebas Solicitadas</div>
            ${orderPruebas.map(p => `
              <div style="display: flex; justify-content: space-between; padding: var(--spacing-sm) 0; border-bottom: 1px solid var(--color-surface-100);">
                <span style="font-size: var(--font-size-sm);">${p.nombre}</span>
                <span style="font-size: var(--font-size-sm); font-weight: var(--font-weight-medium);">$${p.precio.toFixed(2)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `,
      footer: `
        <button class="btn btn-secondary" onclick="Modal.close()">Cerrar</button>
        <button class="btn btn-primary" onclick="OrdenesPage.printOrder('${order.id}'); Modal.close();">
          ${Icons.printer()} Descargar PDF
        </button>
      `,
    });
  }

  function printOrder(orderId) {
    const order = DemoData.getOrderById(orderId);
    if (!order) return;

    const pruebas = DemoData.getPruebas();
    const orderPruebas = order.pruebas.map(id => pruebas.find(p => p.id === id)).filter(Boolean);

    PdfService.generateReportPdf(
      `Orden ${order.id}`,
      `Paciente: ${order.paciente} · Médico: ${order.medicoRemitente}`,
      orderPruebas.map(p => ({ nombre: p.nombre, categoria: p.categoria, precio: `$${p.precio.toFixed(2)}` })),
      [
        { key: 'nombre', label: 'Prueba' },
        { key: 'categoria', label: 'Categoría' },
        { key: 'precio', label: 'Precio' },
      ]
    );
  }

  return { render, filterOrders, saveNewOrder, updateTotal, viewOrder, printOrder };
})();
