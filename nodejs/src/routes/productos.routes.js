const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificacionToken');
const {obtenerTodosProductos, obtenerProductosPorId, crearProductos, actualizarProductos, borrarProductos} = require('../controllers/productos.controller');

router.get('/listaProducto', verificarToken,  obtenerTodosProductos);
router.get('/:id', verificarToken, obtenerProductosPorId);
router.post('/crearProducto', verificarToken, crearProductos);
router.put('/actualizarProducto', verificarToken, actualizarProductos);
router.delete('/:id', verificarToken, borrarProductos);

module.exports = router;
