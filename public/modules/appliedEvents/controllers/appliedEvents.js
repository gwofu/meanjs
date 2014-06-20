'use strict';

angular.module('mean.appliedEvents')
.controller('AppliedEventsController',
	['$scope', '$stateParams', '$location', '$filter', 'Authentication', 'AppliedEvents',
	function($scope, $stateParams, $location, $filter, Authentication, AppliedEvents) {

		$scope.authentication = Authentication;

		$scope.create = function() {

			var appliedEvents = new AppliedEvents({
				user: this.title,
				event: this.content
			});
			
			appliedEvents.$save(function(response) {
				
			});

		};

		$scope.find = function() {
			AppliedEvents.query(function(data) {
				$scope.events = data;
			});
		};

		$scope.findByEventId = function(eventId) {
			AppliedEvents.query({
				eventId: eventId
			},function(data) {
				$scope.events = data;
			});
		};

		$scope.deleteAppliedEvent = function(appliedEventId) {
			AppliedEvents.deleteById({appliedEventId: appliedEventId}, function(data) {
				deleteEvent($scope.events, appliedEventId);
				console.log($scope.events.length);
			});
		}

		function deleteEvent(events, id) {
			var idx = -1;
			events.every(function(element, index) {
				if (element._id == id) {
					idx = index;
					return false;
				}
			});
			events.splice(idx, 1);
		}
	}
]);