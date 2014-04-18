'use strict';

angular.module('mean.common')
.controller('MapController', ['$scope', function($scope) {

	$scope.address = {
		name: 'Chicago, IL',
		street: '1600 Amphitheater'
	};

}]);