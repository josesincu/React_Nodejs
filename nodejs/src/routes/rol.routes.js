const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');
const {obtenerTodosRol, obtenerRolPorId, crearRol, actualizarRol, borrarRol} = require('../controllers/rol.controller');

router.get('/listaRol', verificarToken, obtenerTodosRol);
router.get('/:id', verificarToken, obtenerRolPorId);
router.post('/crearRol',verificarToken, crearRol);
router.put('/actualizarRol',verificarToken, actualizarRol);
router.delete('/:id',verificarToken, borrarRol);

module.exports = router;
