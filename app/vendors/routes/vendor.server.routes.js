'use strict';


module.exports = function (app) {
    var vendorController =  require('../controllers/vendor.server.controller.js');
    app.route('/api/vendors').get(vendorController.getVendors);
    app.route('/api/vendors/:vendorId').get(vendorController.getVendorById);
    app.route('/api/vendors').post(vendorController.saveVendor);
    app.route('/api/vendors/:vendorId').patch(vendorController.updateVendor);
    app.route('/api/vendors/:vendorId').delete(vendorController.deleteVendor);
};
