'use strict';


module.exports = function (app) {
    var userController =  require('../../users/controllers/user.server.controller');
    var authController = require('../../users/controllers/auth.server.controller');
    app.route('/api/user/register').post(userController.saveUser);
    app.route('/api/auth/sign-in').post(authController.signIn);
};
