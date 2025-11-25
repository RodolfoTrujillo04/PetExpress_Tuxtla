const jwt = require('jsonwebtoken');

const authMiddleware = {
    // Verificar token
    verifyToken: (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado. Token no proporcionado.'
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'Token inválido o expirado'
            });
        }
    },

    // Verificar si es admin
    isAdmin: (req, res, next) => {
        if (req.user.rol !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado. Se requieren privilegios de administrador.'
            });
        }
        next();
    },

    // Verificar si es cliente o admin
    isClienteOrAdmin: (req, res, next) => {
        if (req.user.rol !== 'cliente' && req.user.rol !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado.'
            });
        }
        next();
    }
};

module.exports = authMiddleware;