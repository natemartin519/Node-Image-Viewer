var http = require('http');
var url  = require('url');

function start(route, handle) {

    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;

        route(handle, pathname);

        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('You are located at ' + pathname);
        response.end();
    }

    http.createServer(onRequest).listen(8000, '127.0.0.1');
    console.log('Server running at http://127.0.0.1:8000');
}

exports.start = start;