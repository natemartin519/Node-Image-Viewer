function route(handle, parsedUrl, response, request) {

    if (typeof handle[parsedUrl.path] === 'function') {
        handle[parsedUrl.path](response, request, parsedUrl.file);
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found");
        response.end();
    }
}

exports.route = route;