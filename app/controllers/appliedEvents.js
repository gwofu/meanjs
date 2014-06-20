'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  AppliedEvent = mongoose.model('AppliedEvent'),
  _ = require('lodash');

/**
 * Create an appliedEvent
 */
exports.create = function(req, res) {
	console.log('=========appliedEvents=====create==============');
	var appliedEvent = new AppliedEvent();
	appliedEvent.user = req.user;
	appliedEvent.event = req.body.event;
	appliedEvent.save(function(err) {
		if (err) {
			res.jsonp({error: err});
		} else {
			res.jsonp(appliedEvent);
		}
	});
};

exports.read = function(req, res) {
	console.log('=========appliedEvents=====read==============');

	res.jsonp(req.query);
};

/**
 * List of appliedEvent
 */
exports.list = function(req, res) {
	console.log('==============appliedEvents list==============');
	console.log('req.user.id=' + req.user.id);
	console.log('req.query.action=' + req.query.action);
	var query = {user: req.user.id};
	var s = null;

	if (req.query.action && req.query.action === 'getEventId') {
		s = AppliedEvent.find(query).sort('-created');
	}
	else if (req.query.eventId) {
		s = AppliedEvent.find({event: req.query.eventId}).populate('user', 'displayName').sort('-created');
	}
	else {
		s = AppliedEvent.find(query).populate('event').populate('user', 'displayName').sort('-created');
	}
	s.exec(function(err, data) {
		if (err) {
			console.log('err=' + err);
			res.render('error', {
				status: 500
			});
		} else {
			console.log('==============appliedEvents data==============');
			console.log(data);
			res.jsonp(data);
		}
	});
};

/**
 * Delete an applied event
 */
exports.delete = function(req, res) {
	var appliedEvent = req.appliedEvent;
	console.log("delete appliedEvent=" + appliedEvent);
	appliedEvent.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(appliedEvent);
		}
	});
};

/**
 * Event middleware
 */
exports.eventByID = function(req, res, next, id) {
	console.log('------------ eventByID ------------------');
	AppliedEvent.load(id, function(err, appliedEvent) {
		if (err) return next(err);
		if (!appliedEvent) return next(new Error('Failed to load applied event ' + id));
		req.appliedEvent = appliedEvent;
		next();
	});
};
