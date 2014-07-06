'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Account = mongoose.model('Account'),
  User = mongoose.model('User'),
  _ = require('lodash');

/**
 * Create an appliedEvent
 */
exports.create = function(req, res) {
	console.log('=========account=====create==============');
	var account = new Account();
	account.user = req.user;
	account.save(function(err) {
		console.log(err);
	});
};

exports.read = function(req, res) {
	console.log('=========account=====read==============');

	res.jsonp(req.account);
};


/**
 * Delete an applied event
 */
exports.delete = function(req, res) {
	var account = req.account;
	console.log("delete account=" + account);
	account.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(account);
		}
	});
};

/**
 * Event middleware
 */
exports.accountById = function(req, res, next, id) {
	console.log('------------ accountById ------------------');
	Account.load(id, function(err, account) {
		if (err) return next(err);
		if (!account) return next(new Error('Failed to load account ' + id));
		req.account = account;
		next();
	});
};