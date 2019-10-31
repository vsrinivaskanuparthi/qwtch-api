
const mysql = require('mysql');
const logger = require('../logger').log4js.getLogger('dbConnection.js')



var dbConnectionObject = undefined

module.exports.initDBConnections = function () {
    if (!dbConnectionObject) {
        dbConnectionObject = mysql.createConnection({
            host: process.env.DB_HOST || 'qwtchcom-dev.cib6odvvsdkd.us-east-1.rds.amazonaws.com',
            user: process.env.DB_USER || 'qwtchcom',
            password: process.env.DB_PASSWORD || 'qwtchcom',
            database: process.env.DB_NAME || 'qwtch_qwtchdb',
            port: process.env.DB_PORT || 3306
        });

        //connect to database
        dbConnectionObject.connect((err) => {
            if (err) {
                logger.error('Mysql Database Connection Error Occured')
                throw err;
            } else {
                logger.info('Mysql Database Connection Established Successfully...');
            }
        });

    }
    return dbConnectionObject;
}