const express = require('express');
const router = express.Router();
const {obtenerTodosUsuarios, obtenerUsuariosPorId, crearUsuarios, actualizarUsuarios, borrarUsuarios} = require('../controllers/usuarios.controller');

router.get('/listaUsuario', obtenerTodosUsuarios);
router.get('/:id', obtenerUsuariosPorId);
router.post('/crearUsuario', crearUsuarios);
router.put('/actualizarUsuario', actualizarUsuarios);
router.delete('/:id', borrarUsuarios);

module.exports = router;
