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

angular.module('mean.addresses').service('AddressService', function(Addresses) {

	this.findByUser = function(callback) {
		Addresses.search(function(data) {
			callback(data);
		});
	};

	this.findById = function(id, callback) {
			Addresses.get({
				addressId: id
			}, function(data) {
				callback(data);
			});
	};

	this.findAll = function(callback) {
		Addresses.query(function(data) {
			callback(data);
		});
	};

});