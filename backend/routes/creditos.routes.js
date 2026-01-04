import express from 'express';
import {
  crearCredito,
  listarCreditos,
  borrarCredito
} from '../controllers/creditos.controller.js';

import auth from '../middlewares/auth.middleware.js';
import roles from '../middlewares/roles.middleware.js';

const router = express.Router();

router.post('/', auth, crearCredito);
router.get('/', auth, listarCreditos);
router.delete('/:id', auth, roles('ADMIN_GENERAL'), borrarCredito);

export default router;

