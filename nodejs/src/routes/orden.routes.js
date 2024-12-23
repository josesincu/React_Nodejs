const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');
const {obtenerTodosOrden, obtenerOrdenPorId, crearOrden, actualizarOrden, borrarOrden} = require('../controllers/orden.controller');

router.get('/listaOrden', verificarToken, obtenerTodosOrden);
router.get('/:id', verificarToken, obtenerOrdenPorId);
router.post('/crearOrden',verificarToken,  crearOrden);
router.put('/actualizarOrden',verificarToken, actualizarOrden);
router.delete('/:id', verificarToken, borrarOrden);

module.exports = router;
