'use strict';

angular.module('mean.addresses')
.controller('AddressController',
	['$scope', '$stateParams', '$location', 'Authentication', 'Addresses',
	function($scope, $stateParams, $location, Authentication, Addresses) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			console.log('==============create================');

			var address = new Addresses({
				street: this.address.street,
				city: this.address.city,
				state: this.address.state,
				zip: this.address.zip,
				displayName: this.address.displayName,
				loc: [this.address.location.k, this.address.location.A]
			});
			
			console.log('address=' + JSON.stringify(address));

			address.$save(function(response) {
				$location.path('addresses/' + response._id);
			});

			this.street = '';
			this.city = '';
			this.state = '';
			this.zip = '';
		};

		$scope.remove = function(address) {
			console.log('==============remove================');

			if (address) {
				address.$remove();

				for (var i in $scope.addresses) {
					if ($scope.addresses[i] === address) {
						$scope.addresses.splice(i, 1);
					}
				}
			} else {
				$scope.address.$remove(function() {
					$location.path('addresses');
				});
			}
		};

		$scope.update = function() {
			console.log('==============update================');

			var address = $scope.address;
			if (!address.updated) {
				address.updated = [];
			}
			var location = $scope.address.location;
			address.loc = [location.k, location.A];
			address.updated.push(new Date().getTime());

			address.$update(function() {
				$location.path('addresses/' + address._id);
			});
		};

		$scope.find = function() {
			console.log('==============find================');
			console.log('$scope.queryByUser=' + $scope.queryByUser);
			if ($scope.queryByUser) {
				Addresses.search(function(addresses) {
					$scope.addresses = addresses;
				});
			} else {
				Addresses.query(function(addresses) {
					$scope.addresses = addresses;
				});
			}
		};

		$scope.findOne = function() {
			if ($scope.command === 'create') {
				return;
			}
			console.log('==============findOne================');
			Addresses.get({
				addressId: $stateParams.addressId
			}, function(address) {
				$scope.address = address;
			});
		};

		$scope.runCommand = function() {
			if ($scope.command === 'create') {
				$scope.create();
			}
			else if ($scope.command === 'update') {
				$scope.update();
			}
		};
	}
]);