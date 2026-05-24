/* ============================================================
   PAGE: ÓRDENES — Gestión de órdenes de laboratorio
   RF-PAC-005 · Auto-genera factura y resultados pendientes
   ============================================================ */

const OrdenesPage = (() => {
  function render(params = []) {
    if (params[0] === 'nueva') return renderNewOrder(params[1]);
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
            <button class="btn btn-secondary btn-sm" onclick="OrdenesPage.refresh()">
              ${Icons.refreshCw()} Actualizar
            </button>
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
              <option value="En Proceso">En Proceso</option>
              <option value="Completado">Completado</option>
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
            <button class="btn btn-ghost btn-icon" onclick="OrdenesPage.openEditOrderModal('${order.id}')" title="Editar orden (corregir)">
              ${Icons.edit()}
            </button>
            <button class="btn btn-ghost btn-icon" onclick="OrdenesPage.viewOrder('${order.id}')" title="Ver detalle">
              ${Icons.eye()}
            </button>
            <button class="btn btn-ghost btn-icon" onclick="OrdenesPage.printOrder('${order.id}')" title="Descargar PDF">
              ${Icons.printer()}
            </button>
            <button class="btn btn-ghost btn-icon" onclick="OrdenesPage.deleteOrder('${order.id}')" title="Cancelar Orden" style="color: var(--color-danger);">
              ${Icons.trash()}
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function renderNewOrder(preselectedPatientId = '') {
    const patients = DemoData.getPatients();
    const pruebas = DemoData.getPruebas().filter(p => p.activa);
    const tasa = CurrencyService.getTasa();

    const preselectedPatientObj = preselectedPatientId ? DemoData.getPatientById(preselectedPatientId) : null;
    const preselectedText = preselectedPatientObj ? `${preselectedPatientObj.nombres} ${preselectedPatientObj.apellidos} (${preselectedPatientObj.identificacion})` : '';

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
          <div class="card" style="position: relative; overflow: visible;">
            <div class="card-title" style="margin-bottom: var(--spacing-lg);">Información de la Orden</div>
            
            <!-- Buscador de Paciente Interactivo -->
            <div class="form-group" style="margin-bottom: var(--spacing-base); position: relative;">
              <label class="form-label">Paciente <span class="required">*</span></label>
              <div class="search-input-wrapper" style="width: 100%;">
                <span class="search-icon">${Icons.search()}</span>
                <input type="text" id="order-patient-search" value="${preselectedText}" placeholder="Buscar por cédula, nombre o apellido..." autocomplete="off" onfocus="OrdenesPage.showSuggestions()" oninput="OrdenesPage.searchSuggestions()" onblur="setTimeout(() => OrdenesPage.hideSuggestions(), 250)" style="width: 100%;" />
              </div>
              <input type="hidden" id="order-patient-select" value="${preselectedPatientId}" />
              
              <!-- Sugerencias del buscador -->
              <div id="patient-suggestions" class="card" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 100; max-height: 200px; overflow-y: auto; padding: var(--spacing-xs) 0; margin-top: 4px; box-shadow: var(--shadow-lg); background: var(--color-white); border: 1px solid var(--color-surface-200);">
                <!-- Se llena dinámicamente -->
              </div>
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
            <div class="card-title" style="margin-bottom: var(--spacing-sm);">Selección de Pruebas</div>
            
            <!-- Buscador de Pruebas -->
            <div class="search-input-wrapper" style="margin-bottom: var(--spacing-md); width: 100%;">
              <span class="search-icon">${Icons.search()}</span>
              <input type="text" id="order-test-search" placeholder="Buscar prueba por nombre..." autocomplete="off" oninput="OrdenesPage.filterTests()" style="width: 100%;" />
            </div>

            <div style="display: flex; flex-direction: column; gap: var(--spacing-sm); max-height: 320px; overflow-y: auto; padding-right: 4px;" id="pruebas-list">
              ${pruebas.map(prueba => `
                <label class="prueba-item" data-nombre="${prueba.nombre.toLowerCase()}" style="display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-sm) var(--spacing-md); border-radius: var(--radius-md); cursor: pointer; transition: background var(--transition-fast);" onmouseover="this.style.background='var(--color-surface-50)'" onmouseout="this.style.background='transparent'">
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

    const orderData = {
      pacienteId,
      paciente: `${patient.nombres} ${patient.apellidos}`,
      pruebas: selectedPruebas,
      prioridad,
      total
    };

    const newOrder = DemoData.addOrder(orderData);

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

  function showSuggestions() {
    searchSuggestions();
  }

  function searchSuggestions() {
    const query = document.getElementById('order-patient-search')?.value?.toLowerCase() || '';
    const suggestionsDiv = document.getElementById('patient-suggestions');
    if (!suggestionsDiv) return;

    const patients = DemoData.getPatients();
    const filtered = patients.filter(p => 
      p.nombres.toLowerCase().includes(query) ||
      p.apellidos.toLowerCase().includes(query) ||
      p.identificacion.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      suggestionsDiv.innerHTML = `<div style="padding: var(--spacing-sm) var(--spacing-md); color: var(--color-surface-400); font-size: var(--font-size-sm); text-align: center;">No se encontraron pacientes</div>`;
    } else {
      suggestionsDiv.innerHTML = filtered.map(p => `
        <div 
          onclick="OrdenesPage.selectPatient('${p.id}', '${p.nombres} ${p.apellidos}', '${p.identificacion}')"
          style="padding: var(--spacing-sm) var(--spacing-md); cursor: pointer; transition: background var(--transition-fast); display: flex; flex-direction: column; border-bottom: 1px solid var(--color-surface-100);"
          onmouseover="this.style.background='var(--color-surface-50)'"
          onmouseout="this.style.background='transparent'"
        >
          <span style="font-weight: var(--font-weight-medium); font-size: var(--font-size-sm); color: var(--color-surface-800);">${p.nombres} ${p.apellidos}</span>
          <span style="font-size: var(--font-size-xs); color: var(--color-surface-500); margin-top: 2px;">C.I. ${p.identificacion}</span>
        </div>
      `).join('');
    }
    suggestionsDiv.style.display = 'block';
  }

  function hideSuggestions() {
    const suggestionsDiv = document.getElementById('patient-suggestions');
    if (suggestionsDiv) {
      suggestionsDiv.style.display = 'none';
    }
  }

  function selectPatient(id, fullName, identificacion) {
    const searchInput = document.getElementById('order-patient-search');
    const selectHidden = document.getElementById('order-patient-select');
    if (searchInput) searchInput.value = `${fullName} (${identificacion})`;
    if (selectHidden) selectHidden.value = id;
    hideSuggestions();
  }

  function filterTests() {
    const query = document.getElementById('order-test-search')?.value?.toLowerCase() || '';
    const labels = document.querySelectorAll('#pruebas-list .prueba-item');
    
    labels.forEach(label => {
      const nombre = label.getAttribute('data-nombre') || '';
      if (nombre.includes(query)) {
        label.style.display = 'flex';
      } else {
        label.style.display = 'none';
      }
    });
  }

  function printOrder(orderId) {
    const order = DemoData.getOrderById(orderId);
    if (!order) return;

    const pruebas = DemoData.getPruebas();
    const orderPruebas = order.pruebas.map(id => pruebas.find(p => p.id === id)).filter(Boolean);

    PdfService.generateOrderPdf(order, orderPruebas, true);
  }

  function refresh() {
    window.dispatchEvent(new Event('hashchange'));
    setTimeout(() => Toast.success('Datos actualizados correctamente'), 50);
  }

  function openEditOrderModal(orderId) {
    const order = DemoData.getOrderById(orderId);
    if (!order) return;

    const pruebas = DemoData.getPruebas().filter(p => p.activa);
    const tasa = CurrencyService.getTasa();
    
    Modal.open({
      title: `Editar Orden — ${order.id}`,
      size: 'lg',
      content: `
        <div style="margin-bottom: var(--spacing-lg); padding: var(--spacing-sm) var(--spacing-md); background: var(--color-surface-50); border-radius: var(--radius-md);">
          <div style="font-size: var(--font-size-sm); color: var(--color-surface-500);">Paciente: <strong>${order.paciente}</strong></div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Prioridad</label>
            <select id="edit-order-prioridad">
              <option value="Normal" ${order.prioridad === 'Normal' ? 'selected' : ''}>Normal</option>
              <option value="Urgente" ${order.prioridad === 'Urgente' ? 'selected' : ''}>Urgente</option>
            </select>
          </div>
        </div>
        <div class="form-group" style="margin-top: var(--spacing-base);">
          <label class="form-label">Selección de Pruebas</label>
          <div class="search-input-wrapper" style="margin-bottom: var(--spacing-sm);">
            <span class="search-icon">${Icons.search()}</span>
            <input type="text" id="edit-test-search" placeholder="Buscar prueba por nombre..." oninput="OrdenesPage.filterEditTests()" style="width: 100%;" />
          </div>
          <div id="edit-pruebas-list" style="display: flex; flex-direction: column; gap: var(--spacing-sm); max-height: 250px; overflow-y: auto; padding: 8px; border: 1px solid var(--color-surface-200); border-radius: var(--radius-md);">
            ${pruebas.map(prueba => `
              <label class="edit-prueba-item" data-nombre="${prueba.nombre.toLowerCase()}" style="display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-sm) var(--spacing-md); border-radius: var(--radius-md); cursor: pointer; transition: background var(--transition-fast); width: 100%; text-align: left;" onmouseover="this.style.background='var(--color-surface-50)'" onmouseout="this.style.background='transparent'">
                <input type="checkbox" class="edit-prueba-checkbox" value="${prueba.id}" data-precio="${prueba.precio}" ${order.pruebas.includes(prueba.id) ? 'checked' : ''} onchange="OrdenesPage.updateEditTotal()" style="width: auto; accent-color: var(--color-primary-500); margin: 0;" />
                <div style="flex: 1; text-align: left;">
                  <div style="font-size: var(--font-size-sm); font-weight: var(--font-weight-medium);">${prueba.nombre}</div>
                  <div style="font-size: var(--font-size-xs); color: var(--color-surface-400);">${prueba.categoria}</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-weight: var(--font-weight-semibold); color: var(--color-primary-600);">${formatCurrency(prueba.precio)}</div>
                  <div style="font-size: var(--font-size-xs); color: var(--color-surface-400);">Bs. ${(prueba.precio * tasa).toFixed(2)}</div>
                </div>
              </label>
            `).join('')}
          </div>
        </div>
        <div style="margin-top: var(--spacing-lg); padding-top: var(--spacing-md); border-top: 1px solid var(--color-surface-200); display: flex; justify-content: space-between; align-items: flex-end;">
          <div style="font-size: var(--font-size-sm); color: var(--color-surface-500);">Tasa BCV: Bs. ${tasa.toFixed(2)}</div>
          <div style="text-align: right;">
            <div style="font-size: var(--font-size-sm); color: var(--color-surface-500);">Total de la Orden</div>
            <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-primary-600);" id="edit-order-total-display">${formatCurrency(order.total)}</div>
            <div style="font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--color-surface-500);" id="edit-order-total-bs">Bs. ${(order.total * tasa).toFixed(2)}</div>
          </div>
        </div>
      `,
      footer: `
        <button class="btn btn-secondary" onclick="Modal.close()">Cancelar</button>
        <button class="btn btn-primary" onclick="OrdenesPage.saveEditOrder('${order.id}')">
          ${Icons.check()} Guardar Cambios
        </button>
      `,
    });
  }

  function filterEditTests() {
    const query = document.getElementById('edit-test-search')?.value?.toLowerCase() || '';
    const items = document.querySelectorAll('#edit-pruebas-list .edit-prueba-item');
    items.forEach(item => {
      const name = item.getAttribute('data-nombre') || '';
      if (name.includes(query)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  function updateEditTotal() {
    const checkboxes = document.querySelectorAll('.edit-prueba-checkbox:checked');
    let total = 0;
    checkboxes.forEach(cb => {
      total += parseFloat(cb.getAttribute('data-precio') || 0);
    });
    const display = document.getElementById('edit-order-total-display');
    const displayBs = document.getElementById('edit-order-total-bs');
    if (display) {
      display.textContent = formatCurrency(total);
    }
    if (displayBs) {
      const tasa = CurrencyService.getTasa();
      displayBs.textContent = 'Bs. ' + (total * tasa).toFixed(2);
    }
  }

  function saveEditOrder(orderId) {
    const prioridad = document.getElementById('edit-order-prioridad')?.value;
    const checkboxes = document.querySelectorAll('.edit-prueba-checkbox:checked');
    const pruebasSeleccionadas = Array.from(checkboxes).map(cb => cb.value);
    
    let total = 0;
    checkboxes.forEach(cb => {
      total += parseFloat(cb.getAttribute('data-precio') || 0);
    });

    if (pruebasSeleccionadas.length === 0) {
      Toast.error('Debe seleccionar al menos una prueba');
      return;
    }

    DemoData.updateOrder(orderId, {
      prioridad,
      pruebas: pruebasSeleccionadas,
      total
    });

    Modal.close();
    Toast.success('Orden actualizada correctamente');
    refresh();
  }

  function deleteOrder(orderId) {
    Modal.open({
      title: 'Eliminar Orden',
      size: 'sm',
      content: `
        <div style="text-align: center; color: var(--color-danger); margin-bottom: var(--spacing-md);">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </div>
        <p style="text-align: center; margin-bottom: var(--spacing-sm); font-weight: var(--font-weight-semibold);">¿Está seguro de que desea eliminar la orden ${orderId}?</p>
        <p style="text-align: center; font-size: var(--font-size-sm); color: var(--color-surface-500);">Esta acción borrará facturas y resultados vinculados. No se puede deshacer.</p>
      `,
      footer: `
        <button class="btn btn-secondary" onclick="Modal.close()">Cancelar</button>
        <button class="btn btn-primary" style="background: var(--color-danger); border-color: var(--color-danger);" onclick="OrdenesPage.confirmDeleteOrder('${orderId}')">
          Eliminar
        </button>
      `
    });
  }

  function confirmDeleteOrder(orderId) {
    Modal.close();
    if (DemoData.deleteOrder(orderId)) {
      Toast.success('Orden eliminada exitosamente');
      refresh();
    } else {
      Toast.error('No se pudo eliminar la orden');
    }
  }

  return { 
    render, 
    filterOrders, 
    saveNewOrder, 
    updateTotal, 
    viewOrder, 
    printOrder,
    showSuggestions,
    searchSuggestions,
    hideSuggestions,
    selectPatient,
    filterTests,
    refresh,
    openEditOrderModal,
    filterEditTests,
    updateEditTotal,
    saveEditOrder,
    deleteOrder,
    confirmDeleteOrder
  };
})();
