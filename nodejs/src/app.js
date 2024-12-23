const dotenv = require("dotenv");
dotenv.config({path: '../.env'});

require('dotenv').config();

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const morgan = require('morgan')

const app = express();

//Importacion de modulos de rutas
const clientesRoute = require('./routes/clientes.routes');

//morgarn
app.use(morgan('tiny'))
// Middleware para manejar datos JSON
app.use(express.json());
 
// Use CORS middleware
 app.use(cors());

// Rutas de 
app.use('/', clientesRoute);


// Puerto de escucha
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`));
