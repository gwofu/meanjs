'use strict';

angular.module('mean.users').controller('AuthenticationController', ['$rootScope', '$scope', '$http', '$location', 'Authentication', 'mySocketService',
	function($rootScope, $scope, $http, $location, Authentication, mySocketService) {
		$scope.authentication = Authentication;

			//If user is signed in then redirect back home
			if ($scope.authentication.user) $location.path('/');

			$scope.signup = function() {
				$http.post('/auth/signup', $scope.credentials).success(function(response) {
					//If successful we assign the response to the global user model
					$scope.authentication.user = response;

					//And redirect to the index page
					$location.path('/');
				}).error(function(response) {
					$scope.error = response.message;
				});
			};

			$scope.signin = function() {
				$http.post('/auth/signin', $scope.credentials).success(function(response) {
					//If successful we assign the response to the global user model
					$scope.authentication.user = response;

					mySocketService.nameAttempt($scope.authentication.user.displayName, function(name) {
						$rootScope.$broadcast('message', { text: name + ' joined.' } );
					});

					mySocketService.getUserCount(function(userCount) {
						$rootScope.$broadcast('userCount', { count: userCount } );
					});

					//And redirect to the index page
					$location.path('/events/mapview');
				}).error(function(response) {
					$scope.error = response.message;
				});
			};
		}
	]);