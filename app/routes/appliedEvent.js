'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var appliedEvent = require('../../app/controllers/appliedEvents');

	// Routes
	app.post('/appliedEvents', users.requiresLogin, appliedEvent.create);
	app.get('/appliedEvents', users.requiresLogin, appliedEvent.list);
	app.get('/appliedEvents/findByEventAndUser', users.requiresLogin, appliedEvent.findByEventAndUser);
	app.del('/appliedEvents/:appliedEventId', users.requiresLogin, appliedEvent.delete);

	// Finish by binding the event middleware
	app.param('appliedEventId', appliedEvent.eventByID);
};