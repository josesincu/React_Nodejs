const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const clientes = sequelize.define('clientes', {
    IdClientes:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    razonSocial: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nombreComercial: {
        type: DataTypes.STRING,
        allowNull: true
    },
    direccionEntrega: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'clientes', // Nombre exacto de la tabla en la base de datos
    timestamps: false, // Deshabilitar campos createdAt y updatedAt si no existen
});

module.exports = clientes;