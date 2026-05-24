-- ============================================================
-- ESQUEMA INICIAL — Base de datos para Sistema Lab Clínico
-- Plataforma: Supabase (PostgreSQL)
-- ============================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLA: pacientes
-- RF-PAC-001: Registro de pacientes
-- ============================================================
CREATE TABLE IF NOT EXISTS pacientes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  codigo VARCHAR(10) UNIQUE NOT NULL,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  genero VARCHAR(20) NOT NULL CHECK (genero IN ('Masculino', 'Femenino', 'Otro')),
  identificacion VARCHAR(20) UNIQUE NOT NULL,
  telefono VARCHAR(30) NOT NULL,
  email VARCHAR(100),
  direccion TEXT,
  contacto_emergencia TEXT,
  consentimiento_whatsapp BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: pruebas_catalogo
-- Catálogo de pruebas disponibles
-- ============================================================
CREATE TABLE IF NOT EXISTS pruebas_catalogo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  codigo VARCHAR(10) UNIQUE NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
  descripcion TEXT,
  activa BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: ordenes
-- RF-PAC-005: Gestión de órdenes
-- ============================================================
CREATE TABLE IF NOT EXISTS ordenes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  codigo VARCHAR(10) UNIQUE NOT NULL,
  paciente_id UUID NOT NULL REFERENCES pacientes(id),
  medico_remitente VARCHAR(150),
  prioridad VARCHAR(20) DEFAULT 'Normal' CHECK (prioridad IN ('Normal', 'Urgente')),
  estado VARCHAR(30) DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'En Proceso', 'Completada', 'Validado', 'Entregado', 'Cancelada')),
  observaciones TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: orden_pruebas (relación N:N entre órdenes y pruebas)
-- ============================================================
CREATE TABLE IF NOT EXISTS orden_pruebas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  orden_id UUID NOT NULL REFERENCES ordenes(id) ON DELETE CASCADE,
  prueba_id UUID NOT NULL REFERENCES pruebas_catalogo(id),
  precio_aplicado DECIMAL(10,2) NOT NULL,
  UNIQUE(orden_id, prueba_id)
);

-- ============================================================
-- TABLA: resultados
-- RF-RES-001 a RF-RES-005
-- ============================================================
CREATE TABLE IF NOT EXISTS resultados (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  codigo VARCHAR(10) UNIQUE NOT NULL,
  orden_id UUID NOT NULL REFERENCES ordenes(id),
  prueba_id UUID NOT NULL REFERENCES pruebas_catalogo(id),
  valores TEXT,
  observaciones TEXT,
  archivo_url TEXT,
  estado VARCHAR(30) DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'En Proceso', 'Validado', 'Entregado')),
  bioanalista_id UUID REFERENCES auth.users(id),
  fecha_registro TIMESTAMPTZ DEFAULT NOW(),
  fecha_validacion TIMESTAMPTZ,
  validado_por UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: facturas
-- RF-PAG-001
-- ============================================================
CREATE TABLE IF NOT EXISTS facturas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  codigo VARCHAR(10) UNIQUE NOT NULL,
  orden_id UUID NOT NULL REFERENCES ordenes(id),
  paciente_id UUID NOT NULL REFERENCES pacientes(id),
  total DECIMAL(10,2) NOT NULL,
  estado VARCHAR(20) DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Parcial', 'Pagada', 'Anulada')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: pagos
-- RF-PAG-002, RF-PAG-003
-- ============================================================
CREATE TABLE IF NOT EXISTS pagos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  factura_id UUID NOT NULL REFERENCES facturas(id),
  monto DECIMAL(10,2) NOT NULL CHECK (monto > 0),
  metodo_pago VARCHAR(30) NOT NULL CHECK (metodo_pago IN ('Efectivo', 'Tarjeta', 'Transferencia', 'Pago Móvil')),
  referencia VARCHAR(100),
  fecha TIMESTAMPTZ DEFAULT NOW(),
  registrado_por UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: envios_whatsapp
-- RF-WSP-001 a RF-WSP-005
-- ============================================================
CREATE TABLE IF NOT EXISTS envios_whatsapp (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resultado_id UUID NOT NULL REFERENCES resultados(id),
  paciente_id UUID NOT NULL REFERENCES pacientes(id),
  telefono_destino VARCHAR(30) NOT NULL,
  enlace_temporal TEXT,
  enlace_expiracion TIMESTAMPTZ,
  estado VARCHAR(30) DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Enviado', 'Entregado', 'Fallido')),
  intentos INT DEFAULT 0,
  ultimo_intento TIMESTAMPTZ,
  confirmacion_entrega TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: auditoria
-- RF-SEC-004
-- ============================================================
CREATE TABLE IF NOT EXISTS auditoria (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID REFERENCES auth.users(id),
  accion VARCHAR(50) NOT NULL,
  tabla_afectada VARCHAR(50),
  registro_id UUID,
  datos_anteriores JSONB,
  datos_nuevos JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: perfiles_usuario
-- RF-SEC-002: Control de roles
-- ============================================================
CREATE TABLE IF NOT EXISTS perfiles_usuario (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  nombre VARCHAR(150) NOT NULL,
  rol VARCHAR(30) NOT NULL CHECK (rol IN ('Administrador', 'Bioanalista', 'Recepcionista')),
  activo BOOLEAN DEFAULT true,
  ultimo_acceso TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ÍNDICES para optimización de consultas
-- ============================================================
CREATE INDEX idx_pacientes_identificacion ON pacientes(identificacion);
CREATE INDEX idx_pacientes_telefono ON pacientes(telefono);
CREATE INDEX idx_pacientes_nombre ON pacientes(nombres, apellidos);
CREATE INDEX idx_ordenes_paciente ON ordenes(paciente_id);
CREATE INDEX idx_ordenes_estado ON ordenes(estado);
CREATE INDEX idx_ordenes_fecha ON ordenes(created_at);
CREATE INDEX idx_resultados_orden ON resultados(orden_id);
CREATE INDEX idx_resultados_estado ON resultados(estado);
CREATE INDEX idx_facturas_paciente ON facturas(paciente_id);
CREATE INDEX idx_facturas_estado ON facturas(estado);
CREATE INDEX idx_pagos_factura ON pagos(factura_id);
CREATE INDEX idx_auditoria_usuario ON auditoria(usuario_id);
CREATE INDEX idx_auditoria_fecha ON auditoria(created_at);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) — RNF-SEG-001, RNF-SEG-004
-- ============================================================
ALTER TABLE pacientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ordenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resultados ENABLE ROW LEVEL SECURITY;
ALTER TABLE facturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditoria ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfiles_usuario ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios autenticados pueden leer pacientes
CREATE POLICY "pacientes_select" ON pacientes FOR SELECT TO authenticated USING (true);

-- Política: Solo Admins y Recepcionistas pueden insertar pacientes
CREATE POLICY "pacientes_insert" ON pacientes FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM perfiles_usuario
      WHERE id = auth.uid() AND rol IN ('Administrador', 'Recepcionista')
    )
  );

-- Política: Solo Admins y Recepcionistas pueden actualizar pacientes
CREATE POLICY "pacientes_update" ON pacientes FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM perfiles_usuario
      WHERE id = auth.uid() AND rol IN ('Administrador', 'Recepcionista')
    )
  );

-- Política: Los usuarios autenticados pueden ver sus propias acciones de auditoría
CREATE POLICY "auditoria_select" ON auditoria FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM perfiles_usuario
      WHERE id = auth.uid() AND rol = 'Administrador'
    )
  );

-- ============================================================
-- FUNCIONES auxiliares
-- ============================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para auto-actualizar updated_at
CREATE TRIGGER tr_pacientes_updated_at BEFORE UPDATE ON pacientes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_ordenes_updated_at BEFORE UPDATE ON ordenes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_resultados_updated_at BEFORE UPDATE ON resultados FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_facturas_updated_at BEFORE UPDATE ON facturas FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_perfiles_updated_at BEFORE UPDATE ON perfiles_usuario FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- DATOS INICIALES
-- ============================================================

-- Catálogo de pruebas básicas
INSERT INTO pruebas_catalogo (codigo, nombre, categoria, precio) VALUES
  ('PRU-001', 'Hematología Completa', 'Hematología', 15.00),
  ('PRU-002', 'Glicemia', 'Química', 8.00),
  ('PRU-003', 'Perfil Lipídico', 'Química', 25.00),
  ('PRU-004', 'Uroanálisis', 'Urología', 10.00),
  ('PRU-005', 'TSH', 'Hormonas', 20.00),
  ('PRU-006', 'HIV (Prueba Rápida)', 'Serología', 18.00),
  ('PRU-007', 'PCR Cuantitativa', 'Inmunología', 12.00),
  ('PRU-008', 'Ácido Úrico', 'Química', 8.00),
  ('PRU-009', 'Creatinina', 'Química', 8.00),
  ('PRU-010', 'Hemoglobina Glicosilada', 'Hematología', 22.00)
ON CONFLICT (codigo) DO NOTHING;
