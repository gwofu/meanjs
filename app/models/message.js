'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var base = require('./base');

/**
 * Message Schema
 */
var MessageSchema = base.makeSchema({
		to: {
			type: Schema.ObjectId,
			ref: 'User'
		},
		type: { type: Number },
		event: {
			type: Schema.ObjectId,
			ref: 'Event'
		}
	});

/**
 * Statics
 */
MessageSchema.statics = {
	load: function(id, cb) {
		this.findOne({
			_id: id
		}).populate('user', 'displayName').exec(cb);
	}
};

mongoose.model('Message', MessageSchema);
