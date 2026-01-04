const UsuarioModel = {
  table: 'usuarios',

  schema: `
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      usuario VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      rol VARCHAR(30) NOT NULL,
      creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `
};

export default UsuarioModel;

