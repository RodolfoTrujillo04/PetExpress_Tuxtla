const Usuario = require('../models/Usuarios');
const jwt = require('jsonwebtoken');

const authController = {
    // Registrar nuevo usuario
    async register(req, res) {
        try {
            const { email, password, id_cliente, rol } = req.body;

            // Validaciones básicas
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email y contraseña son requeridos'
                });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'La contraseña debe tener al menos 6 caracteres'
                });
            }

            // Verificar si el usuario ya existe
            const existingUser = await Usuario.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'El email ya está registrado'
                });
            }

            // Crear nuevo usuario
            const userId = await Usuario.create({
                id_cliente,
                email,
                password,
                rol
            });

            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: { id_usuario: userId }
            });
        } catch (error) {
            console.error('Error en registro:', error);
            res.status(500).json({
                success: false,
                message: 'Error al registrar usuario',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
            });
        }
    },

    // Iniciar sesión
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validaciones básicas
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email y contraseña son requeridos'
                });
            }

            // Buscar usuario por email
            const user = await Usuario.findByEmail(email);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            // Verificar contraseña
            const isPasswordValid = await Usuario.comparePassword(password, user.password_hash);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            // Actualizar último login
            await Usuario.updateLastLogin(user.id_usuario);

            // Generar token JWT
            const token = jwt.sign(
                { 
                    id: user.id_usuario, 
                    email: user.email, 
                    rol: user.rol,
                    nombre: user.nombre,
                    apellido: user.apellido
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                success: true,
                message: 'Login exitoso',
                data: {
                    token,
                    user: {
                        id: user.id_usuario,
                        email: user.email,
                        rol: user.rol,
                        nombre: user.nombre,
                        apellido: user.apellido
                    }
                }
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({
                success: false,
                message: 'Error al iniciar sesión',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
            });
        }
    },

    // Verificar token (me)
    async getMe(req, res) {
        try {
            const user = await Usuario.findById(req.user.id);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            res.json({
                success: true,
                data: {
                    id: user.id_usuario,
                    email: user.email,
                    rol: user.rol,
                    nombre: user.nombre,
                    apellido: user.apellido
                }
            });
        } catch (error) {
            console.error('Error en getMe:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener información del usuario',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
            });
        }
    }
};

module.exports = authController;