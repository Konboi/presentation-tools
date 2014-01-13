(function () {
    console.log('slide controller.js');

    var socket = io.connect('http://192.168.100.100:8080');

    // Next Button
    $('#next').click(function () {
        console.log('next');
        socket.emit('controller', 'next');
    });

    // Prev Button
    $('#prev').click(function () {
        console.log('prev');
        socket.emit('controller', 'prev');
    });


    socket.on('push2', function (message) {
        console.log(message);
    });
}());
