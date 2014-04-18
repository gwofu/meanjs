'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var events = require('../../app/controllers/events');

	// Article Routes
	app.get('/events', events.list);
	app.post('/events', users.requiresLogin, events.create);
	app.get('/events/:eventId', events.read);
	app.put('/events/:eventId', users.requiresLogin, events.hasAuthorization, events.update);
	app.del('/events/:eventId', users.requiresLogin, events.hasAuthorization, events.delete);

	// Finish by binding the event middleware
	app.param('eventId', events.eventByID);
};