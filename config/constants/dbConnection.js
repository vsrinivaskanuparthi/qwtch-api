
const mysql = require('mysql');
const logger = require('../logger').log4js.getLogger('dbConnection.js')



var dbConnectionObject = undefined

module.exports.initDBConnections = function () {
    if (!dbConnectionObject) {
        dbConnectionObject = mysql.createConnection({
            host: process.env.DB_HOST || 'database-2.cw6isne4xqja.us-east-1.rds.amazonaws.com',
            user: process.env.DB_USER || 'aeroadmin',
            password: process.env.DB_PASSWORD || 'aer0Admin',
            database: process.env.DB_NAME || 'qwtchcom_qwatchdb',
            port: process.env.DB_PORT || 3306
        });

        //connect to database
        dbConnectionObject.connect((err) => {
            if (err) throw err;
            logger.info('Mysql Database Connection Established Successfully...');
        });

    }
    return dbConnectionObject;
}