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
	}
});

AppliedEventSchema.statics = {
	load: function(appliedEventId, cb) {
		this.findOne({
			_id: appliedEventId
		}).exec(cb);
	}
};


mongoose.model('AppliedEvent', AppliedEventSchema);