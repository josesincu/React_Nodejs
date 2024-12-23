const {obtenerTodosProductos,obtenerProductosPorId,crearProductos,actualizarProductos,borrarProductos} = require('../services/productos.service');

exports.obtenerTodosProductos = async (req, res) => {
    try {
        const listaProductos = await obtenerTodosProductos();
        return res.status(201).json(listaProductos);
    } catch (error) {
        return res.status(500).json({error: `Error al obtener la lisa de productos: ${error}` });
    }
};

exports.obtenerProductosPorId = async (req, res) => {
    try {
        const producto = await obtenerProductosPorId(req.params.id);
        if (producto) return res.status(201).json(producto);
        else return res.status(404).json({ mensaje: 'Producto no encontrado' });
    } catch (error) {
        return res.status(500).json({ error: `Error al obtener producto por id ${error}` });
    }
};

exports.crearProductos = async (req, res) => {
    
    try {
        const nuevoProducto = await crearProductos(req.body);
        return res.status(201).json(nuevoProducto);
    } catch (error) {
        return res.status(500).json({ error: `Error al crear producto: ${error}` });
    }
};

exports.actualizarProductos = async (req, res) => {
    try {
        const actualizarProducto = await actualizarProductos(req.body);
        if (actualizarProducto) return res.status(201).json(actualizarProducto);
        else return res.status(404).json({ error: 'Producto a modificar no encontrado' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.borrarProductos = async (req, res) => {
    try {
        const borrarProducto = await borrarProductos(req.params.id);
        if (borrarProducto) return res.status(201).json({ mensaje: 'Producto eliminado exitosamente' });
        else return res.status(404).json({ mensaje: 'Producto a eliminar no encontrado' });
    } catch (error) {
        return res.status(500).json({ error: `Error al eliminar producto ${error}}` });
    }
};