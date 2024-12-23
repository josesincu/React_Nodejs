const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const rol = sequelize.define('rol', {
  idRol: {
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
  tableName: 'rol',
  timestamps: false, // Desactiva `createdAt` y `updatedAt`
});

module.exports = rol;
