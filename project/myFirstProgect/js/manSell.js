var init=function()
{
	goodListInfo.init().create();
	selectGoodsBtn.init().create();
}
var goodListInfo={
	goodListDiv:null,
	init:function()
	{
		goodListDiv=$("#GoodsList");
		return this;
	},
	create:function()
	{
		if(getCookie1("WOMAOrMASelect")=="MA")
		{
			$(manBtn).addClass("select");
			var hrt=new XMLHttpRequest();
			hrt.open("get","manStyleList.html",false);
			hrt.onreadystatechange=function()
			{
				var str=hrt.responseText;
				goodListDiv.html(str);
			}
			hrt.send(null);
		}
		else if(getCookie1("WOMAOrMASelect")=="WOMA")
		{
			$(womanBtn).addClass("select");
			var hrt=new XMLHttpRequest();
			hrt.open("get","womanStyleList.html",false);
			hrt.onreadystatechange=function()
			{
				var str=hrt.responseText;
				goodListDiv.html(str);
			}
			hrt.send(null);
		}
	}
}
var selectGoodsBtn={
	manBtn:null,
	womanBtn:null,
	goodListDiv1:null,
	init:function()
	{
		manBtn=$("#manBtn");
		womanBtn=$("#womanBtn");
		goodListDiv1=$("#GoodsList");
		return this;
	},
	create:function()
	{
		manBtn.on("click",function()
		{
			//源生js ajax语句，请求本地网页
			var hrt=new XMLHttpRequest();
			hrt.open("get","manStyleList.html",false);
			hrt.onreadystatechange=function()
			{
				if(hrt.readyState==4&&hrt.status==200)
				{
					var str=hrt.responseText;
					goodListDiv1.html(str);
				}
			}
			hrt.send(null);
		});
		womanBtn.on("click",function()
		{
			//源生js ajax语句，请求本地网页
			var hrt=new XMLHttpRequest();
			hrt.open("get","womanStyleList.html",false);
			hrt.onreadystatechange=function()
			{
				if(hrt.readyState==4&&hrt.status==200)
				{
					var str=hrt.responseText;
					goodListDiv1.html(str);
				}
			}
			hrt.send(null);
		});
		$("#selectGoodsStyle li a").on("click",function()
		{
			//去掉所有selectGoodsStyle下的所有 a class名
			$("#selectGoodsStyle li a").removeClass("select");
			//给点击的添加class名
			$(this).addClass("select");
		})
	}
}

