'use strict'
/**
 * @author Srinivas Kanuparthi
 * Module dependencies.
 */



var logger = require('../../../config/logger').log4js.getLogger('product.server.controller'),
    productService = require('../../products/services/product.server.service');




module.exports.getProducts = (req, res) => {
    try {
        productService.getProducts(req.query, (err, response) => {
            if (err) {
                logger.error('getProducts function has error', err.message || err);
                res.send({ status: err.errno || 500, message: err });
            } else {
                logger.info('getProducts function has executed successfully');
                res.send(response);
            }
        });
    } catch (ex) {
        logger.error('getProducts function has exception error', ex);
        res.send(ex)
    }
};

module.exports.getProductById = (req, res) => {

    if (!req.params.productId || req.params.productId === undefined) {
        logger.error('getProductById function has validation error');
        res.send({ status: 400, message: 'bad request product id required in params' });
    }
    try {
        productService.getProductById(req.params, (err, response) => {
            if (err) {
                logger.error('getProductById function has error', err.message || err);
                res.send({ status: err.errno || 500, message: err });
            } else {
                logger.info('getProductById function has executed successfully');
                res.send(response);
            }
        });
    } catch (ex) {
        logger.error('getProductById function has exception error', ex);
        res.send(ex);
    }
};


module.exports.getProductsByFilter = (req, res) => {

    if (!req.query || Object.keys(req.query) === 0) {
        logger.error('getProductsByFilter function has validation error');
        res.send({ status: 400, message: 'bad request query params required' });
    }

    try {
        productService.getProductsByFilter(req.query, (err, response) => {
            if (err) {
                logger.error('getProductsByFilter function has error', err.message || err);
                res.send({ status: err.errno || 500, message: err });
            } else {
                logger.info('getProductsByFilter function has executed successfully');
                res.send(response);
            }
        });
    } catch (ex) {
        logger.error('getProductsByFilter function has exception occured', ex);
        res.send(ex);
    }
};

// module.exports.saveProduct = (req, res) => {

//     if (!Object.keys(req.body).length) {
//         logger.error('saveProduct function has validation error');
//         res.send({ status: 400, message: 'bad request vendor details required to save vendor' });
//     }
//     try {
//         productService.saveProduct(req.body, (err, response) => {
//             if (err) {
//                 logger.error('saveProduct function has error', err.message || err);
//                 res.send({ status: err.errno || 500, message: err });
//             } else {
//                 logger.info('saveProduct function has executed successfully');
//                 res.send(response);
//             }
//         });
//     } catch (ex) {
//         logger.error('saveProduct function has exception error', ex);
//         res.send(ex);
//     }
// };

// module.exports.updateProduct = (req, res) => {

//     if (!Object.keys(req.body).length || !req.params.vendorId || req.params.vendorId === undefined) {
//         logger.error('updateProduct function has validation error');
//         res.send({ status: 400, message: 'data required in body to update the entity' });
//     }
//     try {
//         productService.updateProduct(req.params, req.body, (err, response) => {
//             if (err) {
//                 logger.error('updateProduct function has error', err.message || err);
//                 res.send({ status: err.errno || 500, message: err });
//             } else {
//                 logger.info('updateProduct function has executed successfully');
//                 res.send(response);
//             }
//         });
//     } catch (ex) {
//         logger.error('updateProduct function has exception error', ex);
//         res.send(ex);
//     }
// };

// module.exports.deleteProduct = (req, res) => {

//     if (!req.params.vendorId || req.params.vendorId === undefined) {
//         logger.error('deleteProduct function has validation error');
//         res.send({ status: 400, message: 'bad request vendor id required in params to delete vendor' });
//     }
//     try {
//         productService.deleteProduct(req.params, (err, response) => {
//             if (err) {
//                 logger.error('deleteProduct function has error', err.message || err);
//                 res.send({ status: err.errno || 500, message: err });
//             } else {
//                 logger.info('deleteProduct function has executed successfully');
//                 res.send(response);
//             }
//         });
//     } catch (ex) {
//         logger.error('deleteProduct function has exception error', ex);
//         res.send(ex)
//     }
// };