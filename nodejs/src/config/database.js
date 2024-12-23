
/*const sql = require('mssql');

connection = async function(){
    try {
    
        return await sql.connect(
            {
                user: 'dark',
                password: 'C#astro1235',
                database: 'GDA0063-OT_joseCastroSincu',
                server: 'GHOST',
                port:1433,
                pool: {
                  max: 10,
                  min: 0,
                  idleTimeoutMillis: 30000
                },
                options: {
                  encrypt: true, // for azure
                  trustServerCertificate: true // change to true for local dev / self-signed certs
                }
            }
        );
        //return connect;
    } catch (error) {
        return {error:`Error al conectar a la base de datos-> ${error}`};
    }

}

//C#astro1235
module.exports = {connection};
*/
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mssql',
        port: process.env.DB_PORT,
    }
);

module.exports = sequelize;