'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var messages = require('../../app/controllers/messages');

	// Message Routes
	app.get('/messages', messages.list);
	app.post('/messages', users.requiresLogin, messages.create);
	app.get('/messages/:messageId', messages.read);
	app.put('/messages/:messageId', users.requiresLogin, messages.hasAuthorization, messages.update);
	app.del('/messages/:messageId', users.requiresLogin, messages.hasAuthorization, messages.delete);

	// Finish by binding the event middleware
	app.param('messageId', messages.messageByID);
};