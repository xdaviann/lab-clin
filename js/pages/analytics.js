/* ============================================================
   PAGE: ANALYTICS BI — Dashboard analítico (Chart.js Edition)
   ============================================================ */

const AnalyticsPage = (() => {
  let charts = {};

  function render() {
    const stats = DemoData.getDashboardStats();

    // Render KPIs
    const renderKPI = (title, value, subtitle, icon, gradient) => `
      <div class="card" style="position: relative; overflow: hidden; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; min-height: 140px; border: none; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="position: absolute; top: -10px; right: -10px; opacity: 0.1; width: 100px; height: 100px; background: ${gradient}; border-radius: 50%; filter: blur(20px);"></div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div style="font-size: 0.85rem; font-weight: 600; color: var(--color-surface-500); text-transform: uppercase; letter-spacing: 0.5px;">${title}</div>
          <div style="padding: 8px; border-radius: 12px; background: ${gradient}; color: white; display: flex; align-items: center; justify-content: center;">
            ${icon}
          </div>
        </div>
        <div>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--color-surface-900); letter-spacing: -1px; line-height: 1.2;">${value}</div>
          <div style="font-size: 0.85rem; color: var(--color-surface-500); font-weight: 500;">${subtitle}</div>
        </div>
      </div>
    `;

    // Initialize charts after DOM injection
    setTimeout(() => initCharts(stats), 50);

    return `
      <style>
        .chart-container { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        .chart-title { font-size: 1.1rem; font-weight: 700; color: var(--color-surface-800); margin-bottom: 4px; }
        .chart-subtitle { font-size: 0.85rem; color: var(--color-surface-500); margin-bottom: 20px; }
      </style>

      ${TopBar.render('Analytics BI')}
      <main class="content" id="page-content" style="background: var(--color-surface-50);">
        <div class="page-header" style="margin-bottom: 32px;">
          <div>
            <h1 class="page-title" style="font-size: 2rem; font-weight: 800; letter-spacing: -0.5px;">Dashboard Analítico</h1>
            <p class="page-subtitle" style="font-size: 1rem; color: var(--color-surface-500);">Indicadores de rendimiento (impulsado por Chart.js)</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="AnalyticsPage.refresh()" style="border-radius: 50px; padding: 10px 24px; font-weight: 600; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);">
              ${Icons.refreshCw()} Actualizar Datos
            </button>
          </div>
        </div>

        <!-- KPIs Row -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-bottom: 32px;">
          ${renderKPI('Pacientes Totales', stats.totalPacientes, 'Registrados en el sistema', Icons.users(), 'linear-gradient(135deg, #3b82f6, #2563eb)')}
          ${renderKPI('Órdenes Hoy', stats.ordenesHoy, 'Visitas del día actual', Icons.activity(), 'linear-gradient(135deg, #10b981, #059669)')}
          ${renderKPI('Ingresos del Mes', `$${stats.ingresosMes.toFixed(0)}`, 'Recaudación actual', Icons.dollarSign(), 'linear-gradient(135deg, #f59e0b, #d97706)')}
          ${renderKPI('Resultados Pdtes.', stats.resultadosPendientes, 'Por entregar o validar', Icons.clipboard(), 'linear-gradient(135deg, #ef4444, #dc2626)')}
        </div>

        <!-- Main Trend Chart -->
        <div class="chart-container" style="margin-bottom: 32px;">
          <div class="chart-title">Tendencia de Ingresos Mensuales</div>
          <div class="chart-subtitle">Análisis financiero de los últimos 5 meses</div>
          <div style="height: 300px; width: 100%;">
            <canvas id="ingresosChart"></canvas>
          </div>
        </div>

        <!-- Lower Grid (3 columns) -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 32px;">
          
          <!-- Gender Donut Chart -->
          <div class="chart-container">
            <div class="chart-title">Distribución por Género</div>
            <div class="chart-subtitle">Proporción de pacientes</div>
            <div style="height: 250px; width: 100%; display: flex; justify-content: center;">
              <canvas id="generoChart"></canvas>
            </div>
          </div>

          <!-- Weekly Flow Chart -->
          <div class="chart-container">
            <div class="chart-title">Afluencia Semanal</div>
            <div class="chart-subtitle">Pacientes atendidos por día</div>
            <div style="height: 250px; width: 100%;">
              <canvas id="afluenciaChart"></canvas>
            </div>
          </div>

          <!-- Age Ranges Chart -->
          <div class="chart-container">
            <div class="chart-title">Rangos de Edad</div>
            <div class="chart-subtitle">Distribución etaria</div>
            <div style="height: 250px; width: 100%;">
              <canvas id="edadChart"></canvas>
            </div>
          </div>

        </div>
      </main>
    `;
  }

  function initCharts(stats) {
    if (typeof Chart === 'undefined') {
      console.error('Chart.js no está cargado');
      return;
    }

    // Configuración global
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#64748b';

    // Limpiar gráficos anteriores si existen
    ['ingresosChart', 'generoChart', 'afluenciaChart', 'edadChart'].forEach(id => {
      if (charts[id]) {
        charts[id].destroy();
      }
    });

    // 1. Gráfico de Tendencia de Ingresos (Line)
    const ctxIngresos = document.getElementById('ingresosChart');
    if (ctxIngresos) {
      charts['ingresosChart'] = new Chart(ctxIngresos, {
        type: 'line',
        data: {
          labels: stats.ingresosPorMes.map(d => d.mes),
          datasets: [{
            label: 'Ingresos ($)',
            data: stats.ingresosPorMes.map(d => d.monto),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
            borderWidth: 3,
            fill: true,
            tension: 0.4, // Curvas suaves
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#3b82f6',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { borderDash: [4, 4] } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    // 2. Gráfico de Género (Doughnut)
    const ctxGenero = document.getElementById('generoChart');
    if (ctxGenero) {
      charts['generoChart'] = new Chart(ctxGenero, {
        type: 'doughnut',
        data: {
          labels: ['Masculino', 'Femenino'],
          datasets: [{
            data: [stats.distribucionGenero.masculino, stats.distribucionGenero.femenino],
            backgroundColor: ['#3b82f6', '#ec4899'],
            hoverOffset: 4,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '75%',
          plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } }
          }
        }
      });
    }

    // 3. Gráfico de Afluencia Semanal (Bar)
    const ctxAfluencia = document.getElementById('afluenciaChart');
    if (ctxAfluencia) {
      charts['afluenciaChart'] = new Chart(ctxAfluencia, {
        type: 'bar',
        data: {
          labels: stats.diasMayorAfluencia.map(d => d.dia.substring(0,3)),
          datasets: [{
            label: 'Pacientes',
            data: stats.diasMayorAfluencia.map(d => d.pacientes),
            backgroundColor: '#10b981',
            borderRadius: 6,
            barThickness: 'flex',
            maxBarThickness: 40
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { borderDash: [4, 4] } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    // 4. Gráfico de Edad (Bar)
    const ctxEdad = document.getElementById('edadChart');
    if (ctxEdad) {
      charts['edadChart'] = new Chart(ctxEdad, {
        type: 'bar',
        data: {
          labels: stats.rangosEdad.map(d => d.rango),
          datasets: [{
            label: 'Cantidad',
            data: stats.rangosEdad.map(d => d.cantidad),
            backgroundColor: '#6366f1',
            borderRadius: 6,
            barThickness: 'flex',
            maxBarThickness: 40
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { borderDash: [4, 4] } },
            x: { grid: { display: false } }
          }
        }
      });
    }
  }

  function refresh() {
    window.dispatchEvent(new Event('hashchange'));
    Toast.success('Dashboard actualizado con datos en tiempo real');
  }

  return { render, refresh };
})();
