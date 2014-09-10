'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var eventTypes = require('../../app/controllers/eventTypes');

	// Message Routes
	app.get('/eventTypes', eventTypes.list);
	app.post('/eventTypes', users.requiresLogin, eventTypes.create);
	app.del('/eventTypes/:id', users.requiresLogin, eventTypes.delete);

	// Finish by binding the event middleware
	app.param('id', eventTypes.getById);
};