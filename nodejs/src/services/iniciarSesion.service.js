const sequelize = require('../config/database');
const jwt = require('jsonwebtoken');
const {compararContrasenia} = require('../models/encriptar.model');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});


const iniciarSesion = async (datoUsuario) => {
 
    try {
        const {correoElectronico, contrasena} = datoUsuario;

        // Verificar si al menos uno de los dos campos (Correo_Electronico o Nombre_Usuario) está presente
        if (!correoElectronico && !contrasena) {
            return {
                error:'Se debe proporcionar el correo electrónico o contrasena',
            };
        }

        // Verificar si el Correo_Electronico o Nombre_Usuario tienen un valor válido
        if ((correoElectronico && typeof correoElectronico !== 'string') || 
            (contrasena && typeof contrasena !== 'string')) {
            return {
                error: 'El correo electrónico o contrasena deben  de ser texto válidas.',
            };
        }

        // Verificar si el usuario existe, buscando por correoElectronico
        const usuarioObtenido = await sequelize.query(
            'EXEC spIniciarSesion :correoElectronico, :contrasena',
            {
              replacements: { 
                correoElectronico, 
                contrasena, 
              },
              type: sequelize.QueryTypes.RAW, // Ejecuta como una consulta cruda (sin procesar)
            }
          );

        // Si no se encuentra nadie
        if (usuarioObtenido[0].length === 0) {
            return {
                Error: 'Usuario no encontrado para iniciar sesion',
            };
        }

        // Obteniendo los datos del usuario
        let sesionUsuario = usuarioObtenido[0][0];
        
        // Comparacion de contrasena
        if(compararContrasenia(contrasena,sesionUsuario.password)){
            return {
                Error: 'Error la contraseña no coincide',
            };
        }

    
        // Generar un token JWT
        const token = jwt.sign(
            { 
                idUsuarios: sesionUsuario.idUsuarios, 
                idRol:sesionUsuario.idRol, 
                idEstados: sesionUsuario.idEstados, 
                correoElectronico: sesionUsuario.correoElectronico,
                nombreCompleto: sesionUsuario.nombreCompleto,
                password: sesionUsuario.password,
                telefono: sesionUsuario.telefono
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' } // Token válido por 24 hora
        );

        return {
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: sesionUsuario
        };
    } catch (error) {
        
        return {
            error: `Error al iniciar sesión ${error}`,
        };
    }
};

module.exports = iniciarSesion;