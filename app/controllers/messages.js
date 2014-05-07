'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  _ = require('lodash');

/**
 * Create a message
 */
exports.create = function(req, res) {
	var message = new Message(req.body);
	message.user = req.user;
	message.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				message: message
			});
		} else {
			res.jsonp(message);
		}
	});
};

/**
 * Show the current message
 */
exports.read = function(req, res) {
	console.log('=========haha=====read==============');

	res.jsonp(req.message);
};

/**
 * Update a message
 */
exports.update = function(req, res) {
	var message = req.message;

	message = _.extend(message, req.body);

	message.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(message);
		}
	});
};

/**
 * Delete an message
 */
exports.delete = function(req, res) {
	var message = req.message;

	message.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(message);
		}
	});
};

/**
 * List of messages
 */
exports.list = function(req, res) {
	console.log('==============list==============');
	console.log('req.user.id=' + req.user.id);
	console.log('req.query.action=' + req.query.action);
	console.log('req.query.eventId=' + req.query.eventId);
	console.log('req.query.to=' + req.query.to);
	var query = {};

	if (req.query.action && req.query.action === 'listByUser') {
		query = {user: req.user.id};
	} else if (req.query.action && req.query.action === 'listByEventId') {
		query = {event: mongoose.Types.ObjectId(req.query.eventId)};
	} else if (req.query.action && req.query.action === 'listByTo') {
		query = {to: mongoose.Types.ObjectId(req.user.id)};
	}

	Message.find(query).sort('-created')
	.populate('user', 'displayName')
	.populate('to', 'displayName')
	.exec(function(err, messages) {
		if (err) {
			console.log('err=' + err);
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(messages);
		}
	});
};

/**
 * Message middleware
 */
exports.messageByID = function(req, res, next, id) {
	console.log('=========haha=====messageByID==============');
	Message.load(id, function(err, message) {
		if (err) return next(err);
		if (!message) return next(new Error('Failed to load message ' + id));
		req.message = message;
		next();
	});
};

/**
 * Message authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.message.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};