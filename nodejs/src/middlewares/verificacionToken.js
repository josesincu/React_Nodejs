const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});
//require('dotenv').config();

// Clave secreta para firmar los tokens JWT (guárdala en variables de entorno)
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para verificar el token
const verificarToken = (req, res, next) => {
    // Obtener el token del encabezado Authorization
    const token = req.headers['authorization']?.split(' ')[1]; // La cabecera debería tener el formato: "Bearer <token>"

    if (!token) {
        return res.status(403).json({
            mensaje: 'No se proporcionó un token.'
        });
    }

    // Verificar el token con la clave secreta
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                mensaje: 'Token inválido o expirado.'
            });
        }

        // Si el token es válido, podemos agregar la información del usuario a la solicitud
        req.usuario = decoded; // Contendrá la información del usuario (id, rol, etc.)
        
        // Continuar con la ejecución de la ruta
        next();
    });
};

module.exports = verificarToken;
