var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    if (req.url == '/') req.url = '/index.html';
    var stream = fs.createReadStream(__dirname + req.url);
    stream.pipe(res);
});
server.listen(80, '127.0.0.1');

console.log("Dev server running at http://127.0.0.1:80/");
