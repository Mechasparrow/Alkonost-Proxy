// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var cors = require('cors');

var feedlib = require('./src/feed-parser.js');

app.use(cors());


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.send('The Alkonost API');
});

app.get("/feed", function (request, response) {
  
  var feed_url = request.query.url;
  
  var feed_promise = feedlib.getFeed(feed_url);
  
  console.log(feed_promise);
  
  feed_promise.then (function (data) {
    response.json(data);
  }).catch (function (err) {
    
    response.json({"error": err});
  })
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
