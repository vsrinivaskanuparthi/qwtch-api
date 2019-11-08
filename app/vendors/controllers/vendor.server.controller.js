'use strict'
/**
 * @author Srinivas Kanuparthi
 * Module dependencies.
 */

var util = require('util');


var logger = require('../../../config/logger').log4js.getLogger('vendor.server.controller'),
    vendorService = require('../../vendors/services/vendor.server.service'),
    dbQuery = require('../../../config/constants/dbQuery');




module.exports.getVendors = (req, res) => {
    try {
        vendorService.getVendors((err, response) => {
            if (err) {
                res.send({ status: err.errno || 500, message: err });
            } else {
                res.send(response);
            }
        })
    } catch (ex) {
        res.send(ex)
    }
};

module.exports.getVendorById = (req, res) => {

    if (!req.params.vendorId || req.params.vendorId === undefined) {
        res.send({ status: 400, message: 'bad request vendor id required in params' });
    }
    try {
        vendorService.getVendorById(req.params, (err, response) => {
            if (err) {
                res.send({ status: err.errno || 500, message: err });
            } else {
                res.send(response);
            }
        });
    } catch (ex) {
        res.send(ex);
    }
};

module.exports.saveVendor = (req, res) => {

    if (!Object.keys(req.body).length) {
        res.send({ status: 400, message: 'bad request vendor details required to save vendor' });
    }
    try {
        vendorService.saveVendor(req.body, (err, response) => {
            if (err) {
                res.send({ status: err.errno || 500, message: err });
            } else {
                res.send(response);
            }
        });
    } catch (ex) {
        res.send(ex);
    }
};

module.exports.updateVendor = (req, res) => {

    if (!Object.keys(req.body).length || !req.params.vendorId || req.params.vendorId === undefined) {
        res.send({ status: 400, message: 'data required in body to update the entity' });
    }
    try {
        vendorService.updateVendor(req.params, req.body, (err, response) => {
            if (err) {
                res.send({ status: err.errno || 500, message: err });
            } else {
                res.send(response);
            }
        });
    } catch (ex) {
        res.send(ex);
    }
};

module.exports.deleteVendor = (req, res) => {

    if (!req.params.vendorId || req.params.vendorId === undefined) {
        res.send({ status: 400, message: 'bad request vendor id required in params to delete vendor' });
    }
    try {
        vendorService.deleteVendor(req.params, (err, response) => {
            if (err) {
                res.send({ status: err.errno || 500, message: err });
            } else {
                res.send(response);
            }
        });
    } catch (ex) {
        res.send(ex)
    }
};