'use strict';

var mongoose = require('mongoose'),
	Address = mongoose.model('Address'),
	_ = require('lodash');

exports.create = function(req, res) {
	var address = new Address(req.body);
	address.user = req.user;

	address.save(function(err) {
		if (err) {
			console.log(JSON.stringify(err));
			return res.send('address/create', {
				errors: err.errors,
				address: address
			});
		} else {
			res.jsonp(address);
		}
	});
};

exports.read = function(req, res) {
	res.jsonp(req.address);
};

exports.update = function(req, res) {
	var address = req.address;

	address = _.extend(address, req.body);

	address.save(function(err) {
		if (err) {
			console.log(JSON.stringify(err));
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(address);
		}
	});
};

/**
 * Delete an address
 */
exports.delete = function(req, res) {
	var address = req.address;

	address.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(address);
		}
	});
};

/**
 * List of Address
 */
exports.list = function(req, res) {
	console.log('==============list==============');
	console.log('req.user.id=' + req.user.id);
	console.log('req.query.action=' + req.query.action);
	var query = {};

	if (req.query.action && req.query.action === 'listByUser') {
		query = {user: req.user.id};
	}

	Address.find(query).sort('-created').populate('user', 'displayName').exec(function(err, addresses) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(addresses);
		}
	});
};

/**
 * Address middleware
 */
exports.addressByID = function(req, res, next, id) {
	Address.load(id, function(err, address) {
		if (err) return next(err);
		if (!address) return next(new Error('Failed to load address ' + id));
		req.address = address;
		next();
	});
};

/**
 * Address authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.address.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};