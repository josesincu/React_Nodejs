const {obtenerTodosClientes,obtenerClientesPorId,crearClientes,actualizarClientes,borrarClientes} = require('../services/clientes.service');

exports.obtenerTodosClientes = async (req, res) => {
    try {
        const listaClientes = await obtenerTodosClientes();
        return res.status(200).json(listaClientes);
    } catch (error) {
        return res.status(500).json({mensaje: error.message });
    }
};

exports.obtenerClientesPorId = async (req, res) => {
    try {
        const cliente = await obtenerClientesPorId(req.params.id);
        if (cliente) return res.json(cliente);
        else return res.status(404).json({ message: 'Cliente no encontrado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.crearClientes = async (req, res) => {
    
    try {
        const newCliente = await crearClientes(req.body);
        return res.status(201).json(newCliente);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.actualizarClientes = async (req, res) => {
    try {
        const updatedCliente = await actualizarClientes(req.params.id, req.body);
        if (updatedCliente) return res.json(updatedCliente);
        else return res.status(404).json({ message: 'Cliente no encontrado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.borrarClientes = async (req, res) => {
    try {
        const deleted = await borrarClientes(req.params.id);
        if (deleted) return res.json({ message: 'Cliente eliminado' });
        else return res.status(404).json({ message: 'Cliente no encontrado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};