const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificacionToken');

const {obtenerTodosClientes, obtenerClientesPorId, crearClientes, actualizarClientes, borrarClientes} = require('../controllers/clientes.controller');

router.get('/listaCliente', verificarToken, obtenerTodosClientes);
router.get('/:id', verificarToken, obtenerClientesPorId);
router.post('/crearCliente', verificarToken, crearClientes);
router.put('/actualizarCliente', verificarToken, actualizarClientes);
router.delete('/:id', verificarToken, borrarClientes);

module.exports = router;
