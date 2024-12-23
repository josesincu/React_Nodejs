//const {connection} = require('../config/database');
const sequelize = require('../config/database');
const estados = require('../models/estados.model');

exports.obtenerTodosEstados = async () => {
    
    try {
        let listaEstado = await estados.findAll();
        return {mensaje:'Lista de estados obtenido exitosamente',data:listaEstado};
    } catch (error) {
        return {mensaje:`error ${error}`};
    }
    
};

exports.obtenerEstadosPorId = async (idEstado) => {
    return await estados.findByPk(idEstado);
};


/**
 * Creacion de nuevos estados 
 * @param {*} nuevoEstado 
 * @returns 
 */
exports.crearEstados = async (datoEstado)=>{

    try {
        const {nombre} = datoEstado;
        const result = await sequelize.query(
          'EXEC spInsertarEstado :nombre',
          {
            replacements: { nombre },
            type: sequelize.QueryTypes.RAW, // Ejecuta como una consulta cruda (sin procesar)
          }
        );
        return {mensaje:'Estado insertado correctamente:', data:result};
    } catch (error) {
        return {error:`Error al insertar estado: ${error}`};
    }
};

exports.actualizarEstados = async (datoEstadoModificar) => {

    const {idEstados, razonSocial, nombreComercial, direccionEntrega, telefono, email} = datoEstadoModificar;
    try {
        const result = await sequelize.query(
          'EXEC spModificarEstado :idEstados, :nombre',
          {
            replacements: { idEstados, nombre },
            type: sequelize.QueryTypes.RAW, // Ejecuta como una consulta cruda (sin procesar)
          }
        );
        return {mensaje:'Estado modificado correctamente:', data:result};
      } catch (error) {
        return {error:`Error al modificar estado: ${error}`};
      }
    
};

exports.borrarEstados = async (idEstado) => {
    const borrarEstado = await estados.findByPk(idEstado);
    if (borrarEstado) {
        await borrarEstado.destroy();
        return true;
    }
    return false;
};