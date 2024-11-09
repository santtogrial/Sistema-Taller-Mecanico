const express = require('express');
const { Op } = require('sequelize');
const sequelize = require('../config/database');
const OrdenReparacion = require('../models/OrdenReparacion');
const Cliente = require('../models/Cliente');
const Vehiculo = require('../models/Vehiculo');
const router = express.Router();


router.get('/ordenes/estado', async (req, res) => {
    const { estadoPago } = req.query;
    if (!estadoPago || !['pendiente', 'pagado'].includes(estadoPago)) {
        return res.status(400).json({ error: 'Tiene que especificar un estado de pago valido (pendiente o pagado).' });
    }

    try {
        const ordenes = await OrdenReparacion.findAll({ where: { estadoPago } });
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ error: 'Error al generar el reporte de ordenes por estado de pago.' });
    }
});


router.get('/ordenes/vehiculo/:patente', async (req, res) => {
    const { patente } = req.params;

    try {
        const ordenes = await OrdenReparacion.findAll({ where: { vehiculoPatente: patente } });
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ error: 'Error al generar el reporte de ordenes por vehiculo.' });
    }
});


router.get('/clientes-vehiculos', async (req, res) => {
    try {
        const clientes = await Cliente.findAll({
            include: {
                model: Vehiculo,
                attributes: ['patente', 'marca', 'modelo', 'año']
            }
        });
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al generar el reporte de clientes y vehiculos.' });
    }
});


router.get('/facturacion-mensual', async (req, res) => {
    const { mes, año, agruparPorMedioPago } = req.query;

    if (!mes || !año) {
        return res.status(400).json({ error: 'Es necesario especificar mes y año para el reporte.' });
    }


    const fechaInicio = new Date(año, mes - 1, 1);
    const fechaFin = new Date(año, mes, 0, 23, 59, 59);

    try {
        const condiciones = {
            estadoPago: 'pagado',
            fechaPago: {
                [Op.between]: [fechaInicio, fechaFin]
            }
        };

        let resultados;
        if (agruparPorMedioPago === 'true') {

            resultados = await OrdenReparacion.findAll({
                where: condiciones,
                attributes: [
                    'medioPago',
                    [sequelize.fn('SUM', sequelize.col('precio')), 'totalFacturacion']
                ],
                group: ['medioPago']
            });
        } else {

            resultados = await OrdenReparacion.sum('precio', { where: condiciones });
        }


        if (!resultados || resultados.length === 0 || resultados === 0) {
            return res.status(200).json({ mensaje: 'No se encontraron registros de facturación para el período especificado.' });
        }

        res.json({ resultados });
    } catch (error) {
        console.error('Error al generar el reporte financiero:', error);
        res.status(500).json({ error: 'Error al generar el reporte financiero.' });
    }
});


router.get('/ordenes-activas', async (req, res) => {
    try {
        const ordenesActivas = await OrdenReparacion.findAll({
            where: {
                fechaFinalizacion: null
            }
        });


        if (!ordenesActivas || ordenesActivas.length === 0) {
            return res.status(200).json({ mensaje: 'No hay ordenes activas en el taller actualmente.' });
        }

        res.json(ordenesActivas);
    } catch (error) {
        console.error('Error al generar el reporte de ordenes activas:', error);
        res.status(500).json({ error: 'Error al generar el reporte de ordenes activas.' });
    }
});



router.get('/ordenes-completadas-mensual', async (req, res) => {
    const { mes, año } = req.query;


    if (!mes || !año) {
        return res.status(400).json({ error: 'Tiene que especificar mes y año para el reporte.' });
    }


    const fechaInicio = new Date(año, mes - 1, 1);
    const fechaFin = new Date(año, mes, 0, 23, 59, 59);

    try {

        const cantidadOrdenesCompletadas = await OrdenReparacion.count({
            where: {
                fechaFinalizacion: {
                    [Op.between]: [fechaInicio, fechaFin]
                }
            }
        });


        if (cantidadOrdenesCompletadas === 0) {
            return res.status(200).json({ mensaje: 'No se encontraron ordenes completadas en el mes especificado.' });
        }

        res.json({ mes, año, cantidadOrdenesCompletadas });
    } catch (error) {
        console.error('Error al generar el reporte de ordenes completadas:', error);
        res.status(500).json({ error: 'Error al generar el reporte de ordenes completadas.' });
    }
});




module.exports = router;
