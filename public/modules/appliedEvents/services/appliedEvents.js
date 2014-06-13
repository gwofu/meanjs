'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.appliedEvents').factory('AppliedEvents', ['$resource', function($resource) {
	return $resource('appliedEvents');
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

});