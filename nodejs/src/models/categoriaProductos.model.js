const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const usuarios = require('../models/usuarios.model');
const estados = require('../models/estados.model');

const categoriaProductos = sequelize.define('categoriaProductos', {
  idCategoriaProductos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  idUsuarios: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: usuarios, 
      key: 'idUsuarios', 
    },
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  idEstados: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: estados, 
      key: 'idEstados', 
    },
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW, // Valor por defecto es la fecha actual
  },
}, {
  tableName: 'categoriaProductos',
  timestamps: false, // Desactiva columnas automáticas `createdAt` y `updatedAt`
});

module.exports = categoriaProductos;
