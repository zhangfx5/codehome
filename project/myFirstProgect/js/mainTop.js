var init = function() {
	mainStyle1.init().create();
	DivLeftFix.init().create();
	Main2Onclick.init().create();
	bannerChange.init().create();
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
				$(this).css("border-color", "red");
				$(this).addClass("box-shadow-6");
				var that = this;
				e = setTimeout(function() {
					$(that).children(".mainStyleTopBtns").css("display", "block");
				}, 1000);
			},
			function() {
				clearTimeout(e);
				$(this).css("border-color", "#999");
				$(this).children(".mainStyleTopBtns").css("display", "none");
				$(this).removeClass("box-shadow-6");
			});
	}
}
var DivLeftFix={
	fixDivLeft:null,
	fixDivLeftLis:null,
	fixDivLeftArr:null,
	init:function()
	{
		fixDivLeft=$("#fixDivLeft");
		fixDivLeftLis=$("#fixDivLeft li");
		//文字数组
		fixDivLeftArr=["返回首页","热卖商品","精品女装","品质男装","精品鞋靴","家居家纺","美食特产","返回顶部"];
		//图像数组
		fixDivLeftArr1=["<img src='img/leftDivFixpic1.jpg'>","<img src='img/leftDivFixpic2.jpg'>","<img src='img/leftDivFixpic3.jpg'>","<img src='img/leftDivFixpic4.jpg'>","<img src='img/leftDivFixpic5.jpg'>","<img src='img/leftDivFixpic6.jpg'>","<img src='img/leftDivFixpic7.jpg'>","<img src='img/leftDivFixpic8.jpg'>"];
		return this;
	},
	create:function()
	{
		fixDivLeftLis.hover(function()
		{
			var index=$(this).index();
			//填写相应下标的文字数组里的文字
			$(this).html(fixDivLeftArr[index]);
		},
		function()
		{
			var index=$(this).index();
			//填写相应下标的图像数组里的图像
			$(this).html(fixDivLeftArr1[index]);
		});
		fixDivLeftLis.first().on("click",function()
		{
			window.location.href="index.html";
		});
		fixDivLeftLis.eq(1).on("click",function()
		{
			$('html,body').stop().animate({scrollTop: '470px'}, 1000);
			//document.body.scrollTop = document.documentElement.scrollTop = 470;
		});
		fixDivLeftLis.eq(2).on("click",function()
		{
			$('html,body').stop().animate({scrollTop: '1783px'}, 1000);
			//document.body.scrollTop = document.documentElement.scrollTop = 1783;
		});
		fixDivLeftLis.eq(3).on("click",function()
		{
			$('html,body').stop().animate({scrollTop: '3104px'}, 1000);
			//document.body.scrollTop = document.documentElement.scrollTop = 3104;
		});
		fixDivLeftLis.eq(4).on("click",function()
		{
			$('html,body').stop().animate({scrollTop: '4425px'}, 1000);
			//document.body.scrollTop = document.documentElement.scrollTop = 4425;
		});
		fixDivLeftLis.eq(5).on("click",function()
		{
			$('html,body').stop().animate({scrollTop: '5746px'}, 1000);
			//document.body.scrollTop = document.documentElement.scrollTop = 5746;
		});
		fixDivLeftLis.eq(6).on("click",function()
		{
			$('html,body').stop().animate({scrollTop: '7067px'}, 1000);
			///document.body.scrollTop = document.documentElement.scrollTop = 7067;
		});
		fixDivLeftLis.last().on("click",function()
		{
			$('html,body').stop().animate({scrollTop: '0px'}, 1000);
			//document.body.scrollTop = document.documentElement.scrollTop = 0;
		});
	}
} 
var Main2Onclick={
	main2Goods:null,
	init:function()
	{
		main2Goods=$("#main2 .mainStyle1");
		return this;
	},
	create:function()
	{
		main2Goods.on("click",function(){
			//点击相应商品，进入详情页，并且创建详情页识别的detailId
			var str="S2"+$("#main2 .main2Bot2 .mainStyle1").index($(this));
			var d = new Date();
			d.setDate(d.getDate()+3);
			document.cookie="detailId="+str+"; expires="+d;
			window.location.href="detail.html"; 
		});
		$("#border").on("mouseover",function()
		{
			$(".bannerLeftRightBtn").stop().fadeIn(1000);
		});
		$("#border").on("mouseout",function()
		{
			$(".bannerLeftRightBtn").stop().fadeOut(1000);
		});
	}
}
var bannerChange={
	bannerLong:null,
	bannerBtns:null,
	init:function()
	{
		bannerLong=$(".borderLong");
		bannerBtns=$("#border ul li");
		return this;
	},
	create:function()
	{
		bannerBtns.eq(0).addClass("box-shadow-7");
		bannerBtns.eq(0).css({"background":"#fff","color":"#000"});
		var i=0;
		var e;
		function play()
		{
			i++;
			if(i==5)
			{
				bannerBtns.eq(0).addClass("box-shadow-7");
				bannerBtns.eq(0).css({"background":"#fff","color":"#000"});
				bannerBtns.eq(0).siblings().css({"background":"rgba(0,0,0,0.5)","color":"#fff"});
				bannerBtns.eq(0).siblings().removeClass("box-shadow-7");
				
			}
			if(i==6)
			{
				i=1;
				bannerLong.animate({"left":"0px"},0);
				bannerLong.stop().animate({"left":"-1000px"},1000);
				bannerBtns.eq(i).css({"background":"#fff","color":"#000"});
				bannerBtns.eq(i).addClass("box-shadow-7");
				bannerBtns.eq(i).siblings().css({"background":"rgba(0,0,0,0.5)","color":"#fff"});
				bannerBtns.eq(i).siblings().removeClass("box-shadow-7");
			}
			else
			{
				bannerLong.stop().animate({"left":-1000*i+"px"},1000);
				bannerBtns.eq(i).css({"background":"#fff","color":"#000"});
				bannerBtns.eq(i).addClass("box-shadow-7");
				bannerBtns.eq(i).siblings().css({"background":"rgba(0,0,0,0.5)","color":"#fff"});
				bannerBtns.eq(i).siblings().removeClass("box-shadow-7");
			}
		}
		function changePic()
		{
			bannerLong.stop().animate({"left":-1000*i+"px"},0);
		}
		e=setInterval(function()
		{
			play();
		},2000);
		bannerBtns.on("click",function()
		{
			//alert($(this).index());
			clearInterval(e);
			i=$(this).index();
			bannerBtns.eq(i).css({"background":"#fff","color":"#000"});
			bannerBtns.eq(i).addClass("box-shadow-7");
			bannerBtns.eq(i).siblings().css({"background":"rgba(0,0,0,0.5)","color":"#fff"});
			bannerBtns.eq(i).siblings().removeClass("box-shadow-7");
			changePic();
			e=setInterval(function()
			{
				play();
			},2000);
		});
		$(".bannerLeftBtn").on("click",function()
		{
			clearInterval(e);
			i--;
			
			if(i==0)
			{
				i=5;
					bannerLong.stop().animate({"left":"0px"},1000);
				bannerLong.stop().animate({"left":-1000*i+"px"},1000);
			
				bannerBtns.eq(0).css({"background":"#fff","color":"#000"});
				bannerBtns.eq(0).addClass("box-shadow-7");
				bannerBtns.eq(0).siblings().css({"background":"rgba(0,0,0,0.5)","color":"#fff"});
				bannerBtns.eq(0).siblings().removeClass("box-shadow-7");
				e=setInterval(function()
				{
					play();
				},2000);
			}
			else
			{
				bannerLong.stop().animate({"left":-1000*i+"px"},1000);
				bannerBtns.eq(i).css({"background":"#fff","color":"#000"});
				bannerBtns.eq(i).addClass("box-shadow-7");
				bannerBtns.eq(i).siblings().css({"background":"rgba(0,0,0,0.5)","color":"#fff"});
				bannerBtns.eq(i).siblings().removeClass("box-shadow-7");
				e=setInterval(function()
				{
					play();
				},2000);
			}
		});
		$(".bannerRightBtn").on("click",function()
		{
			clearInterval(e);
			i++;
			if(i==5)
			{
				i=0;
				bannerLong.stop().animate({"left":-1000*i+"px"},1000);
				bannerBtns.eq(i).css({"background":"#fff","color":"#000"});
				bannerBtns.eq(i).addClass("box-shadow-7");
				bannerBtns.eq(i).siblings().css({"background":"rgba(0,0,0,0.5)","color":"#fff"});
				bannerBtns.eq(i).siblings().removeClass("box-shadow-7");
				e=setInterval(function()
				{
					play();
				},2000);
			}
			else
			{
				bannerLong.stop().animate({"left":-1000*i+"px"},1000);
				bannerBtns.eq(i).css({"background":"#fff","color":"#000"});
				bannerBtns.eq(i).addClass("box-shadow-7");
				bannerBtns.eq(i).siblings().css({"background":"rgba(0,0,0,0.5)","color":"#fff"});
				bannerBtns.eq(i).siblings().removeClass("box-shadow-7");
				e=setInterval(function()
				{
					play();
				},2000);
			}
		});
	}
}












