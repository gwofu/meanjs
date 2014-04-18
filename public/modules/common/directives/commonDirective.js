'use strict';

angular.module('mean.common')
.directive('modalMap', function() {

	var map;
	var	geocoder = new google.maps.Geocoder();

	function link(scope, element, attrs) {

		function showAddress(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker( {
					map: map,
					position: results[0].geometry.location
				});

				scope.location = results[0].geometry.location;
				scope.displayname = results[0].formatted_address;
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
			console.log('scope.location=' + JSON.stringify(scope.location));
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
});