var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.render("index.ejs", {layout:false});
});
app.use('/static', express.static(__dirname + '/static')); 

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
