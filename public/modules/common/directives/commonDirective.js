'use strict';

angular.module('mean.common')
.directive('modalMap', function() {

	var map;
	var	geocoder = new google.maps.Geocoder();

	function link(scope, element, attrs) {

		function showAddress(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				console.log('results[0]=' + JSON.stringify(results[0]));
				
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker( {
					map: map,
					position: results[0].geometry.location
				});

				scope.location = results[0].geometry.location;
				console.log('location=' + scope.location);

				scope.displayname = results[0].formatted_address;
				console.log('displayName=' + scope.displayname);
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		}

		var mapOptions = {
			//center: new google.maps.LatLng(41.8781136, -87.62979819999998),
			zoom: parseInt(scope.zoom)
		};

		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		element.on('shown.bs.modal', function() {
			var address = scope.street + ' ' + scope.city + ', ' + scope.state + ' ' + scope.zip;
			scope.displayname = '';
			google.maps.event.trigger(map, 'resize');
			geocoder.geocode({ 'address': address }, showAddress);
		});

		element.on('hide.bs.modal', function () {
			console.log('scope.location.lat()=' + scope.location.lat());
			console.log('scope.location.lng()=' + scope.location.lng());
		});

		scope.saveAddress = function() {
			$('#myModal').modal('hide');
		};
	}

	return {
		restrict: 'ECMA',
		transclude: true,
		scope: {
			displayname: '=displayname',
			street: '=',
			city: '=',
			state: '=',
			zip: '=',
			location: '=location',
			zoom: '@'
		},
		controller: function($scope) {
		},
		templateUrl: '/modules/common/views/modal.html',
		link: link
	};
})
.directive('formatdate', ['dateFilter', function(dateFilter) {

	function link(scope, element, attrs) {
		var format = 'yyyy-mm-dd hh:mm';

		scope.$watch('formatdate', function(value) {
			console.log("inside watch...");
			console.log("element.val = " + element.val());
			console.log("inside watch... value = " + value);
			element.val(dateFilter(value, format));
			console.log("element.val = " + element.val());
		});

		console.log("element.val = " + element.val());
	}

	return {
		restrict: 'A',
		link: link
	};
}]);