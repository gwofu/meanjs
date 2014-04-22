'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AddressSchema = new Schema({
	street: { type: String, trim: true },
	city: { type: String, trim: true },
	state: { type: String, trim: true },
	zip: { type: String, trim: true },
	displayname: { type: String, trim: true },
	loc: { type: [Number], index: '2d' },
	default: { type: Boolean, default: false },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

AddressSchema.path('city').validate(function(city) {
	return city.length;
}, 'City cannot be blank');

AddressSchema.statics = {
	load: function(id, cb) {
		this.findOne({
			_id: id
		}).populate('user', 'displayname').exec(cb);
	},
	loadByUser: function(userid, cb) {
		this.find({
			user: userid
		}).exec(cb);
	}
};


mongoose.model('Address', AddressSchema);