'use strict';

//Setting up route
angular.module('mean.addresses').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listAddresses', {
			url: '/addresses',
			templateUrl: 'modules/addresses/views/list.html',
			controller: function($scope) {

			},
			onEnter: function() {

			},
			onExit: function() {

			}
		}).
		state('createAddress', {
			url: '/addresses/create',
			templateUrl: 'modules/addresses/views/edit.html',
			controller: function($scope) {
				$scope.command = 'create';
				$scope.title = 'Add Address';
			}
		}).
		state('listByUser', {
			url: '/addresses/listByUser',
			templateUrl: 'modules/addresses/views/list.html',
			controller: function($scope) {
				$scope.queryByUser = true;
			}
		}).
		state('viewAddress', {
			url: '/addresses/:addressId',
			templateUrl: 'modules/addresses/views/view.html'
		}).
		state('editAddress', {
			url: '/addresses/:addressId/edit',
			templateUrl: 'modules/addresses/views/edit.html',
			controller: function($scope) {
				$scope.command = 'update';
				$scope.title = 'Edit Address';
			}
		});


	}
]);