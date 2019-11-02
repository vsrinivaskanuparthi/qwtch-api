'use strict'
/**
 * @author Srinivas Kanuparthi
 * Module dependencies.
 */

var async = require('async'),
    bcrypt = require('bcrypt')


var dbQuery = require('../../../config/constants/dbQuery'),
    logger = require('../../../config/logger').log4js.getLogger('user.server.service');





const validateUser = (userObj, cb) => {
    if (!userObj.user_login) {
        cb(undefined, false)
    } else if (!userObj.user_email) {
        cb(undefined, false)
    } else if (!userObj.user_pass) {
        cb(undefined, false)
    } else {
        cb(undefined, true)
    }
}

module.exports.saveUser = (userObj, cb) => {
    try {
        async.waterfall([
            (callback) => {
                validateUser(userObj, (err, validate) => {
                    if (validate) {
                        callback(undefined, userObj)
                    } else {
                        callback({ status: 400, message: 'bad request user details missing' })
                    }
                })
            },
            (userData, callback) => {
                bcrypt.hash(userData.user_pass, 5, function (err, bcryptedPassword) {
                    userData.user_pass = bcryptedPassword
                    callback(undefined, userData);
                });
            },
            (userData, callback) => {
                let sql = "INSERT INTO wp_users SET ?";
                dbQuery.executeQuery(sql, userData, (err, response) => {
                    if (err) {
                        logger.error('saveUser function has error', err.message || err);
                        callback(err);
                    } else {
                        logger.info('saveUser function has executed successfully');
                        callback(undefined, response);
                    }
                });
            }
        ], function (error, response) {
            if (error) {
                cb(error)
            } else {
                cb(undefined, response)
            }
        })
    } catch (ex) {
        logger.error('saveUser function has exception occured');
        cb(ex);
    }
}