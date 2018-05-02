var fs = require('fs');
var express = require('express');
var app = express();
var router = express.Router();
var getData = require('./router/getData');



app.use('/static', express.static('public'));
app.use('/getData', getData);

app.get('/', function (req, res) {
	fs.readFile('./public/index.html', function (err, data) {
	   	if (err) {
	       return console.error(err);
	   	}
	   	res.send(data.toString());
	});
});


var server = app.listen(3000, function () {
	var host = server.address().address;
  	var port = server.address().port;
  	console.log('Example app listening at http://%s:%s', host, port);
});
