const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const orden = require('../models/orden.model');
const productos = require('../models/productos.model');


const ordenDetalles = sequelize.define('ordenDetalles', {
  idOrdenDetalles: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  idOrden: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: orden,
      key: 'idOrden',
    },
  },
  idProductos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: productos,
      key: 'idProductos',
    },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  tableName: 'ordenDetalles',
  timestamps: false, // Desactiva columnas automáticas `createdAt` y `updatedAt`
});

module.exports = ordenDetalles;
