/* ============================================================
   FIREBASE.JS — Servicio Firebase Firestore
   Reemplaza demoData.js (localStorage) por Firestore en la nube.
   
   Estrategia: Cache en memoria inicializado al arrancar la app.
   Las páginas llaman a DemoData.* síncronamente; las escrituras
   van a Firestore en segundo plano (fire-and-forget + update cache).
   ============================================================ */

const firebaseConfig = {
  apiKey: "AIzaSyDa3UpsWshOCqUr6jq67zncx-hDn8HWl4o",
  authDomain: "lab-clin-ordonez.firebaseapp.com",
  projectId: "lab-clin-ordonez",
  storageBucket: "lab-clin-ordonez.firebasestorage.app",
  messagingSenderId: "653276741036",
  appId: "1:653276741036:web:a23956a40767f5d8ca4e09"
};

// Inicializar Firebase (compat SDK cargado desde CDN en index.html)
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ── Datos por defecto (seed inicial) ── */
const DEFAULT_PATIENTS = [
  { id: 'PAC-001', nombres: 'María', apellidos: 'González Pérez', fechaNacimiento: '1988-03-15', genero: 'Femenino', identificacion: 'V-18234567', telefono: '+58 412-5551234', email: 'maria.gonzalez@email.com', direccion: 'Av. Bolívar, Edif. Centro, Piso 3', contactoEmergencia: 'José González - +58 414-5559876', createdAt: '2026-01-10', totalVisitas: 5, ultimaVisita: '2026-05-01' },
  { id: 'PAC-002', nombres: 'Carlos', apellidos: 'Rodríguez Martínez', fechaNacimiento: '1975-07-22', genero: 'Masculino', identificacion: 'V-10876543', telefono: '+58 424-5554321', email: 'carlos.rodriguez@email.com', direccion: 'Urb. Las Acacias, Calle 5, Casa 12', contactoEmergencia: 'Ana Rodríguez - +58 416-5558765', createdAt: '2026-02-05', totalVisitas: 3, ultimaVisita: '2026-04-28' },
  { id: 'PAC-003', nombres: 'Ana', apellidos: 'Martínez López', fechaNacimiento: '1992-11-08', genero: 'Femenino', identificacion: 'V-20456789', telefono: '+58 414-5557890', email: 'ana.martinez@email.com', direccion: 'Calle Miranda, Res. El Parque, Apto 4B', contactoEmergencia: 'Luis Martínez - +58 412-5551122', createdAt: '2026-02-18', totalVisitas: 2, ultimaVisita: '2026-05-05' },
  { id: 'PAC-004', nombres: 'Luis', apellidos: 'Hernández Silva', fechaNacimiento: '1965-01-30', genero: 'Masculino', identificacion: 'V-8765432', telefono: '+58 416-5553456', email: 'luis.hernandez@email.com', direccion: 'Av. Universidad, Torre Médica, Piso 7', contactoEmergencia: 'Carmen Silva - +58 424-5554455', createdAt: '2026-03-01', totalVisitas: 8, ultimaVisita: '2026-05-07' },
  { id: 'PAC-005', nombres: 'Gabriela', apellidos: 'Torres Ramos', fechaNacimiento: '2000-05-14', genero: 'Femenino', identificacion: 'V-27345678', telefono: '+58 412-5556789', email: 'gabriela.torres@email.com', direccion: 'Sector La Pastora, Vereda 3, Casa 8', contactoEmergencia: 'Pedro Torres - +58 414-5557788', createdAt: '2026-03-15', totalVisitas: 1, ultimaVisita: '2026-05-03' },
  { id: 'PAC-006', nombres: 'Roberto', apellidos: 'Díaz Mendoza', fechaNacimiento: '1980-09-25', genero: 'Masculino', identificacion: 'V-14567890', telefono: '+58 424-5552345', email: 'roberto.diaz@email.com', direccion: 'Urb. El Trigal, Av. 2, Qta. Luna', contactoEmergencia: 'Laura Mendoza - +58 416-5551199', createdAt: '2026-01-22', totalVisitas: 4, ultimaVisita: '2026-04-30' },
  { id: 'PAC-007', nombres: 'Valentina', apellidos: 'Ramírez Castro', fechaNacimiento: '1995-12-03', genero: 'Femenino', identificacion: 'V-23456789', telefono: '+58 414-5554567', email: 'valentina.ramirez@email.com', direccion: 'Calle Carabobo, Edif. Sol, Piso 2', contactoEmergencia: 'Miguel Ramírez - +58 412-5553344', createdAt: '2026-04-01', totalVisitas: 2, ultimaVisita: '2026-05-06' },
  { id: 'PAC-008', nombres: 'Fernando', apellidos: 'López Vargas', fechaNacimiento: '1970-04-18', genero: 'Masculino', identificacion: 'V-9876543', telefono: '+58 416-5551234', email: 'fernando.lopez@email.com', direccion: 'Av. Principal, C.C. Galerias, Local 5', contactoEmergencia: 'Rosa Vargas - +58 424-5556677', createdAt: '2026-04-10', totalVisitas: 6, ultimaVisita: '2026-05-08' },
];

const DEFAULT_PRUEBAS = [
  { id: 'PRU-001', nombre: 'Hematología Completa', precio: 15.00, categoria: 'Hematología', activa: true },
  { id: 'PRU-002', nombre: 'Glicemia', precio: 8.00, categoria: 'Química', activa: true },
  { id: 'PRU-003', nombre: 'Perfil Lipídico', precio: 25.00, categoria: 'Química', activa: true },
  { id: 'PRU-004', nombre: 'Uroanálisis', precio: 10.00, categoria: 'Urología', activa: true },
  { id: 'PRU-005', nombre: 'TSH', precio: 20.00, categoria: 'Hormonas', activa: true },
  { id: 'PRU-006', nombre: 'HIV (Prueba Rápida)', precio: 18.00, categoria: 'Serología', activa: true },
  { id: 'PRU-007', nombre: 'PCR Cuantitativa', precio: 12.00, categoria: 'Inmunología', activa: true },
  { id: 'PRU-008', nombre: 'Ácido Úrico', precio: 8.00, categoria: 'Química', activa: true },
  { id: 'PRU-009', nombre: 'Creatinina', precio: 8.00, categoria: 'Química', activa: true },
  { id: 'PRU-010', nombre: 'Hemoglobina Glicosilada', precio: 22.00, categoria: 'Hematología', activa: true },
];

const DEFAULT_ORDERS = [
  { id: 'ORD-001', pacienteId: 'PAC-001', paciente: 'María González', pruebas: ['PRU-001', 'PRU-002', 'PRU-003'], prioridad: 'Normal', estado: 'Completado', fecha: '2026-05-01', total: 48.00 },
  { id: 'ORD-002', pacienteId: 'PAC-002', paciente: 'Carlos Rodríguez', pruebas: ['PRU-001', 'PRU-004'], prioridad: 'Urgente', estado: 'En Proceso', fecha: '2026-05-06', total: 25.00 },
  { id: 'ORD-003', pacienteId: 'PAC-004', paciente: 'Luis Hernández', pruebas: ['PRU-005', 'PRU-002', 'PRU-009'], prioridad: 'Normal', estado: 'En Proceso', fecha: '2026-05-07', total: 36.00 },
  { id: 'ORD-004', pacienteId: 'PAC-003', paciente: 'Ana Martínez', pruebas: ['PRU-006'], prioridad: 'Normal', estado: 'Completado', fecha: '2026-05-05', total: 18.00 },
  { id: 'ORD-005', pacienteId: 'PAC-005', paciente: 'Gabriela Torres', pruebas: ['PRU-001', 'PRU-010'], prioridad: 'Normal', estado: 'Completado', fecha: '2026-05-03', total: 37.00 },
  { id: 'ORD-006', pacienteId: 'PAC-007', paciente: 'Valentina Ramírez', pruebas: ['PRU-003', 'PRU-008', 'PRU-009'], prioridad: 'Urgente', estado: 'En Proceso', fecha: '2026-05-08', total: 41.00 },
  { id: 'ORD-007', pacienteId: 'PAC-008', paciente: 'Fernando López', pruebas: ['PRU-002', 'PRU-003', 'PRU-005'], prioridad: 'Normal', estado: 'En Proceso', fecha: '2026-05-08', total: 53.00 },
  { id: 'ORD-008', pacienteId: 'PAC-006', paciente: 'Roberto Díaz', pruebas: ['PRU-007', 'PRU-001'], prioridad: 'Normal', estado: 'Entregado', fecha: '2026-04-30', total: 27.00 },
];

const DEFAULT_RESULTS = [
  { id: 'RES-001', ordenId: 'ORD-001', paciente: 'María González', prueba: 'Hematología Completa', estado: 'Entregado', fechaRegistro: '2026-05-01', emailEnviado: true, valores: 'Hemoglobina: 13.5 g/dL\nHematocrito: 40%\nGlóbulos Blancos: 7,200/µL\nPlaquetas: 250,000/µL', observaciones: 'Valores dentro de rango normal.' },
  { id: 'RES-002', ordenId: 'ORD-001', paciente: 'María González', prueba: 'Glicemia', estado: 'Entregado', fechaRegistro: '2026-05-01', emailEnviado: true, valores: 'Glicemia en ayunas: 92 mg/dL', observaciones: 'Dentro del rango normal (70-100 mg/dL).' },
  { id: 'RES-003', ordenId: 'ORD-002', paciente: 'Carlos Rodríguez', prueba: 'Hematología Completa', estado: 'En Proceso', fechaRegistro: '2026-05-06', emailEnviado: false, valores: '', observaciones: '' },
  { id: 'RES-004', ordenId: 'ORD-003', paciente: 'Luis Hernández', prueba: 'TSH', estado: 'En Proceso', fechaRegistro: '2026-05-07', emailEnviado: false, valores: '', observaciones: '' },
  { id: 'RES-005', ordenId: 'ORD-004', paciente: 'Ana Martínez', prueba: 'HIV (Prueba Rápida)', estado: 'Completado', fechaRegistro: '2026-05-05', emailEnviado: false, valores: 'Resultado: No Reactivo', observaciones: 'Muestra procesada según protocolo estándar.' },
  { id: 'RES-006', ordenId: 'ORD-005', paciente: 'Gabriela Torres', prueba: 'Hematología Completa', estado: 'Entregado', fechaRegistro: '2026-05-03', emailEnviado: true, valores: 'Hemoglobina: 12.8 g/dL\nHematocrito: 38%\nGlóbulos Blancos: 6,800/µL\nPlaquetas: 280,000/µL', observaciones: 'Valores normales.' },
  { id: 'RES-007', ordenId: 'ORD-006', paciente: 'Valentina Ramírez', prueba: 'Perfil Lipídico', estado: 'En Proceso', fechaRegistro: '2026-05-08', emailEnviado: false, valores: '', observaciones: '' },
];

const DEFAULT_INVOICES = [
  { id: 'FAC-001', ordenId: 'ORD-001', paciente: 'María González', fecha: '2026-05-01', total: 48.00, pagado: 48.00, estado: 'Pagada', metodoPago: 'Transferencia' },
  { id: 'FAC-002', ordenId: 'ORD-002', paciente: 'Carlos Rodríguez', fecha: '2026-05-06', total: 25.00, pagado: 25.00, estado: 'Pagada', metodoPago: 'Efectivo' },
  { id: 'FAC-003', ordenId: 'ORD-003', paciente: 'Luis Hernández', fecha: '2026-05-07', total: 36.00, pagado: 0, estado: 'Pendiente', metodoPago: null },
  { id: 'FAC-004', ordenId: 'ORD-004', paciente: 'Ana Martínez', fecha: '2026-05-05', total: 18.00, pagado: 18.00, estado: 'Pagada', metodoPago: 'Pago Móvil' },
  { id: 'FAC-005', ordenId: 'ORD-005', paciente: 'Gabriela Torres', fecha: '2026-05-03', total: 37.00, pagado: 20.00, estado: 'Pendiente', metodoPago: 'Efectivo' },
  { id: 'FAC-006', ordenId: 'ORD-006', paciente: 'Valentina Ramírez', fecha: '2026-05-08', total: 41.00, pagado: 0, estado: 'Pendiente', metodoPago: null },
  { id: 'FAC-007', ordenId: 'ORD-007', paciente: 'Fernando López', fecha: '2026-05-08', total: 53.00, pagado: 53.00, estado: 'Pagada', metodoPago: 'Tarjeta' },
  { id: 'FAC-008', ordenId: 'ORD-008', paciente: 'Roberto Díaz', fecha: '2026-04-30', total: 27.00, pagado: 27.00, estado: 'Pagada', metodoPago: 'Transferencia' },
];

const DEFAULT_CATEGORIAS = [
  'Hematología', 'Química', 'Hormonas', 'Serología', 'Inmunología', 'Urología', 'Microbiología'
];

const DEFAULT_USERS = [
  { id: 1, nombre: 'Administrador', email: 'admin@labclinica.com', password: 'admin123', rol: 'Administrador', estado: 'Activo', permisos: null, ultimoAcceso: null },
  { id: 2, nombre: 'Operador', email: 'operador@labclinica.com', password: 'operador123', rol: 'Operador', estado: 'Activo', permisos: ['/dashboard', '/pacientes', '/ordenes', '/resultados'], ultimoAcceso: null }
];

/* ── Cache en memoria (se inicializa desde Firestore al arrancar) ── */
let _cache = {
  patients: [],
  pruebas: [],
  orders: [],
  results: [],
  invoices: [],
  payments: [],
  categorias: [],
  users: [],
  loaded: false,
};

/* ── Contadores de ID ── */
let _counters = { PAC: 0, ORD: 0, RES: 0, FAC: 0, PRU: 0, PAG: 0 };

function _nextId(prefix) {
  _counters[prefix] = (_counters[prefix] || 0) + 1;
  return `${prefix}-${String(_counters[prefix]).padStart(3, '0')}`;
}

function _rebuildCounters() {
  const extract = (arr, prefix) => {
    const nums = arr.map(x => parseInt((x.id || '').replace(`${prefix}-`, '')) || 0);
    return nums.length ? Math.max(...nums) : 0;
  };
  _counters.PAC = extract(_cache.patients, 'PAC');
  _counters.ORD = extract(_cache.orders, 'ORD');
  _counters.RES = extract(_cache.results, 'RES');
  _counters.FAC = extract(_cache.invoices, 'FAC');
  _counters.PRU = extract(_cache.pruebas, 'PRU');
  _counters.PAG = extract(_cache.payments, 'PAG');
}

/* ── Helpers Firestore ── */
async function _getAll(colName) {
  const snap = await db.collection(colName).get();
  return snap.docs.map(d => ({ ...d.data() }));
}

async function _set(colName, docId, data) {
  await db.collection(colName).doc(String(docId)).set(data);
}

async function _update(colName, docId, data) {
  await db.collection(colName).doc(String(docId)).update(data);
}

async function _delete(colName, docId) {
  await db.collection(colName).doc(String(docId)).delete();
}

/* ── Seed inicial (solo si la BD está vacía) ── */
async function _seedIfEmpty() {
  const snap = await db.collection('pacientes').limit(1).get();
  if (!snap.empty) return; // ya hay datos

  console.log('[Firebase] Base de datos vacía — cargando datos iniciales...');

  const batch1 = db.batch();
  DEFAULT_PATIENTS.forEach(p => batch1.set(db.collection('pacientes').doc(p.id), p));
  DEFAULT_PRUEBAS.forEach(p => batch1.set(db.collection('pruebas').doc(p.id), p));
  await batch1.commit();

  const batch2 = db.batch();
  DEFAULT_ORDERS.forEach(o => batch2.set(db.collection('ordenes').doc(o.id), o));
  DEFAULT_RESULTS.forEach(r => batch2.set(db.collection('resultados').doc(r.id), r));
  await batch2.commit();

  const batch3 = db.batch();
  DEFAULT_INVOICES.forEach(i => batch3.set(db.collection('facturas').doc(i.id), i));
  DEFAULT_USERS.forEach(u => batch3.set(db.collection('usuarios').doc(String(u.id)), u));
  batch3.set(db.collection('config').doc('categorias'), { lista: DEFAULT_CATEGORIAS });
  await batch3.commit();

  console.log('[Firebase] Datos iniciales cargados exitosamente.');
}

/* ── Inicialización principal — llamada desde app.js ── */
async function _init() {
  try {
    await _seedIfEmpty();

    const [patients, pruebas, orders, results, invoices, payments, users, configSnap] = await Promise.all([
      _getAll('pacientes'),
      _getAll('pruebas'),
      _getAll('ordenes'),
      _getAll('resultados'),
      _getAll('facturas'),
      _getAll('pagos'),
      _getAll('usuarios'),
      db.collection('config').doc('categorias').get(),
    ]);

    _cache.patients = patients;
    _cache.pruebas = pruebas;
    _cache.orders = orders;
    _cache.results = results;
    _cache.invoices = invoices;
    _cache.payments = payments;
    _cache.users = users.map(u => ({ ...u, id: typeof u.id === 'string' ? parseInt(u.id) || u.id : u.id }));
    _cache.categorias = configSnap.exists ? (configSnap.data().lista || DEFAULT_CATEGORIAS) : DEFAULT_CATEGORIAS;
    _cache.loaded = true;

    // Migraciones en memoria
    _cache.orders.forEach(o => {
      if (o.estado === 'Pendiente') o.estado = 'En Proceso';
      if (o.estado === 'Completada' || o.estado === 'Validado') o.estado = 'Completado';
      if (o.medicoRemitente !== undefined) delete o.medicoRemitente;
      if (!o.paciente || String(o.paciente).includes('undefined')) {
        const patient = _cache.patients.find(p => p.id === o.pacienteId);
        o.paciente = patient ? `${patient.nombres} ${patient.apellidos}` : 'Paciente Desconocido';
      }
    });
    _cache.results.forEach(r => {
      if (r.estado === 'Pendiente') r.estado = 'En Proceso';
      if (r.estado === 'Validado' || r.estado === 'Completada') r.estado = 'Completado';
    });
    _cache.invoices.forEach(i => {
      if (i.estado === 'Parcial') i.estado = 'Pendiente';
    });

    _rebuildCounters();
    console.log('[Firebase] Cache cargado:', {
      pacientes: _cache.patients.length,
      pruebas: _cache.pruebas.length,
      ordenes: _cache.orders.length,
    });
  } catch (err) {
    console.error('[Firebase] Error al inicializar:', err);
    throw err;
  }
}

/* ════════════════════════════════════════════════════════════
   DemoData — API pública síncrona (mismo contrato que demoData.js)
   Todas las escrituras actualizan cache + Firestore en background
   ════════════════════════════════════════════════════════════ */
const DemoData = (() => {

  /* ── Users ── */
  function getUsers() { return [..._cache.users]; }
  function getUserById(id) { return _cache.users.find(u => u.id === id) || null; }

  function addUser(data) {
    const maxId = _cache.users.reduce((m, u) => Math.max(m, typeof u.id === 'number' ? u.id : 0), 0);
    const newUser = { ...data, id: maxId + 1, estado: 'Activo', ultimoAcceso: null };
    _cache.users.push(newUser);
    _set('usuarios', String(newUser.id), newUser).catch(e => console.error('FB addUser:', e));
    return newUser;
  }

  function updateUser(id, updates) {
    const idx = _cache.users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    _cache.users[idx] = { ..._cache.users[idx], ...updates };
    _set('usuarios', String(id), _cache.users[idx]).catch(e => console.error('FB updateUser:', e));
    return _cache.users[idx];
  }

  /* ── Reads ── */
  function getPatients() { return [..._cache.patients]; }
  function getPatientById(id) { return _cache.patients.find(p => p.id === id) || null; }
  function getOrders() { return [..._cache.orders]; }
  function getOrderById(id) { return _cache.orders.find(o => o.id === id) || null; }
  function getResults() { return [..._cache.results]; }
  function getResultById(id) { return _cache.results.find(r => r.id === id) || null; }
  function getInvoices() { return [..._cache.invoices]; }
  function getInvoiceById(id) { return _cache.invoices.find(i => i.id === id) || null; }
  function getPruebas() { return [..._cache.pruebas]; }
  function getPruebaById(id) { return _cache.pruebas.find(p => p.id === id) || null; }
  function getPayments() { return [..._cache.payments]; }
  function getPaymentsByInvoice(invoiceId) { return _cache.payments.filter(p => p.facturaId === invoiceId); }
  function getCategorias() { return [..._cache.categorias]; }

  /* ── Patients CRUD ── */
  function searchPatients(query) {
    const q = query.toLowerCase();
    return _cache.patients.filter(p =>
      p.nombres.toLowerCase().includes(q) ||
      p.apellidos.toLowerCase().includes(q) ||
      p.identificacion.toLowerCase().includes(q) ||
      p.telefono.includes(query) ||
      p.id.toLowerCase().includes(q)
    );
  }

  function addPatient(data) {
    const newPatient = {
      ...data,
      id: _nextId('PAC'),
      createdAt: new Date().toISOString().split('T')[0],
      totalVisitas: 0,
      ultimaVisita: null,
    };
    _cache.patients.push(newPatient);
    _set('pacientes', newPatient.id, newPatient).catch(e => console.error('FB addPatient:', e));
    return newPatient;
  }

  function updatePatient(id, updates) {
    const idx = _cache.patients.findIndex(p => p.id === id);
    if (idx === -1) return null;
    _cache.patients[idx] = { ..._cache.patients[idx], ...updates };
    _set('pacientes', id, _cache.patients[idx]).catch(e => console.error('FB updatePatient:', e));
    return _cache.patients[idx];
  }

  function deletePatient(id) {
    const idx = _cache.patients.findIndex(p => p.id === id);
    if (idx === -1) return false;
    const patientOrders = _cache.orders.filter(o => o.pacienteId === id).map(o => o.id);
    patientOrders.forEach(orderId => deleteOrder(orderId));
    _cache.patients.splice(idx, 1);
    _delete('pacientes', id).catch(e => console.error('FB deletePatient:', e));
    return true;
  }

  /* ── Orders CRUD ── */
  function addOrder(data) {
    const newOrder = {
      ...data,
      id: _nextId('ORD'),
      fecha: new Date().toISOString().split('T')[0],
      estado: 'En Proceso',
    };
    _cache.orders.push(newOrder);

    const newInvoice = {
      id: _nextId('FAC'),
      ordenId: newOrder.id,
      paciente: newOrder.paciente,
      fecha: newOrder.fecha,
      total: newOrder.total,
      pagado: 0,
      estado: 'Pendiente',
      metodoPago: null,
    };
    _cache.invoices.push(newInvoice);

    const patientIdx = _cache.patients.findIndex(p => p.id === data.pacienteId);
    if (patientIdx !== -1) {
      _cache.patients[patientIdx].totalVisitas += 1;
      _cache.patients[patientIdx].ultimaVisita = newOrder.fecha;
      _set('pacientes', data.pacienteId, _cache.patients[patientIdx]).catch(e => console.error('FB updatePatient visits:', e));
    }

    _set('ordenes', newOrder.id, newOrder).catch(e => console.error('FB addOrder:', e));
    _set('facturas', newInvoice.id, newInvoice).catch(e => console.error('FB addInvoice:', e));
    return newOrder;
  }

  function updateOrder(id, updates) {
    const idx = _cache.orders.findIndex(o => o.id === id);
    if (idx === -1) return null;
    const oldOrder = _cache.orders[idx];

    if (updates.pruebas) {
      const invoice = _cache.invoices.find(i => i.ordenId === id);
      if (invoice && updates.total !== undefined) {
        invoice.total = updates.total;
        invoice.estado = invoice.pagado >= invoice.total ? 'Pagada' : 'Pendiente';
        if (invoice.pagado >= invoice.total) invoice.pagado = invoice.total;
        _set('facturas', invoice.id, invoice).catch(e => console.error('FB updateInvoice:', e));
      }
    }

    _cache.orders[idx] = { ...oldOrder, ...updates };
    _set('ordenes', id, _cache.orders[idx]).catch(e => console.error('FB updateOrder:', e));
    return _cache.orders[idx];
  }

  function updateOrderStatus(id, newStatus, extraData = {}) {
    const idx = _cache.orders.findIndex(o => o.id === id);
    if (idx === -1) return null;
    _cache.orders[idx].estado = newStatus;
    if (extraData.resultadoNota !== undefined) _cache.orders[idx].resultadoNota = extraData.resultadoNota;
    if (extraData.emailEnviado !== undefined) _cache.orders[idx].emailEnviado = extraData.emailEnviado;
    _set('ordenes', id, _cache.orders[idx]).catch(e => console.error('FB updateOrderStatus:', e));
    return _cache.orders[idx];
  }

  function deleteOrder(id) {
    const orderIdx = _cache.orders.findIndex(o => o.id === id);
    if (orderIdx === -1) return false;
    const order = _cache.orders[orderIdx];
    _cache.orders.splice(orderIdx, 1);

    const invoiceIdx = _cache.invoices.findIndex(i => i.ordenId === id);
    if (invoiceIdx !== -1) {
      const inv = _cache.invoices[invoiceIdx];
      const toDeletePayments = _cache.payments.filter(p => p.facturaId === inv.id);
      toDeletePayments.forEach(p => _delete('pagos', p.id).catch(() => {}));
      _cache.payments = _cache.payments.filter(p => p.facturaId !== inv.id);
      _delete('facturas', inv.id).catch(e => console.error('FB deleteInvoice:', e));
      _cache.invoices.splice(invoiceIdx, 1);
    }

    const toDeleteResults = _cache.results.filter(r => r.ordenId === id);
    toDeleteResults.forEach(r => _delete('resultados', r.id).catch(() => {}));
    _cache.results = _cache.results.filter(r => r.ordenId !== id);

    const patientIdx = _cache.patients.findIndex(p => p.id === order.pacienteId);
    if (patientIdx !== -1) {
      _cache.patients[patientIdx].totalVisitas = Math.max(0, _cache.patients[patientIdx].totalVisitas - 1);
      const patientOrders = _cache.orders.filter(o => o.pacienteId === order.pacienteId);
      _cache.patients[patientIdx].ultimaVisita = patientOrders.length > 0 ? patientOrders[patientOrders.length - 1].fecha : null;
      _set('pacientes', order.pacienteId, _cache.patients[patientIdx]).catch(() => {});
    }

    _delete('ordenes', id).catch(e => console.error('FB deleteOrder:', e));
    return true;
  }

  /* ── Pruebas CRUD ── */
  function addPrueba(data) {
    const newPrueba = { ...data, id: _nextId('PRU'), precio: parseFloat(data.precio) || 0, activa: true };
    _cache.pruebas.push(newPrueba);
    _set('pruebas', newPrueba.id, newPrueba).catch(e => console.error('FB addPrueba:', e));
    return newPrueba;
  }

  function updatePrueba(id, updates) {
    const idx = _cache.pruebas.findIndex(p => p.id === id);
    if (idx === -1) return null;
    if (updates.precio !== undefined) updates.precio = parseFloat(updates.precio) || 0;
    _cache.pruebas[idx] = { ..._cache.pruebas[idx], ...updates };
    _set('pruebas', id, _cache.pruebas[idx]).catch(e => console.error('FB updatePrueba:', e));
    return _cache.pruebas[idx];
  }

  function togglePruebaActiva(id) {
    const p = getPruebaById(id);
    if (!p) return null;
    p.activa = !p.activa;
    _set('pruebas', id, p).catch(e => console.error('FB togglePrueba:', e));
    return p;
  }

  function deletePrueba(id) {
    const idx = _cache.pruebas.findIndex(p => p.id === id);
    if (idx === -1) return false;
    _cache.pruebas.splice(idx, 1);
    _delete('pruebas', id).catch(e => console.error('FB deletePrueba:', e));
    return true;
  }

  /* ── Categorías ── */
  function addCategoria(name) {
    if (!_cache.categorias.includes(name)) {
      _cache.categorias.push(name);
      _set('config', 'categorias', { lista: _cache.categorias }).catch(e => console.error('FB addCategoria:', e));
      return true;
    }
    return false;
  }

  function deleteCategoria(name) {
    const idx = _cache.categorias.indexOf(name);
    if (idx !== -1) {
      _cache.categorias.splice(idx, 1);
      _set('config', 'categorias', { lista: _cache.categorias }).catch(e => console.error('FB deleteCategoria:', e));
      return true;
    }
    return false;
  }

  function updateCategoria(oldName, newName) {
    const idx = _cache.categorias.indexOf(oldName);
    if (idx !== -1 && !_cache.categorias.includes(newName)) {
      _cache.categorias[idx] = newName;
      _cache.pruebas.forEach(p => {
        if (p.categoria === oldName) {
          p.categoria = newName;
          _set('pruebas', p.id, p).catch(() => {});
        }
      });
      _set('config', 'categorias', { lista: _cache.categorias }).catch(e => console.error('FB updateCategoria:', e));
      return true;
    }
    return false;
  }

  /* ── Results CRUD ── */
  function updateResult(id, updates) {
    const idx = _cache.results.findIndex(r => r.id === id);
    if (idx === -1) return null;
    _cache.results[idx] = { ..._cache.results[idx], ...updates };
    _set('resultados', id, _cache.results[idx]).catch(e => console.error('FB updateResult:', e));
    return _cache.results[idx];
  }

  function validateResult(id) {
    return updateResult(id, { estado: 'Validado', fechaValidacion: new Date().toISOString().split('T')[0] });
  }

  function deliverResult(id) {
    return updateResult(id, { estado: 'Entregado', emailEnviado: true });
  }

  /* ── Invoices & Payments ── */
  function updateInvoice(id, updates) {
    const idx = _cache.invoices.findIndex(i => i.id === id);
    if (idx === -1) return null;
    _cache.invoices[idx] = { ..._cache.invoices[idx], ...updates };
    _set('facturas', id, _cache.invoices[idx]).catch(e => console.error('FB updateInvoice:', e));
    return _cache.invoices[idx];
  }

  function addPayment(invoiceId, monto, metodo, referencia) {
    const invoice = _cache.invoices.find(i => i.id === invoiceId);
    if (!invoice) return null;

    const payment = {
      id: _nextId('PAG'),
      facturaId: invoiceId,
      monto: parseFloat(monto),
      metodo,
      referencia: referencia || '',
      fecha: new Date().toISOString().split('T')[0],
    };
    _cache.payments.push(payment);

    invoice.pagado += payment.monto;
    invoice.metodoPago = metodo;
    if (invoice.pagado >= invoice.total) {
      invoice.pagado = invoice.total;
      invoice.estado = 'Pagada';
    } else {
      invoice.estado = 'Pendiente';
    }

    _set('pagos', payment.id, payment).catch(e => console.error('FB addPayment:', e));
    _set('facturas', invoiceId, invoice).catch(e => console.error('FB updateInvoice payment:', e));
    return payment;
  }

  /* ── Dashboard Stats ── */
  function getDashboardStats() {
    const hoy = new Date().toISOString().split('T')[0];
    const patients = _cache.patients;
    const orders = _cache.orders;
    const results = _cache.results;
    const invoices = _cache.invoices;
    const pruebas = _cache.pruebas;

    const ordenesHoy = orders.filter(o => o.fecha === hoy).length;
    const resultadosPendientes = results.filter(r => r.estado === 'Pendiente' || r.estado === 'En Proceso').length;
    const ingresosMes = invoices.reduce((sum, i) => sum + i.pagado, 0);

    const pruebaCount = {};
    orders.forEach(o => {
      (o.pruebas || []).forEach(pruebaId => {
        const p = pruebas.find(pr => pr.id === pruebaId);
        const nombre = p ? p.nombre : pruebaId;
        pruebaCount[nombre] = (pruebaCount[nombre] || 0) + 1;
      });
    });
    const pruebasMasDemandadas = Object.entries(pruebaCount)
      .map(([nombre, cantidad]) => ({ nombre, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5);

    const masculino = patients.filter(p => p.genero === 'Masculino').length;
    const femenino = patients.filter(p => p.genero === 'Femenino').length;

    const now = new Date();
    const rangos = { '18-30': 0, '31-40': 0, '41-50': 0, '51-60': 0, '60+': 0 };
    patients.forEach(p => {
      const age = now.getFullYear() - new Date(p.fechaNacimiento).getFullYear();
      if (age <= 30) rangos['18-30']++;
      else if (age <= 40) rangos['31-40']++;
      else if (age <= 50) rangos['41-50']++;
      else if (age <= 60) rangos['51-60']++;
      else rangos['60+']++;
    });
    const rangosEdad = Object.entries(rangos).map(([rango, cantidad]) => ({ rango, cantidad }));

    const nombresMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const ingresosPorMes = [];
    for (let i = 4; i >= 0; i--) {
      let d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      let y = d.getFullYear();
      let m = d.getMonth();
      let monthStr = `${y}-${String(m + 1).padStart(2, '0')}`;
      let monto = invoices
        .filter(inv => inv.fecha && inv.fecha.startsWith(monthStr))
        .reduce((sum, inv) => sum + inv.pagado, 0);
      ingresosPorMes.push({ mes: nombresMeses[m], monto });
    }

    const nombresDias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const afluenciaMap = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    orders.forEach(o => {
      if (!o.fecha) return;
      const d = new Date(o.fecha + 'T12:00:00');
      const day = d.getDay();
      if (day >= 1 && day <= 6) afluenciaMap[day]++;
    });
    const diasMayorAfluencia = [1, 2, 3, 4, 5, 6].map(d => ({ dia: nombresDias[d], pacientes: afluenciaMap[d] }));

    return {
      totalPacientes: patients.length,
      ordenesHoy,
      resultadosPendientes,
      ingresosMes,
      pruebasMasDemandadas,
      distribucionGenero: { masculino, femenino },
      rangosEdad,
      ingresosPorMes,
      diasMayorAfluencia,
    };
  }

  return {
    getUsers, getUserById, addUser, updateUser,
    getPatients, getPatientById, searchPatients,
    getOrders, getOrderById, updateOrderStatus,
    getResults, getResultById, updateResult, validateResult, deliverResult,
    getInvoices, getInvoiceById, updateInvoice,
    getPruebas, getPruebaById, addPrueba, updatePrueba, togglePruebaActiva, deletePrueba,
    getCategorias, addCategoria, deleteCategoria, updateCategoria,
    getPayments, getPaymentsByInvoice, addPayment,
    getDashboardStats,
    addPatient, updatePatient, deletePatient, addOrder, updateOrder, deleteOrder,
  };
})();

/* Exponer función de inicialización para app.js */
DemoData._init = _init;
