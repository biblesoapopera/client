var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function (req, res) {
    if (req.url == '/') req.url = '/index.html';
    var stream = fs.createReadStream(path.join(__dirname, '..', 'dev', req.url));
    stream.pipe(res);
});
server.listen(80, '127.0.0.1');

console.log("Dev server running at http://127.0.0.1:80/");
