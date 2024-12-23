const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const estados = sequelize.define('estados', {
  idEstados: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  tableName: 'estados',
  timestamps: false, // Desactiva `createdAt` y `updatedAt`
});

module.exports = estados;
