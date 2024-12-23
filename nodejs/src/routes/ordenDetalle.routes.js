const express = require('express');
const router = express.Router();
const {obtenerTodosOrdenDetalles, obtenerOrdenDetallesPorId, crearOrdenDetalles, actualizarOrdenDetalles, borrarOrdenDetalles} = require('../controllers/ordenDetalle.controller');

router.get('/listaOrdenDetalle', obtenerTodosOrdenDetalles);
router.get('/:id', obtenerOrdenDetallesPorId);
router.post('/crearOrdenDetalle', crearOrdenDetalles);
router.put('/actualizarOrdenDetalle', actualizarOrdenDetalles);
router.delete('/:id', borrarOrdenDetalles);

module.exports = router;
