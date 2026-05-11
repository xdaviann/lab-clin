
// CONFIG — CATÁLOGO DE PRUEBAS
const DEFAULT_CATALOG = [
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

const AUTH_USER = 'admin';
const AUTH_PASS = 'admin123';
const ADMIN_DELETE_KEY = AUTH_PASS;
// CATALOG — se carga desde Firestore en initApp()
let CATALOG = [];

// DB — se carga desde Firestore en initApp()
let DB = { pacientes: {}, visitas: [], visitasPendientes: [] };

// ── Helpers de catálogo ───────────────────────────────────────────────────────
function normalizeCatalogItem(item) {
    if (!item || typeof item !== 'object') return null;
    const id = String(item.id || '').trim();
    const nombre = String(item.nombre || '').trim();
    const precio = Number(item.precio);
    if (!id || !nombre || !Number.isFinite(precio)) return null;
    return { id, nombre, precio: Number(precio.toFixed(2)) };
}

function slugifyCatalogName(value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function makeUniqueCatalogId(baseId, ignoreId = '') {
    const safeBase = baseId || 'prueba';
    let candidate = safeBase, counter = 2;
    while (CATALOG.some(item => item.id === candidate && item.id !== ignoreId)) {
        candidate = `${safeBase}-${counter}`;
        counter += 1;
    }
    return candidate;
}

// ESTADO DE REGISTRO

let regState = {
    cedula: '',
    modo: null,
    selectedTests: {},
};

function showAppShell() {
    const login = document.getElementById('loginScreen');
    const app = document.getElementById('appShell');
    if (login) login.style.display = 'none';
    if (app) app.classList.remove('hidden');
}

function attemptLogin() {
    const userEl = document.getElementById('loginUser');
    const passEl = document.getElementById('loginPass');
    const user = userEl?.value.trim() || '';
    const pass = passEl?.value || '';

    if (user === AUTH_USER && pass === AUTH_PASS) {
        showAppShell();
        renderDashboard();
        toast('Bienvenido al sistema', 'success');
        return;
    }

    toast('Credenciales incorrectas', 'error');
    if (passEl) passEl.value = '';
    passEl?.focus();
}

function initLogin() {
    const app = document.getElementById('appShell');
    if (app) app.classList.add('hidden');

    const userEl = document.getElementById('loginUser');
    const passEl = document.getElementById('loginPass');
    [userEl, passEl].forEach(el => {
        if (!el) return;
        el.addEventListener('keydown', e => {
            if (e.key === 'Enter') attemptLogin();
        });
    });

    userEl?.focus();
}


// NAVEGACIÓN
function showPage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    const nb = document.getElementById('nav-' + name);
    if (nb) nb.classList.add('active');

    if (name === 'dashboard') renderDashboard();
    if (name === 'expedientes') renderExpedientes();
    if (name === 'pruebas') renderPruebasAdmin();
    if (name === 'registro') { resetRegistro(); }
    if (name === 'reporte') { document.getElementById('reportDate').value = today(); }
    if (name === 'en-curso') renderEnCurso();
}

// TOPBAR DATE
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

// REGISTRO — FLUJO PRINCIPAL
function resetRegistro() {
    regState = { cedula: '', modo: null, selectedTests: {} };
    document.getElementById('busq-cedula').value = '';
    hide('bannerNew'); hide('bannerFound');
    hide('formNuevo'); hide('cardLocked'); hide('cardHistorial');
    hide('formEdit'); hide('cardNuevaVisita');
    // limpiar campos de ambos formularios
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
    db.collection('pacientes').doc(regState.cedula).set(pac)
        .catch(() => toast('Error al guardar en la nube', 'error'));
    renderCardLocked(pac);
    hide('formEdit');
    toast('Datos actualizados', 'success');
}

// PRUEBAS — MANTENIMIENTO
let pruebaEditId = '';
let pendingPruebaDeleteId = '';

function syncPruebaCodigo() {
    const codigoEl = document.getElementById('pruebaId');
    const nombreEl = document.getElementById('pruebaNombre');
    if (!codigoEl || !nombreEl) return;
    if (pruebaEditId) {
        codigoEl.value = pruebaEditId;
        return;
    }
    codigoEl.value = slugifyCatalogName(nombreEl.value.trim());
}

function setPruebaFormMode(editing) {
    const title = document.getElementById('pruebaFormTitle');
    const button = document.getElementById('btnGuardarPrueba');
    const hint = document.getElementById('pruebaFormHint');

    if (title) title.textContent = editing ? 'Editar prueba' : 'Agregar prueba';
    if (button) {
        button.innerHTML = editing
            ? '<i class="bi bi-check2-circle" aria-hidden="true"></i> Actualizar prueba'
            : '<i class="bi bi-plus-circle-fill" aria-hidden="true"></i> Agregar prueba';
    }
    if (hint) {
        hint.textContent = editing
            ? 'El código se conserva. Solo se actualizan nombre y precio.'
            : 'El código se genera automáticamente a partir del nombre.';
    }
}

function resetPruebaForm() {
    pruebaEditId = '';
    const idEl = document.getElementById('pruebaId');
    const nombreEl = document.getElementById('pruebaNombre');
    const precioEl = document.getElementById('pruebaPrecio');
    if (idEl) idEl.value = '';
    if (nombreEl) nombreEl.value = '';
    if (precioEl) precioEl.value = '';
    setPruebaFormMode(false);
}

function renderPruebasAdmin() {
    const table = document.getElementById('pruebasAdminTable');
    const countEl = document.getElementById('pruebasAdminCount');
    const searchEl = document.getElementById('pruebasSearch');
    const query = searchEl ? searchEl.value.toLowerCase().trim() : '';

    if (!table) return;

    let filteredCatalog = CATALOG;
    if (query) {
        filteredCatalog = CATALOG.filter(item =>
            item.nombre.toLowerCase().includes(query) ||
            item.id.toLowerCase().includes(query)
        );
    }

    if (countEl) {
        countEl.textContent = `${filteredCatalog.length} prueba${filteredCatalog.length === 1 ? '' : 's'} registradas`;
    }

    if (filteredCatalog.length === 0) {
        if (query && CATALOG.length > 0) {
            table.innerHTML = '<div class="empty"><div class="empty-icon"><i class="bi bi-search" aria-hidden="true"></i></div><p>No se encontraron pruebas</p></div>';
        } else {
            table.innerHTML = '<div class="empty"><div class="empty-icon"><i class="bi bi-flask" aria-hidden="true"></i></div><p>No hay pruebas registradas</p></div>';
        }
        return;
    }

    table.innerHTML = `
    <table>
      <thead><tr><th>Código</th><th>Nombre</th><th>Precio</th><th></th></tr></thead>
      <tbody>
        ${filteredCatalog.map(item => `
          <tr>
            <td><span class="badge badge-gray">${item.id}</span></td>
            <td><strong>${item.nombre}</strong></td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>
              <div class="pruebas-row-actions">
                <button class="btn btn-outline-blue btn-sm" onclick="editarPrueba('${item.id}')"><i class="bi bi-pencil-square" aria-hidden="true"></i> Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarPrueba('${item.id}')"><i class="bi bi-trash" aria-hidden="true"></i> Eliminar</button>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;
}

function editarPrueba(id) {
    const prueba = CATALOG.find(item => item.id === id);
    if (!prueba) {
        toast('No se encontró la prueba', 'error');
        return;
    }

    pruebaEditId = prueba.id;
    const idEl = document.getElementById('pruebaId');
    const nombreEl = document.getElementById('pruebaNombre');
    const precioEl = document.getElementById('pruebaPrecio');
    if (idEl) idEl.value = prueba.id;
    if (nombreEl) nombreEl.value = prueba.nombre;
    if (precioEl) precioEl.value = prueba.precio.toFixed(2);
    setPruebaFormMode(true);
    showPage('pruebas');
    nombreEl?.focus();
}

function guardarPrueba() {
    const nombreEl = document.getElementById('pruebaNombre');
    const precioEl = document.getElementById('pruebaPrecio');
    const nombre = nombreEl?.value.trim() || '';
    const precio = Number(precioEl?.value);

    if (!nombre) {
        toast('El nombre de la prueba es obligatorio', 'error');
        return;
    }
    if (!Number.isFinite(precio) || precio < 0) {
        toast('Ingresa un precio válido', 'error');
        return;
    }

    const nombreNormalizado = nombre.toUpperCase();

    if (pruebaEditId) {
        const index = CATALOG.findIndex(item => item.id === pruebaEditId);
        if (index === -1) {
            toast('No se encontró la prueba a editar', 'error');
            resetPruebaForm();
            return;
        }
        CATALOG[index] = {
            ...CATALOG[index],
            nombre: nombreNormalizado,
            precio: Number(precio.toFixed(2)),
        };
        const updatedItem = CATALOG[index];
        db.collection('catalogo').doc(updatedItem.id).set(updatedItem)
            .catch(() => toast('Error al guardar en la nube', 'error'));
        renderPruebasAdmin();
        renderTestsGrid();
        renderSelectedTests();
        toast('Prueba actualizada', 'success');
        resetPruebaForm();
        return;
    }

    const baseId = slugifyCatalogName(nombreNormalizado) || 'prueba';
    const id = makeUniqueCatalogId(baseId);
    const newItem = { id, nombre: nombreNormalizado, precio: Number(precio.toFixed(2)) };
    CATALOG = [...CATALOG, newItem];
    db.collection('catalogo').doc(id).set(newItem)
        .catch(() => toast('Error al guardar en la nube', 'error'));
    renderPruebasAdmin();
    renderTestsGrid();
    renderSelectedTests();
    toast('Prueba agregada', 'success');
    resetPruebaForm();
}

function eliminarPrueba(id) {
    const prueba = CATALOG.find(item => item.id === id);
    if (!prueba) {
        toast('No se encontró la prueba', 'error');
        return;
    }

    const confirmacion = window.confirm(`¿Eliminar la prueba "${prueba.nombre}"? Esta acción no se puede deshacer.`);
    if (!confirmacion) return;

    pendingPruebaDeleteId = id;
    const modalText = document.getElementById('adminDeleteText');
    if (modalText) {
        modalText.textContent = `Vas a eliminar "${prueba.nombre}" del catálogo. Escribe la clave de admin para continuar.`;
    }
    const modal = document.getElementById('adminDeleteModal');
    const input = document.getElementById('adminDeleteKeyInput');
    if (modal) modal.classList.add('open');
    setTimeout(() => input?.focus(), 0);
}

function cerrarModalClaveAdmin() {
    pendingPruebaDeleteId = '';
    const modal = document.getElementById('adminDeleteModal');
    const input = document.getElementById('adminDeleteKeyInput');
    if (modal) modal.classList.remove('open');
    if (input) input.value = '';
}

function confirmarEliminarPrueba() {
    const input = document.getElementById('adminDeleteKeyInput');
    const clave = input?.value.trim() || '';
    if (clave !== ADMIN_DELETE_KEY) {
        toast('Clave de admin incorrecta', 'error');
        input?.focus();
        return;
    }

    const id = pendingPruebaDeleteId;
    const prueba = CATALOG.find(item => item.id === id);
    if (!id || !prueba) {
        cerrarModalClaveAdmin();
        toast('No se encontró la prueba', 'error');
        return;
    }

    CATALOG = CATALOG.filter(item => item.id !== id);
    delete regState.selectedTests[id];
    if (pruebaEditId === id) resetPruebaForm();
    db.collection('catalogo').doc(id).delete()
        .catch(() => toast('Error al eliminar en la nube', 'error'));
    renderPruebasAdmin();
    renderTestsGrid();
    renderSelectedTests();
    cerrarModalClaveAdmin();
    toast('Prueba eliminada', 'success');
}

function initPruebasAdmin() {
    const nombreEl = document.getElementById('pruebaNombre');
    if (nombreEl && !nombreEl.dataset.bound) {
        nombreEl.addEventListener('input', () => {
            if (!pruebaEditId) syncPruebaCodigo();
        });
        nombreEl.dataset.bound = '1';
    }

    const precioEl = document.getElementById('pruebaPrecio');
    if (precioEl && !precioEl.dataset.bound) {
        precioEl.addEventListener('input', () => { });
        precioEl.dataset.bound = '1';
    }

    resetPruebaForm();
    renderPruebasAdmin();
    syncPruebaCodigo();
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

// NUEVA VISITA — PRUEBAS
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

    el.innerHTML = `
    <div class="selected-list">
      ${items.map(p => `
      <div class="test-row-selected">
        <span class="test-row-name">${p.nombre}</span>
        <span class="test-row-price">$${p.precio.toFixed(2)}</span>
        <button class="btn btn-danger btn-sm" onclick="toggleTest('${p.id}')"><i class="bi bi-x-lg" aria-hidden="true"></i></button>
      </div>
      `).join('')}
    </div>`;

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
            lista: false,
            resultado: '',
            imagen: '',
        }));

    const visita = {
        id: Date.now().toString(),
        cedula,
        fecha: new Date().toISOString(),
        pruebas,
        total: pruebas.reduce((s, p) => s + p.precio, 0),
    };

    DB.visitasPendientes.push(visita);
    if (regState.modo === 'nuevo') {
        db.collection('pacientes').doc(cedula).set(DB.pacientes[cedula])
            .catch(() => toast('Error al guardar paciente en la nube', 'error'));
    }
    db.collection('visitasPendientes').doc(visita.id).set(visita)
        .catch(() => toast('Error al guardar visita en la nube', 'error'));
    actualizarBadgeEnCurso();
    toast(`Pruebas enviadas a "Pruebas en Curso": ${DB.pacientes[cedula].nombre}`, 'success');
    resetRegistro();
}

// ─── PRUEBAS EN CURSO ────────────────────────────────────────────────────────

function actualizarBadgeEnCurso() {
    const count = DB.visitasPendientes.length;
    const badge = document.getElementById('badgeEnCurso');
    if (!badge) return;
    if (count > 0) {
        badge.textContent = count;
        badge.style.display = 'inline-flex';
    } else {
        badge.style.display = 'none';
    }
}

function renderEnCurso() {
    actualizarBadgeEnCurso();
    const el = document.getElementById('enCursoList');
    const searchEl = document.getElementById('enCursoSearch');
    const query = searchEl ? searchEl.value.toLowerCase().trim() : '';

    if (!el) return;

    let filteredPendientes = DB.visitasPendientes;
    if (query) {
        filteredPendientes = DB.visitasPendientes.filter(v => {
            const pac = DB.pacientes[v.cedula];
            const nombre = pac ? pac.nombre.toLowerCase() : '';
            return nombre.includes(query) || v.cedula.toLowerCase().includes(query);
        });
    }

    if (filteredPendientes.length === 0) {
        if (query && DB.visitasPendientes.length > 0) {
            el.innerHTML = `
            <div class="empty">
              <div class="empty-icon"><i class="bi bi-search" aria-hidden="true"></i></div>
              <p>No se encontraron pacientes que coincidan con la búsqueda</p>
            </div>`;
        } else {
            el.innerHTML = `
            <div class="empty">
              <div class="empty-icon"><i class="bi bi-hourglass" aria-hidden="true"></i></div>
              <p>No hay pruebas en curso</p>
            </div>`;
        }
        return;
    }

    el.innerHTML = filteredPendientes.map(v => {
        const pac = DB.pacientes[v.cedula];
        const todasListas = v.pruebas.every(p => p.lista);
        return `
        <div class="ec-card" id="ec-${v.id}">
          <div class="ec-card-header">
            <div class="ec-patient-info">
              <div class="ec-patient-name">${pac?.nombre || '—'}</div>
              <div class="ec-patient-meta">
                <span><i class="bi bi-person-vcard" aria-hidden="true"></i> ${v.cedula}</span>
                <span><i class="bi bi-calendar-event" aria-hidden="true"></i>
                  ${new Date(v.fecha).toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  ${new Date(v.fecha).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span><strong>$${v.total.toFixed(2)}</strong></span>
              </div>
            </div>
            <div class="ec-header-actions">
              ${todasListas
                ? `<button class="btn btn-green btn-sm" onclick="moverAlExpediente('${v.id}')">
                     <i class="bi bi-check2-circle" aria-hidden="true"></i> Pasar al Expediente
                   </button>`
                : `<span class="badge badge-orange">Pendiente</span>`
            }
            </div>
          </div>
          <div class="ec-pruebas-list">
            ${v.pruebas.map(p => `
            <div class="ec-prueba-row ${p.lista ? 'is-lista' : ''}" id="ecpr-${v.id}-${p.id}">
              <div class="ec-prueba-info">
                <div class="ec-prueba-status-dot ${p.lista ? 'done' : ''}"></div>
                <span class="ec-prueba-nombre">${p.nombre}</span>
                <span class="ec-prueba-precio">$${p.precio.toFixed(2)}</span>
                ${p.lista ? `<span class="badge badge-green">Lista</span>` : `<span class="badge badge-gray">Pendiente</span>`}
              </div>
              <div class="ec-prueba-resultado">
                ${p.resultado ? `<div class="vtl-result"><i class="bi bi-card-text" aria-hidden="true"></i> ${escHtml(p.resultado)}</div>` : ''}
                ${p.imagen ? `<img src="${p.imagen}" class="vtl-img" onclick="openLightbox('${p.imagen}')" title="Ver imagen">` : ''}
              </div>
              <div class="ec-prueba-actions">
                ${!p.lista
                    ? `<button class="btn btn-outline-blue btn-sm" onclick="abrirMarcarLista('${v.id}', '${p.id}')">
                       <i class="bi bi-check2-circle" aria-hidden="true"></i> Marcar como Lista
                     </button>`
                    : `<button class="btn btn-secondary btn-sm" onclick="abrirMarcarLista('${v.id}', '${p.id}')">
                       <i class="bi bi-pencil-square" aria-hidden="true"></i> Editar
                     </button>`
                }
              </div>
            </div>
            `).join('')}
          </div>
        </div>`;
    }).join('');
}

// estado temporal del modal de marcar lista
let _mlVisitaId = '';
let _mlPruebaId = '';
let _mlImagenData = '';

function abrirMarcarLista(visitaId, pruebaId) {
    const visita = DB.visitasPendientes.find(v => v.id === visitaId);
    if (!visita) return;
    const prueba = visita.pruebas.find(p => p.id === pruebaId);
    if (!prueba) return;

    _mlVisitaId = visitaId;
    _mlPruebaId = pruebaId;
    _mlImagenData = prueba.imagen || '';

    const modal = document.getElementById('mlModal');
    document.getElementById('mlNombrePrueba').textContent = prueba.nombre;
    document.getElementById('mlResultado').value = prueba.resultado || '';
    document.getElementById('mlImgPreview').src = _mlImagenData;
    document.getElementById('mlImgPreview').style.display = _mlImagenData ? 'block' : 'none';
    document.getElementById('mlFileInput').value = '';
    if (modal) modal.classList.add('open');
}

function cerrarModalMarcarLista() {
    _mlVisitaId = '';
    _mlPruebaId = '';
    _mlImagenData = '';
    const modal = document.getElementById('mlModal');
    if (modal) modal.classList.remove('open');
}

function mlOnFileChange(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        _mlImagenData = e.target.result;
        const prev = document.getElementById('mlImgPreview');
        if (prev) { prev.src = _mlImagenData; prev.style.display = 'block'; }
    };
    reader.readAsDataURL(file);
}

function confirmarMarcarLista() {
    const visita = DB.visitasPendientes.find(v => v.id === _mlVisitaId);
    if (!visita) { cerrarModalMarcarLista(); return; }
    const prueba = visita.pruebas.find(p => p.id === _mlPruebaId);
    if (!prueba) { cerrarModalMarcarLista(); return; }

    prueba.lista = true;
    prueba.resultado = document.getElementById('mlResultado').value.trim();
    prueba.imagen = _mlImagenData;

    db.collection('visitasPendientes').doc(_mlVisitaId).set(visita)
        .catch(() => toast('Error al guardar en la nube', 'error'));
    cerrarModalMarcarLista();
    renderEnCurso();
    toast('Prueba marcada como lista', 'success');
}

function moverAlExpediente(visitaId) {
    const idx = DB.visitasPendientes.findIndex(v => v.id === visitaId);
    if (idx === -1) { toast('Visita no encontrada', 'error'); return; }

    const visita = DB.visitasPendientes[idx];
    if (!visita.pruebas.every(p => p.lista)) {
        toast('Aún hay pruebas pendientes', 'error');
        return;
    }

    // Limpiar campo helper antes de mover
    const visitaFinal = {
        id: visita.id,
        cedula: visita.cedula,
        fecha: visita.fecha,
        total: visita.total,
        pruebas: visita.pruebas.map(p => ({
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            resultado: p.resultado,
            imagen: p.imagen,
        })),
    };

    DB.visitas.push(visitaFinal);
    DB.visitasPendientes.splice(idx, 1);
    const _batch = db.batch();
    _batch.set(db.collection('visitas').doc(visitaFinal.id), visitaFinal);
    _batch.delete(db.collection('visitasPendientes').doc(visitaId));
    _batch.commit().catch(() => toast('Error al mover al expediente', 'error'));
    actualizarBadgeEnCurso();
    renderEnCurso();
    toast(`Visita movida al expediente`, 'success');
}

// EXPEDIENTES
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
            <div style="display:flex;align-items:center;gap:10px;">
              <span class="visit-block-total">$${v.total.toFixed(2)}</span>
              <button class="btn btn-gold btn-sm" onclick="generarFacturaVisita('${v.id}')" title="Generar factura PDF">
                <i class="bi bi-receipt" aria-hidden="true"></i> Factura
              </button>
            </div>
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
    const pendientesAsociadas = DB.visitasPendientes.filter(v => v.cedula === cedula).length;
    const confirmado = window.confirm(
        `Se eliminará el paciente "${pac.nombre}", ${visitasAsociadas} visita(s) en expediente y ${pendientesAsociadas} visita(s) en curso. Esta acción no se puede deshacer.\n\n¿Deseas continuar?`
    );
    if (!confirmado) return;

    const visitasElim = DB.visitas.filter(v => v.cedula === cedula);
    const pendElim = DB.visitasPendientes.filter(v => v.cedula === cedula);
    delete DB.pacientes[cedula];
    DB.visitas = DB.visitas.filter(v => v.cedula !== cedula);
    DB.visitasPendientes = DB.visitasPendientes.filter(v => v.cedula !== cedula);

    if (regState.cedula === cedula) { resetRegistro(); }

    const _delBatch = db.batch();
    _delBatch.delete(db.collection('pacientes').doc(cedula));
    visitasElim.forEach(v => _delBatch.delete(db.collection('visitas').doc(v.id)));
    pendElim.forEach(v => _delBatch.delete(db.collection('visitasPendientes').doc(v.id)));
    _delBatch.commit().catch(() => toast('Error al eliminar en la nube', 'error'));

    actualizarBadgeEnCurso();

    toast('Paciente eliminado correctamente', 'success');

    if (volverAExpedientes) {
        showPage('expedientes');
        return;
    }

    renderExpedientes();
    renderDashboard();
}

// DASHBOARD
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
    actualizarBadgeEnCurso();

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

    // Pruebas más solicitadas
    const tCount = {};
    DB.visitas.forEach(v => v.pruebas.forEach(p => { tCount[p.nombre] = (tCount[p.nombre] || 0) + 1; }));

    // género
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

// REPORTES ────────────────────────────────────────────────────────────────────

function getVisitasDia(fecha) {
    return DB.visitas.filter(v => v.fecha.startsWith(fecha));
}

function getVisitasRango(fechaInicio, fechaFin) {
    const ini = new Date(fechaInicio + 'T00:00:00');
    const fin = new Date(fechaFin   + 'T23:59:59');
    return DB.visitas.filter(v => {
        const d = new Date(v.fecha);
        return d >= ini && d <= fin;
    });
}

function getLunesDomingo(anyDateStr) {
    const d = new Date(anyDateStr + 'T12:00:00');
    const dow = d.getDay(); // 0=Sun..6=Sat
    const diff = dow === 0 ? -6 : 1 - dow;
    const lunes = new Date(d); lunes.setDate(d.getDate() + diff);
    const domingo = new Date(lunes); domingo.setDate(lunes.getDate() + 6);
    return {
        lunes:   lunes.toISOString().split('T')[0],
        domingo: domingo.toISOString().split('T')[0],
    };
}

function getPrimerUltimoDiaMes(yearMonth) {  // "YYYY-MM"
    const [y, m] = yearMonth.split('-').map(Number);
    const primer = `${yearMonth}-01`;
    const ultimo = new Date(y, m, 0); // día 0 del mes siguiente = último del mes actual
    const pad = n => String(n).padStart(2, '0');
    const ultimoStr = `${y}-${pad(m)}-${pad(ultimo.getDate())}`;
    return { primer, ultimo: ultimoStr };
}

function switchReportTab(tab) {
    ['diario', 'semanal', 'mensual'].forEach(t => {
        document.getElementById(`tab-${t}`).classList.toggle('active', t === tab);
        document.getElementById(`panel-${t}`).style.display = t === tab ? '' : 'none';
    });
    // Ocultar preview al cambiar tab
    const prev = document.getElementById('reportPreview');
    if (prev) prev.style.display = 'none';
}

// ── Helpers de renderizado de tabla de visitas ────────────────────────────────
function _renderTablaVisitas(vis) {
    if (!vis.length) return '<div class="empty"><div class="empty-icon"><i class="bi bi-file-earmark-text" aria-hidden="true"></i></div><p>No hay registros para este período</p></div>';
    const total = vis.reduce((s, v) => s + v.total, 0);
    return `
    <p style="margin-bottom:14px;font-size:0.84rem;color:var(--ink3);">
      ${vis.length} paciente(s) | Total: <strong>$${total.toFixed(2)}</strong>
    </p>
    <div class="table-wrap"><table>
      <thead><tr><th>#</th><th>Fecha</th><th>Paciente</th><th>Cédula</th><th>Pruebas</th><th>Total</th></tr></thead>
      <tbody>
        ${vis.map((v, i) => {
            const p = DB.pacientes[v.cedula];
            return `<tr>
                <td>${i + 1}</td>
                <td style="white-space:nowrap;">${new Date(v.fecha).toLocaleDateString('es-VE', { day:'2-digit', month:'short' })} ${new Date(v.fecha).toLocaleTimeString('es-VE', { hour:'2-digit', minute:'2-digit' })}</td>
                <td><strong>${p?.nombre || '—'}</strong></td>
                <td>${v.cedula}</td>
                <td>${v.pruebas.map(p => `<div style="font-size:0.78rem;"><span class="badge badge-blue">${p.nombre}</span>${p.resultado ? ` — ${p.resultado}` : ''}</div>`).join('')}</td>
                <td><strong>$${v.total.toFixed(2)}</strong></td>
            </tr>`;
        }).join('')}
        <tr style="background:var(--blue-xpale);">
          <td colspan="4"><strong>TOTAL DEL PERÍODO</strong></td>
          <td>${vis.reduce((s, v) => s + v.pruebas.length, 0)} pruebas</td>
          <td><strong>$${total.toFixed(2)}</strong></td>
        </tr>
      </tbody>
    </table></div>`;
}

// ── Semanal ───────────────────────────────────────────────────────────────────
function verEnPantallaSemanal() {
    const val = document.getElementById('reportSemana').value;
    if (!val) { toast('Selecciona una fecha de la semana', 'error'); return; }
    const { lunes, domingo } = getLunesDomingo(val);
    const vis = getVisitasRango(lunes, domingo);
    const prev = document.getElementById('reportPreview');
    const cont = document.getElementById('reportContent');
    const title = document.getElementById('reportPreviewTitle');
    prev.style.display = 'block';
    if (title) title.textContent = `Vista Previa — Semana del ${fmtFechaLarga(lunes)} al ${fmtFechaLarga(domingo)}`;
    cont.innerHTML = _renderTablaVisitas(vis);
}

function verEnPantallaMensual() {
    const val = document.getElementById('reportMes').value;
    if (!val) { toast('Selecciona un mes', 'error'); return; }
    const { primer, ultimo } = getPrimerUltimoDiaMes(val);
    const vis = getVisitasRango(primer, ultimo);
    const prev = document.getElementById('reportPreview');
    const cont = document.getElementById('reportContent');
    const title = document.getElementById('reportPreviewTitle');
    prev.style.display = 'block';
    const [y, m] = val.split('-');
    const nombreMes = new Date(Number(y), Number(m) - 1, 1).toLocaleDateString('es-VE', { month: 'long', year: 'numeric' });
    if (title) title.textContent = `Vista Previa — ${nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1)}`;
    cont.innerHTML = _renderTablaVisitas(vis);
}

// ── PDF helpers compartidos ───────────────────────────────────────────────────
function _pdfHeader(doc, W, M, titulo, subtitulo) {
    doc.setFillColor(21, 101, 192);
    doc.rect(0, 0, W, 30, 'F');
    doc.setFillColor(46, 125, 50);
    doc.rect(0, 27, W, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(18);
    doc.text('LabClin Ordoñez', M, 13);
    doc.setFontSize(8.5); doc.setFont('helvetica', 'normal');
    doc.text('Sistema de Gestión de Laboratorio Clínico', M, 20);
    doc.text(titulo, W - M, 13, { align: 'right' });
    doc.text(subtitulo, W - M, 20, { align: 'right' });
    doc.text(`Generado: ${new Date().toLocaleString('es-VE')}`, W - M, 26, { align: 'right' });
}

function _pdfSummaryBoxes(doc, W, M, y, boxes) {
    const bx = (W - M * 2) / boxes.length;
    boxes.forEach((s, i) => {
        const bxX = M + i * bx;
        doc.setFillColor(240, 247, 255); doc.setDrawColor(200, 220, 240);
        doc.roundedRect(bxX, y, bx - 2, 15, 2, 2, 'FD');
        doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(80, 100, 130);
        doc.text(s.label, bxX + (bx - 2) / 2, y + 5.5, { align: 'center' });
        doc.setFontSize(12); doc.setFont('helvetica', 'bold'); doc.setTextColor(21, 101, 192);
        doc.text(s.value, bxX + (bx - 2) / 2, y + 12.5, { align: 'center' });
    });
    return y + 22;
}

function _pdfTableVisitas(doc, vis, W, M, startY) {
    let y = startY;
    doc.setFillColor(21, 101, 192);
    doc.rect(M, y, W - M * 2, 8, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
    const cols = [M + 2, M + 8, M + 38, M + 72, M + 118, M + 160];
    ['#', 'Fecha', 'Paciente', 'Cédula', 'Prueba / Resultado', 'Total'].forEach((h, i) =>
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
        doc.text(new Date(v.fecha).toLocaleDateString('es-VE', { day:'2-digit', month:'2-digit' }), cols[1], y + 6);
        doc.setFont('helvetica', 'bold');
        doc.text(doc.splitTextToSize(pac?.nombre || '—', 30)[0], cols[2], y + 6);
        doc.setFont('helvetica', 'normal');
        doc.text(v.cedula, cols[3], y + 6);
        v.pruebas.forEach((p, pi) => {
            const py = y + 4 + pi * 7;
            doc.setFontSize(7); doc.setTextColor(21, 101, 192);
            doc.text(p.nombre, cols[4], py);
            if (p.resultado) { doc.setTextColor(60, 60, 60); doc.text('→ ' + doc.splitTextToSize(p.resultado, 38)[0], cols[4] + 1, py + 4); }
        });
        doc.setFontSize(8.5); doc.setTextColor(46, 125, 50); doc.setFont('helvetica', 'bold');
        doc.text('$' + v.total.toFixed(2), cols[5], y + 6);
        doc.setDrawColor(220, 230, 245);
        doc.line(M, y + rowH, W - M, y + rowH);
        y += rowH;
    });

    // Total fila
    y += 4;
    if (y + 12 > 278) { doc.addPage(); y = 15; }
    const totalGral = vis.reduce((s, v) => s + v.total, 0);
    doc.setFillColor(232, 245, 232); doc.setDrawColor(165, 214, 167);
    doc.roundedRect(M, y, W - M * 2, 11, 2, 2, 'FD');
    doc.setTextColor(27, 94, 32); doc.setFont('helvetica', 'bold'); doc.setFontSize(9);
    doc.text('TOTAL RECAUDADO DEL PERÍODO', M + 4, y + 7.5);
    doc.text('$' + totalGral.toFixed(2), W - M - 3, y + 7.5, { align: 'right' });
    return y;
}

function _pdfFooter(doc, W, M) {
    const pgs = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pgs; i++) {
        doc.setPage(i);
        doc.setFontSize(7); doc.setTextColor(150, 150, 150); doc.setFont('helvetica', 'normal');
        doc.text('LabClin Ordoñez — Sistema de Gestión de Laboratorio Clínico', M, 293);
        doc.text(`Pág. ${i} de ${pgs}`, W - M, 293, { align: 'right' });
    }
}

async function generarPDFSemanal() {
    const val = document.getElementById('reportSemana').value;
    if (!val) { toast('Selecciona una fecha de la semana', 'error'); return; }
    const { lunes, domingo } = getLunesDomingo(val);
    const vis = getVisitasRango(lunes, domingo);
    if (!vis.length) { toast('Sin registros para esta semana', 'error'); return; }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210, M = 14;
    _pdfHeader(doc, W, M, `Reporte Semanal`, `${fmtFecha(lunes)} — ${fmtFecha(domingo)}`);
    let y = 40;
    y = _pdfSummaryBoxes(doc, W, M, y, [
        { label: 'PACIENTES ATENDIDOS', value: vis.length.toString() },
        { label: 'PRUEBAS REALIZADAS',  value: vis.reduce((s, v) => s + v.pruebas.length, 0).toString() },
        { label: 'DÍAS CON ACTIVIDAD',  value: new Set(vis.map(v => v.fecha.slice(0,10))).size.toString() },
        { label: 'TOTAL RECAUDADO',     value: '$' + vis.reduce((s, v) => s + v.total, 0).toFixed(2) },
    ]);
    _pdfTableVisitas(doc, vis, W, M, y);
    _pdfFooter(doc, W, M);
    doc.save(`LabClin_Reporte_Semanal_${lunes}.pdf`);
    toast('PDF semanal generado y descargado', 'success');
}

async function generarPDFMensual() {
    const val = document.getElementById('reportMes').value;
    if (!val) { toast('Selecciona un mes', 'error'); return; }
    const { primer, ultimo } = getPrimerUltimoDiaMes(val);
    const vis = getVisitasRango(primer, ultimo);
    if (!vis.length) { toast('Sin registros para este mes', 'error'); return; }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210, M = 14;
    const [y2, m2] = val.split('-');
    const nombreMes = new Date(Number(y2), Number(m2) - 1, 1).toLocaleDateString('es-VE', { month: 'long', year: 'numeric' });
    _pdfHeader(doc, W, M, `Reporte Mensual`, nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1));
    let y = 40;
    y = _pdfSummaryBoxes(doc, W, M, y, [
        { label: 'PACIENTES ATENDIDOS', value: vis.length.toString() },
        { label: 'PRUEBAS REALIZADAS',  value: vis.reduce((s, v) => s + v.pruebas.length, 0).toString() },
        { label: 'DÍAS CON ACTIVIDAD',  value: new Set(vis.map(v => v.fecha.slice(0,10))).size.toString() },
        { label: 'TOTAL RECAUDADO',     value: '$' + vis.reduce((s, v) => s + v.total, 0).toFixed(2) },
    ]);
    _pdfTableVisitas(doc, vis, W, M, y);
    _pdfFooter(doc, W, M);
    doc.save(`LabClin_Reporte_Mensual_${val}.pdf`);
    toast('PDF mensual generado y descargado', 'success');
}

// FACTURA DE VISITA INDIVIDUAL
async function generarFacturaVisita(visitaId) {
    const visita = DB.visitas.find(v => v.id === visitaId);
    if (!visita) { toast('Visita no encontrada', 'error'); return; }
    const pac = DB.pacientes[visita.cedula];
    if (!pac) { toast('Paciente no encontrado', 'error'); return; }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210, M = 16;
    let y = 0;

    // ── Banda de cabecera ──────────────────────────────────────────────────────
    doc.setFillColor(21, 101, 192);
    doc.rect(0, 0, W, 34, 'F');
    doc.setFillColor(46, 125, 50);
    doc.rect(0, 31, W, 4, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('LabClin Ordoñez', M, 14);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.text('Sistema de Gestión de Laboratorio Clínico', M, 21);

    // Número de factura + fecha (lado derecho del header)
    const numFactura = 'FC-' + visita.id.slice(-6).toUpperCase();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(numFactura, W - M, 14, { align: 'right' });
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('FACTURA', W - M, 9, { align: 'right' });
    doc.text(new Date(visita.fecha).toLocaleDateString('es-VE', { day: '2-digit', month: 'long', year: 'numeric' }), W - M, 21, { align: 'right' });
    doc.text(new Date(visita.fecha).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }), W - M, 27, { align: 'right' });

    y = 44;

    // ── Datos del paciente ─────────────────────────────────────────────────────
    doc.setFillColor(240, 247, 255);
    doc.setDrawColor(200, 220, 245);
    doc.roundedRect(M, y, W - M * 2, 28, 3, 3, 'FD');

    doc.setTextColor(21, 101, 192);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('DATOS DEL PACIENTE', M + 4, y + 6);

    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(pac.nombre, M + 4, y + 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const detallesPac = [
        `Cédula: ${pac.cedula}`,
        pac.genero ? `Género: ${pac.genero}` : null,
        pac.nacimiento ? `Nacimiento: ${fmtFecha(pac.nacimiento)}  ·  Edad: ${calcEdad(pac.nacimiento)}` : null,
        pac.telefono ? `Tel: ${pac.telefono}` : null,
        pac.direccion ? `Dir: ${pac.direccion}` : null,
    ].filter(Boolean);

    // Dos columnas de info del paciente
    const colW = (W - M * 2 - 8) / 2;
    detallesPac.forEach((txt, i) => {
        const col = i < Math.ceil(detallesPac.length / 2) ? 0 : 1;
        const row = col === 0 ? i : i - Math.ceil(detallesPac.length / 2);
        doc.setTextColor(60, 70, 90);
        doc.text(txt, M + 4 + col * (colW + 4), y + 20 + row * 5);
    });

    y += 36;

    // ── Tabla de pruebas ──────────────────────────────────────────────────────
    // Cabecera de tabla
    doc.setFillColor(21, 101, 192);
    doc.rect(M, y, W - M * 2, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    const cN = M + 4;          // col Nro
    const cPrueba = M + 14;    // col Prueba
    const cResultado = M + 90; // col Resultado
    const cPrecio = W - M - 4; // col Precio (right align)
    doc.text('#', cN, y + 5.5);
    doc.text('PRUEBA', cPrueba, y + 5.5);
    doc.text('RESULTADO', cResultado, y + 5.5);
    doc.text('PRECIO', cPrecio, y + 5.5, { align: 'right' });
    y += 8;

    visita.pruebas.forEach((p, idx) => {
        // Wrap texto de resultado
        const resLines = p.resultado
            ? doc.splitTextToSize(p.resultado, 58)
            : ['—'];
        const rowH = Math.max(8, resLines.length * 4.5 + 5);

        if (y + rowH > 268) { doc.addPage(); y = 16; }

        // Fila alternada
        if (idx % 2 === 0) {
            doc.setFillColor(245, 250, 255);
            doc.rect(M, y, W - M * 2, rowH, 'F');
        }

        doc.setTextColor(30, 30, 30);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.text((idx + 1).toString(), cN, y + 5.5);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(21, 101, 192);
        const nombreLines = doc.splitTextToSize(p.nombre, 72);
        doc.text(nombreLines[0], cPrueba, y + 5.5);
        if (nombreLines[1]) {
            doc.setFontSize(7);
            doc.text(nombreLines[1], cPrueba, y + 9.5);
            doc.setFontSize(8);
        }

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        resLines.forEach((line, li) => {
            doc.text(line, cResultado, y + 5.5 + li * 4.5);
        });

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(46, 125, 50);
        doc.text('$' + p.precio.toFixed(2), cPrecio, y + 5.5, { align: 'right' });

        // Línea separadora
        doc.setDrawColor(220, 230, 245);
        doc.line(M, y + rowH, W - M, y + rowH);
        y += rowH;
    });

    // ── Fila de total ─────────────────────────────────────────────────────────
    y += 4;
    if (y + 14 > 278) { doc.addPage(); y = 16; }
    doc.setFillColor(232, 245, 232);
    doc.setDrawColor(165, 214, 167);
    doc.roundedRect(M, y, W - M * 2, 13, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(27, 94, 32);
    doc.text('TOTAL A PAGAR', M + 4, y + 8.5);
    doc.setFontSize(11);
    doc.text('$' + visita.total.toFixed(2), cPrecio, y + 8.5, { align: 'right' });

    // ── Nota de agradecimiento ────────────────────────────────────────────────
    y += 20;
    if (y + 12 > 285) { doc.addPage(); y = 16; }
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 130);
    doc.text('Gracias por su confianza. LabClin Ordoñez — comprometidos con su salud.', W / 2, y, { align: 'center' });

    // ── Pie de página ──────────────────────────────────────────────────────────
    const totalPags = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPags; i++) {
        doc.setPage(i);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(170, 170, 170);
        doc.text('LabClin Ordoñez — Factura generada el ' + new Date().toLocaleString('es-VE'), M, 293);
        doc.text(`Pág. ${i} de ${totalPags}`, W - M, 293, { align: 'right' });
    }

    const nombreArchivo = `Factura_${pac.cedula}_${numFactura}.pdf`;
    doc.save(nombreArchivo);
    toast('Factura generada y descargada', 'success');
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

    // Header
    doc.setFillColor(21, 101, 192);
    doc.rect(0, 0, W, 30, 'F');
    doc.setFillColor(46, 125, 50);
    doc.rect(0, 27, W, 4, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('LabClin Ordoñez', M, 13);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Sistema de Gestión de Laboratorio Clínico', M, 20);
    doc.setFontSize(9);
    doc.text(`Reporte Diario — ${fmtFechaLarga(fecha)}`, W - M, 13, { align: 'right' });
    doc.text(`Generado: ${new Date().toLocaleString('es-VE')}`, W - M, 20, { align: 'right' });
    y = 40;

    // Resumen
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

    // tabla de visitas
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
        doc.text('LabClin Ordoñez — Sistema de Gestión de Laboratorio Clínico', M, 293);
        doc.text(`Pág. ${i} de ${pgs}`, W - M, 293, { align: 'right' });
    }

    doc.save(`LabClin_Ordoñez_Reporte_${fecha}.pdf`);
    toast('PDF generado y descargado', 'success');
}

// UTILS
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

// asegurar funciones globales para HTML
window.desbloquearEdicion = desbloquearEdicion;
window.cancelarEdicion = cancelarEdicion;
window.guardarEdicion = guardarEdicion;
window.eliminarPaciente = eliminarPaciente;
window.attemptLogin = attemptLogin;
window.guardarPrueba = guardarPrueba;
window.editarPrueba = editarPrueba;
window.eliminarPrueba = eliminarPrueba;
window.resetPruebaForm = resetPruebaForm;
window.cerrarModalClaveAdmin = cerrarModalClaveAdmin;
window.confirmarEliminarPrueba = confirmarEliminarPrueba;
window.abrirMarcarLista = abrirMarcarLista;
window.cerrarModalMarcarLista = cerrarModalMarcarLista;
window.mlOnFileChange = mlOnFileChange;
window.confirmarMarcarLista = confirmarMarcarLista;
window.moverAlExpediente = moverAlExpediente;
window.generarFacturaVisita = generarFacturaVisita;
window.switchReportTab = switchReportTab;
window.verEnPantallaSemanal = verEnPantallaSemanal;
window.verEnPantallaMensual = verEnPantallaMensual;
window.generarPDFSemanal = generarPDFSemanal;
window.generarPDFMensual = generarPDFMensual;

// ── INIT (Firebase) ───────────────────────────────────────────────────────────
async function initApp() {
    const overlay = document.getElementById('loadingOverlay');
    const loadingMsg = document.getElementById('loadingMsg');

    try {
        if (loadingMsg) loadingMsg.textContent = 'Cargando catálogo de pruebas…';
        const catSnap = await db.collection('catalogo').get();
        if (catSnap.empty) {
            if (loadingMsg) loadingMsg.textContent = 'Configurando catálogo inicial…';
            const b = db.batch();
            DEFAULT_CATALOG.forEach(item => b.set(db.collection('catalogo').doc(item.id), item));
            await b.commit();
            CATALOG = DEFAULT_CATALOG.map(item => ({ ...item }));
        } else {
            CATALOG = [];
            catSnap.forEach(doc => CATALOG.push(doc.data()));
        }

        if (loadingMsg) loadingMsg.textContent = 'Cargando datos de pacientes…';
        const [pacSnap, visSnap, pendSnap] = await Promise.all([
            db.collection('pacientes').get(),
            db.collection('visitas').get(),
            db.collection('visitasPendientes').get(),
        ]);

        DB.pacientes = {};
        pacSnap.forEach(doc => { DB.pacientes[doc.id] = doc.data(); });
        DB.visitas = [];
        visSnap.forEach(doc => DB.visitas.push(doc.data()));
        DB.visitasPendientes = [];
        pendSnap.forEach(doc => DB.visitasPendientes.push(doc.data()));

        // Migrar datos de localStorage si Firestore está vacío
        if (pacSnap.empty) await migrarDesdeLocalStorage();

    } catch (err) {
        console.error('Firebase error:', err);
        if (loadingMsg) {
            loadingMsg.innerHTML =
                `<span style="color:#fca5a5;">❌ Error al conectar con Firebase.<br><small>${err.message}</small></span>`;
        }
        return; // Mantener overlay visible
    }

    if (overlay) overlay.style.display = 'none';
    initLogin();
    initPruebasAdmin();
    actualizarBadgeEnCurso();
}

async function migrarDesdeLocalStorage() {
    try {
        const rawDB  = localStorage.getItem('lc_db_v2');
        const rawCat = localStorage.getItem('lc_catalog_v1');
        if (!rawDB && !rawCat) return;

        let localDB = null;
        try { localDB = rawDB ? JSON.parse(rawDB) : null; } catch (e) {}

        const pacientes  = localDB ? Object.values(localDB.pacientes || {}) : [];
        const visitas    = localDB ? (localDB.visitas || []) : [];
        const pendientes = localDB ? (localDB.visitasPendientes || []) : [];

        if (pacientes.length === 0 && visitas.length === 0 && !rawCat) return;

        if (pacientes.length > 0 || visitas.length > 0) {
            toast('Migrando datos locales a Firebase…', 'info');
            const allOps = [];
            pacientes.forEach(p  => allOps.push({ col: 'pacientes',         id: p.cedula, data: p }));
            visitas.forEach(v    => allOps.push({ col: 'visitas',            id: v.id,     data: v }));
            pendientes.forEach(v => allOps.push({ col: 'visitasPendientes',  id: v.id,     data: v }));

            for (let i = 0; i < allOps.length; i += 400) {
                const chunk = allOps.slice(i, i + 400);
                const b = db.batch();
                chunk.forEach(op => b.set(db.collection(op.col).doc(op.id), op.data));
                await b.commit();
            }
            DB.pacientes = localDB.pacientes || {};
            DB.visitas = visitas;
            DB.visitasPendientes = pendientes;
            toast(`✓ Migración completada: ${pacientes.length} pacientes, ${visitas.length} visitas`, 'success');
        }

        // Migrar catálogo personalizado si existe y difiere del default
        if (rawCat) {
            let localCat = null;
            try { localCat = JSON.parse(rawCat); } catch (e) {}
            if (Array.isArray(localCat) && localCat.length > 0) {
                const normalized = localCat.map(normalizeCatalogItem).filter(Boolean);
                const isCustom = normalized.length !== DEFAULT_CATALOG.length ||
                    normalized.some(c => !DEFAULT_CATALOG.find(d => d.id === c.id));
                if (isCustom) {
                    const b = db.batch();
                    CATALOG.forEach(item => b.delete(db.collection('catalogo').doc(item.id)));
                    normalized.forEach(item => b.set(db.collection('catalogo').doc(item.id), item));
                    await b.commit();
                    CATALOG = normalized;
                }
            }
        }
    } catch (e) {
        console.warn('Error en migración desde localStorage:', e);
    }
}

initApp();
