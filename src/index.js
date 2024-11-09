const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const Cliente = require('./models/Cliente');
const Vehiculo = require('./models/Vehiculo');
const OrdenReparacion = require('./models/OrdenReparacion');
const reporteRoutes = require('./routes/reporteRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

Vehiculo.belongsTo(Cliente, { foreignKey: 'clienteId' });
Cliente.hasMany(Vehiculo, { foreignKey: 'clienteId' });

Vehiculo.hasMany(OrdenReparacion, { foreignKey: 'vehiculoPatente' });
OrdenReparacion.belongsTo(Vehiculo, { foreignKey: 'vehiculoPatente' });

const clienteRoutes = require('./routes/clienteRoutes');
const vehiculoRoutes = require('./routes/vehiculoRoutes');
const ordenReparacionRoutes = require('./routes/ordenReparacionRoutes');

app.use('/api/clientes', clienteRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/ordenes', ordenReparacionRoutes);
app.use('/api/reporte', reporteRoutes);

app.get('/', (req, res) => {
    res.send('API Taller Mecánico OK');
});

sequelize.sync({ alter: true })
    .then(() => console.log('Tablas sincronizadas bien.'))
    .catch(error => console.error('Error sincronizando las tablas:', error));

app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});
