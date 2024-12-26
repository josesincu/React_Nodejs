const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificacionToken');
const {obtenerTodosUsuarios, obtenerUsuariosPorId, crearUsuarios, actualizarUsuarios, borrarUsuarios} = require('../controllers/usuarios.controller');

router.get('/listaUsuario', verificarToken, obtenerTodosUsuarios);
router.get('/:id', verificarToken, obtenerUsuariosPorId);
router.post('/crearUsuario', crearUsuarios);
router.put('/actualizarUsuario', verificarToken, actualizarUsuarios);
router.delete('/:id', verificarToken, borrarUsuarios);

module.exports = router;
