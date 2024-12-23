const {obtenerTodosOrden,obtenerOrdenPorId,crearOrden,actualizarOrden,borrarOrden} = require('../services/orden.service');

exports.obtenerTodosOrden = async (req, res) => {
    try {
        const listaOrden = await obtenerTodosOrden();
        return res.status(201).json(listaOrden);
    } catch (error) {
        return res.status(500).json({error: `Error al obtener la lisa de orden: ${error}` });
    }
};

exports.obtenerOrdenPorId = async (req, res) => {
    try {
        const orden = await obtenerOrdenPorId(req.params.id);
        if (orden) return res.status(201).json(orden);
        else return res.status(404).json({ message: 'Orden no encontrado' });
    } catch (error) {
        return res.status(500).json({ error: `Error al obtener orden por id ${error}` });
    }
};

exports.crearOrden = async (req, res) => {
    
    try {
        const nuevaOrden = await crearOrden(req.body);
        return res.status(201).json(nuevaOrden);
    } catch (error) {
        return res.status(500).json({ error: `Error al crear orden: ${error}` });
    }
};

exports.actualizarOrden = async (req, res) => {
    try {
        const actualizarOrden = await actualizarOrden(req.body);
        if (actualizarOrden) return res.status(201).json(actualizarOrden);
        else return res.status(404).json({ error: 'Orden a modificar no encontrado' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.borrarOrden = async (req, res) => {
    try {
        const borrarOrden = await borrarOrden(req.params.id);
        if (borrarOrden) return res.status(201).json({ mensaje: 'Orden eliminado exitosamente' });
        else return res.status(404).json({ mensaje: 'Orden a eliminar no encontrado' });
    } catch (error) {
        return res.status(500).json({ error: `Error al eliminar orden ${error}}` });
    }
};