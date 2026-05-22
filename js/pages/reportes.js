/* ============================================================
   PAGE: REPORTES — Generación de reportes operativos con PDF
   RF-REP-001 a RF-REP-006
   ============================================================ */

const ReportesPage = (() => {
  function render() {
    return `
      ${TopBar.render('Reportes')}
      <main class="content" id="page-content">
        <div class="page-header">
          <div>
            <h1 class="page-title">Reportes</h1>
            <p class="page-subtitle">Generación y exportación de informes operativos</p>
          </div>
        </div>

        <!-- Report Type Cards -->
        <div class="grid-3col stagger-children" style="margin-bottom: var(--spacing-xl);">
          <div class="card" style="cursor: pointer; text-align: center;" onclick="ReportesPage.generateReport('ordenes')">
            <div style="width: 56px; height: 56px; margin: 0 auto var(--spacing-base); background: var(--color-primary-50); color: var(--color-primary-500); border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
              ${Icons.clipboard()}
            </div>
            <div class="card-title" style="text-align: center;">Reporte de Órdenes</div>
            <div class="card-subtitle" style="text-align: center;">Listado completo de órdenes</div>
          </div>
          <div class="card" style="cursor: pointer; text-align: center;" onclick="ReportesPage.generateReport('facturacion')">
            <div style="width: 56px; height: 56px; margin: 0 auto var(--spacing-base); background: var(--color-secondary-50); color: var(--color-secondary-500); border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
              ${Icons.dollarSign()}
            </div>
            <div class="card-title" style="text-align: center;">Reporte Financiero</div>
            <div class="card-subtitle" style="text-align: center;">Ingresos y cobros</div>
          </div>
          <div class="card" style="cursor: pointer; text-align: center;" onclick="ReportesPage.generateReport('pacientes')">
            <div style="width: 56px; height: 56px; margin: 0 auto var(--spacing-base); background: var(--color-warning-bg); color: var(--color-warning); border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
              ${Icons.users()}
            </div>
            <div class="card-title" style="text-align: center;">Reporte de Pacientes</div>
            <div class="card-subtitle" style="text-align: center;">Base de datos de pacientes</div>
          </div>
        </div>

        <!-- Filter Controls -->
        <div class="card" style="margin-bottom: var(--spacing-lg);">
          <div class="card-title" style="margin-bottom: var(--spacing-base);">Filtros y Exportación</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Fecha Desde</label>
              <input type="date" id="report-date-from" value="2026-05-01" />
            </div>
            <div class="form-group">
              <label class="form-label">Fecha Hasta</label>
              <input type="date" id="report-date-to" value="2026-05-08" />
            </div>
            <div class="form-group">
              <label class="form-label">Tipo de Reporte</label>
              <select id="report-type">
                <option value="ordenes">Órdenes</option>
                <option value="facturacion">Facturación</option>
                <option value="pacientes">Pacientes</option>
                <option value="resultados">Resultados</option>
              </select>
            </div>
          </div>
          <div style="display: flex; gap: var(--spacing-sm); margin-top: var(--spacing-lg);">
            <button class="btn btn-primary" onclick="ReportesPage.generateFilteredReport()">
              ${Icons.filter()} Generar Vista Previa
            </button>
            <button class="btn btn-secondary" onclick="ReportesPage.exportPdf(false)">
              ${Icons.download()} Exportar PDF
            </button>
            <button class="btn btn-secondary" onclick="ReportesPage.exportPdf(true)">
              ${Icons.printer()} Imprimir
            </button>
            <button class="btn btn-secondary" onclick="ReportesPage.exportCsv()">
              ${Icons.download()} Exportar CSV
            </button>
          </div>
        </div>

        <!-- Report Preview -->
        <div class="card" id="report-preview">
          <div class="card-header">
            <div class="card-title">Vista Previa del Reporte</div>
          </div>
          <div id="report-content">
            ${renderReportPreview('ordenes')}
          </div>
        </div>
      </main>
    `;
  }

  function getReportData(type) {
    switch (type) {
      case 'ordenes':
        return {
          title: 'Reporte de Órdenes',
          columns: [
            { key: 'id', label: 'Orden' },
            { key: 'paciente', label: 'Paciente' },
            { key: 'medicoRemitente', label: 'Médico' },
            { key: 'pruebasCount', label: 'Pruebas' },
            { key: 'totalFormatted', label: 'Total' },
            { key: 'estado', label: 'Estado' },
            { key: 'fecha', label: 'Fecha' },
          ],
          data: DemoData.getOrders().map(o => ({
            ...o,
            pruebasCount: String(o.pruebas.length),
            totalFormatted: `$${o.total.toFixed(2)}`,
          })),
        };
      case 'facturacion':
        return {
          title: 'Reporte Financiero',
          columns: [
            { key: 'id', label: 'Factura' },
            { key: 'ordenId', label: 'Orden' },
            { key: 'paciente', label: 'Paciente' },
            { key: 'totalFormatted', label: 'Total' },
            { key: 'pagadoFormatted', label: 'Pagado' },
            { key: 'pendienteFormatted', label: 'Pendiente' },
            { key: 'estado', label: 'Estado' },
          ],
          data: DemoData.getInvoices().map(i => ({
            ...i,
            totalFormatted: `$${i.total.toFixed(2)}`,
            pagadoFormatted: `$${i.pagado.toFixed(2)}`,
            pendienteFormatted: `$${(i.total - i.pagado).toFixed(2)}`,
          })),
        };
      case 'pacientes':
        return {
          title: 'Reporte de Pacientes',
          columns: [
            { key: 'id', label: 'Código' },
            { key: 'nombreCompleto', label: 'Nombre' },
            { key: 'identificacion', label: 'Identificación' },
            { key: 'genero', label: 'Género' },
            { key: 'telefono', label: 'Teléfono' },
            { key: 'totalVisitas', label: 'Visitas' },
          ],
          data: DemoData.getPatients().map(p => ({
            ...p,
            nombreCompleto: `${p.nombres} ${p.apellidos}`,
            totalVisitas: String(p.totalVisitas),
          })),
        };
      case 'resultados':
        return {
          title: 'Reporte de Resultados',
          columns: [
            { key: 'id', label: 'ID' },
            { key: 'ordenId', label: 'Orden' },
            { key: 'paciente', label: 'Paciente' },
            { key: 'prueba', label: 'Prueba' },
            { key: 'bioanalista', label: 'Bioanalista' },
            { key: 'estado', label: 'Estado' },
            { key: 'fechaRegistro', label: 'Fecha' },
          ],
          data: DemoData.getResults().map(r => ({
            ...r,
            bioanalista: r.bioanalista || 'Sin asignar',
          })),
        };
      default:
        return { title: '', columns: [], data: [] };
    }
  }

  function renderReportPreview(type) {
    const report = getReportData(type);

    return `
      <div style="padding: var(--spacing-base) 0;">
        <div style="text-align: center; margin-bottom: var(--spacing-lg);">
          <h3 style="font-size: var(--font-size-lg); color: var(--color-surface-800);">Laboratorio Clínico — ${report.title}</h3>
          <p style="font-size: var(--font-size-sm); color: var(--color-surface-500);">Generado: ${new Date().toLocaleDateString('es-ES')}</p>
        </div>

        <div style="margin-bottom: var(--spacing-base); display: flex; gap: var(--spacing-lg); justify-content: center;">
          <div style="text-align: center; padding: var(--spacing-sm) var(--spacing-lg); background: var(--color-surface-50); border-radius: var(--radius-lg);">
            <div style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--color-primary-600);">${report.data.length}</div>
            <div style="font-size: var(--font-size-xs); color: var(--color-surface-500);">Registros</div>
          </div>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              ${report.columns.map(c => `<th>${c.label}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${report.data.map(row => `
              <tr>
                ${report.columns.map(c => `<td>${row[c.key] || '—'}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function generateReport(type) {
    const reportContent = document.getElementById('report-content');
    const typeSelect = document.getElementById('report-type');
    if (reportContent) reportContent.innerHTML = renderReportPreview(type);
    if (typeSelect) typeSelect.value = type;
    Toast.success(`Vista previa de reporte generada`);
  }

  function generateFilteredReport() {
    const type = document.getElementById('report-type')?.value || 'ordenes';
    generateReport(type);
  }

  function exportPdf(shouldPrint = false) {
    const type = document.getElementById('report-type')?.value || 'ordenes';
    const dateFrom = document.getElementById('report-date-from')?.value || '';
    const dateTo = document.getElementById('report-date-to')?.value || '';
    const report = getReportData(type);
 
    PdfService.generateReportPdf(
      report.title,
      `${dateFrom} — ${dateTo}`,
      report.data,
      report.columns,
      shouldPrint
    );
  }

  function exportCsv() {
    const type = document.getElementById('report-type')?.value || 'ordenes';
    const report = getReportData(type);

    const header = report.columns.map(c => c.label).join(',');
    const rows = report.data.map(row =>
      report.columns.map(c => `"${String(row[c.key] || '').replace(/"/g, '""')}"`).join(',')
    );
    const csv = [header, ...rows].join('\n');

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Reporte_${report.title.replace(/\s+/g, '_')}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);

    Toast.success('Archivo CSV descargado');
  }

  return { render, generateReport, generateFilteredReport, exportPdf, exportCsv };
})();
