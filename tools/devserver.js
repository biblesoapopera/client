var http = require('http');
var fs = require('fs');
var path = require('path');
var rangeParser = require('range-parser');

var server = http.createServer(function (request, response) {
    if (request.url == '/') request.url = '/index.html';    
    var filePath = path.join(__dirname, '..', 'dev', request.url);

    if (request.headers.range){
        fs.stat(filePath, function(err, stats){
            if (err) console.log(err);
            var range = rangeParser(stats.size, request.headers.range)[0];
                        
            response.writeHead(206, {
                'Content-Type': 'application/octet-stream',
                'Content-Range': 'bytes ' + range.start + '-' + range.end + '/' + stats.size,
                'Content-Length': range.end - range.start + 1
            });
            fs.createReadStream(filePath, range).pipe(response);    
        })        
    } else {
        fs.createReadStream(filePath).pipe(response);        
    }
});
server.listen(80, '127.0.0.1');

console.log("Dev server running at http://127.0.0.1:80/");
