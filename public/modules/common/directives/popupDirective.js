'use strict';
// Usage:
// <popup popupid="contactPopup" title="Introduce yourself"><ng-include src="'modules/events/views/t1.html'"></ng-include></popup>
//
angular.module('mean.common')
.directive('popup', function() {

	function link(scope, element, attrs, ngModel) {

		scope.activeFlag = false;

		if (ngModel) {
			// Listen for change events to enable binding
			element.on('blur keyup change', function() {
				scope.$apply(function(){
					var text = angular.element('textarea').val();
					ngModel.$setViewValue(text);
					scope.activeFlag = ngModel.$viewValue.length > 0;
				});
			});
		}

		element.on('shown.bs.modal', function() {
			//console.log('shown');
		});

		element.on('hide.bs.modal', function () {
			//console.log('hide');
		});

		scope.success = function() {
			scope.successFn();
			jQuery('#' + attrs.popupid).modal('hide');
		};

	}

	return {
		restrict: 'E',
		require: '?ngModel',
		transclude: true,
		scope: {
			popupid: '@',
			title: '@',
			hideFooter: '@',
			zoom: '@',
			init: '&',
			successFn: '&'
		},
		controller: function($scope) {
		},
		templateUrl: '/modules/common/views/popup.html',
		link: link
	};
});