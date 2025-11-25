const Producto = require('../models/Productos');

const productosController = {
    // Obtener todos los productos
    async getAll(req, res) {
        try {
            const productos = await Producto.getAll();
            res.json({
                success: true,
                data: productos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener productos',
                error: error.message
            });
        }
    },

    // Obtener producto por ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const producto = await Producto.getById(id);
            
            if (!producto) {
                return res.status(404).json({
                    success: false,
                    message: 'Producto no encontrado'
                });
            }

            res.json({
                success: true,
                data: producto
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener producto',
                error: error.message
            });
        }
    },

    // Crear nuevo producto
    async create(req, res) {
        try {
            const productoData = req.body;
            const id = await Producto.create(productoData);
            
            res.status(201).json({
                success: true,
                message: 'Producto creado exitosamente',
                data: { id_producto: id }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al crear producto',
                error: error.message
            });
        }
    },

    // Actualizar producto
    async update(req, res) {
        try {
            const { id } = req.params;
            const productoData = req.body;
            
            const affectedRows = await Producto.update(id, productoData);
            
            if (affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Producto no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Producto actualizado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar producto',
                error: error.message
            });
        }
    },

    // Eliminar producto
    async delete(req, res) {
        try {
            const { id } = req.params;
            const affectedRows = await Producto.delete(id);
            
            if (affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Producto no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Producto eliminado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar producto',
                error: error.message
            });
        }
    },

    // Obtener productos por categoría
    async getByCategoria(req, res) {
        try {
            const { idCategoria } = req.params;
            const productos = await Producto.getByCategoria(idCategoria);
            
            res.json({
                success: true,
                data: productos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener productos por categoría',
                error: error.message
            });
        }
    }
};

module.exports = productosController;