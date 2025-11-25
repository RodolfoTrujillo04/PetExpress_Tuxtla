const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Errores de MySQL
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
            success: false,
            message: 'Registro duplicado',
            error: err.message
        });
    }

    if (err.code === 'ER_NO_REFERENCED_ROW' || err.code === 'ER_ROW_IS_REFERENCED') {
        return res.status(400).json({
            success: false,
            message: 'Error de integridad referencial',
            error: err.message
        });
    }

    // Error por defecto
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
    });
};

module.exports = errorHandler;