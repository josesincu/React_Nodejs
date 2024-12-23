const express = require('express');
const router = express.Router();
const {obtenerTodosClientes, obtenerClientesPorId, crearClientes, actualizarClientes, borrarClientes} = require('../controllers/clientes.controller');

router.get('/listaCliente', obtenerTodosClientes);
router.get('/:id', obtenerClientesPorId);
router.post('/crearCliente', crearClientes);
router.put('/actualizarCliente', actualizarClientes);
router.delete('/:id', borrarClientes);

module.exports = router;
