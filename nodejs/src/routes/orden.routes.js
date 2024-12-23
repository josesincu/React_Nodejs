const express = require('express');
const router = express.Router();
const {obtenerTodosOrden, obtenerOrdenPorId, crearOrden, actualizarOrden, borrarOrden} = require('../controllers/orden.controller');

router.get('/listaOrden', obtenerTodosOrden);
router.get('/:id', obtenerOrdenPorId);
router.post('/crearOrden', crearOrden);
router.put('/actualizarOrden', actualizarOrden);
router.delete('/:id', borrarOrden);

module.exports = router;
