'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Event = mongoose.model('Event'),
  _ = require('lodash');

/**
 * Create a event
 */
exports.create = function(req, res) {
	var event = new Event(req.body);
	event.user = req.user;
	event.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				event: event
			});
		} else {
			res.jsonp(event);
		}
	});
};

/**
 * Show the current event
 */
exports.read = function(req, res) {
	res.jsonp(req.event);
};

/**
 * Update a event
 */
exports.update = function(req, res) {
	var event = req.event;

console.log("update------------");
console.log("req.query.action=" + req.query.action);
console.log("req.body=" + req.body);
	if (req.query.action && req.query.action === 'addMember') {

	}
	event = _.extend(event, req.body);

	event.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(event);
		}
	});
};

/**
 * Delete an event
 */
exports.delete = function(req, res) {
	var event = req.event;

	event.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(event);
		}
	});
};

/**
 * List of Events
 */
exports.list = function(req, res) {
	console.log('------------ event list ------------------');

	var query = {};

	if (req.query.action && req.query.action === 'listByUser') {
		query = {user: req.user.id};
	} else if (req.query.action && req.query.action === 'findByCityState') {
		console.log('------------ findByCityState ------------------');
		console.log('------------ req.query.city =' + req.query.city);
		console.log('------------ req.query.state =' + req.query.state);
		query = {'address.city': req.query.city, 'address.state': req.query.state};
	}

	Event.find(query).sort('-date').populate('user', 'displayName').exec(function(err, events) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(events);
		}
	});
};

/**
 * Event middleware
 */
exports.eventByID = function(req, res, next, id) {
	console.log('------------ eventByID ------------------');
	Event.load(id, function(err, event) {
		if (err) return next(err);
		if (!event) return next(new Error('Failed to load event ' + id));
		req.event = event;
		next();
	});
};

/**
 * Event authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.event.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};