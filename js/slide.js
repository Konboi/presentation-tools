(function () {
    console.log('slide.js');
    var socket = io.connect('http:192.168.100.100:8080');

    socket.on('push2', function (message) {
        console.log(message);
    });
}());
