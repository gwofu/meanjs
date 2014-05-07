'use strict';

var
  fs = require('fs'),
  filename = process.argv[2],
  net = require('net');

var a = 10;

var server = net.createServer(function(connection) {
    console.log('Subscriber connected.');
    connection.write(JSON.stringify({
      type: 'watching',
      file: filename
    }) + '\n');

    var watcher = fs.watch(filename, function() {
      connection.write(JSON.stringify({
        type: 'changed',
        file: filename,
        timestamp: new Date()
      }) + "\n");
    });

    connection.on('close', function() {
      console.log('Subscriber disconnected.');
      watcher.close();
    });
  });

  if (!filename) {
    throw Error('A file to watch must be specified!');
  }

  server.listen(3000, function() {
    console.log('Listening for subscribers...');
  });


// fs.watch(filename, function() {
//   console.log("*File " + filename + " just changed!");
// });

// console.log("Now watching " + filename + " for changes...");
// process.stdout.write('12345');

// var EventEmitter = require('events').EventEmitter;

// var emitter = new EventEmitter;

// emitter.on('name', function(first, last) {
//   console.log(first + ', ' + last);
// });

// emitter.emit('name', 'tj', 'loo');
// emitter.emit('name', 'simon', 'jjj');

// function Dog(name) {
//   this.name = name;
// }

// Dog.prototype.__proto__ = EventEmitter.prototype;

// var simon = new Dog('simon');
// simon.on('bark', console.log);

// setInterval(function() {
//   simon.emit('bark', 'foo bar');
// }, 1000);

// setTimeout(function() {
//   simon.removeListener('bark', console.log);
// }, 5000)