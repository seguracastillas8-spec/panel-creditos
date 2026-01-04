import pool from '../db.js';

export const crearCredito = async (req, res) => {
  const { nombre, cedula, telefono, estado } = req.body;

  await pool.query(
    `INSERT INTO creditos (nombre, cedula, telefono, estado, creado_por)
     VALUES ($1,$2,$3,$4,$5)`,
    [nombre, cedula, telefono, estado, req.user.id]
  );

  res.json({ message: 'Crédito creado' });
};

export const listarCreditos = async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM creditos'
  );
  res.json(result.rows);
};

export const borrarCredito = async (req, res) => {
  await pool.query(
    'DELETE FROM creditos WHERE id=$1',
    [req.params.id]
  );
  res.json({ message: 'Crédito eliminado' });
};

