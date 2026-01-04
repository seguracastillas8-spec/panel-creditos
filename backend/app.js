import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import creditosRoutes from './routes/creditos.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/creditos', creditosRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Panel de Créditos activo' });
});

export default app;

