var fs = require('fs');
var readline = require('readline');
var data = function(filePath){
	return new Promise(function(resolve, reject){
		var rd = readline.createInterface({
			input: fs.createReadStream(filePath),
			output: process.stdout,
			terminal: false
		});
		var allData = {time:[],val:[]};
		var data = [];
		var obj = {};
		var readNum = 0;
		var time = 0;
		//按行读
		rd.on('line', function(line) {
			if(/^\{.*\}$/i.test(line)){
				if(data.length > 0){
					obj = JSON.parse(line);
					if(obj.appmsgstat){
						readNum = obj.appmsgstat.read_num;
						data.push(readNum);
					}	
				}
			}else{
				if(data.length == 2){
					allData.time.push(data[0]);
					allData.val.push(data[1]);
				}
				data = [];
				if(/(\d{13})\s/.test(line)){
					time = /(\d{13})\s/.exec(line)[1];
				}
				data.push(time);
			}
		});

		rd.on("close", function(){
		    resolve(allData);
		});
	})
	
}
module.exports = data
