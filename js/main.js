
// ════════════════════════════════════════════
// CONFIG — CATÁLOGO DE PRUEBAS
// ════════════════════════════════════════════
const CATALOG = [
    { id: 'hematologia-completa', nombre: 'HEMATOLOGIA COMPLETA', precio: 5.00 },
    { id: 'frotis-de-sangre-periferica-fsp', nombre: 'FROTIS DE SANGRE PERIFERICA (FSP)', precio: 7.00 },
    { id: 'tp-tiempo-de-protombri', nombre: 'TP (TIEMPO DE PROTOMBRINA)', precio: 5.00 },
    { id: 'tpt-tiempo-de-trombola', nombre: 'TPT (TIEMPO DE TROMBOLASTINA)', precio: 5.00 },
    { id: 'fibrinogeno', nombre: 'FIBRINOGENO', precio: 10.00 },
    { id: 'vsg-velocidad-de-sedim', nombre: 'VSG (VELOCIDAD DE SEDIMENTACION GLOBULAR)', precio: 5.00 },
    { id: 'inr-indispensabl-hacer', nombre: 'INR (INDISPENSABL HACER TP) NO SE RECIBE SOLO', precio: 5.00 },
    { id: 'grupo-sanguineo-tipiaj', nombre: 'GRUPO SANGUINEO - TIPIAJE', precio: 5.00 },
    { id: 'glicemia', nombre: 'GLICEMIA', precio: 4.00 },
    { id: 'glicemia-post-pandrial', nombre: 'GLICEMIA POST-PANDRIAL (1 Y MEDIA D. DE COMER)', precio: 4.00 },
    { id: 'urea', nombre: 'UREA', precio: 4.00 },
    { id: 'creatinina', nombre: 'CREATININA', precio: 4.00 },
    { id: 'colesterol', nombre: 'COLESTEROL', precio: 4.00 },
    { id: 'trigliceridos', nombre: 'TRIGLICERIDOS', precio: 4.00 },
    { id: 'acido-urico', nombre: 'ACIDO URICO', precio: 4.00 },
    { id: 'perfil-lipidico-col-tr', nombre: 'PERFIL LIPIDICO (COL,TRIG,HDL,LDL,VLDL)', precio: 17.00 },
    { id: 'transaminas-tgo-tgp-o', nombre: 'TRANSAMINAS (TGO,TGP O AST, ALT)', precio: 5.00 },
    { id: 'bilirrubina-total-y-fr', nombre: 'BILIRRUBINA TOTAL Y FRACCIONADA (BT,BD,BI)', precio: 10.00 },
    { id: 'proteinas-totales-y-fr', nombre: 'PROTEINAS TOTALES Y FRACC. (PROTEOGRAMA)', precio: 8.00 },
    { id: 'amilasa', nombre: 'AMILASA', precio: 13.00 },
    { id: 'lipasa', nombre: 'LIPASA', precio: 13.00 },
    { id: 'ganma-glutamil-transfe', nombre: 'GANMA GLUTAMIL TRANSFERAS AS (GGT)', precio: 13.00 },
    { id: 'indice-homa-necesario', nombre: 'INDICE HOMA (NECESARIO GLIC E INSU EN AYUNAS)', precio: 6.00 },
    { id: 'fosfatasas-alcalinas-f', nombre: 'FOSFATASAS ALCALINAS (FOS. ALC)', precio: 13.00 },
    { id: 'ldh-lactato-deshidrog', nombre: 'LDH (LACTATO DESHIDROGENASA O DESHIDROGENASA LACTICA)', precio: 13.00 },
    { id: 'hierro-serico-fe', nombre: 'HIERRO SERICO (FE)', precio: 13.00 },
    { id: 'tibc-transferrina-res', nombre: 'TIBC (TRANSFERRINA) RESULT. AL OTRO DIA', precio: 13.00 },
    { id: 'de-saturacion', nombre: '% DE SATURACION', precio: 6.00 },
    { id: 'orina-completa', nombre: 'ORINA COMPLETA', precio: 4.00 },
    { id: 'heces-directo-coproana', nombre: 'HECES DIRECTO (COPROANALISIS)', precio: 4.00 },
    { id: 'calcio-total-ca', nombre: 'CALCIO TOTAL (CA)', precio: 8.00 },
    { id: 'potasio-k', nombre: 'POTASIO (K)', precio: 8.00 },
    { id: 'magnesio-mg', nombre: 'MAGNESIO (MG)', precio: 8.00 },
    { id: 'fosforo-p', nombre: 'FOSFORO (P)', precio: 8.00 },
    { id: 'sodio-na', nombre: 'SODIO (NA)', precio: 8.00 },
    { id: 'cloro-cl', nombre: 'CLORO (CL)', precio: 8.00 },
    { id: 'proteina-c-reactiva-p', nombre: 'PROTEINA C REACTIVA (PCR)', precio: 10.00 },
    { id: 'antiestreptolisilina', nombre: 'ANTIESTREPTOLISILINA O (ASO-ASTO)', precio: 13.00 },
    { id: 'hemoglobina-glicocila', nombre: 'HEMOGLOBINA GLICOCILADA (HB-C-A-1)', precio: 15.00 },
    { id: 'hiv-vih', nombre: 'HIV (VIH)', precio: 7.00 },
    { id: 'vdrl', nombre: 'VDRL', precio: 7.00 },
    { id: 'celula-le', nombre: 'CELULA LE', precio: 15.00 },
    { id: 'factor-reumatoideo-fr', nombre: 'FACTOR REUMATOIDEO (FR-RA-LATEX O ARTITEX)', precio: 10.00 },
    { id: 'prueba-de-embarazo-hg', nombre: 'PRUEBA DE EMBARAZO HGC CUALITATIVA', precio: 6.00 },
    { id: 'e-barr-igm', nombre: 'E BARR IGM', precio: 20.00 },
    { id: 'citomegalovirus-igm', nombre: 'CITOMEGALOVIRUS IGM', precio: 13.00 },
    { id: 'dengue-igm', nombre: 'DENGUE IGM', precio: 20.00 },
    { id: 'hepatitis-b', nombre: 'HEPATITIS B', precio: 20.00 },
    { id: 'helicobacter-pylori-i', nombre: 'HELICOBACTER PYLORI IGM', precio: 15.00 },
    { id: 'toxo-test', nombre: 'TOXO TEST', precio: 15.00 },
    { id: 'toxo-igm', nombre: 'TOXO IGM', precio: 15.00 },
    { id: 'ferritina', nombre: 'FERRITINA', precio: 18.00 },
    { id: 'insulina-basal-y-post', nombre: 'INSULINA BASAL Y POST PANDRIAL', precio: 15.00 },
    { id: 'fsh', nombre: 'FSH', precio: 15.00 },
    { id: 'lh', nombre: 'LH', precio: 15.00 },
    { id: 'inmunoglobulina-e-ige', nombre: 'INMUNOGLOBULINA E (IGE)', precio: 18.00 },
    { id: 'progesterona-result-l', nombre: 'PROGESTERONA (RESULT. LOS VIERNES)', precio: 15.00 },
    { id: 'tsh', nombre: 'TSH', precio: 15.00 },
    { id: 't3-libre', nombre: 'T3 LIBRE', precio: 15.00 },
    { id: 't4-libre', nombre: 'T4 LIBRE', precio: 15.00 },
    { id: 'testosterona-libre-y', nombre: 'TESTOSTERONA LIBRE Y TOTAL', precio: 18.00 },
    { id: 'psa-libre-y-total', nombre: 'PSA LIBRE Y TOTAL', precio: 15.00 },
    { id: 'prolactina', nombre: 'PROLACTINA', precio: 15.00 },
    { id: 'beta-cuantitativa', nombre: 'BETA CUANTITATIVA', precio: 15.00 },
    { id: 'cea-antigeno-de-calci', nombre: 'CEA (ANTIGENO DE CALCINOMA EMBRIONARIO)', precio: 18.00 },
    { id: 'ca-125', nombre: 'CA 125', precio: 18.00 },
    { id: 'ca-19-9', nombre: 'CA 19.9', precio: 18.00 },
    { id: 'ca-15-3', nombre: 'CA 15.3', precio: 18.00 },
    { id: 'alfafetoproteinas', nombre: 'ALFAFETOPROTEINAS', precio: 18.00 },
    { id: 'depuracion-de-creat-c', nombre: 'DEPURACION DE CREAT. + CREAT. EN SANGRE', precio: 18.00 },
    { id: 'proteinuria-proteina', nombre: 'PROTEINURIA (PROTEINAS EN ORINA)', precio: 18.00 },
    { id: 'reserva-ovarica-amh-c', nombre: 'RESERVA OVARICA AMH CAMPO ELIAS', precio: 25.00 },
    { id: 'urocultivo', nombre: 'UROCULTIVO', precio: 25.00 },
    { id: 'troponina-campo-elias', nombre: 'TROPONINA CAMPO ELIAS', precio: 25.00 },
];

// ════════════════════════════════════════════
// DB (localStorage)
// ════════════════════════════════════════════
let DB = { pacientes: {}, visitas: [] };

function loadDB() {
    try { const s = localStorage.getItem('lc_db_v2'); if (s) DB = JSON.parse(s); } catch (e) { }
}
function saveDB() {
    localStorage.setItem('lc_db_v2', JSON.stringify(DB));
}
loadDB();

// ════════════════════════════════════════════
// ESTADO DE REGISTRO
// ════════════════════════════════════════════
let regState = {
    cedula: '',
    modo: null,          // 'nuevo' | 'existente'
    selectedTests: {},   // { testId: { resultado: '', imagen: '' } }
};

// ════════════════════════════════════════════
// NAVEGACIÓN
// ════════════════════════════════════════════
function showPage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    const nb = document.getElementById('nav-' + name);
    if (nb) nb.classList.add('active');

    if (name === 'dashboard') renderDashboard();
    if (name === 'expedientes') renderExpedientes();
    if (name === 'registro') { resetRegistro(); }
    if (name === 'reporte') { document.getElementById('reportDate').value = today(); }
}

// ════════════════════════════════════════════
// TOPBAR DATE
// ════════════════════════════════════════════
function today() { return new Date().toISOString().split('T')[0]; }
function fmtFecha(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
function fmtFechaLarga(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
function calcEdad(nac) {
    if (!nac) return '—';
    return Math.floor((Date.now() - new Date(nac)) / (365.25 * 24 * 3600 * 1000)) + ' años';
}
(function updateDate() {
    const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('topbarDate').textContent = new Date().toLocaleDateString('es-VE', opts);
})();

// ════════════════════════════════════════════
// REGISTRO — FLUJO PRINCIPAL
// ════════════════════════════════════════════
function resetRegistro() {
    regState = { cedula: '', modo: null, selectedTests: {} };
    document.getElementById('busq-cedula').value = '';
    hide('bannerNew'); hide('bannerFound');
    hide('formNuevo'); hide('cardLocked'); hide('cardHistorial');
    hide('formEdit'); hide('cardNuevaVisita');
    // clear form fields
    ['f-nombre', 'f-cedula', 'f-genero', 'f-nacimiento', 'f-telefono', 'f-direccion'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.tagName === 'SELECT' ? el.value = '' : el.value = '';
    });
}

function onCedulaInput(val) {
    val = val.trim();
    regState.cedula = val;

    if (val.length < 3) {
        hide('bannerNew'); hide('bannerFound');
        hide('formNuevo'); hide('cardLocked'); hide('cardHistorial');
        hide('formEdit'); hide('cardNuevaVisita');
        return;
    }

    const pac = DB.pacientes[val];
    if (pac) {
        // Paciente EXISTENTE
        regState.modo = 'existente';
        hide('bannerNew'); hide('formNuevo'); hide('formEdit');
        show('bannerFound');
        document.getElementById('bannerFoundText').textContent =
            `Paciente encontrado: ${pac.nombre}`;
        renderCardLocked(pac);
        show('cardLocked');
        renderHistorial(val);
        show('cardHistorial');
        renderNuevaVisita();
        show('cardNuevaVisita');
    } else {
        // Paciente NUEVO
        regState.modo = 'nuevo';
        hide('bannerFound'); hide('cardLocked'); hide('cardHistorial'); hide('formEdit');
        show('bannerNew');
        document.getElementById('f-cedula').value = val;
        show('formNuevo');
        renderNuevaVisita();
        show('cardNuevaVisita');
    }
}

function renderCardLocked(pac) {
    const grid = document.getElementById('patientSummaryGrid');
    const fields = [
        { label: 'Nombre', value: pac.nombre || '—' },
        { label: 'Cédula', value: pac.cedula || '—' },
        { label: 'Género', value: pac.genero || '—' },
        { label: 'Fecha de Nacimiento', value: pac.nacimiento ? fmtFecha(pac.nacimiento) : '—' },
        { label: 'Edad', value: calcEdad(pac.nacimiento) },
        { label: 'Teléfono', value: pac.telefono || '—' },
        { label: 'Dirección', value: pac.direccion || '—' },
    ];
    grid.innerHTML = fields.map(f => `
    <div class="patient-field">
      <span class="pf-label">${f.label}</span>
      <span class="pf-value">${f.value}</span>
    </div>
  `).join('');
}

function desbloquearEdicion() {
    const cedula = regState.cedula?.trim() || document.getElementById('busq-cedula')?.value.trim() || '';
    const pac = DB.pacientes[cedula];
    if (!pac) {
        toast('No se encontró el paciente para editar', 'error');
        return;
    }
    regState.cedula = cedula;
    document.getElementById('fe-nombre').value = pac.nombre || '';
    document.getElementById('fe-cedula').value = pac.cedula || '';
    document.getElementById('fe-genero').value = pac.genero || '';
    document.getElementById('fe-nacimiento').value = pac.nacimiento || '';
    document.getElementById('fe-telefono').value = pac.telefono || '';
    document.getElementById('fe-direccion').value = pac.direccion || '';
    show('formEdit');
    document.getElementById('formEdit')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function cancelarEdicion() { hide('formEdit'); }

function guardarEdicion() {
    const pac = DB.pacientes[regState.cedula];
    if (!pac) return;
    const nom = document.getElementById('fe-nombre').value.trim();
    if (!nom) { toast('El nombre es obligatorio', 'error'); return; }
    pac.nombre = nom;
    pac.genero = document.getElementById('fe-genero').value;
    pac.nacimiento = document.getElementById('fe-nacimiento').value;
    pac.telefono = document.getElementById('fe-telefono').value.trim();
    pac.direccion = document.getElementById('fe-direccion').value.trim();
    saveDB();
    renderCardLocked(pac);
    hide('formEdit');
    toast('Datos actualizados', 'success');
}

function renderHistorial(cedula) {
    const visitas = DB.visitas.filter(v => v.cedula === cedula)
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const el = document.getElementById('historialVisitas');
    if (visitas.length === 0) {
        el.innerHTML = '<p style="color:var(--ink4);font-size:0.85rem;">Sin visitas anteriores.</p>';
        return;
    }
    el.innerHTML = visitas.map(v => `
    <div class="visit-block">
      <div class="visit-block-header">
        <span class="visit-block-date"><i class="bi bi-calendar-event" aria-hidden="true"></i> ${new Date(v.fecha).toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' })} — ${new Date(v.fecha).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}</span>
        <span class="visit-block-total">$${v.total.toFixed(2)}</span>
      </div>
      <div class="visit-tests-list">
        ${v.pruebas.map(p => `
          <div class="visit-test-line">
            <div class="visit-test-line-header">
              <div class="result-dot ${p.resultado ? 'filled' : ''}"></div>
              <span class="vtl-name">${p.nombre}</span>
              <span class="vtl-price">$${p.precio.toFixed(2)}</span>
            </div>
            ${p.resultado ? `<div class="vtl-result"><i class="bi bi-card-text" aria-hidden="true"></i> ${p.resultado}</div>` : ''}
            ${p.imagen ? `<img src="${p.imagen}" class="vtl-img" onclick="openLightbox('${p.imagen}')" title="Ver imagen">` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ════════════════════════════════════════════
// NUEVA VISITA — PRUEBAS
// ════════════════════════════════════════════
function renderNuevaVisita() {
    renderTestsGrid();
    renderSelectedTests();
}

function renderTestsGrid() {
    const el = document.getElementById('testsGrid');
    el.innerHTML = CATALOG.map(p => `
    <div class="test-chip ${regState.selectedTests[p.id] !== undefined ? 'selected' : ''}" onclick="toggleTest('${p.id}')">
      <span class="test-chip-name">${p.nombre}</span>
      <span class="test-chip-price">$${p.precio.toFixed(2)}</span>
      <span class="test-chip-check"><i class="bi bi-check2-circle" aria-hidden="true"></i> Seleccionada</span>
    </div>
  `).join('');
}

function toggleTest(id) {
    if (regState.selectedTests[id] !== undefined) {
        delete regState.selectedTests[id];
    } else {
        regState.selectedTests[id] = { resultado: '', imagen: '', imagenData: '' };
    }
    renderTestsGrid();
    renderSelectedTests();
}

function renderSelectedTests() {
    const el = document.getElementById('selectedTestsSection');
    const bar = document.getElementById('totalBar');
    const amt = document.getElementById('totalBarAmt');
    const ids = Object.keys(regState.selectedTests);
    const items = CATALOG.filter(p => ids.includes(p.id));

    if (items.length === 0) {
        el.innerHTML = '';
        bar.style.display = 'none';
        return;
    }

    el.innerHTML = items.map(p => `
    <div class="test-row-selected">
      <div style="flex:1">
        <div class="test-row-header">
          <span class="test-row-name">${p.nombre}</span>
          <span class="test-row-price">$${p.precio.toFixed(2)}</span>
        </div>
        <div style="margin-top:9px;">
          <div class="test-result-label">Resultado (opcional)</div>
          <div class="test-result-input">
            <input type="text" placeholder="Ingresa el resultado o déjalo en blanco..." 
              value="${escHtml(regState.selectedTests[p.id]?.resultado || '')}"
              oninput="setTestResult('${p.id}', this.value)">
          </div>
        </div>
        <div style="margin-top:8px;">
          <div class="test-result-label">Imagen (opcional)</div>
          <div class="test-img-row">
            <input type="file" accept="image/*" onchange="setTestImage('${p.id}', this)" style="font-size:0.78rem; padding:4px 0; background:none; border:none; color:var(--ink3);">
            <img id="prev-${p.id}" class="test-img-preview ${regState.selectedTests[p.id]?.imagenData ? 'show' : ''}" 
              src="${regState.selectedTests[p.id]?.imagenData || ''}"
              onclick="openLightbox('${regState.selectedTests[p.id]?.imagenData || ''}')">
          </div>
        </div>
      </div>
      <button class="btn btn-danger btn-sm" style="align-self:flex-start;margin-top:2px;" onclick="toggleTest('${p.id}')"><i class="bi bi-x-lg" aria-hidden="true"></i></button>
    </div>
  `).join('');

    const total = items.reduce((s, p) => s + p.precio, 0);
    amt.textContent = '$' + total.toFixed(2);
    bar.style.display = 'flex';
}

function setTestResult(id, val) {
    if (regState.selectedTests[id]) regState.selectedTests[id].resultado = val;
}

function setTestImage(id, input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        if (regState.selectedTests[id]) {
            regState.selectedTests[id].imagenData = e.target.result;
            const prev = document.getElementById('prev-' + id);
            if (prev) { prev.src = e.target.result; prev.classList.add('show'); }
        }
    };
    reader.readAsDataURL(file);
}

function guardarRegistro() {
    const cedula = regState.cedula.trim();
    const ids = Object.keys(regState.selectedTests);

    if (!cedula) { toast('Ingresa una cédula', 'error'); return; }
    if (ids.length === 0) { toast('Selecciona al menos una prueba', 'error'); return; }

    // Validar / crear paciente
    if (regState.modo === 'nuevo') {
        const nombre = document.getElementById('f-nombre').value.trim();
        if (!nombre) { toast('El nombre del paciente es obligatorio', 'error'); return; }
        DB.pacientes[cedula] = {
            nombre,
            cedula,
            genero: document.getElementById('f-genero').value,
            nacimiento: document.getElementById('f-nacimiento').value,
            telefono: document.getElementById('f-telefono').value.trim(),
            direccion: document.getElementById('f-direccion').value.trim(),
        };
    }

    const pruebas = CATALOG
        .filter(p => ids.includes(p.id))
        .map(p => ({
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            resultado: regState.selectedTests[p.id]?.resultado || '',
            imagen: regState.selectedTests[p.id]?.imagenData || '',
        }));

    const visita = {
        id: Date.now().toString(),
        cedula,
        fecha: new Date().toISOString(),
        pruebas,
        total: pruebas.reduce((s, p) => s + p.precio, 0),
    };

    DB.visitas.push(visita);
    saveDB();
    toast(`Registro guardado: ${DB.pacientes[cedula].nombre}`, 'success');
    resetRegistro();
}

// ════════════════════════════════════════════
// EXPEDIENTES
// ════════════════════════════════════════════
function renderExpedientes() {
    const q = document.getElementById('expSearch').value.toLowerCase().trim();
    const el = document.getElementById('expTable');
    const pac = Object.values(DB.pacientes)
        .filter(p => !q || p.nombre.toLowerCase().includes(q) || p.cedula.toLowerCase().includes(q));

    if (pac.length === 0) {
        el.innerHTML = '<div class="empty"><div class="empty-icon"><i class="bi bi-journal-medical" aria-hidden="true"></i></div><p>Sin expedientes encontrados</p></div>';
        return;
    }
    el.innerHTML = `
    <table>
      <thead><tr><th>Paciente</th><th>Cédula</th><th>Género</th><th>Teléfono</th><th>Visitas</th><th>Última</th><th></th></tr></thead>
      <tbody>
        ${pac.map(p => {
        const vis = DB.visitas.filter(v => v.cedula === p.cedula);
        const ult = vis.length ? fmtFecha(vis[vis.length - 1].fecha) : '—';
        return `<tr>
            <td><strong>${p.nombre}</strong></td>
            <td>${p.cedula}</td>
            <td>${p.genero || '—'}</td>
            <td>${p.telefono || '—'}</td>
            <td><span class="badge badge-blue">${vis.length}</span></td>
            <td>${ult}</td>
            <td>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button class="btn btn-outline-blue btn-sm" onclick="verExpediente('${p.cedula}')">Ver expediente</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarPaciente('${p.cedula}')"><i class="bi bi-trash" aria-hidden="true"></i> Eliminar</button>
              </div>
            </td>
          </tr>`;
    }).join('')}
      </tbody>
    </table>`;
}

function verExpediente(cedula) {
    const pac = DB.pacientes[cedula];
    const vis = DB.visitas.filter(v => v.cedula === cedula).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const totalGastado = vis.reduce((s, v) => s + v.total, 0);

    const card = document.getElementById('expIndividualCard');
    const avatarIcon = pac.genero === 'Femenino'
        ? '<i class="bi bi-gender-female" aria-hidden="true"></i>'
        : pac.genero === 'Masculino'
            ? '<i class="bi bi-gender-male" aria-hidden="true"></i>'
            : '<i class="bi bi-person" aria-hidden="true"></i>';

    card.innerHTML = `
    <div class="exp-header-card">
      <div class="patient-avatar">${avatarIcon}</div>
      <div>
        <div class="exp-patient-name">${pac.nombre}</div>
        <div class="exp-patient-ci">CI: ${pac.cedula}</div>
        <div class="exp-meta">
          <span class="meta-pill"><strong>Edad:</strong> ${calcEdad(pac.nacimiento)}</span>
          <span class="meta-pill"><strong>Género:</strong> ${pac.genero || '—'}</span>
          <span class="meta-pill"><strong>Tel:</strong> ${pac.telefono || '—'}</span>
          <span class="meta-pill"><strong>Dirección:</strong> ${pac.direccion || '—'}</span>
          <span class="meta-pill"><strong>Total gastado:</strong> $${totalGastado.toFixed(2)}</span>
        </div>
      </div>
      <div style="margin-left:auto;">
        <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:flex-end;">
          <button class="btn btn-primary btn-sm" onclick="irANuevaVisita('${cedula}')"><i class="bi bi-plus-circle-fill" aria-hidden="true"></i> Nueva Visita</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarPaciente('${cedula}', true)"><i class="bi bi-trash" aria-hidden="true"></i> Eliminar Paciente</button>
        </div>
      </div>
    </div>
    <hr class="div">
    <div class="card-title">Historial de Visitas (${vis.length})</div>
    ${vis.length === 0 ? '<div class="empty" style="padding:20px 0"><p>Sin visitas</p></div>' :
            vis.map(v => `
        <div class="visit-block">
          <div class="visit-block-header">
            <span class="visit-block-date"><i class="bi bi-calendar-event" aria-hidden="true"></i> ${new Date(v.fecha).toLocaleDateString('es-VE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })} — ${new Date(v.fecha).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}</span>
            <span class="visit-block-total">$${v.total.toFixed(2)}</span>
          </div>
          <div class="visit-tests-list">
            ${v.pruebas.map(p => `
              <div class="visit-test-line">
                <div class="visit-test-line-header">
                  <div class="result-dot ${p.resultado ? 'filled' : ''}"></div>
                  <span class="vtl-name">${p.nombre}</span>
                  <span class="vtl-price">$${p.precio.toFixed(2)}</span>
                </div>
                ${p.resultado ? `<div class="vtl-result"><i class="bi bi-card-text" aria-hidden="true"></i> ${p.resultado}</div>` : ''}
                ${p.imagen ? `<img src="${p.imagen}" class="vtl-img" onclick="openLightbox('${p.imagen}')" title="Ver imagen">` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')
        }
  `;

    showPage('exp-individual');
}

function irANuevaVisita(cedula) {
    showPage('registro');
    setTimeout(() => {
        const inp = document.getElementById('busq-cedula');
        inp.value = cedula;
        onCedulaInput(cedula);
    }, 80);
}

function eliminarPaciente(cedula, volverAExpedientes = false) {
    const pac = DB.pacientes[cedula];
    if (!pac) {
        toast('Paciente no encontrado', 'error');
        return;
    }

    const visitasAsociadas = DB.visitas.filter(v => v.cedula === cedula).length;
    const confirmado = window.confirm(
        `Se eliminará el paciente "${pac.nombre}" y ${visitasAsociadas} visita(s) asociada(s). Esta acción no se puede deshacer.\n\n¿Deseas continuar?`
    );
    if (!confirmado) return;

    delete DB.pacientes[cedula];
    DB.visitas = DB.visitas.filter(v => v.cedula !== cedula);

    if (regState.cedula === cedula) {
        resetRegistro();
    }

    saveDB();
    toast('Paciente eliminado correctamente', 'success');

    if (volverAExpedientes) {
        showPage('expedientes');
        return;
    }

    renderExpedientes();
    renderDashboard();
}

// ════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════
let charts = {};

function renderDashboard() {
    const hoy = today();
    const visHoy = DB.visitas.filter(v => v.fecha.startsWith(hoy));
    const revHoy = visHoy.reduce((s, v) => s + v.total, 0);
    const testHoy = visHoy.reduce((s, v) => s + v.pruebas.length, 0);

    document.getElementById('s-today').textContent = visHoy.length;
    document.getElementById('s-revenue').textContent = '$' + revHoy.toFixed(2);
    document.getElementById('s-total').textContent = Object.keys(DB.pacientes).length;
    document.getElementById('s-tests').textContent = testHoy;

    // 7 días
    const labels = [], days = [], revs = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const k = d.toISOString().split('T')[0];
        const dv = DB.visitas.filter(v => v.fecha.startsWith(k));
        labels.push(d.toLocaleDateString('es-VE', { weekday: 'short', day: 'numeric' }));
        days.push(dv.length);
        revs.push(dv.reduce((s, v) => s + v.total, 0));
    }

    // Test counts
    const tCount = {};
    DB.visitas.forEach(v => v.pruebas.forEach(p => { tCount[p.nombre] = (tCount[p.nombre] || 0) + 1; }));

    // Gender
    const gen = { Femenino: 0, Masculino: 0 };
    Object.values(DB.pacientes).forEach(p => {
        if (p.genero === 'Femenino' || p.genero === 'Masculino') gen[p.genero]++;
    });

    const opts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };
    const destroy = id => { if (charts[id]) { charts[id].destroy(); delete charts[id]; } };

    destroy('cPacientes');
    charts['cPacientes'] = new Chart(document.getElementById('cPacientes'), {
        type: 'bar', data: {
            labels,
            datasets: [{ data: days, backgroundColor: 'rgba(21,101,192,0.72)', borderRadius: 6, borderSkipped: false }]
        },
        options: { ...opts, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
    });

    destroy('cPruebas');
    charts['cPruebas'] = new Chart(document.getElementById('cPruebas'), {
        type: 'doughnut', data: {
            labels: Object.keys(tCount),
            datasets: [{ data: Object.values(tCount), backgroundColor: ['#1565C0', '#388E3C', '#7B1FA2', '#E65100', '#00838F'], borderWidth: 0 }]
        },
        options: { ...opts, plugins: { legend: { display: true, position: 'bottom', labels: { font: { size: 11 } } } } }
    });

    destroy('cIngresos');
    charts['cIngresos'] = new Chart(document.getElementById('cIngresos'), {
        type: 'line', data: {
            labels,
            datasets: [{ data: revs, borderColor: '#388E3C', backgroundColor: 'rgba(56,142,60,0.1)', borderWidth: 2.5, fill: true, tension: 0.4, pointBackgroundColor: '#388E3C', pointRadius: 4 }]
        },
        options: { ...opts, scales: { y: { beginAtZero: true, ticks: { callback: v => '$' + v } } } }
    });

    destroy('cGenero');
    charts['cGenero'] = new Chart(document.getElementById('cGenero'), {
        type: 'pie', data: {
            labels: Object.keys(gen),
            datasets: [{ data: Object.values(gen), backgroundColor: ['#EC407A', '#42A5F5', '#AB47BC'], borderWidth: 0 }]
        },
        options: { ...opts, plugins: { legend: { display: true, position: 'bottom', labels: { font: { size: 11 } } } } }
    });

    // Últimas visitas
    const lvEl = document.getElementById('dashLastVisits');
    const recnt = [...DB.visitas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 8);
    if (!recnt.length) { lvEl.innerHTML = '<div class="empty"><div class="empty-icon"><i class="bi bi-hospital" aria-hidden="true"></i></div><p>Sin registros aún</p></div>'; return; }
    lvEl.innerHTML = `
    <div class="table-wrap"><table>
      <thead><tr><th>Paciente</th><th>Cédula</th><th>Fecha y Hora</th><th>Pruebas</th><th>Total</th></tr></thead>
      <tbody>
        ${recnt.map(v => {
        const p = DB.pacientes[v.cedula];
        return `<tr>
            <td><strong>${p?.nombre || '—'}</strong></td>
            <td>${v.cedula}</td>
            <td>${new Date(v.fecha).toLocaleDateString('es-VE', { day: '2-digit', month: 'short' })} ${new Date(v.fecha).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}</td>
            <td>${v.pruebas.map(p => `<span class="badge badge-blue">${p.nombre}</span>`).join(' ')}</td>
            <td><strong>$${v.total.toFixed(2)}</strong></td>
          </tr>`;
    }).join('')}
      </tbody>
    </table></div>`;
}

// ════════════════════════════════════════════
// REPORTE
// ════════════════════════════════════════════
function getVisitasDia(fecha) {
    return DB.visitas.filter(v => v.fecha.startsWith(fecha));
}

function verEnPantalla() {
    const fecha = document.getElementById('reportDate').value;
    if (!fecha) { toast('Selecciona una fecha', 'error'); return; }
    const vis = getVisitasDia(fecha);
    const prev = document.getElementById('reportPreview');
    const cont = document.getElementById('reportContent');
    prev.style.display = 'block';

    if (!vis.length) {
        cont.innerHTML = '<div class="empty"><div class="empty-icon"><i class="bi bi-file-earmark-text" aria-hidden="true"></i></div><p>No hay registros para esta fecha</p></div>';
        return;
    }

    const total = vis.reduce((s, v) => s + v.total, 0);
    cont.innerHTML = `
    <p style="margin-bottom:14px;font-size:0.84rem;color:var(--ink3);">
      <strong>${fmtFechaLarga(fecha)}</strong> | ${vis.length} paciente(s) | Total: <strong>$${total.toFixed(2)}</strong>
    </p>
    <div class="table-wrap"><table>
      <thead><tr><th>#</th><th>Paciente</th><th>Cédula</th><th>Pruebas y Resultados</th><th>Total</th><th>Hora</th></tr></thead>
      <tbody>
        ${vis.map((v, i) => {
        const p = DB.pacientes[v.cedula];
        return `<tr>
            <td>${i + 1}</td>
            <td><strong>${p?.nombre || '—'}</strong></td>
            <td>${v.cedula}</td>
            <td>${v.pruebas.map(p => `<div style="font-size:0.8rem;"><span class="badge badge-blue">${p.nombre}</span>${p.resultado ? ` — ${p.resultado}` : ''}</div>`).join('')}</td>
            <td><strong>$${v.total.toFixed(2)}</strong></td>
            <td>${new Date(v.fecha).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}</td>
          </tr>`;
    }).join('')}
        <tr style="background:var(--blue-xpale);">
          <td colspan="3"><strong>TOTAL DEL DÍA</strong></td>
          <td>${vis.reduce((s, v) => s + v.pruebas.length, 0)} pruebas</td>
          <td colspan="2"><strong>$${total.toFixed(2)}</strong></td>
        </tr>
      </tbody>
    </table></div>`;
}

async function generarPDF() {
    const fecha = document.getElementById('reportDate').value;
    if (!fecha) { toast('Selecciona una fecha', 'error'); return; }
    const vis = getVisitasDia(fecha);
    if (!vis.length) { toast('Sin registros para esta fecha', 'error'); return; }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210, M = 14;
    let y = M;

    // Header gradient-style
    doc.setFillColor(21, 101, 192);
    doc.rect(0, 0, W, 30, 'F');
    doc.setFillColor(46, 125, 50);
    doc.rect(0, 27, W, 4, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('LabClin', M, 13);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Sistema de Gestión de Laboratorio Clínico', M, 20);
    doc.setFontSize(9);
    doc.text(`Reporte Diario — ${fmtFechaLarga(fecha)}`, W - M, 13, { align: 'right' });
    doc.text(`Generado: ${new Date().toLocaleString('es-VE')}`, W - M, 20, { align: 'right' });
    y = 40;

    // Summary row
    const total = vis.reduce((s, v) => s + v.total, 0);
    const bx = (W - M * 2) / 3;
    const summaries = [
        { label: 'PACIENTES ATENDIDOS', value: vis.length.toString() },
        { label: 'PRUEBAS REALIZADAS', value: vis.reduce((s, v) => s + v.pruebas.length, 0).toString() },
        { label: 'TOTAL RECAUDADO', value: '$' + total.toFixed(2) },
    ];
    summaries.forEach((s, i) => {
        const bxX = M + i * (bx + 2);
        doc.setFillColor(240, 247, 255);
        doc.setDrawColor(200, 220, 240);
        doc.roundedRect(bxX, y, bx, 15, 2, 2, 'FD');
        doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(80, 100, 130);
        doc.text(s.label, bxX + bx / 2, y + 5.5, { align: 'center' });
        doc.setFontSize(12); doc.setFont('helvetica', 'bold'); doc.setTextColor(21, 101, 192);
        doc.text(s.value, bxX + bx / 2, y + 12.5, { align: 'center' });
    });
    y += 22;

    // Table header
    doc.setFillColor(21, 101, 192);
    doc.rect(M, y, W - M * 2, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
    const cols = [M + 2, M + 8, M + 42, M + 72, M + 128, M + 160];
    ['#', 'Cédula', 'Paciente', 'Prueba / Resultado', 'Total', 'Hora'].forEach((h, i) =>
        doc.text(h, cols[i], y + 5.5)
    );
    y += 8;

    vis.forEach((v, idx) => {
        const pac = DB.pacientes[v.cedula];
        const rowH = Math.max(9, v.pruebas.length * 7 + 5);
        if (y + rowH > 278) { doc.addPage(); y = 15; }

        if (idx % 2 === 0) { doc.setFillColor(245, 250, 255); doc.rect(M, y, W - M * 2, rowH, 'F'); }
        doc.setTextColor(30, 30, 30); doc.setFontSize(8); doc.setFont('helvetica', 'normal');
        doc.text((idx + 1).toString(), cols[0], y + 6);
        doc.text(v.cedula, cols[1], y + 6);
        doc.setFont('helvetica', 'bold');
        doc.text(doc.splitTextToSize(pac?.nombre || '—', 28)[0], cols[2], y + 6);
        doc.setFont('helvetica', 'normal');

        v.pruebas.forEach((p, pi) => {
            const py = y + 4 + pi * 7;
            doc.setFontSize(7.5);
            doc.setTextColor(21, 101, 192);
            doc.text(p.nombre, cols[3], py);
            if (p.resultado) {
                doc.setTextColor(60, 60, 60);
                const res = doc.splitTextToSize(p.resultado, 40)[0];
                doc.text('→ ' + res, cols[3] + 1, py + 4.5);
            }
        });

        doc.setTextColor(46, 125, 50); doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5);
        doc.text('$' + v.total.toFixed(2), cols[4], y + 6);
        doc.setTextColor(80, 80, 80); doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
        doc.text(new Date(v.fecha).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }), cols[5], y + 6);

        doc.setDrawColor(220, 230, 245);
        doc.line(M, y + rowH, W - M, y + rowH);
        y += rowH;
    });

    // Total
    y += 4;
    if (y + 12 > 278) { doc.addPage(); y = 15; }
    doc.setFillColor(232, 245, 232);
    doc.setDrawColor(165, 214, 167);
    doc.roundedRect(M, y, W - M * 2, 11, 2, 2, 'FD');
    doc.setTextColor(27, 94, 32); doc.setFont('helvetica', 'bold'); doc.setFontSize(9);
    doc.text('TOTAL RECAUDADO DEL DÍA', M + 4, y + 7.5);
    doc.text('$' + total.toFixed(2), W - M - 3, y + 7.5, { align: 'right' });

    // Footer
    const pgs = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pgs; i++) {
        doc.setPage(i);
        doc.setFontSize(7); doc.setTextColor(150, 150, 150); doc.setFont('helvetica', 'normal');
        doc.text('LabClin — Sistema de Gestión de Laboratorio Clínico', M, 293);
        doc.text(`Pág. ${i} de ${pgs}`, W - M, 293, { align: 'right' });
    }

    doc.save(`LabClin_Reporte_${fecha}.pdf`);
    toast('PDF generado y descargado', 'success');
}

// ════════════════════════════════════════════
// UTILS
// ════════════════════════════════════════════
function show(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = '';
    if (el.classList.contains('banner') || el.classList.contains('patient-data-locked')) {
        el.classList.add('show');
    }
}
function hide(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = 'none';
    if (el.classList.contains('banner') || el.classList.contains('patient-data-locked')) {
        el.classList.remove('show');
    }
}
function escHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

function toast(msg, type = '') {
    const c = document.getElementById('toastWrap');
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = msg;
    c.appendChild(el);
    setTimeout(() => el.remove(), 3800);
}

function openLightbox(src) {
    if (!src) return;
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightbox').classList.add('open');
}

// Make sure inline handlers in HTML always resolve these actions.
window.desbloquearEdicion = desbloquearEdicion;
window.cancelarEdicion = cancelarEdicion;
window.guardarEdicion = guardarEdicion;
window.eliminarPaciente = eliminarPaciente;

// INIT
renderDashboard();
