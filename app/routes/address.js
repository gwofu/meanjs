'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var addresses = require('../../app/controllers/addresses');

	// Address Routes
	app.get('/addresses', addresses.list);
	app.post('/addresses', users.requiresLogin, addresses.create);
	app.get('/addresses/:addressId', addresses.read);
	app.put('/addresses/:addressId', users.requiresLogin, addresses.hasAuthorization, addresses.update);
	app.del('/addresses/:addressId', users.requiresLogin, addresses.hasAuthorization, addresses.delete);

	// Finish by binding the address middleware
	app.param('addressId', addresses.addressByID);
};