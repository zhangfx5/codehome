var init=function()
{
	onloadLeftBtns.init().create();
	onloadRightBtns.init().create();
}
var onloadLeftBtns={
	changeHtmlBtns:null,
	htmlArr:null,
	showDiv:null,
	init:function()
	{
		changeHtmlBtns=$("#main .infoList");
		htmlArr=["personList1.html","personList2.html","personList3.html","personList4.html","personList5.html","personList6.html","personList7.html","personList8.html","personList9.html","personList10.html","personList11.html","personList12.html","personList13.html"];
		showDiv=$(".mainRight");
		return this;
	},
	create:function()
	{
		//设置初始显示页面
		$("#main .infoList").eq(9).css("color","red");
		var index=$("#main .infoList").index($(this));
		var htr=new XMLHttpRequest();
		htr.open("get","personList10.html",false);
		htr.onreadystatechange=function()
		{
			showDiv.html(htr.responseText);
		};
		htr.send(null);
		changeHtmlBtns.on("click",function()
		{
			//铜鼓源生ajax请求网页数据，放进右侧div中
			var index=$("#main .infoList").index($(this));
			var htr=new XMLHttpRequest();
			htr.open("get",htmlArr[index],false);
			htr.onreadystatechange=function()
			{
				if(htr.readyState==4&&htr.status==200)
				{
					showDiv.html(htr.responseText);
				}
			};
			htr.send(null);
		});
		//点击按钮改变对应文字颜色
		$("#main .infoList").on("click",function()
		{
			$("#main .infoList").css("color","#000");
			$(this).css("color","red");
		});
	}
}
var onloadRightBtns={
	init:function()
	{
		return this;
	},
	create:function()
	{
	}
}
