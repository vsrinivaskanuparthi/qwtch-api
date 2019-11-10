'use strict'
/**
 * @author Srinivas Kanuparthi
 * Module dependencies.
 */

const util = require('util');


const logger = require('../../../config/logger').log4js.getLogger('vendor.server.controller');
const dbQuery = require('../../../config/constants/dbQuery');



module.exports.getProducts = (queryParams, cb) => {

    try {

        var limit = queryParams && queryParams.limit ? queryParams.limit : 20
        var skip = queryParams && queryParams.skip ? queryParams.skip : 0

        let sql = util.format("SELECT * FROM wp_posts LIMIT %s OFFSET %s", limit, skip);

        dbQuery.executeQuery(sql, (err, results) => {
            if (err) {
                logger.error('getProducts function has error', err.message || err)
                cb({ status: err.errno || 500, message: err });
            } else {
                logger.info('getProducts function has executed successfully')
                cb(undefined, results);
            }
        });
    } catch (ex) {
        logger.error('getProducts function has exception occured', ex);
        cb(ex);
    }

};

module.exports.getProductById = (params, cb) => {

    try {
        let sql = util.format("SELECT * FROM wp_posts WHERE ID='%s'", params.productId);
        dbQuery.executeQuery(sql, (err, results) => {
            if (err) {
                logger.error('getProductById function has error', err.message || err)
                cb({ status: err.errno || 500, message: err });
            } else {
                logger.info('getProductById function has executed successfully')
                cb(undefined, results);
            }
        });
    } catch (ex) {
        logger.error('getProductById function has exception occured', ex);
        cb(ex);
    }
};

module.exports.getProductsByFilter = (queryParams, cb) => {

    try {

        let sql = "SELECT * FROM wp_posts WHERE";

        Object.keys(queryParams).forEach(function (key) {
            sql += util.format(" %s='%s'", key, queryParams[key])
        });

        dbQuery.executeQuery(sql, (err, results) => {
            if (err) {
                logger.error('getProductById function has error', err.message || err)
                cb({ status: err.errno || 500, message: err });
            } else {
                logger.info('getProductById function has executed successfully')
                cb(undefined, results);
            }
        });
    } catch (ex) {
        logger.error('getProductById function has exception occured', ex);
        cb(ex);
    }
};


// module.exports.saveProduct = (productData, cb) => {

//     try {
//         let sql = "INSERT INTO qw_vendor SET ?";
//         dbQuery.executeQuery(sql, productData, (err, results) => {
//             if (err) {
//                 logger.error('saveProduct function has error', err.message || err)
//                 cb({ status: err.errno || 500, message: err });
//             } else {
//                 logger.info('saveProduct function has executed successfully')
//                 cb(undefined, results);
//             }
//         });
//     } catch (ex) {
//         logger.error('saveProduct function has exception occured', ex);
//         cb(ex);
//     }
// };

// module.exports.updateProduct = (params, productData, cb) => {
//     try {
//         let sql = util.format("UPDATE qw_vendor SET vendor_name='%s', vendor_address='%s' WHERE vendor_id=%s", productData.vendor_name, productData.vendor_address, params.productId);
//         dbQuery.executeQuery(sql, data, (err, results) => {
//             if (err) {
//                 logger.error('updateProduct function has error', err.message || err)
//                 cb({ status: err.errno || 500, message: err });
//             } else {
//                 logger.info('updateProduct function has executed successfully')
//                 cb(undefined, results);
//             }
//         });
//     } catch (ex) {
//         logger.error('updateProduct function has exception occured', ex);
//         cb(ex);
//     }
// };

// module.exports.deleteProduct = (params, cb) => {
//     try {
//         let sql = util.format("DELETE FROM qw_vendor WHERE vendor_id=%s", params.id);
//         dbQuery.executeQuery(sql, data, (err, results) => {
//             if (err) {
//                 logger.error('deleteProduct function has error', err.message || err)
//                 cb({ status: err.errno || 500, message: err });
//             } else {
//                 logger.info('deleteProduct function has executed successfully')
//                 cb(undefined, results);
//             }
//         });
//     } catch (ex) {
//         logger.error('deleteProduct function has exception occured', ex);
//         cb(ex);
//     }
// };