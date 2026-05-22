/* ============================================================
   PAGE: PACIENTES — Listado, búsqueda y gestión de pacientes
   RF-PAC-001 a RF-PAC-005
   ============================================================ */

const PacientesPage = (() => {

  function render(params = []) {
    if (params.length > 0) {
      return renderDetail(params[0]);
    }
    return renderList();
  }

  function renderList() {
    const patients = DemoData.getPatients();

    return `
      ${TopBar.render('Pacientes')}
      <main class="content" id="page-content">
        <div class="page-header">
          <div>
            <h1 class="page-title">Pacientes</h1>
            <p class="page-subtitle">${patients.length} pacientes registrados</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="PacientesPage.openNewPatientModal()" id="btn-new-patient">
              ${Icons.plus()} Nuevo Paciente
            </button>
          </div>
        </div>

        <!-- Filters -->
        <div class="card" style="margin-bottom: var(--spacing-lg);">
          <div style="display: flex; gap: var(--spacing-base); align-items: center; flex-wrap: wrap;">
            <div class="search-input-wrapper" style="flex: 1; min-width: 250px;">
              <span class="search-icon">${Icons.search()}</span>
              <input type="text" placeholder="Buscar por nombre, cédula, teléfono..." id="patient-search" oninput="PacientesPage.filterPatients()" />
            </div>
            <select id="patient-gender-filter" onchange="PacientesPage.filterPatients()" style="width: auto; min-width: 140px;">
              <option value="">Todos los géneros</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
        </div>

        <!-- Table -->
        <div class="card" style="padding: 0; overflow: hidden;">
          <div style="overflow-x: auto;">
            <table class="data-table" id="patients-table">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Identificación</th>
                  <th>Teléfono</th>
                  <th>Género</th>
                  <th>Visitas</th>
                  <th>Última Visita</th>
                  <th style="text-align: center;">Acciones</th>
                </tr>
              </thead>
              <tbody id="patients-tbody">
                ${renderPatientRows(patients)}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    `;
  }

  function renderPatientRows(patients) {
    if (patients.length === 0) {
      return `
        <tr>
          <td colspan="7">
            <div class="empty-state">
              <div class="empty-state-icon">${Icons.users()}</div>
              <div class="empty-state-title">No se encontraron pacientes</div>
              <div class="empty-state-description">Intenta ajustar los filtros de búsqueda</div>
            </div>
          </td>
        </tr>
      `;
    }

    return patients.map(patient => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: var(--spacing-md);">
            <div class="avatar" style="background: ${getAvatarColor(patient.nombres)};">
              ${getInitials(patient.nombres + ' ' + patient.apellidos)}
            </div>
            <div>
              <div style="font-weight: var(--font-weight-medium); color: var(--color-surface-800);">${patient.nombres} ${patient.apellidos}</div>
              <div style="font-size: var(--font-size-xs); color: var(--color-surface-400);">${patient.id}</div>
            </div>
          </div>
        </td>
        <td style="font-weight: var(--font-weight-medium);">${patient.identificacion}</td>
        <td>${patient.telefono}</td>
        <td><span class="badge ${patient.genero === 'Femenino' ? 'badge-primary' : 'badge-info'}">${patient.genero}</span></td>
        <td style="text-align: center; font-weight: var(--font-weight-semibold);">${patient.totalVisitas}</td>
        <td style="color: var(--color-surface-500);">${formatDate(patient.ultimaVisita)}</td>
        <td style="text-align: center;">
          <div style="display: flex; justify-content: center; gap: 4px;">
            <button class="btn btn-ghost btn-icon" onclick="Router.navigate('/pacientes/${patient.id}')" title="Ver detalle">
              ${Icons.eye()}
            </button>
            <button class="btn btn-ghost btn-icon" onclick="PacientesPage.openEditPatientModal('${patient.id}')" title="Editar">
              ${Icons.edit()}
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function renderDetail(patientId) {
    const patient = DemoData.getPatientById(patientId);
    if (!patient) {
      return `
        ${TopBar.render('Paciente no encontrado')}
        <main class="content">
          <div class="empty-state">
            <div class="empty-state-icon">${Icons.users()}</div>
            <div class="empty-state-title">Paciente no encontrado</div>
            <button class="btn btn-primary" onclick="Router.navigate('/pacientes')">Volver a Pacientes</button>
          </div>
        </main>
      `;
    }

    const patientOrders = DemoData.getOrders().filter(o => o.pacienteId === patientId);
    const patientInvoices = DemoData.getInvoices().filter(i => patientOrders.some(o => o.id === i.ordenId));

    const edad = new Date().getFullYear() - new Date(patient.fechaNacimiento).getFullYear();

    return `
      ${TopBar.render(`${patient.nombres} ${patient.apellidos}`)}
      <main class="content" id="page-content">
        <div class="page-header">
          <div style="display: flex; align-items: center; gap: var(--spacing-lg);">
            <button class="btn btn-ghost btn-icon" onclick="Router.navigate('/pacientes')" title="Volver">
              ${Icons.chevronLeft()}
            </button>
            <div class="avatar avatar-lg" style="background: ${getAvatarColor(patient.nombres)};">
              ${getInitials(patient.nombres + ' ' + patient.apellidos)}
            </div>
            <div>
              <h1 class="page-title">${patient.nombres} ${patient.apellidos}</h1>
              <p class="page-subtitle">${patient.id} · ${patient.identificacion} · ${edad} años</p>
            </div>
          </div>
          <div class="page-actions">
            <button class="btn btn-secondary" onclick="PacientesPage.openEditPatientModal('${patient.id}')">
              ${Icons.edit()} Editar
            </button>
            <button class="btn btn-primary" onclick="Router.navigate('/ordenes/nueva')">
              ${Icons.plus()} Nueva Orden
            </button>
          </div>
        </div>

        <!-- Patient Info Cards -->
        <div class="grid-3col" style="margin-bottom: var(--spacing-xl);">
          <div class="card">
            <div class="card-title" style="margin-bottom: var(--spacing-base);">Información Personal</div>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">Género</span><span style="font-size: var(--font-size-sm);">${patient.genero}</span></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">F. Nacimiento</span><span style="font-size: var(--font-size-sm);">${formatDate(patient.fechaNacimiento)}</span></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">Teléfono</span><span style="font-size: var(--font-size-sm);">${patient.telefono}</span></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">Email</span><span style="font-size: var(--font-size-sm);">${patient.email}</span></div>
            </div>
          </div>
          <div class="card">
            <div class="card-title" style="margin-bottom: var(--spacing-base);">Estadísticas</div>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">Total Visitas</span><span style="font-weight: var(--font-weight-bold); font-size: var(--font-size-lg);">${patient.totalVisitas}</span></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">Última Visita</span><span style="font-size: var(--font-size-sm);">${formatDate(patient.ultimaVisita)}</span></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">Registrado</span><span style="font-size: var(--font-size-sm);">${formatDate(patient.createdAt)}</span></div>
            </div>
          </div>
          <div class="card">
            <div class="card-title" style="margin-bottom: var(--spacing-base);">Contacto Emergencia</div>
            <div style="font-size: var(--font-size-sm); color: var(--color-surface-600); line-height: var(--line-height-relaxed);">
              ${patient.contactoEmergencia}
            </div>
            <div style="margin-top: var(--spacing-base); font-size: var(--font-size-sm); color: var(--color-surface-600);">
              <strong>Dirección:</strong><br>${patient.direccion}
            </div>
          </div>
        </div>

        <!-- Orders History -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">Historial de Órdenes</div>
          </div>
          ${patientOrders.length > 0 ? `
            <table class="data-table">
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Fecha</th>
                  <th>Médico</th>
                  <th>Pruebas</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                ${patientOrders.map(order => `
                  <tr>
                    <td style="font-weight: var(--font-weight-medium); color: var(--color-primary-600);">${order.id}</td>
                    <td>${formatDate(order.fecha)}</td>
                    <td>${order.medicoRemitente}</td>
                    <td>${order.pruebas.length} pruebas</td>
                    <td style="font-weight: var(--font-weight-semibold);">${formatCurrency(order.total)}</td>
                    <td>${getEstadoBadge(order.estado)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : `
            <div class="empty-state">
              <div class="empty-state-icon">${Icons.clipboard()}</div>
              <div class="empty-state-title">Sin órdenes registradas</div>
            </div>
          `}
        </div>
      </main>
    `;
  }

  function filterPatients() {
    const searchQuery = document.getElementById('patient-search')?.value || '';
    const genderFilter = document.getElementById('patient-gender-filter')?.value || '';

    let filtered = DemoData.getPatients();

    if (searchQuery.trim()) {
      filtered = DemoData.searchPatients(searchQuery);
    }

    if (genderFilter) {
      filtered = filtered.filter(p => p.genero === genderFilter);
    }

    const tbody = document.getElementById('patients-tbody');
    if (tbody) {
      tbody.innerHTML = renderPatientRows(filtered);
    }
  }

  function openNewPatientModal() {
    Modal.open({
      title: 'Registrar Nuevo Paciente',
      size: 'lg',
      content: `
        <div id="new-patient-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nombres <span class="required">*</span></label>
              <input type="text" id="np-nombres" placeholder="Nombres del paciente" />
            </div>
            <div class="form-group">
              <label class="form-label">Apellidos <span class="required">*</span></label>
              <input type="text" id="np-apellidos" placeholder="Apellidos del paciente" />
            </div>
          </div>
          <div class="form-row" style="margin-top: var(--spacing-base);">
            <div class="form-group">
              <label class="form-label">Identificación <span class="required">*</span></label>
              <input type="text" id="np-identificacion" placeholder="V-12345678" />
            </div>
            <div class="form-group">
              <label class="form-label">Fecha de Nacimiento <span class="required">*</span></label>
              <input type="date" id="np-fechaNacimiento" />
            </div>
          </div>
          <div class="form-row" style="margin-top: var(--spacing-base);">
            <div class="form-group">
              <label class="form-label">Género <span class="required">*</span></label>
              <select id="np-genero">
                <option value="">Seleccionar...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Teléfono <span class="required">*</span></label>
              <input type="tel" id="np-telefono" placeholder="+58 412-5551234" />
            </div>
          </div>
          <div class="form-row" style="margin-top: var(--spacing-base);">
            <div class="form-group">
              <label class="form-label">Correo Electrónico</label>
              <input type="email" id="np-email" placeholder="paciente@email.com" />
            </div>
            <div class="form-group">
              <label class="form-label">Contacto de Emergencia</label>
              <input type="text" id="np-contactoEmergencia" placeholder="Nombre - Teléfono" />
            </div>
          </div>
          <div class="form-group" style="margin-top: var(--spacing-base);">
            <label class="form-label">Dirección</label>
            <textarea id="np-direccion" rows="2" placeholder="Dirección completa"></textarea>
          </div>
        </div>
      `,
      footer: `
        <button class="btn btn-secondary" onclick="Modal.close()">Cancelar</button>
        <button class="btn btn-primary" onclick="PacientesPage.saveNewPatient()">
          ${Icons.check()} Registrar Paciente
        </button>
      `,
    });
  }

  function saveNewPatient() {
    const patientData = {
      nombres: document.getElementById('np-nombres')?.value?.trim(),
      apellidos: document.getElementById('np-apellidos')?.value?.trim(),
      identificacion: document.getElementById('np-identificacion')?.value?.trim(),
      fechaNacimiento: document.getElementById('np-fechaNacimiento')?.value,
      genero: document.getElementById('np-genero')?.value,
      telefono: document.getElementById('np-telefono')?.value?.trim(),
      email: document.getElementById('np-email')?.value?.trim(),
      contactoEmergencia: document.getElementById('np-contactoEmergencia')?.value?.trim(),
      direccion: document.getElementById('np-direccion')?.value?.trim(),
    };

    if (!patientData.nombres || !patientData.apellidos || !patientData.identificacion || !patientData.genero || !patientData.telefono) {
      Toast.error('Complete todos los campos obligatorios');
      return;
    }

    const newPatient = DemoData.addPatient(patientData);
    Modal.close();
    Toast.success(`Paciente ${newPatient.nombres} ${newPatient.apellidos} registrado con éxito`);
    Router.navigate('/pacientes');
  }

  function openEditPatientModal(patientId) {
    const patient = DemoData.getPatientById(patientId);
    if (!patient) {
      Toast.error('Paciente no encontrado');
      return;
    }

    Modal.open({
      title: 'Editar Paciente',
      size: 'lg',
      content: `
        <div id="edit-patient-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nombres</label>
              <input type="text" id="ep-nombres" value="${patient.nombres}" />
            </div>
            <div class="form-group">
              <label class="form-label">Apellidos</label>
              <input type="text" id="ep-apellidos" value="${patient.apellidos}" />
            </div>
          </div>
          <div class="form-row" style="margin-top: var(--spacing-base);">
            <div class="form-group">
              <label class="form-label">Teléfono</label>
              <input type="tel" id="ep-telefono" value="${patient.telefono}" />
            </div>
            <div class="form-group">
              <label class="form-label">Correo</label>
              <input type="email" id="ep-email" value="${patient.email || ''}" />
            </div>
          </div>
          <div class="form-group" style="margin-top: var(--spacing-base);">
            <label class="form-label">Dirección</label>
            <textarea id="ep-direccion" rows="2">${patient.direccion || ''}</textarea>
          </div>
          <div class="form-group" style="margin-top: var(--spacing-base);">
            <label class="form-label">Contacto de Emergencia</label>
            <input type="text" id="ep-contactoEmergencia" value="${patient.contactoEmergencia || ''}" />
          </div>
        </div>
      `,
      footer: `
        <button class="btn btn-secondary" onclick="Modal.close()">Cancelar</button>
        <button class="btn btn-primary" onclick="PacientesPage.saveEditPatient('${patientId}')">
          ${Icons.check()} Guardar Cambios
        </button>
      `,
    });
  }

  function saveEditPatient(patientId) {
    const updates = {
      nombres: document.getElementById('ep-nombres')?.value?.trim(),
      apellidos: document.getElementById('ep-apellidos')?.value?.trim(),
      telefono: document.getElementById('ep-telefono')?.value?.trim(),
      email: document.getElementById('ep-email')?.value?.trim(),
      direccion: document.getElementById('ep-direccion')?.value?.trim(),
      contactoEmergencia: document.getElementById('ep-contactoEmergencia')?.value?.trim(),
    };
    DemoData.updatePatient(patientId, updates);
    Modal.close();
    Toast.success('Datos del paciente actualizados');
    Router.navigate('/pacientes');
  }

  return { render, filterPatients, openNewPatientModal, saveNewPatient, openEditPatientModal, saveEditPatient };
})();
