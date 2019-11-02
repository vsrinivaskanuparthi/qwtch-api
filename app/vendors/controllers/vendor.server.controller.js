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

    vendorService.getVendors((err, response) => {
        if (err) {
            res.send({ status: err.errno || 500, message: err });
        } else {
            res.send(response);
        }
    })

};

module.exports.getVendorById = (req, res) => {

    if (!req.params.vendorId || req.params.vendorId === undefined) {
        res.send({ status: 400, message: 'bad request vendor id required in params' });
    }
    vendorService.getVendorById(req.body, (err, response) => {
        if (err) {
            res.send({ status: err.errno || 500, message: err });
        } else {
            res.send(response);           
        }
    });
};

module.exports.saveVendor = (req, res) => {

    if (!Object.keys(req.body).length) {
        res.send({ status: 400, message: 'bad request vendor details required to save vendor' });
    }
    vendorService.saveVendor(req.body, (err, response) => {
        if (err) {
            res.send({ status: err.errno || 500, message: err });
        } else {
            res.send(response);           
        }
    });
};

module.exports.updateVendor = (req, res) => {

    if (!Object.keys(req.body).length || !req.params.vendorId || req.params.vendorId === undefined) {
        res.send({ status: 400, message: 'data required in body to update the entity' });
    }
    vendorService.updateVendor(req.body, (err, response) => {
        if (err) {
            res.send({ status: err.errno || 500, message: err });
        } else {
            res.send(response);           
        }
    });
};

module.exports.deleteVendor = (req, res) => {

    if (!req.params.vendorId || req.params.vendorId === undefined) {
        res.send({ status: 400, message: 'bad request vendor id required in params to delete vendor' });
    }
    vendorService.deleteVendor(req.body, (err, response) => {
        if (err) {
            res.send({ status: err.errno || 500, message: err });
        } else {
            res.send(response);           
        }
    });
};