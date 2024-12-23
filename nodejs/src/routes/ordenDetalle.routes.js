const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');
const {obtenerTodosOrdenDetalles, obtenerOrdenDetallesPorId, crearOrdenDetalles, actualizarOrdenDetalles, borrarOrdenDetalles} = require('../controllers/ordenDetalle.controller');

router.get('/listaOrdenDetalle', verificarToken, obtenerTodosOrdenDetalles);
router.get('/:id', verificarToken,  obtenerOrdenDetallesPorId);
router.post('/crearOrdenDetalle', verificarToken, crearOrdenDetalles);
router.put('/actualizarOrdenDetalle', verificarToken, actualizarOrdenDetalles);
router.delete('/:id', verificarToken, borrarOrdenDetalles);

module.exports = router;
