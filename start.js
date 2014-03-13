var server = require('./server');
var router = require('./router');
var requestHandler = require('./requesthandler');

var handle = {};
handle['/'] = requestHandler.home;
handle['/list'] = requestHandler.list;
handle['/upload'] = requestHandler.upload;
handle['/show'] = requestHandler.show;

server.start(router.route, handle);