'use strict'
/**
 * @author Srinivas Kanuparthi
 * Module dependencies.
 */
const logger = require('../../config/logger').log4js.getLogger('qwtch.api.controller')


module.exports.executeQuery = (query, data, cb) => {
    try {
        if (query && query !== undefined) {
            db.query(query, data, (err, response) => {
                if (err) {
                    logger.error('executeQuery function has error while executing query', err.message ? err.message : err)
                    cb(err)
                } else {
                    logger.info('executeQuery function has executed successfully')
                    cb(undefined, { "status": 200, "response": response });
                }
            });
        } else {
            db.query(query, (err, response) => {
                if (err) {
                    logger.error('executeQuery function has error while executing query', err.message ? err.message : err)
                    cb(err)
                } else {
                    logger.info('executeQuery function has executed successfully')
                    cb(undefined, { "status": 200, "response": response });
                }
            });
        }

    } catch (ex) {
        logger.error('executeQuery function has exception occured');
        cb(ex);
    }
}