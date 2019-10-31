'use strict'
/**
 * @author Srinivas Kanuparthi
 * Module dependencies.
 */

const util = require('util');


const logger = require('../../../config/logger').log4js.getLogger('qwtch.api.controller');
const dbQuery = require('../../../config/constants/dbQuery');



module.exports.getVendors = (req, res) => {

    let sql = "SELECT * FROM qw_vendor";
    dbQuery.executeQuery(sql, (err, results) => {
        if (err) {
            logger.error('getVendors function has error', err.message || err)
            res.status(err.status || err.statusCode || err.code || 500).send({ message: err });
        } else {
            logger.info('getVendors function has executed successfully')
            res.send(JSON.stringify({ "status": 200, "response": results }));
        }
    });

};

module.exports.getVendorById = (req, res) => {
    if (!req.params.vendorId || req.params.vendorId === undefined) {
        res.status(400).send({ status: 400, message: 'bad request vendor id required in params' });
    }
    let sql = util.format("SELECT * FROM qw_vendor WHERE vendor_id='%s'", req.params.vendor_id);
    dbQuery.executeQuery(sql, (err, results) => {
        if (err) {
            logger.error('getVendorById function has error', err.message || err)
            res.status(err.status || err.statusCode || err.code || 500).send({ message: err });
        } else {
            logger.info('getVendorById function has executed successfully')
            res.send(JSON.stringify({ "status": 200, "response": results }));
        }
    });
};

module.exports.saveVendor = (req, res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).send({ status: 400, message: 'bad request vendor details required to save vendor' });
    }
    let data = { vendor_name: req.body.vendor_name, vendor_address: req.body.vendor_address };
    let sql = "INSERT INTO qw_vendor SET ?";
    dbQuery.executeQuery(sql, data, (err, results) => {
        if (err) {
            logger.error('saveVendor function has error', err.message || err)
            res.status(err.status || err.statusCode || err.code || 500).send({ message: err });
        } else {
            logger.info('saveVendor function has executed successfully')
            res.send(JSON.stringify({ "status": 200, "response": results }));
        }
    });
};

module.exports.updateVendor = (req, res) => {
    if (!Object.keys(req.body).length || !req.params.vendorId || req.params.vendorId === undefined) {
        res.status(400).send({ status: 400, message: 'data required in body to update the entity' });
    }
    let sql = util.format("UPDATE qw_vendor SET vendor_name='%s', vendor_address='%s' WHERE vendor_id=%s", req.body.vendor_name, req.body.vendor_address, req.params.vendorId);
    dbQuery.executeQuery(sql, data, (err, results) => {
        if (err) {
            logger.error('updateVendor function has error', err.message || err)
            res.status(err.status || err.statusCode || err.code || 500).send({ message: err });
        } else {
            logger.info('updateVendor function has executed successfully')
            res.send(JSON.stringify({ "status": 200, "response": results }));
        }
    });
};

module.exports.deleteVendor = (req, res) => {
    if (!req.params.vendorId || req.params.vendorId === undefined) {
        res.status(400).send({ status: 400, message: 'bad request vendor id required in params to delete vendor' });
    }
    let sql = util.format("DELETE FROM qw_vendor WHERE vendor_id=%s", req.params.id);
    dbQuery.executeQuery(sql, data, (err, results) => {
        if (err) {
            logger.error('deleteVendor function has error', err.message || err)
            res.status(err.status || err.statusCode || err.code || 500).send({ message: err });
        } else {
            logger.info('deleteVendor function has executed successfully')
            res.send(JSON.stringify({ "status": 200, "response": results }));
        }
    });
};