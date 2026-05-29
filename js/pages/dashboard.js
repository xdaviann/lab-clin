/* ============================================================
   PAGE: DASHBOARD — Panel principal unificado
   Incluye KPIs operativos + gráficas analíticas (Chart.js)
   ============================================================ */

const DashboardPage = (() => {
  let charts = {};

  function render() {
    const stats = DemoData.getDashboardStats();
    const recentOrders = DemoData.getOrders().slice(-5).reverse();
    const recentResults = DemoData.getResults().slice(-5).reverse();

    // Schedule chart init after DOM renders
    setTimeout(() => initCharts(stats), 80);

    return `
      <style>
        .chart-container { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .chart-title { font-size: 1rem; font-weight: 700; color: var(--color-surface-800); margin-bottom: 2px; }
        .chart-subtitle { font-size: 0.82rem; color: var(--color-surface-400); margin-bottom: 16px; }
      </style>

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
        <div class="grid-stats stagger-children" style="margin-bottom: var(--spacing-xl);">
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

        <!-- Chart.js Analytics Row -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: var(--spacing-xl);">
          <!-- Ingresos Line Chart -->
          <div class="chart-container">
            <div class="chart-title">Tendencia de Ingresos Mensuales</div>
            <div class="chart-subtitle">Últimos 5 meses</div>
            <div style="height: 240px;"><canvas id="dash-ingresos-chart"></canvas></div>
          </div>
          <!-- Género Donut -->
          <div class="chart-container">
            <div class="chart-title">Distribución por Género</div>
            <div class="chart-subtitle">Total de pacientes</div>
            <div style="height: 240px; display: flex; justify-content: center;"><canvas id="dash-genero-chart"></canvas></div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: var(--spacing-xl);">
          <!-- Afluencia semanal -->
          <div class="chart-container">
            <div class="chart-title">Afluencia Semanal</div>
            <div class="chart-subtitle">Pacientes por día</div>
            <div style="height: 200px;"><canvas id="dash-afluencia-chart"></canvas></div>
          </div>
          <!-- Pruebas más demandadas -->
          <div class="chart-container">
            <div class="chart-title">Pruebas Más Demandadas</div>
            <div class="chart-subtitle">Top 5 del mes</div>
            <div style="height: 200px; display: flex; flex-direction: column; justify-content: center; gap: 10px; padding-top: 4px;">
              ${stats.pruebasMasDemandadas.map((prueba, index) => {
                const maxCantidad = stats.pruebasMasDemandadas[0]?.cantidad || 1;
                const widthPercent = (prueba.cantidad / maxCantidad) * 100;
                const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
                return `
                  <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                      <span style="font-size: 0.82rem; color: var(--color-surface-700);">${prueba.nombre}</span>
                      <span style="font-size: 0.82rem; font-weight: 600;">${prueba.cantidad}</span>
                    </div>
                    <div style="width: 100%; height: 6px; background: var(--color-surface-100); border-radius: 999px; overflow: hidden;">
                      <div style="width: ${widthPercent}%; height: 100%; background: ${colors[index]}; border-radius: 999px;"></div>
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

  function initCharts(stats) {
    if (typeof Chart === 'undefined') return;
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#64748b';

    ['dash-ingresos-chart', 'dash-genero-chart', 'dash-afluencia-chart'].forEach(id => {
      if (charts[id]) { charts[id].destroy(); delete charts[id]; }
    });

    const ctxIngresos = document.getElementById('dash-ingresos-chart');
    if (ctxIngresos) {
      charts['dash-ingresos-chart'] = new Chart(ctxIngresos, {
        type: 'line',
        data: {
          labels: stats.ingresosPorMes.map(d => d.mes),
          datasets: [{
            label: 'Ingresos ($)',
            data: stats.ingresosPorMes.map(d => d.monto),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.12)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#3b82f6',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, grid: { borderDash: [4,4] } }, x: { grid: { display: false } } }
        }
      });
    }

    const ctxGenero = document.getElementById('dash-genero-chart');
    if (ctxGenero) {
      charts['dash-genero-chart'] = new Chart(ctxGenero, {
        type: 'doughnut',
        data: {
          labels: ['Masculino', 'Femenino'],
          datasets: [{ data: [stats.distribucionGenero.masculino, stats.distribucionGenero.femenino], backgroundColor: ['#3b82f6','#ec4899'], borderWidth: 0, hoverOffset: 4 }]
        },
        options: {
          responsive: true, maintainAspectRatio: false, cutout: '72%',
          plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16, font: { size: 12 } } } }
        }
      });
    }

    const ctxAfluencia = document.getElementById('dash-afluencia-chart');
    if (ctxAfluencia) {
      charts['dash-afluencia-chart'] = new Chart(ctxAfluencia, {
        type: 'bar',
        data: {
          labels: stats.diasMayorAfluencia.map(d => d.dia.substring(0,3)),
          datasets: [{ label: 'Pacientes', data: stats.diasMayorAfluencia.map(d => d.pacientes), backgroundColor: '#10b981', borderRadius: 6, maxBarThickness: 36 }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, grid: { borderDash: [4,4] } }, x: { grid: { display: false } } }
        }
      });
    }
  }

  function refresh() {
    window.dispatchEvent(new Event('hashchange'));
    setTimeout(() => Toast.success('Datos actualizados correctamente'), 50);
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
  if (!name) return '#ccc';
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
  if (!name) return '??';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}
