/* ============================================================
   PAGE: DASHBOARD — Panel principal con KPIs y resúmenes
   ============================================================ */

const DashboardPage = (() => {
  function render() {
    const stats = DemoData.getDashboardStats();
    const recentOrders = DemoData.getOrders().slice(-5).reverse();
    const recentResults = DemoData.getResults().slice(-5).reverse();

    return `
      ${TopBar.render('Dashboard')}
      <main class="content" id="page-content">
        <div class="page-header">
          <div>
            <h1 class="page-title">Dashboard</h1>
            <p class="page-subtitle">Resumen de operaciones del laboratorio</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-secondary btn-sm" onclick="DashboardPage.refresh()">
              ${Icons.refreshCw()} Actualizar
            </button>
            <button class="btn btn-primary" onclick="Router.navigate('/ordenes/nueva')">
              ${Icons.plus()} Nueva Orden
            </button>
          </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid-stats stagger-children">
          <div class="stat-card stat-primary">
            <div class="stat-icon icon-primary">${Icons.users()}</div>
            <div class="stat-content">
              <div class="stat-label">Pacientes Registrados</div>
              <div class="stat-value">${stats.totalPacientes}</div>
            </div>
          </div>
          <div class="stat-card stat-success">
            <div class="stat-icon icon-success">${Icons.clipboard()}</div>
            <div class="stat-content">
              <div class="stat-label">Órdenes Hoy</div>
              <div class="stat-value">${stats.ordenesHoy}</div>
            </div>
          </div>
          <div class="stat-card stat-warning">
            <div class="stat-icon icon-warning">${Icons.clock()}</div>
            <div class="stat-content">
              <div class="stat-label">Resultados Pendientes</div>
              <div class="stat-value">${stats.resultadosPendientes}</div>
            </div>
          </div>
          <div class="stat-card stat-info">
            <div class="stat-icon icon-info">${Icons.dollarSign()}</div>
            <div class="stat-content">
              <div class="stat-label">Ingresos del Mes</div>
              <div class="stat-value">${CurrencyService.formatAmount(stats.ingresosMes)}</div>
            </div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="grid-2col" style="margin-bottom: var(--spacing-xl);">
          <!-- Revenue Chart -->
          <div class="card">
            <div class="card-header">
              <div>
                <div class="card-title">Ingresos Mensuales</div>
                <div class="card-subtitle">Últimos 5 meses</div>
              </div>
            </div>
            <div id="chart-revenue" style="height: 220px; display: flex; align-items: flex-end; gap: 12px; padding: 0 8px;">
              ${stats.ingresosPorMes.map((item, index) => {
                const maxMonto = Math.max(...stats.ingresosPorMes.map(i => i.monto));
                const heightPercent = (item.monto / maxMonto) * 100;
                const isLast = index === stats.ingresosPorMes.length - 1;
                return `
                  <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                    <span style="font-size: var(--font-size-xs); font-weight: var(--font-weight-semibold); color: var(--color-surface-700);">$${item.monto}</span>
                    <div style="width: 100%; height: ${heightPercent}%; background: ${isLast ? 'linear-gradient(180deg, var(--color-secondary-400), var(--color-secondary-600))' : 'linear-gradient(180deg, var(--color-primary-300), var(--color-primary-500))'}; border-radius: var(--radius-md) var(--radius-md) 0 0; min-height: 20px; transition: height 0.5s ease ${index * 100}ms;"></div>
                    <span style="font-size: var(--font-size-xs); color: var(--color-surface-500);">${item.mes}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Pruebas más demandadas -->
          <div class="card">
            <div class="card-header">
              <div>
                <div class="card-title">Pruebas Más Demandadas</div>
                <div class="card-subtitle">Top 5 del mes</div>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${stats.pruebasMasDemandadas.map((prueba, index) => {
                const maxCantidad = stats.pruebasMasDemandadas[0]?.cantidad || 1;
                const widthPercent = (prueba.cantidad / maxCantidad) * 100;
                const colors = ['var(--color-primary-500)', 'var(--color-secondary-400)', 'var(--color-warning)', 'var(--color-info)', 'var(--color-surface-400)'];
                return `
                  <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                      <span style="font-size: var(--font-size-sm); color: var(--color-surface-700);">${prueba.nombre}</span>
                      <span style="font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-surface-800);">${prueba.cantidad}</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: var(--color-surface-100); border-radius: var(--radius-full); overflow: hidden;">
                      <div style="width: ${widthPercent}%; height: 100%; background: ${colors[index]}; border-radius: var(--radius-full); transition: width 0.6s ease ${index * 100}ms;"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Recent Tables Row -->
        <div class="grid-2col">
          <!-- Recent Orders -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">Órdenes Recientes</div>
              <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/ordenes')">Ver todas</button>
            </div>
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Paciente</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                ${recentOrders.map(order => `
                  <tr>
                    <td style="font-weight: var(--font-weight-medium); color: var(--color-primary-600);">${order.id}</td>
                    <td>${order.paciente}</td>
                    <td>${getEstadoBadge(order.estado)}</td>
                    <td style="color: var(--color-surface-500);">${formatDate(order.fecha)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Recent Results -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">Resultados Recientes</div>
              <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/resultados')">Ver todos</button>
            </div>
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Paciente</th>
                  <th>Prueba</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                ${recentResults.map(result => `
                  <tr>
                    <td style="font-weight: var(--font-weight-medium); color: var(--color-primary-600);">${result.id}</td>
                    <td>${result.paciente}</td>
                    <td class="truncate" style="max-width: 140px;">${result.prueba}</td>
                    <td>${getEstadoResultadoBadge(result.estado)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    `;
  }

  /* Re-renderiza toda la vista del dashboard con datos actualizados */
  function refresh() {
    Router.navigate('/dashboard');
    Toast.success('Dashboard actualizado con datos recientes');
  }

  return { render, refresh };
})();

/* ── Helpers de formato compartidos (globales para todas las páginas) ── */
function getEstadoBadge(estado) {
  const map = {
    'Pendiente': 'badge-warning',
    'En Proceso': 'badge-info',
    'Completada': 'badge-success',
    'Validado': 'badge-primary',
    'Entregado': 'badge-success',
    'Cancelada': 'badge-danger',
  };
  return `<span class="badge ${map[estado] || 'badge-neutral'}"><span class="badge-dot"></span>${estado}</span>`;
}

function getEstadoResultadoBadge(estado) {
  return getEstadoBadge(estado);
}

function getEstadoFacturaBadge(estado) {
  const map = {
    'Pagada': 'badge-success',
    'Pendiente': 'badge-warning',
    'Parcial': 'badge-info',
    'Anulada': 'badge-danger',
  };
  return `<span class="badge ${map[estado] || 'badge-neutral'}"><span class="badge-dot"></span>${estado}</span>`;
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatCurrency(amount) {
  return CurrencyService.formatAmount(amount);
}

function formatCurrencyUSD(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

function getAvatarColor(name) {
  const colors = [
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #f093fb, #f5576c)',
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #43e97b, #38f9d7)',
    'linear-gradient(135deg, #fa709a, #fee140)',
    'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    'linear-gradient(135deg, #fccb90, #d57eeb)',
    'linear-gradient(135deg, #84fab0, #8fd3f4)',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}
