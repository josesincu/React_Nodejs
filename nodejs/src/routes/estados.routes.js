const express = require('express');
const router = express.Router();
const {obtenerTodosEstados, obtenerEstadosPorId, crearEstados, actualizarEstados, borrarEstados} = require('../controllers/estados.controller');

router.get('/listaEstado', obtenerTodosEstados);
router.get('/:id', obtenerEstadosPorId);
router.post('/crearEstado', crearEstados);
router.put('/actualizarEstado', actualizarEstados);
router.delete('/:id', borrarEstados);

module.exports = router;
