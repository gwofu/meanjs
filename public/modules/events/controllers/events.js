'use strict';

angular.module('mean.events')
.controller('EventsController',
	['$scope', '$stateParams', '$location', '$filter', 'Authentication', 'Events', 'Addresses', 'Messages', 'MessageService', 'AppliedEventsService',
	function($scope, $stateParams, $location, $filter, Authentication, Events, Addresses, Messages, MessageService, AppliedEventsService) {

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

		$scope.showSetting = false;
		$scope.addresses = [];
		$scope.appliedEvents = [];
		$scope.reverse = false;

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
				endDate: this.endDate,
				address: {
					_id: selectedAddress._id,
					city: selectedAddress.city,
					state: selectedAddress.state,
					zip: selectedAddress.zip,
					loc: selectedAddress.loc,
					displayName: selectedAddress.displayName
				}
			});
			
			event.$save(function(response) {
				if (response._id) {
					$location.path('events/' + response._id);
				}
				else {
					console.log('response=' + JSON.stringify(response));
				}
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

		$scope.openDetailPage = function(eventId) {
			$location.path('events/' + eventId +'/detail');
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

		$scope.findOpenEvents = function() {
			Events.findOpenEvents(function(events) {
				$scope.events = events;
				$scope.$broadcast('load.event.end', {});
			});
		};

		$scope.findCurrentEvents = function() {
			Events.findCurrentEvents(function(events) {
				$scope.events = events;
				$scope.$broadcast('load.event.end', {});
			});
		};

		$scope.findPastEvents = function() {
			Events.findPastEvents(function(events) {
				$scope.events = events;
				$scope.$broadcast('load.event.end', {});
			});
		};

		$scope.findOne = function() {
			Events.get({
				eventId: $stateParams.eventId
			}, function(event) {
				event.date = $filter('date')(new Date(event.date), 'yyyy-MM-dd HH:mm');
				event.endDate = $filter('date')(new Date(event.endDate), 'yyyy-MM-dd HH:mm');
				$scope.event = event;

				AppliedEventsService.findByEventAndUser(event._id, function(response) {
					$scope.event.appliedFlag = response.event ? true : false;
				});

				$scope.$broadcast('load.event.end', $scope.event.address.loc);

				$scope.inboxMessages();

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

		$scope.inboxMessages = function() {
			console.log($scope.event);
			//$scope.event = event;

			MessageService.findByEventId($scope.event._id, function(messages) {
				$scope.messages = messages;
			});
		};

		$scope.replyMessage = function(message, reply) {
			var newMessage = new Messages({
				to: message.user._id,
				title: 'Re: ' + message.title,
				content: reply,
				type: 2, // 2: reply message
				event: $scope.event._id
			});
			
			newMessage.$save(function(response) {
				$scope.messages.unshift(response);
			});
		};


		$scope.successFn = function() {
			//console.log('$scope.event._id: ' + $scope.event._id);
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

		$scope.simpleCreateSuccessFn = function() {
			var content = $('.messageCreate > textarea').val();

			var message = new Messages({
				to: $scope.event.user._id,
				content: content,
				event: $scope.event._id
			});
			
			message.$save(function(response) {
				MessageService.findByEventId($scope.event._id, function(messages) {
					$scope.messages = messages;
				});
			});
			
		};

		$scope.inboxSuccessFn = function() {

		};

		$scope.findMessagesByEvent = function() {
			console.log('findByEventId called');
			if (!$scope.event) {
				//console.log('event is not selected');
				return;
			}

			console.log('event=' + JSON.stringify($scope.event));

			MessageService.findByEventId($scope.event._id, function(messages) {
				$scope.messages = messages;
			});
		};

		$scope.$on('show.setting', function (event, showSettingFlag) {
			$scope.showSettingFlag = showSettingFlag;
		});

		$scope.detailApplyPosition = function($event) {
			AppliedEventsService.create({
				user: $scope.event.user._id,
				event: $scope.event._id
			}, function(response) {
				var e = $event.target;
				angular.element(e).text('Applied!');
				angular.element(e).prop('disabled', true);

			});
		}

		$scope.applyPosition = function(event, callback) {
			var e = event ? event : $scope.event;
			var c = callback ? callback : function(){};

			AppliedEventsService.create({
				user: e.user._id,
				event: e._id
			}, function(response) {
				c();
				//$scope.$broadcast('applied.event.end', response);
			});
		};

		$scope.findAppliedEvents = function() {
			AppliedEventsService.getEventId(function(data) {
				$scope.appliedEvents = [];
				data.forEach(function(element, index) {
					$scope.appliedEvents.push(element.event);
				});
				//console.log("$scope.appliedEvents=" + $scope.appliedEvents);
			});
		};

		$scope.getUsersApplied = function(eventId, members, status) {
			AppliedEventsService.findByEventId(eventId, function(data) {
				angular.forEach(data, function(obj, index) {
					console.log("--------------");
					console.log(members.indexOf(obj.user._id));
					if (members.indexOf(obj.user._id) > -1) {
						data[index].selected = true;
					} else {
						data[index].selected = false;
					}
				});
				$scope.usersApplied = data;
				$scope.eventId = eventId;
				$scope.openFlag = status == 'o';
			});
		};

		$scope.updateMember = function() {
			$scope.saveFlag = true;
			var children = angular.element( document.querySelectorAll( '.selectUser > a > i.fa-check-square-o' ) );
			var users = [];

			for (var i=0; i<children.length; i++) {
				users.push(children[i].getAttribute('userid'));
			}

			AppliedEventsService.setMembers($scope.eventId, users, function(response) {
				console.log("AppliedEventsService.setMembers done");
			});

			var event = new Events({
				_id: $scope.eventId,
				members: users
			});

			event.$addMember({}, function(response){
				$scope.saveFlag = false;
			});
		};

		$scope.closeRegistration = function(eventId) {

			
			var event = new Events({
				_id: eventId,
				status: 'c'
			});

			event.$update({}, function(response){
				$scope.find();

			});
		};


	}
]);