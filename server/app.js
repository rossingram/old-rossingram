// Load external modules
var express = require('express');
var http = require('http');

// Load custom configuration.
var config = require('../config');

// Load internal modules.
var FoursquareLastSeen = require('./modules/foursquare');
var foursquare = new FoursquareLastSeen(config.foursquare);


var app = express();
var server = http.createServer(app);
app.enable("jsonp callback");

app.get('/', function(req, res){
    var date = new Date();
    date.setHours(date.getHours() - 6);
    var pastDateInSeconds = Math.round(date.getTime() / 1000);

    foursquare.last_check_in(pastDateInSeconds, function(result, error) {
        var data = {};
        if (result) {
            data.checkin = result;
        } else {
            data.error = error;
        }
        res.json(data);
    });
});

server.listen(3000);

console.log("Express server listening on port %d.", server.address().port);