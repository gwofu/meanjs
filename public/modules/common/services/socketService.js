'use strict';

angular.module('mean.socket')
.factory('mySocket', function(socketFactory) {
	return socketFactory();
})
.service('mySocketService', function($rootScope, mySocket) {

	mySocket.on('joined', function(data) {
		$rootScope.$broadcast('message', { text: data.name + ' joined.' } );
	});

	mySocket.on('left', function(data) {
		$rootScope.$broadcast('message', { text: data.name + ' left.' } );
	});

	this.nameAttempt = function(name, callback) {
		mySocket.emit('nameAttempt', { name: name });
	
		mySocket.on('nameResult', function(data) {
			callback(data.name);
		});
	};

	this.getUsers = function(name, callback) {
		mySocket.emit('getUsers', { name: name });

		mySocket.on('getUsersResult', function(data) {
			console.log('getUsersResult Received: ' + JSON.stringify(data));
		});
	};

	this.getUserCount = function(callback) {
		mySocket.emit('getUserCount');

		mySocket.on('getUserCountResult', function(data) {
			console.log('getUserCountResult Received: ' + JSON.stringify(data));
			callback(data.count);
		});
	};

});
