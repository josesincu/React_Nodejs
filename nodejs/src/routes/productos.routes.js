const express = require('express');
const router = express.Router();
const {obtenerTodosProductos, obtenerProductosPorId, crearProductos, actualizarProductos, borrarProductos} = require('../controllers/productos.controller');

router.get('/listaProducto', obtenerTodosProductos);
router.get('/:id', obtenerProductosPorId);
router.post('/crearProducto', crearProductos);
router.put('/actualizarProducto', actualizarProductos);
router.delete('/:id', borrarProductos);

module.exports = router;
