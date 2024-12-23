//const {connection} = require('../config/database');
const sequelize = require('../config/database');
const orden = require('../models/orden.model');

exports.obtenerTodosOrden = async () => {
    
    try {
        let listaOrden = await orden.findAll();
        return {mensaje:'Lista de orden obtenido exitosamente',data:listaOrden};
    } catch (error) {
        return {mensaje:`error ${error}`};
    }
    
};

exports.obtenerOrdenPorId = async (idOrden) => {
    return await orden.findByPk(idOrden);
};


/**
 * Creacion de nuevos orden 
 * @param {*} nuevoOrden 
 * @returns 
 */
exports.crearOrden = async (datoOrden)=>{

    const {idUsuarios, idEstados, nombreCompleto, direccion, telefono, correoElectronico, fechaEntrega, totalOrden} = datoOrden;
    try {
        const result = await sequelize.query(
          'EXEC spInsertarOrden :idUsuarios, :idEstados, :nombreCompleto, :direccion, :telefono, :correoElectronico, :fechaEntrega, :totalOrden',
          {
            replacements: { 
              idUsuarios, 
              idEstados, 
              nombreCompleto, 
              direccion, 
              telefono, 
              correoElectronico, 
              fechaEntrega, 
              totalOrden 
            },
            type: sequelize.QueryTypes.RAW, // Ejecuta como una consulta cruda (sin procesar)
          }
        );
        return {mensaje:'Orden insertada correctamente:', data:result};
      } catch (error) {
        return {error:`Error al insertar orden: ${error}`};
      }
};

exports.actualizarOrden = async (datoOrdenModificar) => {

    const {idOrden, idUsuarios, idEstados, nombreCompleto, direccion, telefono, correoElectronico, fechaEntrega, totalOrden} = datoOrdenModificar;
    
    try {
        const result = await sequelize.query(
          'EXEC spModificarOrden :idOrden, :idUsuarios, :idEstados, :nombreCompleto, :direccion, :telefono, :correoElectronico, :fechaEntrega, :totalOrden',
          {
            replacements: { 
              idOrden, 
              idUsuarios, 
              idEstados, 
              nombreCompleto, 
              direccion, 
              telefono, 
              correoElectronico, 
              fechaEntrega, 
              totalOrden 
            },
            type: sequelize.QueryTypes.RAW, // Ejecuta como una consulta cruda (sin procesar)
          }
        );
        return {mensaje:'Orden modificada correctamente:', data:result};
      } catch (error) {
        return {error:`Error al modificar orden:', ${error}`};
      }
    
    
};

exports.borrarOrden = async (idOrden) => {
    const borrarOrden = await orden.findByPk(idOrden);
    if (borrarOrden) {
        await borrarOrden.destroy();
        return true;
    }
    return false;
};