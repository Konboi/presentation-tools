var http  = require('http');
var fs    = require('fs');
var index = fs.readFileSync('index.html');
var path = require('path');

function contentType(ext) {
  var content_type;

  switch (ext) {
    case '.html':
    content_type = 'text/html';
    break;
    case '.css':
    content_type = 'text/css';
    break;
    case '.js':
    content_type = 'text/javascript';
    break;
    default:
    content_type = 'text/plain';
    break;
  }
  return {'Content-Type': content_type};
}


var io = require('socket.io').listen(
  http.createServer(function (req, res) {
      var filepath = '.' + (req.url == '/' ? '/index.html' : req.url);
      var fileext = path.extname(filepath);

      path.exists(filepath, function (f) {
          if (f) {
            fs.readFile(filepath, function (err, content) {
                if (err) {
                  res.writeHead(500);
                  res.end();
                } else {
                  res.writeHead(200, contentType(fileext));
                  res.end(content);
                }
            });
          } else {
            res.writeHead(404);
            res.end();
          }
      });
  }).listen(8080)
);

io.sockets.on('connection', function (socket) {
    socket.on('push', function (message) {
        console.log(message);
        socket.broadcast.emit('push2', message);
    });

    socket.on('controller', function (command) {
        switch (command) {
          case 'prev':
          socket.broadcast.emit('prev');
          break;

          case 'next':
          socket.broadcast.emit('next');
          break;

          default:
        }
    });

    socket.on('question', function (question, answer) {
        console.log(question);
        socket.broadcast.emit('answer', {"question": question, "answer": answer});
    });
});
