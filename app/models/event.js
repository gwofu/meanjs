'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var base = require('./base');

/**
 * Event Schema
 * status: the status of the event. 
 *   o: open registration, c: registration complete, a: active, e: event expired
 */
var EventSchema = base.makeSchema({
		type: { type: String, trim: true }, // event type
		date: { type: Date }, // event start date
		enddate: { type: Date }, // event end date
		status: { type: String, trim: true, default: 'o' }, // event status
		address: { // event place
			_id: { type: String, trim: true },
			city: { type: String, trim: true },
			state: { type: String, trim: true },
			zip: { type: String, trim: true },
			loc: { type: [Number], index: '2d' },
			displayName: { type: String, trim: true }
		},
		members: [{
			type: Schema.ObjectId,
			ref: 'User'
		}]
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
		}).populate('user', 'displayName').exec(cb);
	}
};

mongoose.model('Event', EventSchema);

EventSchema.methods.findNear = function(cb) {
	return this.model('Event').find({geo: { $nearSphere: this.geo, $maxDistance: 0.01} }, cb);
};