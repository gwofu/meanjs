'use strict';

angular.module('mean.events')
.controller('EventsController',
	['$scope', '$stateParams', '$location', '$filter', 'Authentication', 'Events', 'Addresses', 'Messages', 'MessageService',
	function($scope, $stateParams, $location, $filter, Authentication, Events, Addresses, Messages, MessageService) {
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

			var selectedAddress = getAddressById(event.address._id);
			event.address = selectedAddress;

			//event.address = this.address._id;
			event.updated.push(new Date().getTime());

			event.$update(function() {
				$location.path('events/' + event._id);
			});
		};

		$scope.find = function() {
			console.log('==============find================');
			if ($scope.queryByUser) {
				Events.findByUser(function(events) {
					$scope.events = events;
					$scope.$broadcast('load.event.end', {});
				});
			} else {
				Events.query(function(events) {
					$scope.events = events;
					$scope.$broadcast('load.event.end', {});
				});
			}
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

		$scope.selectedEvent = function(event) {
			$scope.event = event;
		};

		$scope.inboxMessages = function(event) {
			$scope.event = event;
			console.log('event=' + JSON.stringify($scope.event));

			MessageService.findByEventId($scope.event._id, function(messages) {
				$scope.messages = messages;
				console.log('messages=' + JSON.stringify(messages));
			});
		};

		$scope.replyMessage = function(message, reply) {
			console.log('message: ' + message);
			console.log('reply: ' + reply);

			var message = new Messages({
				to: message.user._id,
				title: 'Re: ' + message.title,
				content: reply,
				type: 2, // 2: reply message
				event: $scope.event._id
			});
			
			message.$save(function(response) {
				$scope.messages.unshift(response);
			});
		};

		$scope.successFn = function() {
			console.log('$scope.event._id: ' + $scope.event._id);
			var title = $('.messageCreate > input').val();
			var content = $('.messageCreate > textarea').val();

			var message = new Messages({
				to: $scope.event.user._id,
				title: title,
				content: content,
				type: 1, // 1: request message
				event: $scope.event._id
			});
			
			message.$save(function(response) {
				//console.log('Response: ' + response)
			});
			
		};

		$scope.inboxSuccessFn = function() {

		};

		$scope.findMessagesByEvent = function() {
			console.log('findByEventId called');
			if (!$scope.event) {
				console.log('event is not selected');
				return;
			}

			console.log('event=' + JSON.stringify($scope.event));

			MessageService.findByEventId($scope.event._id, function(messages) {
				$scope.messages = messages;
				console.log('messages=' + JSON.stringify(messages));
			});
		};

	}
]);