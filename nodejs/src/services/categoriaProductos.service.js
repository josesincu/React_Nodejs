//const {connection} = require('../config/database');
const sequelize = require('../config/database');
const categoriaProductos = require('../models/categoriaProductos.model');

exports.obtenerTodosCategoriaProductos = async () => {
    
    try {
        let listaCategoriaProductos = await categoriaProductos.findAll();
        return {mensaje:'Lista de categoriaProductos obtenido exitosamente',data:listaCategoriaProductos};
    } catch (error) {
        return {mensaje:`error ${error}`};
    }
    
};

exports.obtenerCategoriaProductosPorId = async (idCategoriaProductos) => {
    return await categoriaProductos.findByPk(idCategoriaProductos);
};


/**
 * Creacion de nuevos categoriaProductos 
 * @param {*} nuevoCategoriaProductos 
 * @returns 
 */
exports.crearCategoriaProductos = async (datoCategoriaProductos)=>{

    const {idUsuarios, nombre, idEstados} = datoCategoriaProductos;
    try {
        const result = await sequelize.query(
          'EXEC spInsertarCategoriaProducto :idUsuarios, :nombre, :idEstados',
          {
            replacements: { idUsuarios, nombre, idEstados },
            type: sequelize.QueryTypes.RAW, // Ejecuta como una consulta cruda (sin procesar)
          }
        );
        return {mensaje:'Categoría de producto insertada correctamente:', data:result};
      } catch (error) {
        return {error:`'Error al insertar categoría de producto: ${error}`};
      }
};

exports.actualizarCategoriaProductos = async (datoCategoriaProductosModificar) => {

    const {idCategoriaProductos, idUsuarios, nombre, idEstados} = datoCategoriaProductosModificar;
    
    try {
        const result = await sequelize.query(
          'EXEC spModificarCategoriaProducto :idCategoriaProductos, :idUsuarios, :nombre, :idEstados',
          {
            replacements: { idCategoriaProductos, idUsuarios, nombre, idEstados },
            type: sequelize.QueryTypes.RAW, // Ejecuta como una consulta cruda (sin procesar)
          }
        );
        return {mensaje:'Categoría de producto modificada correctamente:', data:result};
    } catch (error) {
        return {Error:`Error al modificar categoría de producto: {error}`};
    }
    
};

exports.borrarCategoriaProductos = async (idCategoriaProductos) => {
    const borrarCategoriaProductos = await categoriaProductos.findByPk(idCategoriaProductos);
    if (borrarCategoriaProductos) {
        await borrarCategoriaProductos.destroy();
        return true;
    }
    return false;
};