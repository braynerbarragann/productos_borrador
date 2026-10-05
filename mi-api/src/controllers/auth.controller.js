const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuario.model');


const login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({
                mensaje: 'Correo y contraseña son obligatorios'
            });
        }

        const usuario = await usuarioModel.getByMail(correo);

        if (!usuario) {
            return res.status(401).json({
                mensaje: 'Credenciales incorrectas'
            });
        }

        const contrasenaValida = await bcrypt.compare(
            contrasena,
            usuario.contrasena_hash
        );

        if (!contrasenaValida) {
            return res.status(401).json({
                mensaje: 'Credenciales incorrectas'
            });
        }

        const token = jwt.sign(
            {
                usuario_id: usuario.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            usuario: {
                id: usuario.id,
                token,
                nombre: usuario.nombre,
                correo: usuario.correo
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

module.exports = {
    login
};