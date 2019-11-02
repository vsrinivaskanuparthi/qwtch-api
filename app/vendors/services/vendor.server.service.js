'use strict'
/**
 * @author Srinivas Kanuparthi
 * Module dependencies.
 */

const util = require('util');


const logger = require('../../../config/logger').log4js.getLogger('vendor.server.controller');
const dbQuery = require('../../../config/constants/dbQuery');



module.exports.getVendors = (cb) => {

    let sql = "SELECT * FROM qw_vendor";
    dbQuery.executeQuery(sql, (err, results) => {
        if (err) {
            logger.error('getVendors function has error', err.message || err)
            cb({ status: err.errno || 500, message: err });
        } else {
            logger.info('getVendors function has executed successfully')
            cb(undefined, { "status": 200, "response": results });
        }
    });

};

module.exports.getVendorById = (params, cb) => {

    let sql = util.format("SELECT * FROM qw_vendor WHERE vendor_id='%s'", params.vendorId);
    dbQuery.executeQuery(sql, (err, results) => {
        if (err) {
            logger.error('getVendorById function has error', err.message || err)
            cb({ status: err.errno || 500, message: err });
        } else {
            logger.info('getVendorById function has executed successfully')
            cb(undefined, { "status": 200, "response": results });
        }
    });
};

module.exports.saveVendor = (vendorData, cb) => {

    let data = { vendor_name: vendorData.vendor_name, vendor_address: vendorData.vendor_address };
    let sql = "INSERT INTO qw_vendor SET ?";
    dbQuery.executeQuery(sql, data, (err, results) => {
        if (err) {
            logger.error('saveVendor function has error', err.message || err)
            cb({ status: err.errno || 500, message: err });
        } else {
            logger.info('saveVendor function has executed successfully')
            cb(undefined, { "status": 200, "response": results });
        }
    });
};

module.exports.updateVendor = (params, vendorData, cb) => {
    let sql = util.format("UPDATE qw_vendor SET vendor_name='%s', vendor_address='%s' WHERE vendor_id=%s", vendorData.vendor_name, vendorData.vendor_address, params.vendorId);
    dbQuery.executeQuery(sql, data, (err, results) => {
        if (err) {
            logger.error('updateVendor function has error', err.message || err)
            cb({ status: err.errno || 500, message: err });
        } else {
            logger.info('updateVendor function has executed successfully')
            cb(undefined, { "status": 200, "response": results });
        }
    });
};

module.exports.deleteVendor = (params, cb) => {
    let sql = util.format("DELETE FROM qw_vendor WHERE vendor_id=%s", params.id);
    dbQuery.executeQuery(sql, data, (err, results) => {
        if (err) {
            logger.error('deleteVendor function has error', err.message || err)
            cb({ status: err.errno || 500, message: err });
        } else {
            logger.info('deleteVendor function has executed successfully')
            cb(undefined, { "status": 200, "response": results });
        }
    });
};