'use strict';

angular.module('mean.admin')
.controller('AdminController', ['$rootScope', '$scope', 'Authentication', 'EventService', 'Admin',
	function ($rootScope, $scope, Authentication, EventService, Admin) {
		$scope.authentication = Authentication;
		$scope.eventType = {};


		// $scope.options = [{
		// 	name: 'Community Service',
		// 	value: 'Service'
		// }, {
		// 	name: 'Neighborhood Watch',
		// 	value: 'Service'
		// }, {
		// 	name: 'Neighborhood Cleanup',
		// 	value: 'Service'
		// }, {
		// 	name: 'Transportation',
		// 	value: 'Service'
		// }, {
		// 	name: 'Day Care',
		// 	value: 'Service'
		// }, {
		// 	name: 'Sports',
		// 	value: 'Activities'
		// }, {
		// 	name: 'Chess',
		// 	value: 'Activities'
		// }, {
		// 	name: 'Hiking',
		// 	value: 'Activities'
		// }, {
		// 	name: 'Tutoring',
		// 	value: 'Education'
		// }, {
		// 	name: 'Instrument',
		// 	value: 'Education'
		// }];

		$scope.addEventType = function() {
			var eventType = new Admin({
				name: $scope.eventType.name,
				value: $scope.eventType.value
			});

			eventType.$save(function(response) {
				$scope.eventType.name = '';
				$scope.eventType.value = '';
				$scope.getEventTypes();
			});

		};

		$scope.delete = function(eventType, index) {
			eventType.$remove();
			$scope.options.splice(index, 1);
		};

		$scope.getEventTypes = function() {
			Admin.query(function(data) {
				$scope.options = data;
			});
		};
	}
]);