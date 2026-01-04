const CreditoModel = {
  table: 'creditos',

  schema: `
    CREATE TABLE IF NOT EXISTS creditos (
      id SERIAL PRIMARY KEY,
      fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      nombre_cliente VARCHAR(100) NOT NULL,
      cedula VARCHAR(30) NOT NULL,
      telefono VARCHAR(30) NOT NULL,
      pagaduria VARCHAR(100) NOT NULL,
      cooperativa VARCHAR(50) NOT NULL,
      valor_total NUMERIC(12,2) NOT NULL,
      otros NUMERIC(12,2),
      compras NUMERIC(12,2) NOT NULL,
      estado VARCHAR(50) NOT NULL,
      asesor VARCHAR(100) NOT NULL,
      observaciones TEXT,
      creado_por VARCHAR(50) NOT NULL,
      archivado BOOLEAN DEFAULT FALSE
    );
  `
};

export default CreditoModel;

