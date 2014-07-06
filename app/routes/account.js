'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var account = require('../../app/controllers/account');

	// Routes
	app.post('/accont', users.requiresLogin, account.create);
	app.get('/account/:accountId', users.requiresLogin, account.read);
	app.del('/account/:accountId', users.requiresLogin, account.delete);

	// Finish by binding the event middleware
	app.param('accountId', account.accountById);
};