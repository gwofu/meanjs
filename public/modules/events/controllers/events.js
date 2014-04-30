'use strict';

angular.module('mean.events')
.controller('EventsController',
	['$scope', '$stateParams', '$location', '$filter', 'Authentication', 'Events', 'Addresses',
	function($scope, $stateParams, $location, $filter, Authentication, Events, Addresses) {
		console.log('****** 1 ******');

		$scope.authentication = Authentication;
		$scope.options = [{
			name: 'Community Service',
			value: 'Service'
		}, {
			name: 'Neighborhood Watch',
			value: 'Service'
		}, {
			name: 'Neighborhood Cleanup',
			value: 'Service'
		}, {
			name: 'Transportation',
			value: 'Service'
		}, {
			name: 'Day Care',
			value: 'Service'
		}, {
			name: 'Sports',
			value: 'Activities'
		}, {
			name: 'Chess',
			value: 'Activities'
		}, {
			name: 'Hiking',
			value: 'Activities'
		}, {
			name: 'Tutoring',
			value: 'Education'
		}, {
			name: 'Instrument',
			value: 'Education'
		}];

		$scope.addresses = [];

		Addresses.search(function(addresses) {
			if (addresses) {
				$scope.addresses = addresses;
			}
			else {
				console.log('addresses not available');
			}
		});

		function getAddressById(id) {
			var address = $filter('filter')($scope.addresses, id, true);
			return address[0];
		}

		$scope.create = function() {

			console.log('========location=========');
			console.log($scope.location);

			var selectedAddress = getAddressById(this.addressId);

			var event = new Events({
				title: this.title,
				content: this.content,
				type: this.type,
				date: this.date,
				address: {
					_id: selectedAddress._id,
					city: selectedAddress.city,
					state: selectedAddress.state,
					zip: selectedAddress.zip,
					loc: selectedAddress.loc,
					displayName: selectedAddress.displayName
				}
				//loc: [89.0, 67.1]
				//loc: this.address.loc
			});
			
			console.log('event=' + JSON.stringify(event));

			event.$save(function(response) {
				$location.path('events/' + response._id);
			});

			this.title = '';
			this.content = '';
			this.type = '';
			this.date = '';
		};

		$scope.remove = function(event) {
			if (event) {
				event.$remove();

				for (var i in $scope.events) {
					if ($scope.events[i] === event) {
						$scope.events.splice(i, 1);
					}
				}
			} else {
				$scope.event.$remove(function() {
					$location.path('events');
				});
			}
		};

		$scope.update = function() {
			var event = $scope.event;
			if (!event.updated) {
				event.updated = [];
			}

			console.log('event=' + JSON.stringify(event));

			var selectedAddress = getAddressById(event.address._id);
			console.log('selectedAddress=' + JSON.stringify(selectedAddress));
			event.address = selectedAddress;

			//event.address = this.address._id;
			event.updated.push(new Date().getTime());

			event.$update(function() {
				$location.path('events/' + event._id);
			});
		};

		$scope.find = function() {
			console.log('========find=========');

			Events.query(function(events) {
				$scope.events = events;
				$scope.$broadcast('load.event.end', {});
			});
		};

		$scope.findOne = function() {
			Events.get({
				eventId: $stateParams.eventId
			}, function(event) {
				$scope.event = event;
			});
		};

		$scope.selectEvent = function(eventId) {
			$scope.$broadcast('select.event', eventId);
		};

		$scope.getFilteredEvents = function (query) {
			$scope.filteredEvents = $filter('filter')($scope.events, query);
			$scope.$broadcast('filtered.events', {});
		};

		$scope.findByCityState = function(city, state) {
			Events.findByCityState({
				city: city,
				state: state
			}, function(events) {
				$scope.events = events;
				$scope.$broadcast('load.event.end', {});
			});
		};

	}
]);