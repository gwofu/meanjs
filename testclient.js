'use strict';
var 
  net = require('net'),
  client = net.connect({port: 3000});

client.on('data', function(data) {
  console.log("received data: " + data);

  var message = JSON.parse(data);

  if (message.type === 'watching') {
    console.log("Now watching: " + message.file);
  } else if (message.type === 'changed') {
    console.log("File '" + message.file + "' changed at " + message.timestamp);
  } else {
    throw Errpr("Unrecogonized message type: " + message.type);
  }

});

client.on('end', function() {
  console.log('End');
});