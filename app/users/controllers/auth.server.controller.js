'use strict'
/**
 * @author Srinivas Kanuparthi
 * Module dependencies.
 */

var util = require('util');


var logger = require('../../../config/logger').log4js.getLogger('user.server.controller'),
    authService = require('../../users/services/auth.server.service');







module.exports.signIn = (req, res) => {
    try {
        if (!req.body.user_login || !req.body.user_pass) {
            return res.status(400).send({ status: 400, message: 'user login name and password required to login' });
        }
        authService.signIn(req.body, (err, response) => {
            if (err) {
                res.status(err.status || err.statusCode || err.code || 500).send({ message: err });
            } else {
                logger.info('saveVendor function has executed successfully')
                res.send({ "status": 200, "response": response });
            }
        })
    } catch (ex) {
        logger.error('signIn function has exception occured', ex)
        res.send(ex);
    }
};