const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const usuarios = require('../models/usuarios.model');
const estados = require('../models/estados.model');

const orden = sequelize.define('orden', {
  idOrden: {
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
    defaultValue: DataTypes.NOW, // Valor por defecto es la fecha y hora actual
  },
  nombreCompleto: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  direccion: {
    type: DataTypes.STRING(545),
    allowNull: true,
  },
  telefono: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  correoElectronico: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  fechaEntrega: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  totalOrden: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  tableName: 'orden',
  timestamps: false, // Desactiva columnas automáticas `createdAt` y `updatedAt`
});

module.exports = orden;
