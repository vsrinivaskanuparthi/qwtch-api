'use strict'
/**
 * @author Srinivas Kanuparthi
 * Module dependencies.
 */

var async = require('async'),
    bcrypt = require('bcrypt'),
    util = require('util');


var dbQuery = require('../../../config/constants/dbQuery'),
    logger = require('../../../config/logger').log4js.getLogger('user.server.service'),
    tokenGenerator = require('../../../config/utils/token-util');





module.exports.signIn = (userObj, cb) => {
    try {
        async.waterfall([
            (callback) => {
                let sql = util.format("SELECT * FROM wp_users WHERE user_login='%s'", userObj.user_login);
                dbQuery.executeQuery(sql, (err, results) => {
                    if (err) {
                        logger.error('signIn function has error', err.message || err)
                        res.status(err.status || err.statusCode || err.code || 500).send({ message: err });
                    } else {
                        if (results && results.length) {
                            callback(undefined, results[0])
                        } else {
                            callback({ status: 404, message: 'user not found please check the details' })
                        }
                    }
                });
            },
            (userData, callback) => {
                try {
                    bcrypt.compare(userObj.user_pass, userData.user_pass, function (err, matchPassword) {
                        if (err) {
                            callback(err)
                        } else if (matchPassword) {
                            callback(undefined, userData)
                        } else {
                            callback({ status: 403, message: 'unauthorized user or invalid password' })
                        }
                    });
                } catch (ex) {
                    cb(ex)
                }
            },
            (userData, callback) => {
                var token = {
                    username: userData.user_login,
                    userId: userData.ID,
                    email: userData.user_email
                }
                var buildData = {
                    token: tokenGenerator.generate(token),
                    username: token.username,
                    userId: token.userId
                };
                callback(undefined, buildData);
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