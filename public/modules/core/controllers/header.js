'use strict';

angular.module('mean.core').controller('HeaderController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.format = 'M/d/yy h:mm:ss a';

		$scope.menu = [{
			name: 'Article',
			items: [
				{
					title: 'Articles',
					link: 'articles',
					uiRoute: '/articles'
				},
				{
					title: 'New Article',
					link: 'articles/create',
					uiRoute: '/articles/create'
				}
			]
		}];

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};
	}
]);