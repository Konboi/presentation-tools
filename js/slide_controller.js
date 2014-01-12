(function () {
    console.log('slide controller.js');

    var socket = io.connect('http://192.168.100.100:8080');

    socket.emit('push', 'controller');

    socket.on('push2', function (message) {
        console.log(message);
    });
}());
