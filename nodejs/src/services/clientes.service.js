//const {connection} = require('../config/database');
const sequelize = require('../config/database');
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
exports.crearClientes = async (datoCliente)=>{

        try {
        const {razonSocial, nombreComercial, direccionEntrega, telefono, email} = datoCliente
        const result = await sequelize.query(
            'EXEC spInsertarCliente :razonSocial, :nombreComercial, :direccionEntrega, :telefono, :email',
            {
              replacements: {
                razonSocial,
                nombreComercial,
                direccionEntrega,
                telefono,
                email,
              },
              type: sequelize.QueryTypes.RAW, // No es necesario cambiar el tipo aquí
            }
          );
          return {mensaje:'Cliente creado exitosamente',data:result};
        } catch (error) {
        
          return {error:`Error al llamar al procedimiento almacenado: ${error}`};
        }
};

exports.actualizarClientes = async (datoClienteModificar) => {

    const {idClientes, razonSocial, nombreComercial, direccionEntrega, telefono, email} = datoClienteModificar;
    
    try {
        const result = await sequelize.query(
        'EXEC spModificarCliente :idClientes, :razonSocial, :nombreComercial, :direccionEntrega, :telefono, :email',
        {
            replacements: {
            idClientes,
            razonSocial,
            nombreComercial,
            direccionEntrega,
            telefono,
            email,
            },
            type: sequelize.QueryTypes.RAW,
        }
        );
        return {mensaje:'Cliente modificado correctamente', data:result};
    } catch (error) {
        return {error: `Error al modificar el cliente: error`};
    }
    
};

exports.borrarClientes = async (idCliente) => {
    const borrarCliente = await clientes.findByPk(idCliente);
    if (borrarCliente) {
        await borrarCliente.destroy();
        return true;
    }
    return false;
};