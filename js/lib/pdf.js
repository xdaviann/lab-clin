/* ============================================================
   PDF — Servicio de generación de PDFs (Wrapper sobre jsPDF)
   Agnosticismo de Dependencias: solo este archivo conoce jsPDF
   ============================================================ */

const PdfService = (() => {
  /* ── Configuración de jsPDF ── */
  function getJsPDF() {
    const JsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : window.jsPDF;
    if (!JsPDF) {
      console.error('Librería jsPDF no encontrada.');
      return null;
    }
    return JsPDF;
  }

  function handleOutput(doc, filename, shouldPrint = false) {
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);

    if (shouldPrint) {
      // Abrir en nueva pestaña para impresión directa
      window.open(url, '_blank');
    } else {
      // Descarga con nombre explícito usando enlace temporal
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Liberar memoria
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
  }

  /* Cabecera común para todos los PDFs */
  function addHeader(doc, title, subtitle) {
    // Header Bar (Dark Surface)
    doc.setFillColor(26, 29, 41);
    doc.rect(0, 0, 210, 32, 'F');

    // Logo Text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text('LabClínica', 14, 16);

    // Subtitle Text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(160, 160, 180);
    doc.text('SISTEMA DE GESTIÓN DE LABORATORIO CLÍNICO', 14, 23);

    // Date
    doc.setFontSize(9);
    doc.setTextColor(160, 160, 180);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 160, 16);

    // Accent line (Primary Blue)
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(1.5);
    doc.line(0, 32, 210, 32);

    // Page Title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text(title, 14, 48);

    if (subtitle) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      doc.text(subtitle, 14, 55);
    }

    return 65;
  }

  /* Pie de página */
  function addFooter(doc) {
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `LabClínica — Documento generado el ${new Date().toLocaleString('es-ES')} — Página ${i} de ${pageCount}`,
        105, 290, { align: 'center' }
      );
    }
  }

  /* ── Generar Factura PDF ── */
  function generateInvoicePdf(invoice, order, pruebas, payments, shouldPrint = false) {
    const JsPDF = getJsPDF();
    if (!JsPDF) return;

    const doc = new JsPDF();
    const tasa = CurrencyService.getTasa();
    let y = addHeader(doc, `FACTURA ${invoice.id}`, `Orden: ${invoice.ordenId}`);

    /* Datos del paciente y factura */
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text('Datos del Paciente', 14, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Paciente: ${invoice.paciente}`, 14, y); y += 5;
    doc.text(`Fecha: ${invoice.fecha}`, 14, y); y += 5;
    doc.text(`Estado: ${invoice.estado}`, 14, y); y += 5;
    if (invoice.metodoPago) {
      doc.text(`Método de Pago: ${invoice.metodoPago}`, 14, y); y += 5;
    }
    y += 5;

    /* Tabla de pruebas */
    const tableData = pruebas.map(p => [
      p.nombre,
      p.categoria,
      `$${p.precio.toFixed(2)}`,
      `Bs. ${(p.precio * tasa).toFixed(2)}`,
    ]);

    if (typeof doc.autoTable !== 'function') {
      console.error('Error: AutoTable no cargado');
      Toast.error('Error de formato en tablas de PDF');
    } else {
      doc.autoTable({
        startY: y,
        head: [['Prueba', 'Categoría', 'Precio (USD)', 'Precio (Bs.)']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 9 },
        bodyStyles: { fontSize: 8 },
        margin: { left: 14, right: 14 },
      });
      y = doc.lastAutoTable.finalY + 10;
    }

    /* Totales */
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`Total (USD): $${invoice.total.toFixed(2)}`, 130, y);
    y += 6;
    doc.text(`Total (Bs.): Bs. ${(invoice.total * tasa).toFixed(2)}`, 130, y);
    y += 6;
    doc.setTextColor(34, 197, 94);
    doc.text(`Pagado: $${invoice.pagado.toFixed(2)}`, 130, y);
    y += 6;
    const pendiente = invoice.total - invoice.pagado;
    if (pendiente > 0) {
      doc.setTextColor(239, 68, 68);
      doc.text(`Pendiente: $${pendiente.toFixed(2)}`, 130, y);
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    y += 10;
    doc.text(`Tasa BCV del día: Bs. ${tasa.toFixed(2)} por USD`, 14, y);

    addFooter(doc);
    handleOutput(doc, `Factura_${invoice.id}`, shouldPrint);
    Toast.success(`Factura ${invoice.id} generada`);
  }

  /* ── Generar Resultado PDF ── */
  function generateResultPdf(result, order, shouldPrint = false) {
    const JsPDF = getJsPDF();
    if (!JsPDF) return;

    const doc = new JsPDF();
    let y = addHeader(doc, `RESULTADO ${result.id}`, `Orden: ${result.ordenId}`);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text('Información del Resultado', 14, y); y += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const info = [
      ['Paciente', result.paciente],
      ['Prueba', result.prueba],
      ['Estado', result.estado],
      ['Bioanalista', result.bioanalista || 'Sin asignar'],
      ['Fecha Registro', result.fechaRegistro],
      ['Fecha Validación', result.fechaValidacion || 'Pendiente'],
    ];

    info.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${label}:`, 14, y);
      doc.setFont('helvetica', 'normal');
      doc.text(value, 60, y);
      y += 6;
    });

    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Valores del Resultado', 14, y); y += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setDrawColor(200, 200, 200);
    doc.rect(14, y, 180, 40);
    doc.text(result.valores || 'Valores pendientes de registro.', 18, y + 8);

    y += 50;
    if (result.observaciones) {
      doc.setFont('helvetica', 'bold');
      doc.text('Observaciones:', 14, y); y += 6;
      doc.setFont('helvetica', 'normal');
      doc.text(result.observaciones, 14, y);
    }

    addFooter(doc);
    doc.save(`Resultado_${result.id}.pdf`);
    Toast.success(`Resultado ${result.id} descargado`);
  }

  /* ── Generar Reporte PDF ── */
  function generateReportPdf(title, dateRange, data, columns, shouldPrint = false) {
    const JsPDF = getJsPDF();
    if (!JsPDF) return;

    const doc = new JsPDF();
    let y = addHeader(doc, title, `Periodo: ${dateRange}`);

    /* Tabla de datos */
    const tableData = data.map(row => columns.map(col => String(row[col.key] || '')));

    if (typeof doc.autoTable !== 'function') {
      console.error('Error: AutoTable no cargado');
      Toast.error('Error de formato en tablas de PDF');
    } else {
      doc.autoTable({
        startY: y,
        head: [columns.map(c => c.label)],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 8 },
        bodyStyles: { fontSize: 7 },
        margin: { left: 14, right: 14 },
        styles: { cellPadding: 3 },
      });
      y = doc.lastAutoTable.finalY + 10;
    }
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text(`Total de registros: ${data.length}`, 14, y);

    addFooter(doc);
    handleOutput(doc, `Reporte_${title.replace(/\s+/g, '_')}`, shouldPrint);
    Toast.success('Reporte PDF generado');
  }

  /* ── Generar Comprobante de Pago PDF ── */
  function generatePaymentReceiptPdf(invoice, payment, shouldPrint = false) {
    const JsPDF = getJsPDF();
    if (!JsPDF) return;

    const doc = new JsPDF({ format: [148, 210] }); /* A5 */
    const tasa = CurrencyService.getTasa();

    doc.setFillColor(26, 29, 41);
    doc.rect(0, 0, 160, 28, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text('LabClínica', 10, 14);
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 200);
    doc.text('Comprobante de Pago', 10, 21);

    let y = 38;
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Factura: ${invoice.id}`, 10, y); y += 6;
    doc.text(`Paciente: ${invoice.paciente}`, 10, y); y += 6;
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 10, y); y += 6;
    doc.text(`Método: ${payment.metodo}`, 10, y); y += 6;
    if (payment.referencia) {
      doc.text(`Referencia: ${payment.referencia}`, 10, y); y += 6;
    }
    y += 5;

    doc.setDrawColor(200, 200, 200);
    doc.line(10, y, 138, y); y += 8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`Monto: $${payment.monto.toFixed(2)}`, 10, y); y += 7;
    doc.setFontSize(10);
    doc.text(`Equiv. Bs.: Bs. ${(payment.monto * tasa).toFixed(2)}`, 10, y); y += 7;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`Tasa BCV: Bs. ${tasa.toFixed(2)}`, 10, y);

    handleOutput(doc, `Comprobante_${invoice.id}`, shouldPrint);
    Toast.success('Comprobante generado');
  }

  return {
    generateInvoicePdf, generateResultPdf,
    generateReportPdf, generatePaymentReceiptPdf,
  };
})();
