'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AccountSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date,
		default: Date.now
	},
	earn: { type: Number, default: 0}, // hours earned
	pay: { type: Number, default: -1}, // hours paid
});

AccountSchema.statics = {
	load: function(accountId, cb) {
		this.findOne({
			_id: accountId
		}).exec(cb);
	}
};


mongoose.model('Account', AccountSchema);