const express = require('express');
const { body, validationResult } = require('express-validator');
const Cliente = require('../models/Cliente');
const router = express.Router();


router.post(
    '/',
    [
        body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
        body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
        body('cuit_cuil').matches(/^\d{2}-\d{8}-\d{1}$/).withMessage('CUIT/CUIL tiene que tener el formato XX-XXXXXXXX-X'),
        body('telefono').isNumeric().withMessage('El teléfono tiene que tener solo números')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const nuevoCliente = await Cliente.create(req.body);
            res.status(201).json(nuevoCliente);
        } catch (error) {

            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: 'El CUIT/CUIL ya esta registrado en el sistema.' });
            } else if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ error: error.errors.map(e => e.message) });
            }
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
);





router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (cliente) {
            await cliente.update(req.body);
            res.json(cliente);
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (cliente) {
            await cliente.destroy();
            res.json({ message: 'Cliente eliminado' });
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
