const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const rol = require('../models/rol.model');
const estados = require('../models/estados.model');
const clientes = require('../models/clientes.model');

const usuarios = sequelize.define('usuarios', {
  idUsuarios: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  idRol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: rol, 
      key: 'idRol', 
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
  correoElectronico: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  nombreCompleto: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  telefono: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  fechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  idClientes: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: clientes, 
      key: 'idClientes',
    },
  },
}, {
  tableName: 'usuarios',
  timestamps: false, // Desactiva columnas automáticas `createdAt` y `updatedAt`
});

module.exports = usuarios;
