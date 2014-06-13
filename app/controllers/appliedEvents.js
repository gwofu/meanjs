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
	var query = {user: req.user.id};

	AppliedEvent.find(query).sort('-created')
	.exec(function(err, data) {
		if (err) {
			console.log('err=' + err);
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(data);
		}
	});
};
