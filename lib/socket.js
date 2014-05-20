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

		handleNameChangeAttempts(socket, nickNames, namesUsed);

		handleClientDisconnection(socket, nickNames, namesUsed);

		handleUserCount(socket, namesUsed);

	});
};

function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
	var name = 'Guest' + guestNumber;
	nickNames[socket.id] = name;
	socket.emit('nameResult', {
		success: true,
		name: name
	});
	namesUsed.push(name);
	return guestNumber + 1;
};

function handleNameChangeAttempts(socket, nickNames, namesUsed) {
	socket.on('nameAttempt', function(data) {
		var name = data.name;
		console.log('name: ' + name);
		if (name.indexOf('Guest') == 0) {
			socket.emit('nameResult', {
				success: false,
				message: 'Name cannot begin with "Guest".'
			});
		} else {
			if (namesUsed.indexOf(name) == -1) {
				namesUsed.push(name);
				console.log('In handleNameChangeAttempts namesUsed: ' + namesUsed)
				nickNames[socket.id] = name;
				socket.emit('nameResult', {
					success: true,
					name: name
				});
				socket.broadcast.to(currentRoom[socket.id]).emit('joined', {
					name: name
				});
				socket.broadcast.to(currentRoom[socket.id]).emit('getUserCountResult', {
					success: true,
					count: namesUsed.length
				}); 
			} else {
				socket.emit('nameResult', {
					success: false,
					message: 'That name is already in use.'
				});
			}
		}
	});
}

function handleClientDisconnection(socket, nickNames, namesUsed) {
	socket.on('disconnect', function() {
		console.log("disconnect namesUsed: " + namesUsed);
		if (namesUsed.length > 0) {
			var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
			var name = nickNames[socket.id];

			socket.broadcast.to(currentRoom[socket.id]).emit('left', {
				name: name
			});

			delete namesUsed[nameIndex];
			delete nickNames[socket.id];

			namesUsed.splice(nameIndex, 1);

			socket.broadcast.to(currentRoom[socket.id]).emit('getUserCountResult', {
				success: true,
				count: namesUsed.length
			}); 
		}
	});
}

function handleUserCount(socket, namesUsed) {
	socket.on('getUserCount', function() {
	
		console.log('In handleUserCount socket.id: ' + socket.id)
	
		console.log('In handleUserCount namesUsed: ' + namesUsed)

		console.log("getUserCount: " + namesUsed.length);
		socket.emit('getUserCountResult', {
			success: true,
			count: namesUsed.length
		}); 
	});
}