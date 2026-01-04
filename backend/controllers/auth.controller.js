import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../db.js';

export const login = async (req, res) => {
  const { usuario, password } = req.body;

  const result = await pool.query(
    'SELECT * FROM usuarios WHERE usuario=$1',
    [usuario]
  );

  if (result.rows.length === 0)
    return res.status(401).json({ error: 'Usuario no válido' });

  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password);

  if (!valid)
    return res.status(401).json({ error: 'Contraseña incorrecta' });

  const token = jwt.sign(
    { id: user.id, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token, rol: user.rol });
};

