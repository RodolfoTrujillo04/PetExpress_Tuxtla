const express = require('express');
const router = express.Router();

// Rutas básicas para productos (por ahora solo placeholder)
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Endpoint de productos - Funcionalidad en desarrollo',
        data: []
    });
});

router.get('/:id', (req, res) => {
    res.json({
        success: true,
        message: 'Detalle de producto - Funcionalidad en desarrollo',
        data: { id: req.params.id }
    });
});

module.exports = router;