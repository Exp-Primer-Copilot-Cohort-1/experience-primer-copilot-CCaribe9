// Create web server

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');

var comments = [];

var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                console.log(err);
                res.end('Server Error!');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else if (pathname === '/submit') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else if (pathname === '/get') {
        res.end(JSON.stringify(comments));
    } else {
        fs.readFile(path.join(__dirname, pathname), function(err, data) {
            if (err) {
                console.log(err);
                res.end('404 Not Found.');
            } else {
                res.end(data);
            }
        });
    }
});

server.listen(8080, function() {
    console.log('Server is running...');
});