'use strict';

angular.module('mean.messages')
.controller('MessageController',
	['$scope', '$stateParams', '$location', '$filter', 'Authentication', 'Messages',
	function($scope, $stateParams, $location, $filter, Authentication, Messages) {

		$scope.authentication = Authentication;
/*
		$scope.create = function() {

			var message = new Messages({
				title: this.title,
				content: this.content,
				type: this.type,
			});
			
			console.log('message=' + JSON.stringify(message));

			message.$save(function(response) {
				$location.path('messages/' + response._id);
			});

			this.title = '';
			this.content = '';
			this.type = '';
		};
*/
		$scope.remove = function(message) {
			if (message) {
				message.$remove();

				for (var i in $scope.messages) {
					if ($scope.messages[i] === message) {
						$scope.messages.splice(i, 1);
					}
				}
			} else {
				$scope.message.$remove(function() {
					$location.path('messages');
				});
			}
		};

		$scope.find = function() {
			console.log('==============find================');
			console.log('$scope.queryByUser=' + $scope.queryByUser);
			if ($scope.queryByUser) {
				Messages.findByUser(function(messages) {
					$scope.messages = messages;
				});
			}
			else if ($scope.queryField === 'to') {
				Messages.findByTo(function(messages) {
					$scope.messages = messages;
				});
			} else {
				Messages.query(function(messages) {
					$scope.messages = messages;
				});
			}
		};

		$scope.findOne = function() {
			Messages.get({
				messageId: $stateParams.messageId
			}, function(message) {
				$scope.message = message;
			});
		};

	}
]);