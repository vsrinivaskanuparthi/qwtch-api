'use strict'
/**
 * @author Srinivas Kanuparthi
 * Module dependencies.
 */



var jwt = require('jsonwebtoken'),
    logger = require('../../config/logger').log4js.getLogger('token-util.js'),
    fs = require('fs');
    
const crypto = require('crypto');
var tokenPrivateCert = fs.readFileSync('keys/private.pem');
var tokenPublicCert = fs.readFileSync('keys/public.pem');  

module.exports.generate = function (obj) {
    return jwt.sign(obj, tokenPrivateCert, { algorithm: 'RS256', expiresIn: '8h' });
}

module.exports.verify = function (token, cb) {
    return jwt.verify(token, tokenPublicCert, cb);
}

module.exports.decryptToken = function (authToken, cb) {
    if (authToken) {
        jwt.verify(authToken, tokenPublicCert, function (err, decrypted) {
            if (err) {
                cb(err);
            } else {
                cb(null, {
                    username: decrypted.username,
                    userId: decrypted.userId
                });
            }
        });
    }
    else {
        cb(new Error('Token obj is null'))
    }
}


module.exports.encrypt = function (text, KEY, IV_LENGTH, cb) {  //TODO: code need to be change buffer is deprecated
    try {
        let iv = crypto.randomBytes(IV_LENGTH);
        /*eslint-disable */
        let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(KEY), iv);
        /*eslint-enable */
        let encrypted = cipher.update(text);

        encrypted = Buffer.concat([encrypted, cipher.final()]);

        let keyData = iv.toString('hex') + ':' + encrypted.toString('hex');
        return cb(null, keyData);

    } catch (ex) {
        logger.error('encrypt function throw exception while encrypting vault key:', ex)
        return cb({ status: 400, message: 'failed to encrypt vault key' });
    }
}

module.exports.decrypt = function (text, KEY, cb) {  //TODO: code need to be change buffer is deprecated
    try {
        let textParts = text.split(':');
        /*eslint-disable */
        let iv = new Buffer(textParts.shift(), 'hex');
        let encryptedText = new Buffer(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(KEY), iv);
        /*eslint-enable */
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return cb ? cb(null, decrypted.toString()) : decrypted.toString();
    } catch (ex) {
        logger.error('decrypt function throw exception while decrypting vault key:', ex)

        let errorMessage = { status: 400, message: 'failed to decrypt vault key' };

        return cb ? cb(errorMessage) : errorMessage;
    }
}
