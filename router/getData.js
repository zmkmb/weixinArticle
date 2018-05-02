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
		var articleInfoList = [];
		files.forEach(function(file,index){
			data(logPath + '/' + file).then(function(data){
				data.title = file;
				if(index >= files.length-1){
					return res.json(articleInfoList);
				}
				articleInfoList.push(data);
			}).catch(function(e){
				console.log(e)
			})
		})


	})

})

module.exports = router;
