'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('lodash');

var baseProperty = {
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
};

/**
 * Make Schema with base property
 */
exports.makeSchema = function(properties) {
	return new Schema( _.merge(baseProperty, properties) );
};