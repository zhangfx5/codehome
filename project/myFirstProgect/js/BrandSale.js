var init = function() {
	mainStyle1.init().create();
	addOnclick.init().create();
}
var mainStyle1 = {
	mainStyle1Div: null,
	mainStyle1Btns: null,
	init: function() {
		mainStyle1Div = $(".mainStyle1");
		mainStyle1Btns = $(".mainStyleTopBtns");
		return this;
	},
	create: function() {
		var e;
		mainStyle1Div.hover(function() {
			//让其border变为红色
				$(this).css("border-color", "red");
				$(this).addClass("box-shadow-6");
				//记录当前对象
				var that = this;
				//设置延迟时间，一秒后显示mainStyleTopBtns
				e = setTimeout(function() {
					$(that).children(".mainStyleTopBtns").css("display", "block");
				}, 1000);
			},
			function() {
				//移出是关闭定时器，恢复原状
				clearTimeout(e);
				$(this).removeClass("box-shadow-6");
				$(this).css("border-color", "#999");
				$(this).children(".mainStyleTopBtns").css("display", "none");
			});
	}
}
var addOnclick={
	main1Goods:null,
	main2Goods:null,
	init:function()
	{
		main1Goods=$("#main1 .mainStyle1");
		main2Goods=$("#main2 .mainStyle1");
		return this;
	},
	create:function()
	{
		var d=new Date();
		d.setDate(d.getDate()+3);
		main1Goods.on("click",function()
		{
			//数据库存放的时候也是有规律的，商品的id是根据相应模块对应字符拼接index值取到
			//记住当前下标
			var index=$(this).index();
			//创建cookie detailId 记录商品的id
			document.cookie="detailId=SPESEL1"+(index-1)+";expires="+d;
			window.location.href="detail.html";
		});
		main2Goods.on("click",function()
		{
			//同理
			var index=$(this).index();
			document.cookie="detailId=SPESEL2"+(index-1)+";expires="+d;
			window.location.href="detail.html";
		});
	}
}
