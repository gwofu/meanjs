'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var eventTypeSchema = mongoose.Schema({
	name: String,
	value: String
});

eventTypeSchema.methods.log = function() {
	console.log(this.name + ' - ' + this.value);
};

mongoose.model('EventType', eventTypeSchema);


