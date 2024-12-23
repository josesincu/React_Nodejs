const express = require('express');
const router = express.Router();
const {obtenerTodosCategoriaProductos, obtenerCategoriaProductosPorId, crearCategoriaProductos, actualizarCategoriaProductos, borrarCategoriaProductos} = require('../controllers/categoriaProductos.controller');

router.get('/listaCategoriaProductos', obtenerTodosCategoriaProductos);
router.get('/:id', obtenerCategoriaProductosPorId);
router.post('/crearCategoriaProductos', crearCategoriaProductos);
router.put('/actualizarCategoriaProductos', actualizarCategoriaProductos);
router.delete('/:id', borrarCategoriaProductos);

module.exports = router;
