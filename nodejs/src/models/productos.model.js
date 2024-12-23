const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const categoriaProductos = require('../models/categoriaProductos.model');
const usuarios = require('../models/usuarios.model');
const estados = require('../models/estados.model');


const productos = sequelize.define('productos', {
  idProductos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  idCategoriaProductos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: categoriaProductos, // Nombre de la tabla relacionada
      key: 'idCategoriaProductos', // Columna de referencia
    },
  },
  idUsuarios: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: usuarios, // Nombre de la tabla relacionada
      key: 'idUsuarios', // Columna de referencia
    },
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  marca: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  codigo: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  stock: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  idEstados: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: estados, 
      key: 'idEstados', // Columna de referencia
    },
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW, 
  },
  foto: {
    type: DataTypes.BLOB, // Para almacenar datos binarios como imágenes
    allowNull: true,
  },
}, {
  tableName: 'productos',
  timestamps: false, // Desactiva columnas automáticas `createdAt` y `updatedAt`
});

module.exports = productos;
