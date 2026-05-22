/* ============================================================
   DEMO DATA — Datos simulados para desarrollo sin Supabase
   Se reemplazará por llamadas reales al configurar las credenciales
   ============================================================ */

const DemoData = (() => {
  const patients = [
    { id: 'PAC-001', nombres: 'María', apellidos: 'González Pérez', fechaNacimiento: '1988-03-15', genero: 'Femenino', identificacion: 'V-18234567', telefono: '+58 412-5551234', email: 'maria.gonzalez@email.com', direccion: 'Av. Bolívar, Edif. Centro, Piso 3', contactoEmergencia: 'José González - +58 414-5559876', createdAt: '2026-01-10', totalVisitas: 5, ultimaVisita: '2026-05-01' },
    { id: 'PAC-002', nombres: 'Carlos', apellidos: 'Rodríguez Martínez', fechaNacimiento: '1975-07-22', genero: 'Masculino', identificacion: 'V-10876543', telefono: '+58 424-5554321', email: 'carlos.rodriguez@email.com', direccion: 'Urb. Las Acacias, Calle 5, Casa 12', contactoEmergencia: 'Ana Rodríguez - +58 416-5558765', createdAt: '2026-02-05', totalVisitas: 3, ultimaVisita: '2026-04-28' },
    { id: 'PAC-003', nombres: 'Ana', apellidos: 'Martínez López', fechaNacimiento: '1992-11-08', genero: 'Femenino', identificacion: 'V-20456789', telefono: '+58 414-5557890', email: 'ana.martinez@email.com', direccion: 'Calle Miranda, Res. El Parque, Apto 4B', contactoEmergencia: 'Luis Martínez - +58 412-5551122', createdAt: '2026-02-18', totalVisitas: 2, ultimaVisita: '2026-05-05' },
    { id: 'PAC-004', nombres: 'Luis', apellidos: 'Hernández Silva', fechaNacimiento: '1965-01-30', genero: 'Masculino', identificacion: 'V-8765432', telefono: '+58 416-5553456', email: 'luis.hernandez@email.com', direccion: 'Av. Universidad, Torre Médica, Piso 7', contactoEmergencia: 'Carmen Silva - +58 424-5554455', createdAt: '2026-03-01', totalVisitas: 8, ultimaVisita: '2026-05-07' },
    { id: 'PAC-005', nombres: 'Gabriela', apellidos: 'Torres Ramos', fechaNacimiento: '2000-05-14', genero: 'Femenino', identificacion: 'V-27345678', telefono: '+58 412-5556789', email: 'gabriela.torres@email.com', direccion: 'Sector La Pastora, Vereda 3, Casa 8', contactoEmergencia: 'Pedro Torres - +58 414-5557788', createdAt: '2026-03-15', totalVisitas: 1, ultimaVisita: '2026-05-03' },
    { id: 'PAC-006', nombres: 'Roberto', apellidos: 'Díaz Mendoza', fechaNacimiento: '1980-09-25', genero: 'Masculino', identificacion: 'V-14567890', telefono: '+58 424-5552345', email: 'roberto.diaz@email.com', direccion: 'Urb. El Trigal, Av. 2, Qta. Luna', contactoEmergencia: 'Laura Mendoza - +58 416-5551199', createdAt: '2026-01-22', totalVisitas: 4, ultimaVisita: '2026-04-30' },
    { id: 'PAC-007', nombres: 'Valentina', apellidos: 'Ramírez Castro', fechaNacimiento: '1995-12-03', genero: 'Femenino', identificacion: 'V-23456789', telefono: '+58 414-5554567', email: 'valentina.ramirez@email.com', direccion: 'Calle Carabobo, Edif. Sol, Piso 2', contactoEmergencia: 'Miguel Ramírez - +58 412-5553344', createdAt: '2026-04-01', totalVisitas: 2, ultimaVisita: '2026-05-06' },
    { id: 'PAC-008', nombres: 'Fernando', apellidos: 'López Vargas', fechaNacimiento: '1970-04-18', genero: 'Masculino', identificacion: 'V-9876543', telefono: '+58 416-5551234', email: 'fernando.lopez@email.com', direccion: 'Av. Principal, C.C. Galerias, Local 5', contactoEmergencia: 'Rosa Vargas - +58 424-5556677', createdAt: '2026-04-10', totalVisitas: 6, ultimaVisita: '2026-05-08' },
  ];

  const pruebas = [
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

  const orders = [
    { id: 'ORD-001', pacienteId: 'PAC-001', paciente: 'María González', pruebas: ['PRU-001', 'PRU-002', 'PRU-003'], medicoRemitente: 'Dr. Pérez', prioridad: 'Normal', estado: 'Completada', fecha: '2026-05-01', total: 48.00 },
    { id: 'ORD-002', pacienteId: 'PAC-002', paciente: 'Carlos Rodríguez', pruebas: ['PRU-001', 'PRU-004'], medicoRemitente: 'Dra. Sánchez', prioridad: 'Urgente', estado: 'En Proceso', fecha: '2026-05-06', total: 25.00 },
    { id: 'ORD-003', pacienteId: 'PAC-004', paciente: 'Luis Hernández', pruebas: ['PRU-005', 'PRU-002', 'PRU-009'], medicoRemitente: 'Dr. Gómez', prioridad: 'Normal', estado: 'Pendiente', fecha: '2026-05-07', total: 36.00 },
    { id: 'ORD-004', pacienteId: 'PAC-003', paciente: 'Ana Martínez', pruebas: ['PRU-006'], medicoRemitente: 'Dra. Romero', prioridad: 'Normal', estado: 'Validado', fecha: '2026-05-05', total: 18.00 },
    { id: 'ORD-005', pacienteId: 'PAC-005', paciente: 'Gabriela Torres', pruebas: ['PRU-001', 'PRU-010'], medicoRemitente: 'Dr. Díaz', prioridad: 'Normal', estado: 'Completada', fecha: '2026-05-03', total: 37.00 },
    { id: 'ORD-006', pacienteId: 'PAC-007', paciente: 'Valentina Ramírez', pruebas: ['PRU-003', 'PRU-008', 'PRU-009'], medicoRemitente: 'Dra. Castro', prioridad: 'Urgente', estado: 'En Proceso', fecha: '2026-05-08', total: 41.00 },
    { id: 'ORD-007', pacienteId: 'PAC-008', paciente: 'Fernando López', pruebas: ['PRU-002', 'PRU-003', 'PRU-005'], medicoRemitente: 'Dr. Vargas', prioridad: 'Normal', estado: 'Pendiente', fecha: '2026-05-08', total: 53.00 },
    { id: 'ORD-008', pacienteId: 'PAC-006', paciente: 'Roberto Díaz', pruebas: ['PRU-007', 'PRU-001'], medicoRemitente: 'Dr. Mendoza', prioridad: 'Normal', estado: 'Entregado', fecha: '2026-04-30', total: 27.00 },
  ];

  const results = [
    { id: 'RES-001', ordenId: 'ORD-001', paciente: 'María González', prueba: 'Hematología Completa', estado: 'Entregado', bioanalista: 'Lcda. Morales', fechaRegistro: '2026-05-01', fechaValidacion: '2026-05-01', whatsappEnviado: true, valores: 'Hemoglobina: 13.5 g/dL\nHematocrito: 40%\nGlóbulos Blancos: 7,200/µL\nPlaquetas: 250,000/µL', observaciones: 'Valores dentro de rango normal.' },
    { id: 'RES-002', ordenId: 'ORD-001', paciente: 'María González', prueba: 'Glicemia', estado: 'Entregado', bioanalista: 'Lcda. Morales', fechaRegistro: '2026-05-01', fechaValidacion: '2026-05-01', whatsappEnviado: true, valores: 'Glicemia en ayunas: 92 mg/dL', observaciones: 'Dentro del rango normal (70-100 mg/dL).' },
    { id: 'RES-003', ordenId: 'ORD-002', paciente: 'Carlos Rodríguez', prueba: 'Hematología Completa', estado: 'En Proceso', bioanalista: 'Lcdo. Fuentes', fechaRegistro: '2026-05-06', fechaValidacion: null, whatsappEnviado: false, valores: '', observaciones: '' },
    { id: 'RES-004', ordenId: 'ORD-003', paciente: 'Luis Hernández', prueba: 'TSH', estado: 'Pendiente', bioanalista: null, fechaRegistro: '2026-05-07', fechaValidacion: null, whatsappEnviado: false, valores: '', observaciones: '' },
    { id: 'RES-005', ordenId: 'ORD-004', paciente: 'Ana Martínez', prueba: 'HIV (Prueba Rápida)', estado: 'Validado', bioanalista: 'Lcda. Morales', fechaRegistro: '2026-05-05', fechaValidacion: '2026-05-06', whatsappEnviado: false, valores: 'Resultado: No Reactivo', observaciones: 'Muestra procesada según protocolo estándar.' },
    { id: 'RES-006', ordenId: 'ORD-005', paciente: 'Gabriela Torres', prueba: 'Hematología Completa', estado: 'Entregado', bioanalista: 'Lcdo. Fuentes', fechaRegistro: '2026-05-03', fechaValidacion: '2026-05-04', whatsappEnviado: true, valores: 'Hemoglobina: 12.8 g/dL\nHematocrito: 38%\nGlóbulos Blancos: 6,800/µL\nPlaquetas: 280,000/µL', observaciones: 'Valores normales.' },
    { id: 'RES-007', ordenId: 'ORD-006', paciente: 'Valentina Ramírez', prueba: 'Perfil Lipídico', estado: 'En Proceso', bioanalista: 'Lcda. Morales', fechaRegistro: '2026-05-08', fechaValidacion: null, whatsappEnviado: false, valores: '', observaciones: '' },
  ];

  const invoices = [
    { id: 'FAC-001', ordenId: 'ORD-001', paciente: 'María González', fecha: '2026-05-01', total: 48.00, pagado: 48.00, estado: 'Pagada', metodoPago: 'Transferencia' },
    { id: 'FAC-002', ordenId: 'ORD-002', paciente: 'Carlos Rodríguez', fecha: '2026-05-06', total: 25.00, pagado: 25.00, estado: 'Pagada', metodoPago: 'Efectivo' },
    { id: 'FAC-003', ordenId: 'ORD-003', paciente: 'Luis Hernández', fecha: '2026-05-07', total: 36.00, pagado: 0, estado: 'Pendiente', metodoPago: null },
    { id: 'FAC-004', ordenId: 'ORD-004', paciente: 'Ana Martínez', fecha: '2026-05-05', total: 18.00, pagado: 18.00, estado: 'Pagada', metodoPago: 'Pago Móvil' },
    { id: 'FAC-005', ordenId: 'ORD-005', paciente: 'Gabriela Torres', fecha: '2026-05-03', total: 37.00, pagado: 20.00, estado: 'Parcial', metodoPago: 'Efectivo' },
    { id: 'FAC-006', ordenId: 'ORD-006', paciente: 'Valentina Ramírez', fecha: '2026-05-08', total: 41.00, pagado: 0, estado: 'Pendiente', metodoPago: null },
    { id: 'FAC-007', ordenId: 'ORD-007', paciente: 'Fernando López', fecha: '2026-05-08', total: 53.00, pagado: 53.00, estado: 'Pagada', metodoPago: 'Tarjeta' },
    { id: 'FAC-008', ordenId: 'ORD-008', paciente: 'Roberto Díaz', fecha: '2026-04-30', total: 27.00, pagado: 27.00, estado: 'Pagada', metodoPago: 'Transferencia' },
  ];

  const payments = [];

  /* ID counter helper — evita colisiones al generar nuevos IDs */
  const counters = {
    PAC: patients.length,
    ORD: orders.length,
    RES: results.length,
    FAC: invoices.length,
    PRU: pruebas.length,
    PAG: 0,
  };

  function nextId(prefix) {
    counters[prefix] = (counters[prefix] || 0) + 1;
    return `${prefix}-${String(counters[prefix]).padStart(3, '0')}`;
  }

  /* ── Reads ── */
  function getPatients() { return [...patients]; }
  function getPatientById(id) { return patients.find(p => p.id === id) || null; }
  function getOrders() { return [...orders]; }
  function getOrderById(id) { return orders.find(o => o.id === id) || null; }
  function getResults() { return [...results]; }
  function getResultById(id) { return results.find(r => r.id === id) || null; }
  function getInvoices() { return [...invoices]; }
  function getInvoiceById(id) { return invoices.find(i => i.id === id) || null; }
  function getPruebas() { return [...pruebas]; }
  function getPruebaById(id) { return pruebas.find(p => p.id === id) || null; }
  function getPayments() { return [...payments]; }
  function getPaymentsByInvoice(invoiceId) { return payments.filter(p => p.facturaId === invoiceId); }

  /* ── Patients CRUD ── */
  function addPatient(data) {
    const newPatient = {
      ...data,
      id: nextId('PAC'),
      createdAt: new Date().toISOString().split('T')[0],
      totalVisitas: 0,
      ultimaVisita: null,
    };
    patients.push(newPatient);
    return newPatient;
  }

  function updatePatient(id, updates) {
    const index = patients.findIndex(p => p.id === id);
    if (index === -1) return null;
    patients[index] = { ...patients[index], ...updates };
    return patients[index];
  }

  function searchPatients(query) {
    const lowerQuery = query.toLowerCase();
    return patients.filter(patient =>
      patient.nombres.toLowerCase().includes(lowerQuery) ||
      patient.apellidos.toLowerCase().includes(lowerQuery) ||
      patient.identificacion.toLowerCase().includes(lowerQuery) ||
      patient.telefono.includes(query) ||
      patient.id.toLowerCase().includes(lowerQuery)
    );
  }

  /* ── Orders CRUD ── */
  function addOrder(data) {
    const newOrder = {
      ...data,
      id: nextId('ORD'),
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
    };
    orders.push(newOrder);

    /* Crear factura automáticamente para la orden */
    const newInvoice = {
      id: nextId('FAC'),
      ordenId: newOrder.id,
      paciente: newOrder.paciente,
      fecha: newOrder.fecha,
      total: newOrder.total,
      pagado: 0,
      estado: 'Pendiente',
      metodoPago: null,
    };
    invoices.push(newInvoice);

    /* Crear resultados pendientes por cada prueba */
    newOrder.pruebas.forEach(pruebaId => {
      const prueba = pruebas.find(p => p.id === pruebaId);
      results.push({
        id: nextId('RES'),
        ordenId: newOrder.id,
        paciente: newOrder.paciente,
        prueba: prueba ? prueba.nombre : pruebaId,
        estado: 'Pendiente',
        bioanalista: null,
        fechaRegistro: newOrder.fecha,
        fechaValidacion: null,
        whatsappEnviado: false,
        valores: '',
        observaciones: '',
      });
    });

    /* Actualizar visitas del paciente */
    const patientIdx = patients.findIndex(p => p.id === data.pacienteId);
    if (patientIdx !== -1) {
      patients[patientIdx].totalVisitas += 1;
      patients[patientIdx].ultimaVisita = newOrder.fecha;
    }

    return newOrder;
  }

  function updateOrderStatus(id, newStatus) {
    const idx = orders.findIndex(o => o.id === id);
    if (idx === -1) return null;
    orders[idx].estado = newStatus;
    return orders[idx];
  }

  /* ── Pruebas CRUD ── */
  function addPrueba(data) {
    const newPrueba = {
      ...data,
      id: nextId('PRU'),
      precio: parseFloat(data.precio) || 0,
      activa: true,
    };
    pruebas.push(newPrueba);
    return newPrueba;
  }

  function updatePrueba(id, updates) {
    const idx = pruebas.findIndex(p => p.id === id);
    if (idx === -1) return null;
    if (updates.precio !== undefined) updates.precio = parseFloat(updates.precio) || 0;
    pruebas[idx] = { ...pruebas[idx], ...updates };
    return pruebas[idx];
  }

  function togglePruebaActiva(id) {
    const idx = pruebas.findIndex(p => p.id === id);
    if (idx === -1) return null;
    pruebas[idx].activa = !pruebas[idx].activa;
    return pruebas[idx];
  }

  /* ── Results CRUD ── */
  function updateResult(id, updates) {
    const idx = results.findIndex(r => r.id === id);
    if (idx === -1) return null;
    results[idx] = { ...results[idx], ...updates };
    return results[idx];
  }

  function validateResult(id) {
    return updateResult(id, {
      estado: 'Validado',
      fechaValidacion: new Date().toISOString().split('T')[0],
    });
  }

  function deliverResult(id) {
    return updateResult(id, { estado: 'Entregado', whatsappEnviado: true });
  }

  /* ── Invoices & Payments ── */
  function updateInvoice(id, updates) {
    const idx = invoices.findIndex(i => i.id === id);
    if (idx === -1) return null;
    invoices[idx] = { ...invoices[idx], ...updates };
    return invoices[idx];
  }

  function addPayment(invoiceId, monto, metodo, referencia) {
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) return null;

    const payment = {
      id: nextId('PAG'),
      facturaId: invoiceId,
      monto: parseFloat(monto),
      metodo: metodo,
      referencia: referencia || '',
      fecha: new Date().toISOString().split('T')[0],
    };
    payments.push(payment);

    /* Actualizar factura */
    invoice.pagado += payment.monto;
    invoice.metodoPago = metodo;
    if (invoice.pagado >= invoice.total) {
      invoice.pagado = invoice.total;
      invoice.estado = 'Pagada';
    } else {
      invoice.estado = 'Parcial';
    }

    return payment;
  }

  /* ── Dashboard Stats (calculados dinámicamente) ── */
  function getDashboardStats() {
    const hoy = new Date().toISOString().split('T')[0];
    const ordenesHoy = orders.filter(o => o.fecha === hoy).length;
    const resultadosPendientes = results.filter(r => r.estado === 'Pendiente' || r.estado === 'En Proceso').length;
    const ingresosMes = invoices.reduce((sum, i) => sum + i.pagado, 0);

    /* Pruebas más demandadas — contar ocurrencias en órdenes */
    const pruebaCount = {};
    orders.forEach(o => {
      o.pruebas.forEach(pruebaId => {
        const p = pruebas.find(pr => pr.id === pruebaId);
        const nombre = p ? p.nombre : pruebaId;
        pruebaCount[nombre] = (pruebaCount[nombre] || 0) + 1;
      });
    });
    const pruebasMasDemandadas = Object.entries(pruebaCount)
      .map(([nombre, cantidad]) => ({ nombre, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5);

    /* Distribución de género */
    const masculino = patients.filter(p => p.genero === 'Masculino').length;
    const femenino = patients.filter(p => p.genero === 'Femenino').length;

    /* Rangos de edad */
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

    return {
      totalPacientes: patients.length,
      ordenesHoy,
      resultadosPendientes,
      ingresosMes,
      pruebasMasDemandadas,
      distribucionGenero: { masculino, femenino },
      rangosEdad,
      ingresosPorMes: [
        { mes: 'Ene', monto: 420 },
        { mes: 'Feb', monto: 380 },
        { mes: 'Mar', monto: 510 },
        { mes: 'Abr', monto: 465 },
        { mes: 'May', monto: Math.round(ingresosMes) },
      ],
      diasMayorAfluencia: [
        { dia: 'Lunes', pacientes: 18 },
        { dia: 'Martes', pacientes: 22 },
        { dia: 'Miércoles', pacientes: 15 },
        { dia: 'Jueves', pacientes: 20 },
        { dia: 'Viernes', pacientes: 25 },
        { dia: 'Sábado', pacientes: 12 },
      ],
    };
  }

  return {
    getPatients, getPatientById, searchPatients,
    getOrders, getOrderById, updateOrderStatus,
    getResults, getResultById, updateResult, validateResult, deliverResult,
    getInvoices, getInvoiceById, updateInvoice,
    getPruebas, getPruebaById, addPrueba, updatePrueba, togglePruebaActiva,
    getPayments, getPaymentsByInvoice, addPayment,
    getDashboardStats,
    addPatient, updatePatient, addOrder,
  };
})();
