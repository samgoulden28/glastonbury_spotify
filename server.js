var express = require('express');
var path = require('path');
var cheerio = require('cheerio');
var app = express();

var routes = require('./routes/index');

app.use('/', routes);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

//Listen!
var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
