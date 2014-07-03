'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AppliedEventSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	event: {
		type: Schema.ObjectId,
		ref: 'Event'
	},
	created: {
		type: Date,
		default: Date.now
	},
	status: { type: String, enum: ['p','m','n'], default: 'p' } // p(pending), m(member), n(not a member)
});

AppliedEventSchema.statics = {
	load: function(appliedEventId, cb) {
		this.findOne({
			_id: appliedEventId
		}).exec(cb);
	}
};


mongoose.model('AppliedEvent', AppliedEventSchema);