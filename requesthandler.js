var querystring = require('querystring'),
    fs          = require('fs'),
    formidable  = require('formidable');

function start(response) {
    console.log('Request handler \'start\' wes called');

    var body = '<!doctype html>' +
        '<html lang="en">' +
        '<head>' +
        '<meta charset="UTF-8">' +
        '<title>My First Node Page</title>' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype ="multipart/form-data" method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="Upload file">'+
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log('Request handler \'upload\' wes called');

    var form = new formidable.IncomingForm();

    console.log('About to parse');
    form.parse(request, function(error, fields, files) {
        console.log('Parsing done');

        fs.rename(files.upload.path, '/tmp/test.png', function(error) {
            if (error) {
                fs.unlink('/tmp.test.png');
                fs.rename(files.upload.path, '/tmp/test.png');
            }
        });

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('Receiver Image:<br>');
        response.write('<img src="/show">');
        response.end();
    });

}

function show(response) {
    console.log('Request handler \'show\' was callsd');
    response.writeHead(200, {'Content-Type': 'image/png'});
    fs.createReadStream('/tmp/test.png').pipe(response);
}

exports.start  = start;
exports.upload = upload;
exports.show = show;