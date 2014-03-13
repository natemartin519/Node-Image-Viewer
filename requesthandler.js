var querystring = require('querystring'),
    fs          = require('fs'),
    formidable  = require('formidable'),
    path        = require('path');

function home(response, request, filename) {

    if (typeof filename === 'undefined') {
        filename = 'index.html';
    }

    fs.readFile("./app/" + filename, function(err, file) {
         if(err) {
             response.writeHeader(500, {"Content-Type": "text/plain"});
             response.write(err + "\n");
             response.end();
         }
         else {
            response.writeHeader(200);
            response.write(file, 'utf-8');
            response.end();
        }
    });
}

function list(response, request, filename) {
    fs.readdir('/tmp/', function(err, files) {
        if(err) {
            response.writeHeader(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end();
        } else {
            response.writeHeader(200, {"Content-Type": "text/html"});
            response.write(files.join("<br>"));
            response.end();
        }
    });
}

function upload(response, request, filename) {

    var form = new formidable.IncomingForm();


    form.parse(request, function(error, fields, files) {

        fs.rename(files.upload.path, '/tmp/' + files.upload.name, function(error) {
            if (error) {
                fs.unlink('/tmp/' + files.upload.name);
                fs.rename(files.upload.path, '/tmp/' + files.upload.name);
            }
        });

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<h1>File Uploaded!</h1>');
        response.end();
    });
}

function show(response, request, filename) {

    var fileNotFound = function() {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found");
        response.end();
    };

    var types = ['.png', '.jpg', '.jpeg', '.gif'];
    var extension = path.extname(filename);

    var checkExtension = types.some(function(value) {
                            return extension.toLowerCase().indexOf(value) > -1;
                         });

    if (checkExtension) {

        fs.exists('/tmp/' + filename, function(exists) {
            if (exists) {
                response.writeHead(200);
                fs.createReadStream('/tmp/' + filename).pipe(response);
            } else {
                fileNotFound();
            }
        });
    } else {

        fileNotFound();
    }
}

exports.home  = home;
exports.list  = list;
exports.upload = upload;
exports.show = show;