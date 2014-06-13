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
			
			console.log('message=' + JSON.stringify(appliedEvents));

			appliedEvents.$save(function(response) {
				
			});

		};

	}
]);