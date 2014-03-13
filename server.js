var http = require('http'),
    path = require('path');
    url  = require('url');

function start(route, handle) {

    function onRequest(request, response) {

        var parsedUrl = {
            path: url.parse(request.url).pathname
        };

        if ( path.extname(parsedUrl.path) != '' ) {
            parsedUrl.path = path.dirname(request.url);
            parsedUrl.file = path.basename(request.url)
        }

        console.log('Request for ' + parsedUrl.path + ' received');
        route(handle, parsedUrl, response, request);
    }

    http.createServer(onRequest).listen(8000);
    console.log('Server running on port 8000');
}

exports.start = start;