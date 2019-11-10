'use strict';


module.exports = function (app) {
    var productController =  require('../../products/controllers/product.server.controller');
    app.route('/api/products').get(productController.getProducts);
    app.route('/api/products/:productId').get(productController.getProductById);
    app.route('/api/products/filter-by/query').get(productController.getProductsByFilter);
    // app.route('/api/products').post(productController.saveProduct);
    // app.route('/api/products/:productId').patch(productController.updateProduct);
    // app.route('/api/products/:productId').delete(productController.deleteProduct);
};
