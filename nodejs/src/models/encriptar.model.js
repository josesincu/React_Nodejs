const bcrypt = require('bcrypt');
// Entre más rondas, mejor protección, pero más consumo de recursos. 10 está bien
const rondasDeSal = 10;

// Encriptamos la contrasenia
exports.encriptarContrasenia = async function(contrasenia){
    palabraSecretaEncriptada = await bcrypt.hash(contrasenia, rondasDeSal);
    return palabraSecretaEncriptada;
}

// Comparamos la comprasenia
exports.compararContrasenia = async function(contrasenia,contraseniEncriptada){
    const palabraSecretaValida = await bcrypt.compare(contrasenia, contraseniEncriptada);
    return palabraSecretaValida;
}

