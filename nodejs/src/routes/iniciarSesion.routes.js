const express = require('express');
const router = express.Router();

const {iniciarSesion} = require('../controllers/iniciarSesion.controller');

router.post('/iniciarSesion', iniciarSesion);

module.exports = router;
