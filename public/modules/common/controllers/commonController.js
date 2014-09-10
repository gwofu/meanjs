'use strict';

angular.module('mean.common')
.controller('MapController', ['$scope', function($scope) {

	$scope.address = {
		name: 'Chicago, IL',
		street: '1600 Amphitheater'
	};

}])
.controller('SocketController', ['$scope', 'mySocketService', function($scope, mySocketService) {

	$scope.getUsers = function() {
		mySocketService.getUsers(function() {
			console.log('getUsers');
		});
	};

	$scope.getUserCount = function() {
		mySocketService.getUserCOunt(function() {
			console.log('getUserCount');
		});
	};

}]);