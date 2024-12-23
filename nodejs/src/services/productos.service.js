//const {connection} = require('../config/database');
const sequelize = require('../config/database');
const productos = require('../models/productos.model');

exports.obtenerTodosProductos = async () => {
    
    try {
        let listaProducto = await productos.findAll();
        return {mensaje:'Lista de productos obtenido exitosamente',data:listaProducto};
    } catch (error) {
        return {mensaje:`error ${error}`};
    }
    
};

exports.obtenerProductosPorId = async (idProducto) => {
    return await productos.findByPk(idProducto);
};


/**
 * Creacion de nuevos productos 
 * @param {*} nuevoProducto 
 * @returns 
 */
exports.crearProductos = async (datoProducto)=>{

    const {idCategoriaProductos, idUsuarios, nombre, marca, codigo, stock, idEstados, precio, foto} = datoProducto;
    try {
        
        const fotoBinaria = fs.readFileSync(foto);  // Si `foto` es una ruta de archivo
    
        const result = await sequelize.query(
          'EXEC spInsertarProducto :idCategoriaProductos, :idUsuarios, :nombre, :marca, :codigo, :stock, :idEstados, :precio, :foto',
          {
            replacements: { 
              idCategoriaProductos, 
              idUsuarios, 
              nombre, 
              marca, 
              codigo, 
              stock, 
              idEstados, 
              precio, 
              foto: fotoBinaria  // Asegúrate de pasar el archivo como binario
            },
            type: sequelize.QueryTypes.RAW, // Ejecuta como una consulta cruda (sin procesar)
          }
        );
        return {mensaje:'Producto insertado correctamente:', data:result};
      } catch (error) {
        return {error:`Error al insertar producto: ${error}`};
      }
};

exports.actualizarProductos = async (datoProductoModificar) => {

    const {idProductos, idCategoriaProductos, idUsuarios, nombre, marca, codigo, stock, idEstados, precio, foto} = datoProductoModificar;
    try {
        // Convierte el archivo a formato binario si es una imagen
        const fotoBinaria = fs.readFileSync(foto);  // Si `foto` es una ruta de archivo
    
        const result = await sequelize.query(
          'EXEC spModificarProducto :idProductos, :idCategoriaProductos, :idUsuarios, :nombre, :marca, :codigo, :stock, :idEstados, :precio, :foto',
          {
            replacements: { 
              idProductos, 
              idCategoriaProductos, 
              idUsuarios, 
              nombre, 
              marca, 
              codigo, 
              stock, 
              idEstados, 
              precio, 
              foto: fotoBinaria  // Asegúrate de pasar el archivo como binario
            },
            type: sequelize.QueryTypes.RAW, // Ejecuta como una consulta cruda (sin procesar)
          }
        );
        return {mensjae:'Producto modificado correctamente:', data:result};
      } catch (error) {
        return {error:`Error al modificar producto: ${error}`};
      }
    
};

exports.borrarProductos = async (idProducto) => {
    const borrarProducto = await productos.findByPk(idProducto);
    if (borrarProducto) {
        await borrarProducto.destroy();
        return true;
    }
    return false;
};