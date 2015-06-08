/**
 * @module CloudifyTestServer
 * @description
 * This file emulates nginx frontserver.
 *
 * It will serve the static files and proxy to backend for all /backend requests
 */


var express = require('express');
var request = require('request');

var app = express();

// todo: make this configurable
process.env.PROXY_URL = 'http://localhost:9001/backend';

// serve static files
app.use(express.static('cloudify-ui'));

// proxy backend requests
app.use('/backend', function(req,res) {
    var method, r;
    method = req.method.toLowerCase();
    switch (method) {
        case "get":
            r = request.get({
                uri: process.env.PROXY_URL + req.url,
                json: req.body
            });
            break;
        case "put":
            r = request.put({
                uri: process.env.PROXY_URL + req.url,
                json: req.body
            });
            break;
        case "post":
            r = request.post({
                uri: process.env.PROXY_URL + req.url,
                json: req.body
            });
            break;
        case "delete":
            r = request.del({
                uri: process.env.PROXY_URL + req.url,
                json: req.body
            });
            break;
        default:
            return res.send("invalid method");
    }

    return req.pipe(r).pipe(res);
});




app.listen(3000, function() { // todo make port configurable
    console.log('listening on port 3000');
});