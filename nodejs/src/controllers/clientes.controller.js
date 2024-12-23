const {obtenerTodosClientes,obtenerClientesPorId,crearClientes,actualizarClientes,borrarClientes} = require('../services/clientes.service');

exports.obtenerTodosClientes = async (req, res) => {
    try {
        const listaClientes = await obtenerTodosClientes();
        return res.status(201).json(listaClientes);
    } catch (error) {
        return res.status(500).json({error: `Error al obtener la lisa de clientes: ${error}` });
    }
};

exports.obtenerClientesPorId = async (req, res) => {
    try {
        const cliente = await obtenerClientesPorId(req.params.id);
        if (cliente) return res.status(201).json(cliente);
        else return res.status(404).json({ message: 'Cliente no encontrado' });
    } catch (error) {
        return res.status(500).json({ error: `Error al obtener cliente por id ${error}` });
    }
};

exports.crearClientes = async (req, res) => {
    
    try {
        const nuevoCliente = await crearClientes(req.body);
        return res.status(201).json(nuevoCliente);
    } catch (error) {
        return res.status(500).json({ error: `Error al crear cliente: ${error}` });
    }
};

exports.actualizarClientes = async (req, res) => {
    try {
        const actualizarCliente = await actualizarClientes(req.body);
        if (actualizarCliente) return res.status(201).json(actualizarCliente);
        else return res.status(404).json({ error: 'Cliente a modificar no encontrado' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.borrarClientes = async (req, res) => {
    try {
        const borrarCliente = await borrarClientes(req.params.id);
        if (borrarCliente) return res.status(201).json({ mensaje: 'Cliente eliminado exitosamente' });
        else return res.status(404).json({ mensaje: 'Cliente a eliminar no encontrado' });
    } catch (error) {
        return res.status(500).json({ error: `Error al eliminar cliente ${error}}` });
    }
};