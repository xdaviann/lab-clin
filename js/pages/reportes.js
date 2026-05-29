/* ============================================================
   PAGE: REPORTES — Generación de reportes operativos con PDF
   RF-REP-001 a RF-REP-006
   ============================================================ */

const ReportesPage = (() => {
  function render() {
    const today = new Date().toISOString().split('T')[0];
    const monthStart = today.substring(0, 8) + '01';

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
              <input type="date" id="report-date-from" value="${monthStart}" onchange="ReportesPage.generateFilteredReport()" />
            </div>
            <div class="form-group">
              <label class="form-label">Fecha Hasta</label>
              <input type="date" id="report-date-to" value="${today}" onchange="ReportesPage.generateFilteredReport()" />
            </div>
            <div class="form-group">
              <label class="form-label">Tipo de Reporte</label>
              <select id="report-type" onchange="ReportesPage.generateFilteredReport()">
                <option value="ordenes">Órdenes</option>
                <option value="facturacion">Facturación</option>
                <option value="pacientes">Pacientes</option>
                <option value="resultados">Resultados</option>
              </select>
            </div>
          </div>
          <div style="display: flex; gap: var(--spacing-sm); margin-top: var(--spacing-lg); flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="ReportesPage.generateFilteredReport()">
              ${Icons.filter()} Actualizar Vista
            </button>
            <button class="btn btn-secondary" onclick="ReportesPage.exportPdf(false)">
              ${Icons.download()} Exportar PDF
            </button>
            <button class="btn btn-secondary" onclick="ReportesPage.exportPdf(true)">
              ${Icons.printer()} Imprimir
            </button>
            <button class="btn btn-secondary" onclick="ReportesPage.exportExcel()">
              ${Icons.download()} Exportar Excel
            </button>
          </div>
        </div>

        <!-- Report Preview -->
        <div class="card" id="report-preview">
          <div class="card-header">
            <div class="card-title">Vista Previa del Reporte</div>
            <span class="badge badge-neutral" id="report-count-badge">— registros</span>
          </div>
          <div id="report-content">
            ${renderReportPreview('ordenes', monthStart, today)}
          </div>
        </div>
      </main>
    `;
  }

  /* ── Date helper ── */
  function filterByDate(data, dateField, from, to) {
    return data.filter(item => {
      const d = item[dateField];
      if (!d) return true; /* include items without date if no filter */
      if (from && d < from) return false;
      if (to && d > to) return false;
      return true;
    });
  }

  /* ── Build report dataset with optional date range ── */
  function getReportData(type, dateFrom = '', dateTo = '') {
    switch (type) {
      case 'ordenes': {
        const raw = filterByDate(DemoData.getOrders(), 'fecha', dateFrom, dateTo);
        return {
          title: 'Reporte de Órdenes',
          columns: [
            { key: 'id', label: 'Orden' },
            { key: 'paciente', label: 'Paciente' },
            { key: 'pruebasCount', label: 'Pruebas' },
            { key: 'totalFormatted', label: 'Total (USD)' },
            { key: 'estado', label: 'Estado' },
            { key: 'fecha', label: 'Fecha' },
          ],
          data: raw.map(o => ({
            ...o,
            pruebasCount: String(o.pruebas.length),
            totalFormatted: `$${o.total.toFixed(2)}`,
          })),
        };
      }
      case 'facturacion': {
        const raw = filterByDate(DemoData.getInvoices(), 'fecha', dateFrom, dateTo);
        return {
          title: 'Reporte Financiero',
          columns: [
            { key: 'id', label: 'Factura' },
            { key: 'ordenId', label: 'Orden' },
            { key: 'paciente', label: 'Paciente' },
            { key: 'fecha', label: 'Fecha' },
            { key: 'totalFormatted', label: 'Total (USD)' },
            { key: 'pagadoFormatted', label: 'Pagado' },
            { key: 'pendienteFormatted', label: 'Pendiente' },
            { key: 'estado', label: 'Estado' },
          ],
          data: raw.map(i => ({
            ...i,
            totalFormatted: `$${i.total.toFixed(2)}`,
            pagadoFormatted: `$${i.pagado.toFixed(2)}`,
            pendienteFormatted: `$${(i.total - i.pagado).toFixed(2)}`,
          })),
        };
      }
      case 'pacientes': {
        /* Patients filtered by ultimaVisita */
        const raw = filterByDate(DemoData.getPatients(), 'ultimaVisita', dateFrom, dateTo);
        return {
          title: 'Reporte de Pacientes',
          columns: [
            { key: 'id', label: 'Código' },
            { key: 'nombreCompleto', label: 'Nombre' },
            { key: 'identificacion', label: 'Identificación' },
            { key: 'genero', label: 'Género' },
            { key: 'telefono', label: 'Teléfono' },
            { key: 'email', label: 'Correo' },
            { key: 'totalVisitas', label: 'Visitas' },
          ],
          data: raw.map(p => ({
            ...p,
            nombreCompleto: `${p.nombres} ${p.apellidos}`,
            totalVisitas: String(p.totalVisitas),
          })),
        };
      }
      case 'resultados': {
        const raw = filterByDate(DemoData.getResults(), 'fechaRegistro', dateFrom, dateTo);
        return {
          title: 'Reporte de Resultados',
          columns: [
            { key: 'id', label: 'ID' },
            { key: 'ordenId', label: 'Orden' },
            { key: 'paciente', label: 'Paciente' },
            { key: 'prueba', label: 'Prueba' },
            { key: 'estado', label: 'Estado' },
            { key: 'fechaRegistro', label: 'Fecha' },
          ],
          data: raw,
        };
      }
      default:
        return { title: '', columns: [], data: [] };
    }
  }

  function renderReportPreview(type, dateFrom, dateTo) {
    const report = getReportData(type, dateFrom, dateTo);

    // Update badge if DOM already exists
    const badge = document.getElementById('report-count-badge');
    if (badge) badge.textContent = `${report.data.length} registros`;

    const periodLabel = (dateFrom && dateTo) ? `${formatDate(dateFrom)} — ${formatDate(dateTo)}` : 'Todos los períodos';

    return `
      <div style="padding: var(--spacing-base) 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--spacing-lg); flex-wrap: wrap; gap: 8px;">
          <div>
            <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); color: var(--color-surface-800); margin-bottom: 4px;">${report.title}</h3>
            <p style="font-size: var(--font-size-sm); color: var(--color-surface-500);">Período: ${periodLabel}</p>
          </div>
          <div style="text-align: center; padding: var(--spacing-sm) var(--spacing-lg); background: var(--color-primary-50); border-radius: var(--radius-lg);">
            <div style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--color-primary-600);">${report.data.length}</div>
            <div style="font-size: var(--font-size-xs); color: var(--color-surface-500);">Registros</div>
          </div>
        </div>

        ${report.data.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">${Icons.filter()}</div>
            <div class="empty-state-title">Sin resultados para este período</div>
            <div class="empty-state-description">Prueba ajustando el rango de fechas</div>
          </div>
        ` : `
          <div style="overflow-x: auto;">
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
        `}
      </div>
    `;
  }

  function generateReport(type) {
    const reportContent = document.getElementById('report-content');
    const typeSelect = document.getElementById('report-type');
    const dateFrom = document.getElementById('report-date-from')?.value || '';
    const dateTo = document.getElementById('report-date-to')?.value || '';
    if (typeSelect) typeSelect.value = type;
    if (reportContent) reportContent.innerHTML = renderReportPreview(type, dateFrom, dateTo);
    updateBadge(type, dateFrom, dateTo);
  }

  function generateFilteredReport() {
    const type = document.getElementById('report-type')?.value || 'ordenes';
    const dateFrom = document.getElementById('report-date-from')?.value || '';
    const dateTo = document.getElementById('report-date-to')?.value || '';
    const reportContent = document.getElementById('report-content');
    if (reportContent) reportContent.innerHTML = renderReportPreview(type, dateFrom, dateTo);
    updateBadge(type, dateFrom, dateTo);
  }

  function updateBadge(type, dateFrom, dateTo) {
    const badge = document.getElementById('report-count-badge');
    if (!badge) return;
    const report = getReportData(type, dateFrom, dateTo);
    badge.textContent = `${report.data.length} registros`;
  }

  function exportPdf(shouldPrint = false) {
    const type = document.getElementById('report-type')?.value || 'ordenes';
    const dateFrom = document.getElementById('report-date-from')?.value || '';
    const dateTo = document.getElementById('report-date-to')?.value || '';
    const report = getReportData(type, dateFrom, dateTo);

    const periodLabel = (dateFrom && dateTo) ? `${dateFrom} — ${dateTo}` : 'Todos los períodos';

    PdfService.generateReportPdf(
      report.title,
      periodLabel,
      report.data,
      report.columns,
      shouldPrint
    );
  }

  /* ── Excel export as styled HTML table (native Excel support) ── */
  function exportExcel() {
    const type = document.getElementById('report-type')?.value || 'ordenes';
    const dateFrom = document.getElementById('report-date-from')?.value || '';
    const dateTo = document.getElementById('report-date-to')?.value || '';
    const report = getReportData(type, dateFrom, dateTo);
    const now = new Date().toLocaleString('es-ES');
    const periodLabel = (dateFrom && dateTo) ? `${dateFrom} — ${dateTo}` : 'Todos los períodos';
    const colCount = report.columns.length;

    const rows = report.data.map((row, i) => {
      const bg = i % 2 === 0 ? '#ffffff' : '#f0f4f8';
      return `<tr style="background:${bg};">${report.columns.map(c => {
        const val = row[c.key] || '—';
        return `<td style="padding:7px 10px; border:1px solid #e2e8f0; font-size:11pt; color:#1e293b;">${val}</td>`;
      }).join('')}</tr>`;
    }).join('');

    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:x="urn:schemas-microsoft-com:office:excel"
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="UTF-8">
        <!--[if gte mso 9]><xml>
          <x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
            <x:Name>${report.title}</x:Name>
            <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
          </x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook>
        </xml><![endif]-->
        <style>
          body { font-family: Calibri, Arial, sans-serif; }
          table { border-collapse: collapse; width: 100%; }
        </style>
      </head>
      <body>
        <table>
          <!-- Título principal -->
          <tr>
            <td colspan="${colCount}" style="background:#1e3a5f; color:#ffffff; font-size:14pt; font-weight:bold; padding:12px 14px; border:none;">
              🔬 LABORATORIO CLÍNICO ORDÓÑEZ VE, C.A.
            </td>
          </tr>
          <!-- Subtítulo / nombre del reporte -->
          <tr>
            <td colspan="${colCount}" style="background:#2563eb; color:#ffffff; font-size:12pt; font-weight:bold; padding:8px 14px; border:none;">
              ${report.title}
            </td>
          </tr>
          <!-- Metadata -->
          <tr>
            <td colspan="${colCount}" style="background:#dbeafe; color:#1e3a8a; font-size:10pt; padding:6px 14px; border:none;">
              📅 Período: ${periodLabel}
            </td>
          </tr>
          <tr>
            <td colspan="${colCount}" style="background:#eff6ff; color:#475569; font-size:9pt; padding:5px 14px; border:none;">
              Generado: ${now} &nbsp;|&nbsp; Total de registros: ${report.data.length}
            </td>
          </tr>
          <!-- Fila vacía separadora -->
          <tr><td colspan="${colCount}" style="height:8px; border:none;"></td></tr>
          <!-- Encabezados de columna -->
          <tr>
            ${report.columns.map(c => `
              <th style="background:#2563eb; color:#ffffff; font-weight:bold; font-size:11pt; padding:8px 10px; border:1px solid #1d4ed8; text-align:left;">
                ${c.label}
              </th>
            `).join('')}
          </tr>
          <!-- Datos -->
          ${rows}
          <!-- Fila total -->
          <tr>
            <td colspan="${colCount}" style="background:#f1f5f9; color:#64748b; font-size:9pt; font-style:italic; padding:6px 14px; border-top:2px solid #cbd5e1;">
              Total: ${report.data.length} registros exportados
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\uFEFF' + html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${report.title.replace(/\s+/g, '_')}_${dateFrom || 'inicio'}_${dateTo || 'hoy'}.xls`;
    link.click();
    URL.revokeObjectURL(link.href);

    Toast.success(`Archivo Excel descargado — ${report.data.length} registros`);
  }

  return { render, generateReport, generateFilteredReport, exportPdf, exportExcel };
})();
