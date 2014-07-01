'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('mean.events');

angular.module('mean.core')
.directive('myCustomer', function() {
	return {
		template: '',
		link: function (scope, element) {

			scope.menu.push({
				name: 'My Event',
				items: [{
					title: 'All Events',
					link: 'events/listByUser',
					uiRoute: '/events/listByUser'
				}, {
					title: 'Applied Events',
					link: 'appliedEvents',
					uiRoute: '/appliedEvents'
				}, {
					title: 'Add Event',
					link: 'events/create',
					uiRoute: '/events/create'
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

			scope.menu.push(
			{
				name: 'Message',
				items: [{
					title: 'All Messages (Admin)',
					link: 'messages',
					uiRoute: '/messages'
				}, {
					title: 'My Message List',
					link: 'messages/listByUser',
					uiRoute: '/messages/listByUser'
				}, {
					title: 'Inbox',
					link: 'messages/inbox',
					uiRoute: '/messages/inbox'
				}]
			});
			
		}
	};
});