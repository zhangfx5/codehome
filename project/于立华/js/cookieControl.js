
function setCookie(attr,value,date){
	var oDate = new Date();
	oDate.setDate(new Date().getDate() + date);
	document.cookie = attr + "=" + value + ";expires=" + oDate;
}

function getCookie(attr){
	var reg = /\s+/g; //正则
	var cookies = document.cookie.replace(reg,""); //去空格
	var cookArr = cookies.split(";");
	for(var i=0;i<cookArr.length;i++){
		var attrArr = cookArr[i].split("=");
		if(attrArr[0]==attr){
			return attrArr[1]; 
		}
	}
}

function removeCookie(name){
	var oDate = new Date();
	oDate.setDate(new Date().getDate() + date);
	document.cookie = attr + "=" + value + ";expires=" + oDate;
}
