const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificacionToken');
const {obtenerTodosEstados, obtenerEstadosPorId, crearEstados, actualizarEstados, borrarEstados} = require('../controllers/estados.controller');

router.get('/listaEstado', verificarToken, obtenerTodosEstados);
router.get('/:id', verificarToken, obtenerEstadosPorId);
router.post('/crearEstado', verificarToken, crearEstados);
router.put('/actualizarEstado', verificarToken, actualizarEstados);
router.delete('/:id', verificarToken, borrarEstados);

module.exports = router;
