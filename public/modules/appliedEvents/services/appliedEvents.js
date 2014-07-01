'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.appliedEvents').factory('AppliedEvents', ['$resource', function($resource) {
	return $resource('appliedEvents/:appliedEventId', {
		appliedEventId: '@id'
	}, {
		getEventId: {
			method: 'GET',
			params: {
				action: 'getEventId'
			},
			isArray: true
		},
		getByEventId: {
			method: 'GET',
			params: {
				eventId: 'getEventId'
			},
			isArray: true
		},
		findByEventAndUser: {
			method: 'GET',
			params: {
				eventId: 'eventId'
			},
			url: 'appliedEvents/findByEventAndUser'
		},
		deleteById: {
			method: 'DELETE'
		}
	});
}]);

angular.module('mean.appliedEvents').service('AppliedEventsService', function(AppliedEvents) {

	this.create = function(data, callback) {
			var appliedEvents = new AppliedEvents(data);
			
			appliedEvents.$save(function(data) {
				callback(data);
			});
	};

	this.findByUser = function(callback) {
		AppliedEvents.query(function(data) {
			callback(data);
		});
	};

	this.getEventId = function(callback) {
		AppliedEvents.getEventId(function(data) {
			callback(data);
		});
	};

	this.deleteById = function(appliedEventId, callback) {
		AppliedEvents.deleteById({
			appliedEventId: appliedEventId
		}, function(data) {
			callback(data);
		});
	};

	this.findByEventId = function(eventId, callback) {
		AppliedEvents.query({
			eventId: eventId
		},function(data) {
			callback(data);
		});
	};

	this.findByEventAndUser = function(eventId, callback) {
		AppliedEvents.findByEventAndUser({
			eventId: eventId
		},function(data) {
			callback(data);
		});
	}
});