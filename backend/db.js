import pkg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pkg;

/* Conexión a PostgreSQL usando Render */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/* Inicialización de la base de datos */
const initDB = async () => {
  try {
    // Tabla de usuarios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        usuario VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        rol VARCHAR(30) NOT NULL,
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabla de créditos
    await pool.query(`
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
    `);

    // Usuarios fijos del sistema
    const usuariosIniciales = [
      { usuario: 'Yira', password: '0817', rol: 'ADMIN' },
      { usuario: 'Yina', password: '0116', rol: 'ADMIN' },
      { usuario: 'Yadira', password: '1122', rol: 'ADMIN' },
      { usuario: 'Santiago', password: '01218', rol: 'ADMIN_GENERAL' },
      { usuario: 'Publico', password: '0122', rol: 'PUBLICO' }
    ];

    for (const u of usuariosIniciales) {
      const hash = await bcrypt.hash(u.password, 10);

      await pool.query(
        `
        INSERT INTO usuarios (usuario, password, rol)
        VALUES ($1, $2, $3)
        ON CONFLICT (usuario) DO NOTHING;
        `,
        [u.usuario, hash, u.rol]
      );
    }

    console.log('Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error inicializando la base de datos:', error);
  }
};

/* Ejecutar inicialización al arrancar */
initDB();

export default pool;
