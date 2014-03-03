var http = require('http'),
    url  = require('url');

function start(route, handle) {

    function onRequest(request, response) {

        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(8000);
    console.log('Server running on port 8000');
}

exports.start = start;