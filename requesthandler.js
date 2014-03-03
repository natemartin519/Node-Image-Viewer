var querystring = require('querystring');

function start(response) {
    console.log('Request handler \'start\' wes called');

    var body = '<!doctype html>' +
        '<html lang="en">' +
        '<head>' +
        '<meta charset="UTF-8">' +
        '<title>My First Node Page</title>' +
        '</head>' +
        '<body>' +
        '<form action="/upload" method="post">' +
        '<textarea name="text" rows="20" cols="60"></textarea>' +
        '<input type="submit" value="Submit text">'+
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}

function upload(response, postData) {
    console.log('Request handler \'upload\' wes called');
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('You have sent: ' + querystring.parse(postData).text);
    response.end();
}

exports.start  = start;
exports.upload = upload;