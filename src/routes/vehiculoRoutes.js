const express = require('express');
const { body, validationResult } = require('express-validator');
const Vehiculo = require('../models/Vehiculo');
const OrdenReparacion = require('../models/OrdenReparacion');
const router = express.Router();


router.post(
    '/',
    [
        body('patente').matches(/^[A-Z]{3}\d{3}$|^[A-Z]{2}\d{3}[A-Z]{2}$/).withMessage('La patente tiene que tener el formato ABC123 o AB123CD'),
        body('marca').notEmpty().withMessage('La marca es obligatoria'),
        body('modelo').notEmpty().withMessage('El modelo es obligatorio'),
        body('año').isInt({ min: 1886, max: new Date().getFullYear() + 1 }).withMessage('El año tiene que ser un numero valido')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const nuevoVehiculo = await Vehiculo.create(req.body);
            res.status(201).json(nuevoVehiculo);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: 'La patente tiene que ser unica.' });
            } else if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ error: error.errors.map(e => e.message) });
            }
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
);




router.get('/', async (req, res) => {
    try {
        const vehiculos = await Vehiculo.findAll();
        res.json(vehiculos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:patente', async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findByPk(req.params.patente);
        if (vehiculo) {
            res.json(vehiculo);
        } else {
            res.status(404).json({ error: 'Vehiculo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:patente', async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findByPk(req.params.patente);
        if (vehiculo) {
            await vehiculo.update(req.body);
            res.json(vehiculo);
        } else {
            res.status(404).json({ error: 'Vehiculo no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/:patente', async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findByPk(req.params.patente);
        if (vehiculo) {
            await vehiculo.destroy();
            res.json({ message: 'Vehiculo eliminado' });
        } else {
            res.status(404).json({ error: 'Vehiculo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:patente/ordenes', async (req, res) => {
    try {
        const vehiculoPatente = req.params.patente;
        const ordenes = await OrdenReparacion.findAll({
            where: { vehiculoPatente: vehiculoPatente }
        });
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

