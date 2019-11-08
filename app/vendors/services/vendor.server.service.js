'use strict'
/**
 * @author Srinivas Kanuparthi
 * Module dependencies.
 */

const util = require('util');


const logger = require('../../../config/logger').log4js.getLogger('vendor.server.controller');
const dbQuery = require('../../../config/constants/dbQuery');



module.exports.getVendors = (cb) => {

    try {
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
    } catch (ex) {
        logger.error('getVendors function has exception occured', ex);
        cb(ex);
    }

};

module.exports.getVendorById = (params, cb) => {

    try {
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
    } catch (ex) {
        logger.error('getVendorById function has exception occured', ex);
        cb(ex);
    }
};

module.exports.saveVendor = (vendorData, cb) => {

    try {
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
    } catch (ex) {
        logger.error('saveVendor function has exception occured', ex);
        cb(ex);
    }
};

module.exports.updateVendor = (params, vendorData, cb) => {
    try {
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
    } catch (ex) {
        logger.error('updateVendor function has exception occured', ex);
        cb(ex);
    }
};

module.exports.deleteVendor = (params, cb) => {
    try {
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
    } catch (ex) {
        logger.error('deleteVendor function has exception occured', ex);
        cb(ex);
    }
};