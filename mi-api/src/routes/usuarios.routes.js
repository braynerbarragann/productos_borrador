const express = require('express');
const router = express.Router();
const usuariosCtrl = require('../controllers/usuarios.controller');

router.post('/', usuariosCtrl.create);

module.exports = router;