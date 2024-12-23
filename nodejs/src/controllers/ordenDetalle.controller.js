const {obtenerTodosOrdenDetalles,obtenerOrdenDetallesPorId,crearOrdenDetalles,actualizarOrdenDetalles,borrarOrdenDetalles} = require('../services/ordenDetalle.service');

exports.obtenerTodosOrdenDetalles = async (req, res) => {
    try {
        const listaOrdenDetalles = await obtenerTodosOrdenDetalles();
        return res.status(201).json(listaOrdenDetalles);
    } catch (error) {
        return res.status(500).json({error: `Error al obtener la lisa de ordenDetalles: ${error}` });
    }
};

exports.obtenerOrdenDetallesPorId = async (req, res) => {
    try {
        const ordenDetalle = await obtenerOrdenDetallesPorId(req.params.id);
        if (ordenDetalle) return res.status(201).json(ordenDetalle);
        else return res.status(404).json({ message: 'OrdenDetalle no encontrado' });
    } catch (error) {
        return res.status(500).json({ error: `Error al obtener ordenDetalle por id ${error}` });
    }
};

exports.crearOrdenDetalles = async (req, res) => {
    
    try {
        const nuevaOrdenDetalle = await crearOrdenDetalles(req.body);
        return res.status(201).json(nuevaOrdenDetalle);
    } catch (error) {
        return res.status(500).json({ error: `Error al crear ordenDetalle: ${error}` });
    }
};

exports.actualizarOrdenDetalles = async (req, res) => {
    try {
        const actualizarOrdenDetalle = await actualizarOrdenDetalles(req.body);
        if (actualizarOrdenDetalle) return res.status(201).json(actualizarOrdenDetalle);
        else return res.status(404).json({ error: 'OrdenDetalle a modificar no encontrado' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.borrarOrdenDetalles = async (req, res) => {
    try {
        const borrarOrdenDetalle = await borrarOrdenDetalles(req.params.id);
        if (borrarOrdenDetalle) return res.status(201).json({ mensaje: 'OrdenDetalle eliminado exitosamente' });
        else return res.status(404).json({ mensaje: 'OrdenDetalle a eliminar no encontrado' });
    } catch (error) {
        return res.status(500).json({ error: `Error al eliminar ordenDetalle ${error}}` });
    }
};