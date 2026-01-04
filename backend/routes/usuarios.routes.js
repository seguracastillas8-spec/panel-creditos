import express from 'express';
import { listarUsuarios } from '../controllers/usuarios.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', auth, listarUsuarios);

export default router;

