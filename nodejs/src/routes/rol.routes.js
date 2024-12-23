const express = require('express');
const router = express.Router();
const {obtenerTodosRol, obtenerRolPorId, crearRol, actualizarRol, borrarRol} = require('../controllers/rol.controller');

router.get('/listaRol', obtenerTodosRol);
router.get('/:id', obtenerRolPorId);
router.post('/crearRol', crearRol);
router.put('/actualizarRol', actualizarRol);
router.delete('/:id', borrarRol);

module.exports = router;
