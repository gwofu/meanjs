'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.events').factory('Events', ['$resource', function($resource) {
	return $resource('events/:eventId', {
		eventId: '@_id'
	}, {
		update: {
			method: 'PUT'
		},
		findByUser: {
			method: 'GET',
			params: {
				action: 'findByUser'
			},
			isArray: true
		},
		findByCityState: {
			method: 'GET',
			params: {
				action: 'findByCityState'
			},
			isArray: true
		}
	});
}]);

angular.module('mean.events').service('EventService', function(Events) {

	this.findByUser = function(callback) {
		Events.findByUser(function(data) {
			callback(data);
		});
	};

	this.findById = function(id, callback) {
		Events.get({
			eventId: id
		}, function(data) {
			callback(data);
		});
	};

	this.findByCityState = function(city, state, callback) {
		Events.findByCityState({
			city: city,
			state: state
		}, function(data) {
			callback(data);
		});
	};

	this.findAll = function(callback) {
		Events.query(function(data) {
			callback(data);
		});
	};

});