const {obtenerTodosEstados,obtenerEstadosPorId,crearEstados,actualizarEstados,borrarEstados} = require('../services/estados.service');

exports.obtenerTodosEstados = async (req, res) => {
    try {
        const listaEstados = await obtenerTodosEstados();
        return res.status(201).json(listaEstados);
    } catch (error) {
        return res.status(500).json({error: `Error al obtener la lisa de estados: ${error}` });
    }
};

exports.obtenerEstadosPorId = async (req, res) => {
    try {
        const estado = await obtenerEstadosPorId(req.params.id);
        if (estado) return res.status(201).json(estado);
        else return res.status(404).json({ message: 'Estado no encontrado' });
    } catch (error) {
        return res.status(500).json({ error: `Error al obtener estado por id ${error}` });
    }
};

exports.crearEstados = async (req, res) => {
    
    try {
        const nuevoEstado = await crearEstados(req.body);
        return res.status(201).json(nuevoEstado);
    } catch (error) {
        return res.status(500).json({ error: `Error al crear estado: ${error}` });
    }
};

exports.actualizarEstados = async (req, res) => {
    try {
        const actualizarEstado = await actualizarEstados(req.body);
        if (actualizarEstado) return res.status(201).json(actualizarEstado);
        else return res.status(404).json({ error: 'Estado a modificar no encontrado' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.borrarEstados = async (req, res) => {
    try {
        const borrarEstado = await borrarEstados(req.params.id);
        if (borrarEstado) return res.status(201).json({ mensaje: 'Estado eliminado exitosamente' });
        else return res.status(404).json({ mensaje: 'Estado a eliminar no encontrado' });
    } catch (error) {
        return res.status(500).json({ error: `Error al eliminar estado ${error}}` });
    }
};