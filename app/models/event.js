'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var base = require('./base');

/**
 * Event Schema
 */
var EventSchema = base.makeSchema({
		type: { type: String, trim: true },
		date: { type: Date },
		loc: { type: [Number], index: '2d' },
		address: {
			type: Schema.ObjectId,
			ref: 'Address'
		}
	});

/**
 * Validations
 */
EventSchema.path('title').validate(function(title) {
	return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
EventSchema.statics = {
	load: function(id, cb) {
		this.findOne({
			_id: id
		}).populate('user', 'displayName').populate('address','displayname').exec(cb);
	}
};

mongoose.model('Event', EventSchema);

EventSchema.methods.findNear = function(cb) {
	return this.model('Event').find({geo: { $nearSphere: this.geo, $maxDistance: 0.01} }, cb);
};