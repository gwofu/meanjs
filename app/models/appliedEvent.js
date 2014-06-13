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
	load: function(userid, cb) {
		this.find({
			user: userid
		}).exec(cb);
	}
};


mongoose.model('AppliedEvent', AppliedEventSchema);