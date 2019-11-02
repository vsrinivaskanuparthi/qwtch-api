'use strict'
/**
 * @author Srinivas Kanuparthi
 * Module dependencies.
 */

var util = require('util');


var logger = require('../../../config/logger').log4js.getLogger('user.server.controller'),
    userService = require('../../users/services/user.server.service');





module.exports.saveUser = (req, res) => {
    try {
        if (!Object.keys(req.body).length) {
            res.status(400).send({ status: 400, message: 'bad request user details required to save user' });
        }
        userService.saveUser(req.body, (err, response) => {
            if (err) {
                logger.error('saveUser function has error', err ? err.message : err)
                res.status(err.status || err.statusCode || err.code || 500).send({ message: err });
            } else {
                logger.info('saveVendor function has executed successfully')
                res.send({ "status": 200, "response": response });
            }
        })
    } catch (ex) {
        logger.error('saveUser function has exception occured');
        res.send(ex);
    }
};



