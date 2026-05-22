/* ============================================================
   PAGE: PRUEBAS — Catálogo de pruebas de laboratorio
   Gestión de precios, categorías y disponibilidad
   ============================================================ */

const PruebasPage = (() => {
  function render() {
    const pruebas = DemoData.getPruebas();
    const categorias = [...new Set(pruebas.map(p => p.categoria))];

    return `
      ${TopBar.render('Pruebas')}
      <main class="content" id="page-content">
        <div class="page-header">
          <div>
            <h1 class="page-title">Catálogo de Pruebas</h1>
            <p class="page-subtitle">${pruebas.length} pruebas registradas · ${categorias.length} categorías</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="PruebasPage.openNewPruebaModal()" id="btn-new-prueba">
              ${Icons.plus()} Nueva Prueba
            </button>
          </div>
        </div>

        <!-- Summary Cards -->
        <div class="grid-stats stagger-children" style="margin-bottom: var(--spacing-xl);">
          ${categorias.slice(0, 4).map((cat, i) => {
            const count = pruebas.filter(p => p.categoria === cat).length;
            const variants = ['primary', 'success', 'info', 'warning'];
            const icons = [Icons.flask(), Icons.activity(), Icons.clipboard(), Icons.fileText()];
            return `
              <div class="stat-card stat-${variants[i]}">
                <div class="stat-icon icon-${variants[i]}">${icons[i]}</div>
                <div class="stat-content">
                  <div class="stat-label">${cat}</div>
                  <div class="stat-value">${count}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Filters -->
        <div class="card" style="margin-bottom: var(--spacing-lg);">
          <div style="display: flex; gap: var(--spacing-base); align-items: center; flex-wrap: wrap;">
            <div class="search-input-wrapper" style="flex: 1; min-width: 220px;">
              <span class="search-icon">${Icons.search()}</span>
              <input type="text" placeholder="Buscar prueba..." id="prueba-search" oninput="PruebasPage.filterPruebas()" />
            </div>
            <select id="prueba-category-filter" onchange="PruebasPage.filterPruebas()" style="width: auto; min-width: 160px;">
              <option value="">Todas las categorías</option>
              ${categorias.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
            ${CurrencyService.renderCurrencyWidget()}
          </div>
        </div>

        <!-- Table -->
        <div class="card" style="padding: 0; overflow: hidden;">
          <div style="overflow-x: auto;">
            <table class="data-table" id="pruebas-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio (USD)</th>
                  <th>Precio (Bs.)</th>
                  <th>Estado</th>
                  <th style="text-align: center;">Acciones</th>
                </tr>
              </thead>
              <tbody id="pruebas-tbody">
                ${renderPruebaRows(pruebas)}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    `;
  }

  function renderPruebaRows(pruebas) {
    if (pruebas.length === 0) {
      return `<tr><td colspan="7"><div class="empty-state"><div class="empty-state-icon">${Icons.flask()}</div><div class="empty-state-title">No se encontraron pruebas</div></div></td></tr>`;
    }
    return pruebas.map(prueba => `
      <tr style="${!prueba.activa ? 'opacity: 0.5;' : ''}">
        <td style="font-weight: var(--font-weight-semibold); color: var(--color-primary-600);">${prueba.id}</td>
        <td style="font-weight: var(--font-weight-medium);">${prueba.nombre}</td>
        <td><span class="badge badge-neutral">${prueba.categoria}</span></td>
        <td style="font-weight: var(--font-weight-semibold);">$${prueba.precio.toFixed(2)}</td>
        <td style="color: var(--color-surface-600);">Bs. ${CurrencyService.convertirABs(prueba.precio).toFixed(2)}</td>
        <td>
          <span class="badge ${prueba.activa ? 'badge-success' : 'badge-danger'}">
            <span class="badge-dot"></span>${prueba.activa ? 'Activa' : 'Inactiva'}
          </span>
        </td>
        <td style="text-align: center;">
          <div style="display: flex; justify-content: center; gap: 4px;">
            <button class="btn btn-ghost btn-icon" onclick="PruebasPage.openEditPruebaModal('${prueba.id}')" title="Editar precio/datos">
              ${Icons.edit()}
            </button>
            <button class="btn btn-ghost btn-icon" onclick="PruebasPage.toggleActiva('${prueba.id}')" title="${prueba.activa ? 'Desactivar' : 'Activar'}">
              ${prueba.activa ? Icons.eyeOff() : Icons.eye()}
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function filterPruebas() {
    const searchQuery = (document.getElementById('prueba-search')?.value || '').toLowerCase();
    const categoryFilter = document.getElementById('prueba-category-filter')?.value || '';

    let filtered = DemoData.getPruebas();
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.nombre.toLowerCase().includes(searchQuery) ||
        p.id.toLowerCase().includes(searchQuery) ||
        p.categoria.toLowerCase().includes(searchQuery)
      );
    }
    if (categoryFilter) {
      filtered = filtered.filter(p => p.categoria === categoryFilter);
    }

    const tbody = document.getElementById('pruebas-tbody');
    if (tbody) tbody.innerHTML = renderPruebaRows(filtered);
  }

  function openNewPruebaModal() {
    Modal.open({
      title: 'Nueva Prueba de Laboratorio',
      content: `
        <form id="new-prueba-form">
          <div class="form-group" style="margin-bottom: var(--spacing-base);">
            <label class="form-label">Nombre de la Prueba <span class="required">*</span></label>
            <input type="text" name="nombre" required placeholder="Ej: Hemoglobina Glicosilada" id="prueba-nombre" />
          </div>
          <div class="form-row" style="margin-bottom: var(--spacing-base);">
            <div class="form-group">
              <label class="form-label">Categoría <span class="required">*</span></label>
              <select name="categoria" required id="prueba-categoria">
                <option value="">Seleccionar...</option>
                <option value="Hematología">Hematología</option>
                <option value="Química">Química</option>
                <option value="Hormonas">Hormonas</option>
                <option value="Serología">Serología</option>
                <option value="Inmunología">Inmunología</option>
                <option value="Urología">Urología</option>
                <option value="Microbiología">Microbiología</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Precio (USD) <span class="required">*</span></label>
              <input type="number" name="precio" step="0.01" min="0" required placeholder="0.00" id="prueba-precio" oninput="PruebasPage.updatePricePreview()" />
            </div>
          </div>
          <div id="price-preview" style="padding: var(--spacing-sm) var(--spacing-md); background: var(--color-surface-50); border-radius: var(--radius-md); font-size: var(--font-size-sm); color: var(--color-surface-600); display: none;">
            Equivalente: <strong id="price-bs">Bs. 0.00</strong> (Tasa BCV: Bs. ${CurrencyService.getTasa().toFixed(2)})
          </div>
        </form>
      `,
      footer: `
        <button class="btn btn-secondary" onclick="Modal.close()">Cancelar</button>
        <button class="btn btn-primary" onclick="PruebasPage.saveNewPrueba()">
          ${Icons.check()} Guardar Prueba
        </button>
      `,
    });
  }

  function saveNewPrueba() {
    const nombre = document.getElementById('prueba-nombre')?.value?.trim();
    const categoria = document.getElementById('prueba-categoria')?.value;
    const precio = document.getElementById('prueba-precio')?.value;

    if (!nombre || !categoria || !precio) {
      Toast.error('Complete todos los campos obligatorios');
      return;
    }

    DemoData.addPrueba({ nombre, categoria, precio: parseFloat(precio) });
    Modal.close();
    Toast.success(`Prueba "${nombre}" agregada al catálogo`);
    Router.navigate('/pruebas');
  }

  function openEditPruebaModal(pruebaId) {
    const prueba = DemoData.getPruebaById(pruebaId);
    if (!prueba) return;

    Modal.open({
      title: `Editar Prueba — ${prueba.nombre}`,
      content: `
        <form id="edit-prueba-form">
          <div class="form-group" style="margin-bottom: var(--spacing-base);">
            <label class="form-label">Nombre</label>
            <input type="text" name="nombre" value="${prueba.nombre}" id="edit-prueba-nombre" />
          </div>
          <div class="form-row" style="margin-bottom: var(--spacing-base);">
            <div class="form-group">
              <label class="form-label">Categoría</label>
              <select name="categoria" id="edit-prueba-categoria">
                <option value="Hematología" ${prueba.categoria === 'Hematología' ? 'selected' : ''}>Hematología</option>
                <option value="Química" ${prueba.categoria === 'Química' ? 'selected' : ''}>Química</option>
                <option value="Hormonas" ${prueba.categoria === 'Hormonas' ? 'selected' : ''}>Hormonas</option>
                <option value="Serología" ${prueba.categoria === 'Serología' ? 'selected' : ''}>Serología</option>
                <option value="Inmunología" ${prueba.categoria === 'Inmunología' ? 'selected' : ''}>Inmunología</option>
                <option value="Urología" ${prueba.categoria === 'Urología' ? 'selected' : ''}>Urología</option>
                <option value="Microbiología" ${prueba.categoria === 'Microbiología' ? 'selected' : ''}>Microbiología</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Precio (USD)</label>
              <input type="number" name="precio" step="0.01" min="0" value="${prueba.precio}" id="edit-prueba-precio" oninput="PruebasPage.updateEditPricePreview()" />
            </div>
          </div>
          <div style="padding: var(--spacing-sm) var(--spacing-md); background: var(--color-surface-50); border-radius: var(--radius-md); font-size: var(--font-size-sm); color: var(--color-surface-600);">
            Equivalente: <strong id="edit-price-bs">Bs. ${CurrencyService.convertirABs(prueba.precio).toFixed(2)}</strong> (Tasa BCV: Bs. ${CurrencyService.getTasa().toFixed(2)})
          </div>
        </form>
      `,
      footer: `
        <button class="btn btn-secondary" onclick="Modal.close()">Cancelar</button>
        <button class="btn btn-primary" onclick="PruebasPage.saveEditPrueba('${pruebaId}')">
          ${Icons.check()} Guardar Cambios
        </button>
      `,
    });
  }

  function saveEditPrueba(pruebaId) {
    const nombre = document.getElementById('edit-prueba-nombre')?.value?.trim();
    const categoria = document.getElementById('edit-prueba-categoria')?.value;
    const precio = document.getElementById('edit-prueba-precio')?.value;

    if (!nombre || !categoria || !precio) {
      Toast.error('Complete todos los campos');
      return;
    }

    DemoData.updatePrueba(pruebaId, { nombre, categoria, precio: parseFloat(precio) });
    Modal.close();
    Toast.success(`Prueba "${nombre}" actualizada`);
    Router.navigate('/pruebas');
  }

  function toggleActiva(pruebaId) {
    const updated = DemoData.togglePruebaActiva(pruebaId);
    if (updated) {
      Toast.success(`Prueba "${updated.nombre}" ${updated.activa ? 'activada' : 'desactivada'}`);
      Router.navigate('/pruebas');
    }
  }

  function updatePricePreview() {
    const precio = parseFloat(document.getElementById('prueba-precio')?.value) || 0;
    const preview = document.getElementById('price-preview');
    const priceBs = document.getElementById('price-bs');
    if (preview && priceBs) {
      preview.style.display = precio > 0 ? 'block' : 'none';
      priceBs.textContent = `Bs. ${CurrencyService.convertirABs(precio).toFixed(2)}`;
    }
  }

  function updateEditPricePreview() {
    const precio = parseFloat(document.getElementById('edit-prueba-precio')?.value) || 0;
    const priceBs = document.getElementById('edit-price-bs');
    if (priceBs) {
      priceBs.textContent = `Bs. ${CurrencyService.convertirABs(precio).toFixed(2)}`;
    }
  }

  return { render, filterPruebas, openNewPruebaModal, saveNewPrueba, openEditPruebaModal, saveEditPrueba, toggleActiva, updatePricePreview, updateEditPricePreview };
})();
