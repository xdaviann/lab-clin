/* ============================================================
   CURRENCY — Servicio de conversión de monedas (USD ↔ BsF)
   Obtiene la tasa del BCV o permite ingreso manual
   ============================================================ */

const CurrencyService = (() => {
  /* Tasa por defecto con limpieza de valores obsoletos */
  let storedTasa = parseFloat(localStorage.getItem('lab_tasa_bcv'));
  if (storedTasa && storedTasa < 300) { 
    localStorage.removeItem('lab_tasa_bcv');
    storedTasa = 500.00;
  }
  let tasaBCV = storedTasa || 500.00;
  let lastUpdate = localStorage.getItem('lab_tasa_update');
  let monedaActiva = 'USD'; // 'USD' o 'VES'

  async function fetchTasaBCV() {
    try {
      const response = await fetch('https://pydolarve.org/api/v2/dollar?page=bcv');
      if (!response.ok) throw new Error('Error al obtener tasa');
      const data = await response.json();
      if (data && data.monitors && data.monitors.usd) {
        tasaBCV = parseFloat(data.monitors.usd.price) || tasaBCV;
        lastUpdate = new Date().toISOString();
        localStorage.setItem('lab_tasa_bcv', tasaBCV);
        localStorage.setItem('lab_tasa_update', lastUpdate);
        Toast.success(`Tasa BCV actualizada: Bs. ${tasaBCV.toFixed(2)}`);
        return tasaBCV;
      }
    } catch (error) {
      /* Si la API falla, usar la tasa manual existente */
      console.warn('No se pudo obtener tasa BCV, usando tasa manual:', error.message);
      Toast.warning(`No se pudo obtener tasa BCV automática. Tasa actual: Bs. ${tasaBCV.toFixed(2)}`);
    }
    return tasaBCV;
  }

  function setTasaManual(nuevaTasa) {
    const parsed = parseFloat(nuevaTasa);
    if (isNaN(parsed) || parsed <= 0) {
      Toast.error('La tasa debe ser un número positivo');
      return false;
    }
    tasaBCV = parsed;
    lastUpdate = new Date().toISOString();
    localStorage.setItem('lab_tasa_bcv', tasaBCV);
    localStorage.setItem('lab_tasa_update', lastUpdate);
    return true;
  }

  function getTasa() {
    return tasaBCV;
  }

  function getLastUpdate() {
    return lastUpdate;
  }

  function setMonedaActiva(moneda) {
    monedaActiva = moneda === 'VES' ? 'VES' : 'USD';
  }

  function getMonedaActiva() {
    return monedaActiva;
  }

  function convertirABs(montoUSD) {
    return montoUSD * tasaBCV;
  }

  function convertirAUSD(montoBs) {
    return tasaBCV > 0 ? montoBs / tasaBCV : 0;
  }

  /* Formatea un monto en la moneda activa */
  function formatAmount(montoUSD) {
    if (monedaActiva === 'VES') {
      return `Bs. ${convertirABs(montoUSD).toFixed(2)}`;
    }
    return `$${Number(montoUSD).toFixed(2)}`;
  }

  /* Formatea mostrando ambas monedas */
  function formatDual(montoUSD) {
    const bs = convertirABs(montoUSD);
    return `$${Number(montoUSD).toFixed(2)} / Bs. ${bs.toFixed(2)}`;
  }

  /* Widget HTML para selector de moneda + tasa */
  function renderCurrencyWidget() {
    return `
      <div style="display: flex; align-items: center; gap: var(--spacing-sm); font-size: var(--font-size-xs);">
        <select id="currency-selector" onchange="CurrencyService.setMonedaActiva(this.value); location.reload();" style="width: auto; min-width: 80px; font-size: var(--font-size-xs); padding: 4px 8px;">
          <option value="USD" ${monedaActiva === 'USD' ? 'selected' : ''}>USD ($)</option>
          <option value="VES" ${monedaActiva === 'VES' ? 'selected' : ''}>Bs.F</option>
        </select>
        <span style="color: var(--color-surface-400);">Tasa: Bs. ${tasaBCV.toFixed(2)}</span>
      </div>
    `;
  }

  return {
    fetchTasaBCV, setTasaManual, getTasa, getLastUpdate,
    setMonedaActiva, getMonedaActiva,
    convertirABs, convertirAUSD,
    formatAmount, formatDual, renderCurrencyWidget,
  };
})();
