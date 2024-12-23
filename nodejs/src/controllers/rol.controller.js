const {obtenerTodosRol,obtenerRolPorId,crearRol,actualizarRol,borrarRol} = require('../services/rol.service');

exports.obtenerTodosRol = async (req, res) => {
    try {
        const listaRol = await obtenerTodosRol();
        return res.status(201).json(listaRol);
    } catch (error) {
        return res.status(500).json({error: `Error al obtener la lisa de rol: ${error}` });
    }
};

exports.obtenerRolPorId = async (req, res) => {
    try {
        const rol = await obtenerRolPorId(req.params.id);
        if (rol) return res.status(201).json(rol);
        else return res.status(404).json({ message: 'Rol no encontrado' });
    } catch (error) {
        return res.status(500).json({ error: `Error al obtener rol por id ${error}` });
    }
};

exports.crearRol = async (req, res) => {
    
    try {
        const nuevoRol = await crearRol(req.body);
        return res.status(201).json(nuevoRol);
    } catch (error) {
        return res.status(500).json({ error: `Error al crear rol: ${error}` });
    }
};

exports.actualizarRol = async (req, res) => {
    try {
        const actualizarRol = await actualizarRol(req.body);
        if (actualizarRol) return res.status(201).json(actualizarRol);
        else return res.status(404).json({ error: 'Rol a modificar no encontrado' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.borrarRol = async (req, res) => {
    try {
        const borrarRol = await borrarRol(req.params.id);
        if (borrarRol) return res.status(201).json({ mensaje: 'Rol eliminado exitosamente' });
        else return res.status(404).json({ mensaje: 'Rol a eliminar no encontrado' });
    } catch (error) {
        return res.status(500).json({ error: `Error al eliminar rol ${error}}` });
    }
};