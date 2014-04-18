'use strict';

angular.module('mean.common')
.directive('helloWorld', function() {
	return {
		scope: {
			color: '='
		},
		restrict: 'AE',
		replace: true,
		template: '<p style="background-color:{{color}}">Hello World</p>',
		link: function(scope, elem, attrs) {
			elem.bind('click', function() {
				alert("click");
				scope.$apply(function() {
					scope.color = 'white';
				});
			});

			elem.bind('mouseover', function() {
				elem.css('cursor', 'pointer');
			});
		}
	};
})
.directive('googleMap', function() {

	var heatmapPoints = [
		new google.maps.LatLng(41.0182827999113,28.973224999734),
		new google.maps.LatLng(41.0150707003526,28.9764445996386),
		new google.maps.LatLng(41.01140130003,28.9831846001892),
		new google.maps.LatLng(41.0148609002104,28.9764469999292),
		new google.maps.LatLng(41.0149687001455,28.9764550002981),
		new google.maps.LatLng(41.0148247996249,28.9757389996552),
		new google.maps.LatLng(41.0020956002318,28.9736237995987),
	];

	var heatmap = new google.maps.visualization.HeatmapLayer({
		data: heatmapPoints
	});

	var map;
	var geocoder = new google.maps.Geocoder();
	var markers = {};

	function postLink(scope, element, attrs, ctrl) {
		
		// Get scope from a controller element
		// var eventCtrlScope = angular.element($('#eventsController')).scope();

		var mapOptions = {
			center: new google.maps.LatLng(41.8781136, -87.62979819999998),
			zoom: 12
		};

		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		
		heatmap.setMap(map);

		scope.disableDefaultUI = function() {
			map.setOptions ({ disableDefaultUI: true });
		};

		scope.zoomToStreet = function() {
			map.setZoom(18);
		};

		scope.showEventLocations = function() {
			
			console.log('****showEventLocations*****');

			var events = scope.events;
			var loc = events[0].address.loc;
			var myLatlng = new google.maps.LatLng(loc[0], loc[1]);
			map.setCenter(myLatlng);
			
			var bounds = new google.maps.LatLngBounds();

			angular.forEach(events, function(event) {
				console.log("event=" + JSON.stringify(event));
				
				loc = event.address.loc;
				myLatlng = new google.maps.LatLng(loc[0], loc[1]);
				bounds.extend(myLatlng);

				var marker = new google.maps.Marker( {
					map: map,
					position: myLatlng,
					//icon: 'img/coffee.png',
					title: event.title,
				});

				markers[event._id] = marker;

				var infowindow = new google.maps.InfoWindow({
					content: 'Marker Info Window – ID : ' + event._id
				});

				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map, marker);
				});


			});

			map.fitBounds (bounds);
		};

		scope.$on('select.event', function (event, eventId) {
			map.setCenter(markers[eventId].getPosition());
		});

		scope.$on('load.event.end', function (event, data) {
			scope.showEventLocations();
		});

		scope.$on('filtered.events', function (event, data) {
			angular.forEach(markers, function(marker) {
				marker.setVisible(false);
			});
			angular.forEach(scope.filteredEvents, function(data) {
				markers[data._id].setVisible(true);
			});
		});

	}

	return {
		restrict: 'E',
		templateUrl: '/modules/common/views/eventMap.html',
		link: postLink
	};
});