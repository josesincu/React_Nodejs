const {obtenerTodosUsuarios,obtenerUsuariosPorId,crearUsuarios,actualizarUsuarios,borrarUsuarios} = require('../services/usuarios.service');

exports.obtenerTodosUsuarios = async (req, res) => {
    try {
        const listaUsuarios = await obtenerTodosUsuarios();
        return res.status(201).json(listaUsuarios);
    } catch (error) {
        return res.status(500).json({error: `Error al obtener la lisa de usuarios: ${error}` });
    }
};

exports.obtenerUsuariosPorId = async (req, res) => {
    try {
        const usuario = await obtenerUsuariosPorId(req.params.id);
        if (usuario) return res.status(201).json(usuario);
        else return res.status(404).json({ message: 'Usuario no encontrado' });
    } catch (error) {
        return res.status(500).json({ error: `Error al obtener usuario por id ${error}` });
    }
};

exports.crearUsuarios = async (req, res) => {
    
    try {
        const nuevoUsuario = await crearUsuarios(req.body);
        return res.status(201).json(nuevoUsuario);
    } catch (error) {
        return res.status(500).json({ error: `Error al crear usuario: ${error}` });
    }
};

exports.actualizarUsuarios = async (req, res) => {
    try {
        const actualizarUsuario = await actualizarUsuarios(req.body);
        if (actualizarUsuario) return res.status(201).json(actualizarUsuario);
        else return res.status(404).json({ error: 'Usuario a modificar no encontrado' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.borrarUsuarios = async (req, res) => {
    try {
        const borrarUsuario = await borrarUsuarios(req.params.id);
        if (borrarUsuario) return res.status(201).json({ mensaje: 'Usuario eliminado exitosamente' });
        else return res.status(404).json({ mensaje: 'Usuario a eliminar no encontrado' });
    } catch (error) {
        return res.status(500).json({ error: `Error al eliminar usuario ${error}}` });
    }
};