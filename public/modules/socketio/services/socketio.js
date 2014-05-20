angular.module('mean.socketio').service('SocketioService', function() {

	console.log("*****SocketioService*******");
	
	var socket = io.connect();

	console.log("*****after connect*******");

	this.sendMessage = function(room, text) {
		var message = {
			room: room,
			text: text
		};
		this.socket.emit('message', message);
	};

});