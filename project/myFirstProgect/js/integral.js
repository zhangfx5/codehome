var init=function()
{
	changeTab.init().create();
}
var changeTab={
	changeTabLis:null,
	changeDiv1:null,
	changeDiv2:null,
	changeDiv3:null,
	changeDiv4:null,
	changeDiv5:null,
	changeDivs:null,
	init:function()
	{
		changeTabLis=$("#integralTop ul li");
		changeDiv1=$("#integralBot1");
		changeDiv2=$("#integralBot2");
		changeDiv3=$("#integralBot3");
		changeDiv4=$("#integralBot4");
		changeDiv5=$("#integralBot5");
		changeDivs=$(".integralBot");
		return this;
	},
	create:function()
	{
		changeDiv1.css("display","block");
		changeTabLis.eq(0).css({"border-bottom":"2px solid red","color":"red"});
		changeTabLis.on("click",function()
		{
			var index=$(this).index();
			$(this).css({"border-bottom":"2px solid red","color":"red"});
			$(this).siblings().css({"border-bottom":"","color":""});
			if(index==0)
			{
				changeDiv1.css("display","block");
				changeDiv2.css("display","none");
				changeDiv3.css("display","none");
				changeDiv4.css("display","none");
				changeDiv5.css("display","none");
			}
			else if(index==1)
			{
				changeDiv2.css("display","block");
				changeDiv1.css("display","none");
				changeDiv3.css("display","none");
				changeDiv4.css("display","none");
				changeDiv5.css("display","none");
			}
			else if(index==2)
			{
				changeDiv3.css("display","block");
				changeDiv2.css("display","none");
				changeDiv1.css("display","none");
				changeDiv4.css("display","none");
				changeDiv5.css("display","none");
			}
			else if(index==3)
			{
				changeDiv4.css("display","block");
				changeDiv2.css("display","none");
				changeDiv3.css("display","none");
				changeDiv1.css("display","none");
				changeDiv5.css("display","none");
			}
			else if(index==4)
			{
				changeDiv5.css("display","block");
				changeDiv2.css("display","none");
				changeDiv3.css("display","none");
				changeDiv4.css("display","none");
				changeDiv1.css("display","none");
			}
		});
		$(".integralBot2RightBotTab1").css("border-left","1px solid #AB1E1E");
		$(".integralBot2RightBotTab1").css("border-top","1px solid #AB1E1E");
		$(".integralBot2RightBotTab1").css("border-right","1px solid #AB1E1E");
		$(".integralBot2RightBotTab1").css("border-bottom","1px solid #ccc");
		$(".integralBot2RightBotTab1").on("click",function()
		{
			$(this).css("border-left","1px solid #AB1E1E");
			$(this).css("border-top","1px solid #AB1E1E");
			$(this).css("border-right","1px solid #AB1E1E");
			$(this).css("border-bottom","1px solid #ccc");
			$(".integralBot2RightBotTab2").css("border-left","");
			$(".integralBot2RightBotTab2").css("border-top","");
			$(".integralBot2RightBotTab2").css("border-right","");
			$(".integralBot2RightBotTab2").css("border-bottom","");
			$(".integralBot2RightBotInfo1").css("display","block");
			$(".integralBot2RightBotInfo2").css("display","none");
		});
		$(".integralBot2RightBotTab2").on("click",function()
		{
			$(this).css("border-left","1px solid #AB1E1E");
			$(this).css("border-top","1px solid #AB1E1E");
			$(this).css("border-right","1px solid #AB1E1E");
			$(this).css("border-bottom","1px solid #ccc");
			$(".integralBot2RightBotTab1").css("border-left","");
			$(".integralBot2RightBotTab1").css("border-top","");
			$(".integralBot2RightBotTab1").css("border-right","");
			$(".integralBot2RightBotTab1").css("border-bottom","");
			$(".integralBot2RightBotInfo2").css("display","block");
			$(".integralBot2RightBotInfo1").css("display","none");
		});
		$(".integralBot1Style").hover(function()
		{
			$(this).css("border-color","red");
			$(this).addClass("box-shadow-6");
		},
		function()
		{
			$(this).css("border-color","#ccc");
			$(this).removeClass("box-shadow-6");
		})
		$(".integralBot1Style").on("click",function()
		{
			changeTabLis.css({"border-bottom":"","color":""});
			changeTabLis.eq(1).css({"border-bottom":"2px solid red","color":"red"});
			changeDiv2.css("display","block");
			changeDiv1.css("display","none");
		});
		$(".integralBot2RightTopBuyBtn").on("click",function()
		{
			var d=new Date();
			d.setDate(d.getDate()+3);
			//更改cookie payPrice的值
			document.cookie="payPrice="+1+";expires="+d;
			window.location.href="onlinePay.html";
		});
	}
}
