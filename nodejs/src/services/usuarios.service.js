//const {connection} = require('../config/database');
const sequelize = require('../config/database');
const usuarios = require('../models/usuarios.model');

exports.obtenerTodosUsuarios = async () => {
    
    try {
        let listaUsuarios = await usuarios.findAll();
        return {mensaje:'Lista de usuarios obtenido exitosamente',data:listaUsuarios};
    } catch (error) {
        return {mensaje:`error ${error}`};
    }
    
};

exports.obtenerUsuariosPorId = async (idUsuario) => {
    return await usuarios.findByPk(idUsuario);
};


/**
 * Creacion de nuevos usuarios 
 * @param {*} nuevoUsuario 
 * @returns 
 */
exports.crearUsuarios = async (datoUsuario)=>{
    const {idRol, idEstados, correoElectronico, nombreCompleto, password, telefono, fechaNacimiento, idClientes} = datoUsuario;
    
    try {
        const result = await sequelize.query(
          'EXEC spInsertarUsuario :idRol, :idEstados, :correoElectronico, :nombreCompleto, :password, :telefono, :fechaNacimiento, :idClientes',
          {
            replacements: { 
              idRol,
              idEstados,
              correoElectronico,
              nombreCompleto,
              password,
              telefono,
              fechaNacimiento,
              idClientes
            },
            type: sequelize.QueryTypes.RAW, // Ejecuta como una consulta cruda (sin procesar)
          }
        );
        return {mensaje:'Usuario insertado correctamente:', data:result};
    } catch (error) {
        return {error:`Error al insertar usuario: ${error}`};
    }
};

exports.actualizarUsuarios = async (datoUsuarioModificar) => {
    const {idUsuarios, idRol, idEstados, correoElectronico, nombreCompleto, password, telefono, fechaNacimiento, idClientes} = datoUsuarioModificar;
    try {
        const result = await sequelize.query(
          'EXEC spModificarUsuario :idUsuarios, :idRol, :idEstados, :correoElectronico, :nombreCompleto, :password, :telefono, :fechaNacimiento, :idClientes',
          {
            replacements: { 
              idUsuarios,
              idRol,
              idEstados,
              correoElectronico,
              nombreCompleto,
              password,
              telefono,
              fechaNacimiento,
              idClientes
            },
            type: sequelize.QueryTypes.RAW, // Ejecuta como una consulta cruda (sin procesar)
          }
        );
        return {mensaje:'Usuario modificado correctamente:', data:result};
      } catch (error) {
        return {error:`Error al modificar usuario: ${error}`};
      }
    
    
};

exports.borrarUsuarios = async (idUsuario) => {
    const borrarUsuario = await usuarios.findByPk(idUsuario);
    if (borrarUsuario) {
        await borrarUsuario.destroy();
        return true;
    }
    return false;
};