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

	var map, map2;
	var geocoder = new google.maps.Geocoder();
	var markers = {};

	function setupInfobox(map, marker, event) {

		var boxText = document.createElement("div");
		boxText.className = 'panel panel-primary';
		boxText.innerHTML = '<div class="panel-heading">' + event.title + 
			'</div><div class="panel-body">' + event.content + '</div>';

		var myOptions = {
			content: boxText
			,disableAutoPan: false
			,maxWidth: 0
			,pixelOffset: new google.maps.Size(-200, 0)
			,zIndex: null
			,boxStyle: {
				//background: 'url("tipbox.gif") no-repeat',
				opacity: 1,
				width: '400px'
			}
			,closeBoxMargin: '2px 2px 2px 2px'
			,closeBoxURL: 'http://www.google.com/intl/en_us/mapfiles/close.gif'
			,infoBoxClearance: new google.maps.Size(1, 1)
			,isHidden: false
			,pane: 'floatPane'
			,enableEventPropagation: false
		};

		var ib = new InfoBox(myOptions);

		google.maps.event.addListener(marker, 'click', function (e) {
			var isOpen = ib.getMap();
			if (isOpen) {
				ib.close(map, this);
			} else {
				ib.open(map, this);
			}
		});

	}

	function postLink(scope, element, attrs, ctrl) {
		
		// Get scope from a controller element
		// var eventCtrlScope = angular.element($('#eventsController')).scope();

		var mapOptions = {
			//center: new google.maps.LatLng(41.8781136, -87.62979819999998),
			zoom: 12
		};

		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		map2 = new google.maps.Map(document.getElementById('map-2'), mapOptions);
		
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
					icon: 'img/animals/bear.png',
					title: event.title,
				});

				markers[event._id] = marker;

				setupInfobox(map, marker, event);

			});

			map.fitBounds (bounds);
			map2.fitBounds (bounds);

			//Listening center_changed event of map 1 to
			//change center of map 2
			google.maps.event.addListener(map, 'center_changed',
				function() {
					map2.setCenter(map.getCenter());
				}
			);
			//Listening zoom_changed event of map 1 to change
			//zoom level of map 2
			google.maps.event.addListener(map, 'zoom_changed',
				function() {
					map2.setZoom(map.getZoom());
				}
			);

			google.maps.event.addListener(map2, 'click',
				function(e) {
					map.setCenter(e.latLng);
				}
			);

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