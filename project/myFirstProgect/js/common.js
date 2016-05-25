//获取对应cookie值
function getCookie1(key)
{
	var str=document.cookie;
	var list=str.split(";");
	for(var i in list)
	{
		var arr=list[i].split("=");
		if(putBlank1(arr[0])==key)
		{
			return arr[1];
		}
	}
	return null;
}
//去空格，在分号后面存在空格
function putBlank1(str)
{
	return str.replace(/\s+/g,"");
}
//jsonP跨域调用数据库回调函数
function box(str)
{
	var oUl = document.getElementById('list');
	if(str.s.length > 0)
	{
		oUl.style.display = 'block'
		oUl.innerHTML = ''
		for(var i=0; i<str.s.length;i++){
			var oLi = document.createElement('li');
			oLi.innerHTML ='<a href="https://www.baidu.com/s?wd='+str.s[i]+'" target="_blank">'+str.s[i]+'</a>';
		//oLi.innerHTML= '<a href="https://www.baidu.com/s?wd=' + str.s[i] + '" target="_blank">' + str.s[i] + '</a>'
			oUl.appendChild(oLi);
		}	
	}
	else
	{
		oUl.style.display = 'none';
	}
	document.onclick = function()
	{
		oUl.style.display = 'none';
	}	
}




















