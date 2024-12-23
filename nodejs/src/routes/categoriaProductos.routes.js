const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');

const {obtenerTodosCategoriaProductos, obtenerCategoriaProductosPorId, crearCategoriaProductos, actualizarCategoriaProductos, borrarCategoriaProductos} = require('../controllers/categoriaProductos.controller');

router.get('/listaCategoriaProductos',verificarToken, obtenerTodosCategoriaProductos);
router.get('/:id', verificarToken, obtenerCategoriaProductosPorId);
router.post('/crearCategoriaProductos', verificarToken, crearCategoriaProductos);
router.put('/actualizarCategoriaProductos', verificarToken, actualizarCategoriaProductos);
router.delete('/:id', verificarToken, borrarCategoriaProductos);

module.exports = router;
