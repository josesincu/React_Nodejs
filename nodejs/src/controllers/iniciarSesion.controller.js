const iniciarSesion = require('../services/iniciarSesion.service');

exports.iniciarSesion = async (req, res) => {
    
    try {
        const sesionUsuario = await iniciarSesion(req.body);
        return res.status(201).json(sesionUsuario);
    } catch (error) {
        return res.status(500).json({ error: `Error al iniciar sesion: ${error}` });
    }
};