'use strict';

angular.module('mean.core').controller('HeaderController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.format = 'M/d/yy h:mm:ss a';

//$scope.menu = [{
			// name: 'Article',
			// items: [
			// 	{
			// 		title: 'Articles',
			// 		link: 'articles',
			// 		uiRoute: '/articles'
			// 	},
			// 	{
			// 		title: 'New Article',
			// 		link: 'articles/create',
			// 		uiRoute: '/articles/create'
			// 	}
			// ]
		//}];

			$scope.menu = [{
				name: 'Event',
				items: [{
					title: 'Map Event',
					link: 'events/mapview',
					uiRoute: '/events/mapview'
				}, {
					title: 'Coming Events',
					link: 'events/openEvents',
					uiRoute: '/events/openEvents'
				}, {
					title: 'Current Events',
					link: 'events/currentEvents',
					uiRoute: '/events/currentEvents'
				}, {
					title: 'Past Events',
					link: 'events/pastEvents',
					uiRoute: '/events/pastEvents'
				}, {
					title: 'All Events',
					link: 'events',
					uiRoute: '/events'
				}]
			}];

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};
	}
]);