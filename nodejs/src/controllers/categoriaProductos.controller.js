const {obtenerTodosCategoriaProductos,obtenerCategoriaProductosPorId,crearCategoriaProductos,actualizarCategoriaProductos,borrarCategoriaProductos} = require('../services/categoriaProductos.service');

exports.obtenerTodosCategoriaProductos = async (req, res) => {
    try {
        const listaCategoriaProductos = await obtenerTodosCategoriaProductos();
        return res.status(201).json(listaCategoriaProductos);
    } catch (error) {
        return res.status(500).json({error: `Error al obtener la lisa de categoriaProductos: ${error}` });
    }
};

exports.obtenerCategoriaProductosPorId = async (req, res) => {
    try {
        const categoriaProductos = await obtenerCategoriaProductosPorId(req.params.id);
        if (categoriaProductos) return res.status(201).json(categoriaProductos);
        else return res.status(404).json({ message: 'CategoriaProductos no encontrado' });
    } catch (error) {
        return res.status(500).json({ error: `Error al obtener categoriaProductos por id ${error}` });
    }
};

exports.crearCategoriaProductos = async (req, res) => {
    
    try {
        const newCategoriaProductos = await crearCategoriaProductos(req.body);
        return res.status(201).json(newCategoriaProductos);
    } catch (error) {
        return res.status(500).json({ error: `Error al crear categoriaProductos: ${error}` });
    }
};

exports.actualizarCategoriaProductos = async (req, res) => {
    try {
        const actualizarCategoriaProductos = await actualizarCategoriaProductos(req.body);
        if (actualizarCategoriaProductos) return res.status(201).json(actualizarCategoriaProductos);
        else return res.status(404).json({ error: 'CategoriaProductos a modificar no encontrado' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.borrarCategoriaProductos = async (req, res) => {
    try {
        const borrarCategoriaProductos = await borrarCategoriaProductos(req.params.id);
        if (borrarCategoriaProductos) return res.status(201).json({ mensaje: 'CategoriaProductos eliminado exitosamente' });
        else return res.status(404).json({ mensaje: 'CategoriaProductos a eliminar no encontrado' });
    } catch (error) {
        return res.status(500).json({ error: `Error al eliminar categoriaProductos ${error}}` });
    }
};