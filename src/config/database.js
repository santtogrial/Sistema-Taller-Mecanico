const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('taller_mecanico', 'slm', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log('Conectado a MySQL.'))
    .catch(err => console.error('Error de conexión:', err));

module.exports = sequelize;
