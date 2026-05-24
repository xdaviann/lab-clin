/* ============================================================
   PAGE: ANALYTICS BI — Dashboard analítico
   RF-BI-001 a RF-BI-006
   ============================================================ */

const AnalyticsPage = (() => {
  function render() {
    const stats = DemoData.getDashboardStats();

    return `
      ${TopBar.render('Analytics BI')}
      <main class="content" id="page-content">
        <div class="page-header">
          <div>
            <h1 class="page-title">Dashboard Analítico</h1>
            <p class="page-subtitle">Indicadores y métricas del laboratorio</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-secondary btn-sm" onclick="Toast.info('Actualización en tiempo real próximamente')">
              ${Icons.refreshCw()} Actualizar
            </button>
          </div>
        </div>

        <!-- KPI Row -->
        <div class="grid-stats stagger-children" style="margin-bottom: var(--spacing-xl);">
          <div class="stat-card stat-primary">
            <div class="stat-icon icon-primary">${Icons.users()}</div>
            <div class="stat-content">
              <div class="stat-label">Total Pacientes</div>
              <div class="stat-value">${stats.totalPacientes}</div>
            </div>
          </div>
          <div class="stat-card stat-success">
            <div class="stat-icon icon-success">${Icons.activity()}</div>
            <div class="stat-content">
              <div class="stat-label">Pruebas del Mes</div>
              <div class="stat-value">165</div>
            </div>
          </div>
          <div class="stat-card stat-info">
            <div class="stat-icon icon-info">${Icons.dollarSign()}</div>
            <div class="stat-content">
              <div class="stat-label">Ingresos del Mes</div>
              <div class="stat-value">$${stats.ingresosMes.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <!-- Charts Grid -->
        <div class="grid-2col" style="margin-bottom: var(--spacing-xl);">
          <!-- Gender Distribution (Pie Chart simulation) -->
          <div class="card">
            <div class="card-header">
              <div>
                <div class="card-title">Distribución por Género</div>
                <div class="card-subtitle">Pacientes registrados</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: var(--spacing-xl); padding: var(--spacing-base) 0;">
              <!-- Donut Chart -->
              <div style="position: relative; width: 160px; height: 160px; flex-shrink: 0;">
                <svg viewBox="0 0 36 36" style="width: 100%; height: 100%; transform: rotate(-90deg);">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="var(--color-surface-100)" stroke-width="3.5"></circle>
                  <circle cx="18" cy="18" r="14" fill="none" stroke="var(--color-primary-500)" stroke-width="3.5"
                    stroke-dasharray="${(stats.distribucionGenero.masculino / stats.totalPacientes * 100).toFixed(1)} ${100 - (stats.distribucionGenero.masculino / stats.totalPacientes * 100)}"
                    stroke-dashoffset="0"
                    style="transition: stroke-dasharray 1s ease;">
                  </circle>
                  <circle cx="18" cy="18" r="14" fill="none" stroke="var(--color-secondary-400)" stroke-width="3.5"
                    stroke-dasharray="${(stats.distribucionGenero.femenino / stats.totalPacientes * 100).toFixed(1)} ${100 - (stats.distribucionGenero.femenino / stats.totalPacientes * 100)}"
                    stroke-dashoffset="-${(stats.distribucionGenero.masculino / stats.totalPacientes * 100).toFixed(1)}"
                    style="transition: stroke-dasharray 1s ease;">
                  </circle>
                </svg>
                <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-surface-800);">${stats.totalPacientes}</div>
                  <div style="font-size: var(--font-size-xs); color: var(--color-surface-500);">Total</div>
                </div>
              </div>
              <!-- Legend -->
              <div style="display: flex; flex-direction: column; gap: var(--spacing-base);">
                <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                  <div style="width: 12px; height: 12px; border-radius: var(--radius-full); background: var(--color-primary-500);"></div>
                  <div>
                    <div style="font-size: var(--font-size-sm); font-weight: var(--font-weight-medium);">Masculino</div>
                    <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-primary-600);">${stats.distribucionGenero.masculino}</div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                  <div style="width: 12px; height: 12px; border-radius: var(--radius-full); background: var(--color-secondary-400);"></div>
                  <div>
                    <div style="font-size: var(--font-size-sm); font-weight: var(--font-weight-medium);">Femenino</div>
                    <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-secondary-500);">${stats.distribucionGenero.femenino}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Age Distribution (Bar Chart) -->
          <div class="card">
            <div class="card-header">
              <div>
                <div class="card-title">Distribución por Edad</div>
                <div class="card-subtitle">Rangos etarios</div>
              </div>
            </div>
            <div style="display: flex; align-items: flex-end; gap: 16px; height: 200px; padding: var(--spacing-base) 0;">
              ${stats.rangosEdad.map((rango, index) => {
                const maxCant = Math.max(...stats.rangosEdad.map(r => r.cantidad));
                const heightPct = (rango.cantidad / maxCant) * 100;
                const barColors = ['var(--color-primary-300)', 'var(--color-primary-400)', 'var(--color-primary-500)', 'var(--color-primary-600)', 'var(--color-primary-700)'];
                return `
                  <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; justify-content: flex-end;">
                    <span style="font-size: var(--font-size-xs); font-weight: var(--font-weight-semibold); color: var(--color-surface-700);">${rango.cantidad}</span>
                    <div style="width: 100%; max-width: 48px; height: ${heightPct}%; background: ${barColors[index]}; border-radius: var(--radius-md) var(--radius-md) 0 0; min-height: 8px; transition: height 0.5s ease ${index * 80}ms;"></div>
                    <span style="font-size: var(--font-size-xs); color: var(--color-surface-500); white-space: nowrap;">${rango.rango}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <div class="grid-2col">
          <!-- Weekly Attendance (Line-like bar chart) -->
          <div class="card">
            <div class="card-header">
              <div>
                <div class="card-title">Afluencia Semanal</div>
                <div class="card-subtitle">Pacientes por día</div>
              </div>
            </div>
            <div style="display: flex; align-items: flex-end; gap: 12px; height: 180px; padding: var(--spacing-base) 0;">
              ${stats.diasMayorAfluencia.map((dia, index) => {
                const maxPac = Math.max(...stats.diasMayorAfluencia.map(d => d.pacientes));
                const heightPct = (dia.pacientes / maxPac) * 100;
                const isMax = dia.pacientes === maxPac;
                return `
                  <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; justify-content: flex-end;">
                    <span style="font-size: var(--font-size-xs); font-weight: var(--font-weight-semibold); color: var(--color-surface-700);">${dia.pacientes}</span>
                    <div style="width: 100%; max-width: 40px; height: ${heightPct}%; background: ${isMax ? 'linear-gradient(180deg, var(--color-secondary-400), var(--color-secondary-600))' : 'var(--color-surface-200)'}; border-radius: var(--radius-md) var(--radius-md) 0 0; min-height: 8px; transition: height 0.5s ease ${index * 80}ms;"></div>
                    <span style="font-size: var(--font-size-xs); color: var(--color-surface-500);">${dia.dia.substring(0, 3)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Revenue Trend -->
          <div class="card">
            <div class="card-header">
              <div>
                <div class="card-title">Tendencia de Ingresos</div>
                <div class="card-subtitle">Últimos 5 meses</div>
              </div>
            </div>
            <div style="position: relative; height: 180px; padding: var(--spacing-base) 0;">
              <!-- SVG Line Chart -->
              <svg width="100%" height="100%" viewBox="0 0 400 160" preserveAspectRatio="none">
                <!-- Grid lines -->
                <line x1="0" y1="40" x2="400" y2="40" stroke="var(--color-surface-100)" stroke-width="1" />
                <line x1="0" y1="80" x2="400" y2="80" stroke="var(--color-surface-100)" stroke-width="1" />
                <line x1="0" y1="120" x2="400" y2="120" stroke="var(--color-surface-100)" stroke-width="1" />

                <!-- Area fill -->
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--color-primary-400)" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="var(--color-primary-400)" stop-opacity="0.02" />
                  </linearGradient>
                </defs>
                ${(() => {
                  const data = stats.ingresosPorMes;
                  const maxVal = Math.max(...data.map(d => d.monto));
                  const points = data.map((d, i) => ({
                    x: 40 + (i * (320 / (data.length - 1))),
                    y: 150 - ((d.monto / maxVal) * 130),
                  }));
                  const linePoints = points.map(p => `${p.x},${p.y}`).join(' ');
                  const areaPoints = `${points[0].x},150 ${linePoints} ${points[points.length - 1].x},150`;
                  return `
                    <polygon points="${areaPoints}" fill="url(#areaGrad)" />
                    <polyline points="${linePoints}" fill="none" stroke="var(--color-primary-500)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                    ${points.map((p, i) => `
                      <circle cx="${p.x}" cy="${p.y}" r="4" fill="var(--color-white)" stroke="var(--color-primary-500)" stroke-width="2" />
                      <text x="${p.x}" y="${p.y - 12}" text-anchor="middle" font-size="10" fill="var(--color-surface-600)" font-weight="600">$${data[i].monto}</text>
                      <text x="${p.x}" y="158" text-anchor="middle" font-size="10" fill="var(--color-surface-400)">${data[i].mes}</text>
                    `).join('')}
                  `;
                })()}
              </svg>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  return { render };
})();
