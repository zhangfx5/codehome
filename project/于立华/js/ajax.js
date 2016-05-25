//function ajax(method,url,type,fn){
//	if(XMLHttpRequest){
//		var xhr = new XMLHttpRequest();
//	}else{
//		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
//	}
//	xhr.open(method,url,type);
//	xhr.send(null);
//	xhr.onload = function(){
//		fn(xhr.responseText)
//	};
//}
//ajax("get","json.json",true,function(a){
//	console.log(a);
//})

function ajax(infoJson){
	if(XMLHttpRequest){
		var xhr = new XMLHttpRequest();
	}else{
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var method = infoJson.method||"get";
	var url = infoJson.url;
	var data = infoJson.data||'';
	var type = infoJson.type||true;
	if(method=="get"){
		xhr.open(method,url+"?"+data+"&r="+Math.random(),type);
		xhr.send(null);
	}else{
		xhr.open(method,url,type);
		xhr.send(data);
	}
	xhr.onload = function(){
		infoJson.fn(xhr.responseText);
	}
}
//	ajax({
//		method:"get",
//		url:"test.php",
//		data:"name=123&pwd=456",
//		type:true,
//		fn:function(a){
//			alert(a);
//		}
//	})