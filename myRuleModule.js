var fs = require('fs');
const url = require("url");
const querystring = require("querystring");
var articleUrl = ''
var path_readNumlog = './log';
module.exports = {
    summary: 'a rule to hack response',
    *beforeSendResponse(requestDetail, responseDetail) {

       if(/mp\/profile_ext\?action=home/i.test(requestDetail.url)){
            try{
                if(!articleUrl){
                    return null;
                }
                var reg = /var msgList = \'(.*?)\';/;
                var ret = reg.exec(responseDetail.response.body.toString());
                //console.log(ret)
                var newResponse = responseDetail.response;
                newResponse.body = newResponse.body.toString() + '<script type="text/javascript">setInterval(function(){window.location.href = "'+url+'"},30000);</script>';
            }catch(e){
                console.log(e)
            }
        }

        if(/s\?__biz=/i.test(requestDetail.url)){
            try{
                if(!articleUrl){
                    //return null;
                }
                var newResponse = responseDetail.response;
                var reg = /<strong class=\"profile_nickname\">(.*?)<\/strong>/;
                var ret = reg.exec(newResponse.body.toString());
                var nonce = 0;
                var reg = /<script nonce=\"(.*?)\"/;
                var ret = reg.exec(newResponse.body.toString());
                if (ret) {
                    nonce = ret[1];
                }
                //newResponse.body = newResponse.body.toString() + '<script nonce="'+ nonce +'" type="text/javascript">setInterval(function(){window.location.href = "'+url+'"},30000);</script>';
                newResponse.body = newResponse.body.toString() + '<script nonce="'+ nonce +'" type="text/javascript">setInterval(function(){window.location.reload()},30000);</script>';
            }catch(e){
                console.log(e)
            }
        }
        
        if(/mp\/getappmsgext\?f=json/i.test(requestDetail.url)){
            var log = '';
            var myDate = new Date();
            var now = Date.now() + ' ' + myDate.toLocaleDateString() + ' ' + myDate.toLocaleTimeString();
            log += now + ' ' + requestDetail.url + '\r\n';
            log += responseDetail.response.body.toString() + '\r\n\r\n';
            var request = querystring.parse(querystring.unescape(requestDetail.requestData.toString()));
            var filePath = path_readNumlog + '/' + request['title'];

            fs.appendFile(filePath, log, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });        
        }   
        return null;
  },
};