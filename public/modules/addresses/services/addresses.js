'use strict';

//Addresses service used for articles REST endpoint
angular.module('mean.addresses').factory('Addresses', ['$resource', function($resource) {
	return $resource('addresses/:addressId',
		{
			addressId: '@_id'
		},
		{
			update: {
				method: 'PUT'
			},
			search: {
				method: 'GET',
				params: {
					action: 'listByUser'
				},
				isArray: true
			}
		}
	);
}]);