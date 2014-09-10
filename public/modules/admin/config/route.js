'use strict';

// Setting up route
angular.module('mean.admin').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		// Home state routing
		$stateProvider.
		state('admin', {
			url: '/admin',
			templateUrl: 'modules/admin/views/admin.html',
			controller: function($scope) {

			},
			onEnter: function() {

			},
			onExit: function() {

			}
		});
	}
]);