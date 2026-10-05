const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productos.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.get('/', verificarToken, ctrl.getAll);
router.get('/:id', verificarToken, ctrl.getById);
router.post('/', verificarToken, ctrl.create);

module.exports = router;