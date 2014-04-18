'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('mean.events');

angular.module('mean.core')
.directive('myCustomer', function() {
	return {
		template: '',
		link: function (scope, element) {

			scope.menu.push({
				name: 'Event',
				items: [{
					title: 'Events',
					link: 'events',
					uiRoute: '/events'
				}, {
					title: 'New Event',
					link: 'events/create',
					uiRoute: '/events/create'
				}, {
					title: 'Map Event',
					link: 'events/mapview',
					uiRoute: '/events/mapview'
				}]
			});

			scope.menu.push(
			{
				name: 'Address',
				items: [{
					title: 'All Address',
					link: 'addresses',
					uiRoute: '/addresses'
				}, {
					title: 'Add Address',
					link: 'addresses/create',
					uiRoute: '/addresses/create'
				}, {
					title: 'My Address List',
					link: 'addresses/listByUser',
					uiRoute: '/addresses/listByUser'
				}]
			});
			
		}
	};
});