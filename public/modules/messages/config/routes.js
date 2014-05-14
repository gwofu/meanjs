'use strict';

//Setting up route
angular.module('mean.messages').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listMessages', {
			url: '/messages',
			templateUrl: 'modules/messages/views/list.html',
			controller: function($scope) {

			},
			onEnter: function() {

			},
			onExit: function() {

			}
		}).
		state('messagesByUser', {
			url: '/messages/listByUser',
			templateUrl: 'modules/messages/views/list.html',
			controller: function($scope) {
				$scope.queryByUser = true;
			}
		}).
		state('inbox', {
			url: '/messages/inbox',
			templateUrl: 'modules/messages/views/inbox.html',
			controller: function($scope) {
				$scope.queryField = 'to';
			}
		}).
		state('viewMessages', {
			url: '/messages/:messageId',
			templateUrl: 'modules/messages/views/view.html'
		});
	}
]);