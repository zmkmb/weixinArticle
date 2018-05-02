var express = require('express');
var router = express.Router();
var fs = require('fs');
var data = require('./../models/data');
var logPath = './log';

router.use('/', function(req, res, next) {
	fs.readdir(logPath, function(err, files){
		if(err){
			console.log(err);
			return;
		}
		files.forEach(function(file){
			data(logPath + '/' + file).then(function(data){
				res.json(data);
			}).catch(function(e){
				console.log(e)
			})
		})
	})

})

module.exports = router;
