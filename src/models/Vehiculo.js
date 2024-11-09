const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');
const OrdenReparacion = require('./OrdenReparacion');

const Vehiculo = sequelize.define('Vehiculo', {
    patente: { type: DataTypes.STRING, primaryKey: true, allowNull: false, unique: true },
    marca: { type: DataTypes.STRING, allowNull: false },
    modelo: { type: DataTypes.STRING, allowNull: false },
    año: { type: DataTypes.INTEGER, allowNull: false },
});

Vehiculo.belongsTo(Cliente, { foreignKey: 'clienteId' });
Cliente.hasMany(Vehiculo, { foreignKey: 'clienteId' });

Vehiculo.hasMany(OrdenReparacion, { foreignKey: 'vehiculoPatente' });
OrdenReparacion.belongsTo(Vehiculo, { foreignKey: 'vehiculoPatente' });

module.exports = Vehiculo;
