'use strict';

//Setting up route
angular.module('mean.appliedEvents').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('listAppliedEvents', {
			url: '/appliedEvents',
			templateUrl: 'modules/appliedEvents/views/list.html',
			controller: function($scope) {

			},
			onEnter: function() {

			},
			onExit: function() {

			}
		})
	}
]);