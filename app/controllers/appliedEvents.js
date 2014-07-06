'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  AppliedEvent = mongoose.model('AppliedEvent'),
  User = mongoose.model('User'),
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

	res.jsonp(req.appliedEvent);
};

exports.findByEventAndUser = function(req, res) {
	console.log('==============findByEventAndUser==============');
	console.log('req.body.eventId=' + req.query.eventId);
	var query = {user: req.user.id, event: req.query.eventId};
	AppliedEvent.findOne(query).exec(function(err, data) {
		if (err) {
			console.log('err=' + err);
			res.render('error', {
				status: 500
			});
		} else {
			console.log(data);
			res.jsonp(data);
		}
	});
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
		s = AppliedEvent.find(query).populate('event').populate('event.user').populate('user', 'displayName').sort('-created');
	}

	s.exec(function(err, docs) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			console.log('==============appliedEvents data==============');

			var opts = {
				path: 'event.user',
				select: 'displayName',
				model: 'User'
			}

			AppliedEvent.populate(docs, opts, function(err, docs) {
				console.log(docs);
				res.jsonp(docs);
			});

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

exports.setMembers = function(req, res) {
	var query = null
	var eventId = req.body.eventId;
	var userIds = req.body.userIds;

	userIds.forEach(function(userId) {
		console.log(userId);
		query = {event: eventId, user: userId};

		AppliedEvent.findOneAndUpdate(query, {status: 'm'}, function(err, doc) {
			if (err) {
				res.render('error', {
					status: 500
				});
			}
		});

	});

};