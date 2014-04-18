'use strict';

//Setting up route
angular.module('mean.events').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listEvents', {
			url: '/events',
			templateUrl: 'modules/events/views/list.html',
			controller: function($scope) {

			},
			onEnter: function() {

			},
			onExit: function() {

			}
		}).
		state('createEvent', {
			url: '/events/create',
			templateUrl: 'modules/events/views/create.html'
		}).
		state('mapEvent', {
			url: '/events/mapview',
			templateUrl: 'modules/events/views/mapview.html'
		}).
		state('viewEvent', {
			url: '/events/:eventId',
			templateUrl: 'modules/events/views/view.html'
		}).
		state('editEvent', {
			url: '/events/:eventId/edit',
			templateUrl: 'modules/events/views/edit.html'
		});
	}
]);