var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function(server) {
	io = socketio.listen(server);
	io.set('log level', 1);
	io.sockets.on('connection', function(socket) {
		console.log('****Hello socket****');
		socket.on('message', function(from, msg) {
			console.log('recived message from', from, 'msg', JSON.stringify(msg));
			io.sockets.emit('broadcast', {
				payload: msg,
				source: from
			});
			console.log('broadcast complete');
		});
	});
};

