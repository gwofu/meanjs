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
		state('showOpenEvent', {
			url: '/events/openEvents',
			templateUrl: 'modules/events/views/openEvents.html'
		}).
		state('showCurrentEvent', {
			url: '/events/currentEvents',
			templateUrl: 'modules/events/views/currentEvents.html'
		}).
		state('showPastEvent', {
			url: '/events/pastEvents',
			templateUrl: 'modules/events/views/pastEvents.html'
		}).
		state('createEvent', {
			url: '/events/create',
			templateUrl: 'modules/events/views/create.html'
		}).
		state('eventsByUser', {
			url: '/events/listByUser',
			templateUrl: 'modules/events/views/mylist.html',
			controller: function($scope) {
				$scope.queryByUser = true;
			}
		}).
		state('appliedEvent', {
			url: '/events/appliedEvents',
			templateUrl: 'modules/events/views/appliedEvents.html',
			controller: function($scope) {
				$scope.queryByUser = true;
			}
		}).
		state('mapEvent', {
			url: '/events/mapview',
			templateUrl: 'modules/events/views/mapview.html'
		}).
		state('viewEvent', {
			url: '/events/:eventId',
			templateUrl: 'modules/events/views/view.html'
		}).
		state('detailEvent', {
			url: '/events/:eventId/detail',
			templateUrl: 'modules/events/views/detail.html'
		}).
		state('editEvent', {
			url: '/events/:eventId/edit',
			templateUrl: 'modules/events/views/edit.html'
		}).
		state('contactEvent', {
			url: '/events/:eventId/contact',
			templateUrl: 'modules/events/views/contact.html'
		});
	}
]);