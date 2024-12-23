//const {connection} = require('../config/database');
const sequelize = require('../config/database');
const rol = require('../models/rol.model');

exports.obtenerTodosRol = async () => {
    
    try {
        let listaRol = await rol.findAll();
        return {mensaje:'Lista de rol obtenido exitosamente',data:listaRol};
    } catch (error) {
        return {mensaje:`error ${error}`};
    }
    
};

exports.obtenerRolPorId = async (idRol) => {
    return await rol.findByPk(idRol);
};


/**
 * Creacion de nuevos rol 
 * @param {*} nuevoRol
 * @returns 
 */
exports.crearRol = async (datoRol)=>{

    try {    
        const {nombre} = datoRol
            
        const result = await sequelize.query(
            'EXEC spInsertarRol :nombre',
            {
            replacements: { nombre },
            type: sequelize.QueryTypes.RAW, // Ejecuta como una consulta cruda (sin procesar)
            }
        );
        return {mensaje:'Rol insertado correctamente', data:result};
    
    } catch (error) {
        return {error:`Error al insertar rol: ${error}`};
    }
};

exports.actualizarRol = async (datoRolModificar) => {

    const {idRol, nombre} = datoRolModificar;
    try {
        const result = await sequelize.query(
          'EXEC spModificarRol :idRol, :nombre',
          {
            replacements: { idRol, nombre },
            type: sequelize.QueryTypes.RAW, // Ejecuta como una consulta cruda (sin procesar)
          }
        );
        return {mensaje:'Rol modificado correctamente:', data:result};
    } catch (error) {
        return {error:`Error al modificar rol: ${error}`};
    }
    
};

exports.borrarRol = async (idRol) => {
    const borrarRol = await rol.findByPk(idRol);
    if (borrarRol) {
        await borrarRol.destroy();
        return true;
    }
    return false;
};