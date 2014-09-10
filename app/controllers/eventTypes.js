'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	EventType = mongoose.model('EventType'),
	_ = require('lodash');

/**
 * List of event type
 */
exports.list = function(req, res) {
	EventType.find().sort('value').exec(function(err, eventTypes) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(eventTypes);
		}
	});
};

/**
 * Create an eventType
 */
exports.create = function(req, res) {
	var eventType = new EventType(req.body);
	eventType.save(function(err) {
		if (err) {
			res.jsonp({error: err, data: eventType});
		} else {
			res.jsonp(eventType);
		}
	});
};

/**
 * Delete an eventType
 */
exports.delete = function(req, res) {
	var eventType = req.eventType;

	eventType.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(eventType);
		}
	});
};

/**
 * EventType middleware
 */
exports.getById = function(req, res, next, id) {
	EventType.findOne({_id: id}).exec( function(err, eventType) {
		if (err) return next(err);
		if (!eventType) return next(new Error('Failed to load eventType ' + id));
		req.eventType = eventType;
		next();
	});
};