const express = require('express');
const { body, validationResult } = require('express-validator');
const OrdenReparacion = require('../models/OrdenReparacion');
const router = express.Router();


router.post(
    '/',
    [
        body('detalle').notEmpty().withMessage('El detalle es obligatorio'),
        body('kilometraje').isInt({ min: 0 }).withMessage('El kilometraje tiene que ser un numero positivo'),
        body('estadoPago').isIn(['pendiente', 'pagado']).withMessage('El estado de pago tiene que ser "pendiente" o "pagado"'),
        body('medioPago').optional().isIn(['efectivo', 'tarjeta de crédito', 'transferencia']).withMessage('El medio de pago no es valido'),
        body('fechaPago').optional().isDate().withMessage('Fecha de pago tiene que ser una fecha valida')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        if (req.body.estadoPago === 'pendiente' && (req.body.fechaPago || req.body.medioPago)) {
            return res.status(400).json({ error: 'Fecha de pago y medio de pago tienen que ser nulos cuando el estado de pago es "pendiente".' });
        }
        if (req.body.estadoPago === 'pagado' && (!req.body.fechaPago || !req.body.medioPago)) {
            return res.status(400).json({ error: 'Fecha de pago y medio de pago son obligatorios cuando el estado de pago es "pagado".' });
        }

        try {
            const nuevaOrden = await OrdenReparacion.create(req.body);
            res.status(201).json(nuevaOrden);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);



router.get('/', async (req, res) => {
    try {
        const estadoPago = req.query.estadoPago;
        const whereCondition = estadoPago ? { estadoPago } : {};

        const ordenes = await OrdenReparacion.findAll({
            where: whereCondition
        });

        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const orden = await OrdenReparacion.findByPk(req.params.id);
        if (orden) {
            res.json(orden);
        } else {
            res.status(404).json({ error: 'Orden no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const orden = await OrdenReparacion.findByPk(req.params.id);
        if (orden) {
            await orden.update(req.body);
            res.json(orden);
        } else {
            res.status(404).json({ error: 'Orden no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const orden = await OrdenReparacion.findByPk(req.params.id);
        if (orden) {
            await orden.destroy();
            res.json({ message: 'Orden eliminada' });
        } else {
            res.status(404).json({ error: 'Orden no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
