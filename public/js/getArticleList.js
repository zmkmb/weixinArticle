function xhr(option) {
	var type = option.type.toUperCase || 'GET';
	var url = option.url;
	var data = option.data;
	var postData = '';
	var cb = option.success;
	var xhr;

	if(type == 'POST'){
		for(key in option.data){
			postData += (key+'='+option.data+'&'); 
		}
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	}	
	xhr = new XMLHttpRequest();
	xhr.open(type,url,true);
	xhr.send(postData);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			cb(xhr.responseText);
		}
	}
}

var url = 'https://mp.weixin.qq.com/mp/profile_ext?action=getmsg&__biz=MjM5MDk2MDUwMQ==&f=json&offset=10&count=10&is_ok=1&scene=124&uin=MjI2Nzk1ODUyNw%3D%3D&key=&pass_ticket=AwrZ0S7nVGgeLQM2PizHhOIh6vKgdUAznIR9vxTZH0l3tTPg9vE0O7dZmG0AOjXJ&wxtoken=&appmsg_token=957_9PU5J5BES0CtE3XasSwTT3jYxH_WKieQovX33w~~&x5=0&f=json';

var baseUrl = 'https://mp.weixin.qq.com/mp/profile_ext?action=getmsg&f=json&x5=0';
var parameter = ['__biz','is_ok','uin','appmsg_token'];
parameter.forEach(function(item){
	if(window[item]){
		baseUrl += ('&' + item + '=' + window[item]);
	}
})


xhr({type:'get',url:baseUrl,success:function(data){
	if(typeof(data) == 'String'){
		jsonStr = data.replace(/\\/g,'')
		jsonStr = jsonStr.replace(/"{/g,'{')
		jsonStr = jsonStr.replace(/}"/g,'}')
	}
}})