'use strict';


module.exports = function (app) {
    var qwtchController =  require('../controllers/server.controller');
    app.route('/api/vendors').get(qwtchController.getVendors);
    app.route('/api/vendors/:id').get(qwtchController.getVendorById);
    app.route('/api/vendors').post(qwtchController.saveVendor);
    app.route('/api/vendors/:vendorId').patch(qwtchController.updateVendor);
    app.route('/api/vendors/:vendorId').delete(qwtchController.deleteVendor);
};
