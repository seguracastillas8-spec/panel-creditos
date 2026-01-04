import pool from '../db.js';

export const listarUsuarios = async (req, res) => {
  const result = await pool.query(
    'SELECT usuario, rol FROM usuarios'
  );
  res.json(result.rows);
};

