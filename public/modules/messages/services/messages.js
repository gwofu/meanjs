'use strict';

//Messages service used for articles REST endpoint
angular.module('mean.messages').factory('Messages', ['$resource', function($resource) {
	return $resource('messages/:messageId', {
		messageId: '@_id'
	}, {
		update: {
			method: 'PUT'
		},
		findByUser: {
			method: 'GET',
			params: {
				action: 'listByUser'
			},
			isArray: true
		},
		findByEventId: {
			method: 'GET',
			params: {
				action: 'listByEventId'
			},
			isArray: true
		},
		findByTo: {
			method: 'GET',
			params: {
				action: 'listByTo'
			},
			isArray: true
		}
	});
}]);

angular.module('mean.messages').service('MessageService', function(Messages) {

	this.findByUser = function(callback) {
		Messages.findByUser(function(data) {
			callback(data);
		});
	};

	this.findByEventId = function(eventId, callback) {

		Messages.findByEventId({
			eventId: eventId
		}, function(data) {
			callback(data);
		});

	};

	this.findById = function(id, callback) {
		Messages.get({
			messageId: id
		}, function(data) {
			callback(data);
		});
	};

	this.findAll = function(callback) {
		Messages.query(function(data) {
			callback(data);
		});
	};

});