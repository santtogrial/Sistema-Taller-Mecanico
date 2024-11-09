const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrdenReparacion = sequelize.define('OrdenReparacion', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    vehiculoPatente: { type: DataTypes.STRING, allowNull: false },
    fechaInicio: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    detalle: { type: DataTypes.TEXT, allowNull: false },
    kilometraje: { type: DataTypes.INTEGER, allowNull: false },
    fechaFinalizacion: { type: DataTypes.DATE },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    estadoPago: { type: DataTypes.ENUM('pendiente', 'pagado'), defaultValue: 'pendiente' },
    fechaPago: { type: DataTypes.DATE, allowNull: true },
    medioPago: {
        type: DataTypes.ENUM('efectivo', 'tarjeta de crédito', 'transferencia'),
        allowNull: true
    },
    tipoFactura: { type: DataTypes.STRING },
    numeroFactura: { type: DataTypes.STRING, unique: true }
});

module.exports = OrdenReparacion;
