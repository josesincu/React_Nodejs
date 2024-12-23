//const {connection} = require('../config/database');
const clientes = require('../models/clientes.model');

exports.obtenerTodosClientes = async () => {
    
    try {
        let listaCliente = await clientes.findAll();
        return {mensaje:'Lista de clientes obtenido exitosamente',data:listaCliente};
    } catch (error) {
        return {mensaje:`error ${error}`};
    }
    
};

exports.obtenerClientesPorId = async (idCliente) => {
    return await clientes.findByPk(idCliente);
};


/**
 * Creacion de nuevos clientes 
 * @param {*} nuevoCliente 
 * @returns 
 */
exports.crearClientes = async (nuevoCliente)=>{
    /*let conexion;
    try {
          conexion = await connection();
    } catch (error) {
          return {status:503, data:{error:`Erro al conectar a la base de datos: ${error}`}};
    }
    */
    let clienteCreado = await clientes.create(nuevoCliente);

    return {mensaje:'Cliente creado exitosamente',data:clienteCreado};
};

exports.actualizarClientes = async (idCliente, datosNuevoCliente) => {
    const actualizarCliente = await clientes.findByPk(idCliente);
    if (actualizarCliente) {
        return await actualizarCliente.update(datosNuevoCliente);
    }
    return null;
};

exports.borrarClientes = async (idCliente) => {
    const borrarCliente = await clientes.findByPk(idCliente);
    if (borrarCliente) {
        await borrarCliente.destroy();
        return true;
    }
    return false;
};