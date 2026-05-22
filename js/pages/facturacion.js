/* ============================================================
   PAGE: FACTURACIÓN — Gestión de facturas y pagos
   RF-PAG-001 a RF-PAG-005 · Multi-moneda (USD / Bs.)
   ============================================================ */

const FacturacionPage = (() => {
  function render() {
    const invoices = DemoData.getInvoices();
    const totalFacturado = invoices.reduce((sum, i) => sum + i.total, 0);
    const totalPagado = invoices.reduce((sum, i) => sum + i.pagado, 0);
    const totalPendiente = totalFacturado - totalPagado;
    const tasa = CurrencyService.getTasa();

    return `
      ${TopBar.render('Facturación')}
      <main class="content" id="page-content">
        <div class="page-header">
          <div>
            <h1 class="page-title">Facturación y Pagos</h1>
            <p class="page-subtitle">${invoices.length} facturas · Tasa BCV: Bs. ${tasa.toFixed(2)}</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-secondary btn-sm" onclick="FacturacionPage.updateTasa()">
              ${Icons.refreshCw()} Actualizar Tasa
            </button>
          </div>
        </div>

        <!-- Summary Cards -->
        <div class="grid-stats stagger-children" style="margin-bottom: var(--spacing-xl);">
          <div class="stat-card stat-info">
            <div class="stat-icon icon-info">${Icons.fileText()}</div>
            <div class="stat-content">
              <div class="stat-label">Total Facturado</div>
              <div class="stat-value">$${totalFacturado.toFixed(2)}</div>
              <span style="font-size: var(--font-size-xs); color: var(--color-surface-400);">Bs. ${(totalFacturado * tasa).toFixed(2)}</span>
            </div>
          </div>
          <div class="stat-card stat-success">
            <div class="stat-icon icon-success">${Icons.dollarSign()}</div>
            <div class="stat-content">
              <div class="stat-label">Total Cobrado</div>
              <div class="stat-value">$${totalPagado.toFixed(2)}</div>
              <span style="font-size: var(--font-size-xs); color: var(--color-surface-400);">Bs. ${(totalPagado * tasa).toFixed(2)}</span>
            </div>
          </div>
          <div class="stat-card stat-warning">
            <div class="stat-icon icon-warning">${Icons.clock()}</div>
            <div class="stat-content">
              <div class="stat-label">Saldo Pendiente</div>
              <div class="stat-value">$${totalPendiente.toFixed(2)}</div>
              <span style="font-size: var(--font-size-xs); color: var(--color-surface-400);">Bs. ${(totalPendiente * tasa).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="card" style="margin-bottom: var(--spacing-lg);">
          <div style="display: flex; gap: var(--spacing-base); align-items: center; flex-wrap: wrap;">
            <div class="search-input-wrapper" style="flex: 1; min-width: 220px;">
              <span class="search-icon">${Icons.search()}</span>
              <input type="text" placeholder="Buscar por factura, paciente..." id="invoice-search" oninput="FacturacionPage.filterInvoices()" />
            </div>
            <select id="invoice-status-filter" onchange="FacturacionPage.filterInvoices()" style="width: auto; min-width: 140px;">
              <option value="">Todos los estados</option>
              <option value="Pagada">Pagada</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Parcial">Parcial</option>
            </select>
            ${CurrencyService.renderCurrencyWidget()}
          </div>
        </div>

        <!-- Table -->
        <div class="card" style="padding: 0; overflow: hidden;">
          <div style="overflow-x: auto;">
            <table class="data-table" id="invoices-table">
              <thead>
                <tr>
                  <th>Factura</th>
                  <th>Orden</th>
                  <th>Paciente</th>
                  <th>Fecha</th>
                  <th>Total (USD)</th>
                  <th>Total (Bs.)</th>
                  <th>Pagado</th>
                  <th>Pendiente</th>
                  <th>Estado</th>
                  <th style="text-align: center;">Acciones</th>
                </tr>
              </thead>
              <tbody id="invoices-tbody">
                ${renderInvoiceRows(invoices)}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    `;
  }

  function renderInvoiceRows(invoices) {
    if (invoices.length === 0) {
      return `<tr><td colspan="10"><div class="empty-state"><div class="empty-state-icon">${Icons.dollarSign()}</div><div class="empty-state-title">No se encontraron facturas</div></div></td></tr>`;
    }
    const tasa = CurrencyService.getTasa();
    return invoices.map(invoice => {
      const pendiente = invoice.total - invoice.pagado;
      return `
        <tr>
          <td style="font-weight: var(--font-weight-semibold); color: var(--color-primary-600);">${invoice.id}</td>
          <td>${invoice.ordenId}</td>
          <td>
            <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
              <div class="avatar avatar-sm" style="background: ${getAvatarColor(invoice.paciente)};">${getInitials(invoice.paciente)}</div>
              <span>${invoice.paciente}</span>
            </div>
          </td>
          <td style="color: var(--color-surface-500);">${formatDate(invoice.fecha)}</td>
          <td style="font-weight: var(--font-weight-semibold);">$${invoice.total.toFixed(2)}</td>
          <td style="color: var(--color-surface-500);">Bs. ${(invoice.total * tasa).toFixed(2)}</td>
          <td style="color: var(--color-success);">$${invoice.pagado.toFixed(2)}</td>
          <td style="color: ${pendiente > 0 ? 'var(--color-danger)' : 'var(--color-surface-400)'}; font-weight: var(--font-weight-medium);">$${pendiente.toFixed(2)}</td>
          <td>${getEstadoFacturaBadge(invoice.estado)}</td>
          <td style="text-align: center;">
            <div style="display: flex; justify-content: center; gap: 4px;">
              ${invoice.estado !== 'Pagada' ? `
                <button class="btn btn-ghost btn-icon" onclick="FacturacionPage.openPaymentModal('${invoice.id}')" title="Registrar pago" style="color: var(--color-secondary-500);">
                  ${Icons.dollarSign()}
                </button>
              ` : ''}
              <button class="btn btn-ghost btn-icon" onclick="FacturacionPage.downloadInvoicePdf('${invoice.id}', false)" title="Descargar PDF">
                ${Icons.download()}
              </button>
              <button class="btn btn-ghost btn-icon" onclick="FacturacionPage.downloadInvoicePdf('${invoice.id}', true)" title="Imprimir">
                ${Icons.printer()}
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function filterInvoices() {
    const searchQuery = (document.getElementById('invoice-search')?.value || '').toLowerCase();
    const statusFilter = document.getElementById('invoice-status-filter')?.value || '';

    let filtered = DemoData.getInvoices();
    if (searchQuery) {
      filtered = filtered.filter(i =>
        i.id.toLowerCase().includes(searchQuery) ||
        i.paciente.toLowerCase().includes(searchQuery) ||
        i.ordenId.toLowerCase().includes(searchQuery)
      );
    }
    if (statusFilter) {
      filtered = filtered.filter(i => i.estado === statusFilter);
    }

    const tbody = document.getElementById('invoices-tbody');
    if (tbody) tbody.innerHTML = renderInvoiceRows(filtered);
  }

  function openPaymentModal(invoiceId) {
    const invoice = DemoData.getInvoiceById(invoiceId);
    if (!invoice) return;

    const pendiente = invoice.total - invoice.pagado;
    const tasa = CurrencyService.getTasa();

    Modal.open({
      title: `Registrar Pago — ${invoice.id}`,
      content: `
        <div style="margin-bottom: var(--spacing-lg); padding: var(--spacing-base); background: var(--color-surface-50); border-radius: var(--radius-lg);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">Total factura</span>
            <span style="font-weight: var(--font-weight-semibold);">$${invoice.total.toFixed(2)} / Bs. ${(invoice.total * tasa).toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--color-surface-500); font-size: var(--font-size-sm);">Ya pagado</span>
            <span style="color: var(--color-success);">$${invoice.pagado.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--color-surface-200); padding-top: 8px;">
            <span style="font-weight: var(--font-weight-semibold);">Saldo pendiente</span>
            <span style="font-weight: var(--font-weight-bold); color: var(--color-danger);">$${pendiente.toFixed(2)} / Bs. ${(pendiente * tasa).toFixed(2)}</span>
          </div>
        </div>
        <form id="payment-form">
          <div class="form-row" style="margin-bottom: var(--spacing-base);">
            <div class="form-group">
              <label class="form-label">Moneda del Pago</label>
              <select id="pay-currency" onchange="FacturacionPage.updatePaymentAmount('${invoiceId}')">
                <option value="USD">Dólares (USD)</option>
                <option value="VES">Bolívares (Bs.)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Monto a pagar <span class="required">*</span></label>
              <input type="number" id="pay-amount" step="0.01" value="${pendiente.toFixed(2)}" required />
            </div>
          </div>
          <div id="pay-conversion" style="padding: var(--spacing-sm) var(--spacing-md); background: var(--color-primary-50); border-radius: var(--radius-md); font-size: var(--font-size-sm); color: var(--color-primary-700); margin-bottom: var(--spacing-base);">
            Equivalente: $${pendiente.toFixed(2)} USD
          </div>
          <div class="form-row" style="margin-bottom: var(--spacing-base);">
            <div class="form-group">
              <label class="form-label">Método de pago <span class="required">*</span></label>
              <select id="pay-method" required>
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Pago Móvil">Pago Móvil</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Referencia</label>
              <input type="text" id="pay-reference" placeholder="Número de referencia" />
            </div>
          </div>
        </form>
      `,
      footer: `
        <button class="btn btn-secondary" onclick="Modal.close()">Cancelar</button>
        <button class="btn btn-success" onclick="FacturacionPage.processPayment('${invoiceId}')">
          ${Icons.check()} Registrar Pago
        </button>
      `,
    });
  }

  function updatePaymentAmount(invoiceId) {
    const invoice = DemoData.getInvoiceById(invoiceId);
    if (!invoice) return;
    const pendiente = invoice.total - invoice.pagado;
    const tasa = CurrencyService.getTasa();
    const currency = document.getElementById('pay-currency')?.value;
    const amountInput = document.getElementById('pay-amount');
    const conversionDiv = document.getElementById('pay-conversion');

    if (currency === 'VES') {
      amountInput.value = (pendiente * tasa).toFixed(2);
      conversionDiv.textContent = `Equivalente: $${pendiente.toFixed(2)} USD (Tasa: Bs. ${tasa.toFixed(2)})`;
    } else {
      amountInput.value = pendiente.toFixed(2);
      conversionDiv.textContent = `Equivalente: Bs. ${(pendiente * tasa).toFixed(2)} (Tasa: Bs. ${tasa.toFixed(2)})`;
    }
  }

  function processPayment(invoiceId) {
    const currency = document.getElementById('pay-currency')?.value || 'USD';
    const amountRaw = parseFloat(document.getElementById('pay-amount')?.value) || 0;
    const metodo = document.getElementById('pay-method')?.value || 'Efectivo';
    const referencia = document.getElementById('pay-reference')?.value || '';

    if (amountRaw <= 0) {
      Toast.error('Ingrese un monto válido');
      return;
    }

    /* Convertir a USD si pagó en bolívares */
    const montoUSD = currency === 'VES' ? CurrencyService.convertirAUSD(amountRaw) : amountRaw;

    const invoice = DemoData.getInvoiceById(invoiceId);
    const payment = DemoData.addPayment(invoiceId, montoUSD, metodo, referencia);

    if (payment) {
      /* Generar comprobante PDF automáticamente */
      PdfService.generatePaymentReceiptPdf(invoice, { monto: montoUSD, metodo, referencia });

      Modal.close();
      Toast.success(`Pago de $${montoUSD.toFixed(2)} registrado exitosamente`);
      Router.navigate('/facturacion');
    }
  }

  function downloadInvoicePdf(invoiceId, shouldPrint = false) {
    const invoice = DemoData.getInvoiceById(invoiceId);
    if (!invoice) return;
 
    const order = DemoData.getOrderById(invoice.ordenId);
    const allPruebas = DemoData.getPruebas();
    const orderPruebas = order ? order.pruebas.map(id => allPruebas.find(p => p.id === id)).filter(Boolean) : [];
    const payments = DemoData.getPaymentsByInvoice(invoiceId);
 
    PdfService.generateInvoicePdf(invoice, order, orderPruebas, payments, shouldPrint);
  }

  async function updateTasa() {
    await CurrencyService.fetchTasaBCV();
    Router.navigate('/facturacion');
  }

  return { render, filterInvoices, openPaymentModal, processPayment, downloadInvoicePdf, updateTasa, updatePaymentAmount };
})();
