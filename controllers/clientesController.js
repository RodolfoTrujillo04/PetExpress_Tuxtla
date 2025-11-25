const Cliente = require('../models/Clientes');

const clientesController = {
    // Obtener todos los clientes
    async getAll(req, res) {
        try {
            const clientes = await Cliente.getAll();
            res.json({
                success: true,
                data: clientes
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener clientes',
                error: error.message
            });
        }
    },

    // Obtener cliente por ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const cliente = await Cliente.getById(id);
            
            if (!cliente) {
                return res.status(404).json({
                    success: false,
                    message: 'Cliente no encontrado'
                });
            }

            res.json({
                success: true,
                data: cliente
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener cliente',
                error: error.message
            });
        }
    },

    // Crear nuevo cliente
    async create(req, res) {
        try {
            const clienteData = req.body;
            const id = await Cliente.create(clienteData);
            
            res.status(201).json({
                success: true,
                message: 'Cliente creado exitosamente',
                data: { id_cliente: id }
            });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({
                    success: false,
                    message: 'El correo electrónico ya está registrado'
                });
            }
            
            res.status(500).json({
                success: false,
                message: 'Error al crear cliente',
                error: error.message
            });
        }
    },

    // Actualizar cliente
    async update(req, res) {
        try {
            const { id } = req.params;
            const clienteData = req.body;
            
            const affectedRows = await Cliente.update(id, clienteData);
            
            if (affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Cliente no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Cliente actualizado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar cliente',
                error: error.message
            });
        }
    },

    // Eliminar cliente
    async delete(req, res) {
        try {
            const { id } = req.params;
            const affectedRows = await Cliente.delete(id);
            
            if (affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Cliente no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Cliente eliminado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar cliente',
                error: error.message
            });
        }
    },

    // Obtener mascotas del cliente
    async getMascotas(req, res) {
        try {
            const { id } = req.params;
            const mascotas = await Cliente.getMascotas(id);
            
            res.json({
                success: true,
                data: mascotas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener mascotas del cliente',
                error: error.message
            });
        }
    }
};

module.exports = clientesController;