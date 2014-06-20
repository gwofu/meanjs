'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.events').factory('Events', ['$resource', function($resource) {
	return $resource('events/:eventId', {
		eventId: '@_id'
	}, {
		update: {
			method: 'PUT'
		},
		addMember: {
			method: 'PUT',
			params: {
				action: 'addMember'
			}
		},
		findByUser: {
			method: 'GET',
			params: {
				action: 'listByUser'
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
		alert("findByUser");
		Events.findByUser(function(data) {
			callback(data);
		});
	};

	this.findById = function(id, callback) {
		alert("findById");
		
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