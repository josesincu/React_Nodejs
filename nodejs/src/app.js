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
const rolRoute = require('./routes/rol.routes');
const estadosRoute = require('./routes/estados.routes');
const usuariosRoute = require('./routes/usuarios.routes');
const categoriaProductosRoute = require('./routes/categoriaProductos.routes');
const ordenRoute = require('./routes/orden.routes');
const productosRoute = require('./routes/productos.routes');
const ordenDetalleRoute = require('./routes/ordenDetalle.routes');

//morgarn
app.use(morgan('tiny'))
// Middleware para manejar datos JSON
app.use(express.json());
 
// Use CORS middleware
 app.use(cors());

// Rutas de 
app.use('/', clientesRoute);
app.use('/', rolRoute);
app.use('/', estadosRoute);
app.use('/', usuariosRoute);
app.use('/', categoriaProductosRoute);
app.use('/', ordenRoute);
app.use('/', productosRoute);
app.use('/', ordenDetalleRoute);

// Puerto de escucha
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`));
