const bcrypt = require('bcryptjs');
const usuarioModel = require('../models/usuario.model');

const create = async (req, res) => {
    try {
        const { nombre, correo, contrasena } = req.body;

        if (!nombre || !correo || !contrasena) {
            return res.status(400).json({
                mensaje: 'Nombre, correo y contraseña son obligatorios'
            });
        }

        const usuarioExistente = await usuarioModel.getByMail(correo);

        if (usuarioExistente) {
            return res.status(409).json({
                mensaje: 'El correo ya está registrado'
            });
        }

        const contrasenaHash = await bcrypt.hash(contrasena, 10);

        const usuarioId = await usuarioModel.create(
            nombre,
            correo,
            contrasenaHash
        );

        return res.status(201).json({
            mensaje: 'Usuario creado correctamente',
            usuario_id: usuarioId
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

module.exports = {
    create
};