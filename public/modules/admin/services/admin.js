'use strict';

//Admin service used for admin REST endpoint
angular.module('mean.admin').factory('Admin', ['$resource', function($resource) {
	return $resource('eventTypes/:id', {
		id: '@_id'
	}, {
		
	});
}]);
