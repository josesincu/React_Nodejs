//const {connection} = require('../config/database');
const sequelize = require('../config/database');
const ordenDetalles = require('../models/ordenDetalle.model');

exports.obtenerTodosOrdenDetalles = async () => {
    
    try {
        let listaOrdenDetalle = await ordenDetalles.findAll();
        return {mensaje:'Lista de ordenDetalle obtenido exitosamente',data:listaOrdenDetalle};
    } catch (error) {
        return {mensaje:`error ${error}`};
    }
    
};

exports.obtenerOrdenDetallesPorId = async (idOrdenDetalle) => {
    return await ordenDetalles.findByPk(idOrdenDetalle);
};


/**
 * Creacion de nuevos ordenDetalle 
 * @param {*} nuevoOrdenDetalle 
 * @returns 
 */
exports.crearOrdenDetalles = async (datoOrdenDetalle)=>{

    const {idOrden, idProductos, cantidad, precio, subtotal} = datoOrdenDetalle;
    try {
        const result = await sequelize.query(
          'EXEC spInsertarOrdenDetalle :idOrden, :idProductos, :cantidad, :precio, :subtotal',
          {
            replacements: { 
              idOrden, 
              idProductos, 
              cantidad, 
              precio, 
              subtotal 
            },
            type: sequelize.QueryTypes.RAW, // Ejecuta como una consulta cruda (sin procesar)
          }
        );
        return {mensaje:'Detalle de orden insertado correctamente:', data:result};
      } catch (error) {
        return {error:`Error al insertar detalle de orden: ${error}`};
      }
};

exports.actualizarOrdenDetalles = async (datoOrdenDetalleModificar) => {

    const {idOrdenDetalles, idOrden, idProductos, cantidad, precio, subtotal} = datoOrdenDetalleModificar;
    
    try {
        const result = await sequelize.query(
          'EXEC spModificarOrdenDetalle :idOrdenDetalles, :idOrden, :idProductos, :cantidad, :precio, :subtotal',
          {
            replacements: { 
              idOrdenDetalles, 
              idOrden, 
              idProductos, 
              cantidad, 
              precio, 
              subtotal 
            },
            type: sequelize.QueryTypes.RAW, // Ejecuta como una consulta cruda (sin procesar)
          }
        );
        return {mensaje:'Detalle de orden modificado correctamente:', data:result};
      } catch (error) {
        return {error:`Error al modificar detalle de orden: ${error}`};
      } 
};

exports.borrarOrdenDetalles = async (idOrdenDetalle) => {
    const borrarOrdenDetalle = await ordenDetalles.findByPk(idOrdenDetalle);
    if (borrarOrdenDetalle) {
        await borrarOrdenDetalle.destroy();
        return true;
    }
    return false;
};