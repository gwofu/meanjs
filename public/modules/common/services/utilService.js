'use strict';

angular.module('mean.common')
.service('UtilService', function() {
	this.loadJSFile = function loadJSFile(filename) {
		var fileref = document.createElement('script');
		fileref.setAttribute('type','text/javascript');
		fileref.setAttribute('src', filename);
		if (typeof fileref !=='undefined') {
			document.getElementsByTagName('head')[0].appendChild(fileref);
		}
	};

	this.loadCSSFile = function loadCSSFile(filename) {
	  var fileref=document.createElement('link');
	  fileref.setAttribute('rel', 'stylesheet');
	  fileref.setAttribute('type', 'text/css');
	  fileref.setAttribute('href', filename);
		if (typeof fileref !=='undefined') {
			document.getElementsByTagName('head')[0].appendChild(fileref);
		}
	};
});