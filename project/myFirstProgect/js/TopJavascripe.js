var init1 = function() {
	Top.init().create();
	Nav.init().create();
}
var Top = {
	topleftLogin: null,
	topRightMy: null,
	topRightFocus: null,
	init: function() {
		topleftLogin = $(".loginList");
		topRightMy = $(".topRightul1");
		topRightFocus = $(".topRightul2");
		return this;
	},
	create: function() {
		var d=new Date();
		d.setDate(d.getDate()+3);
		$("#topLogin").hover(function() {
			topleftLogin.css("display", "block");
		}, function() {
			topleftLogin.css("display", "none");
		});
		$("#topRightMy").hover(function() {
			topRightMy.css("display", "block");
		}, function() {
			topRightMy.css("display", "none");
		});
		$("#topRightFocus").hover(function() {
			topRightFocus.css("display", "block");
		}, function() {
			topRightFocus.css("display", "none");
		});
		$("#nav li").first().on("click",function()
		{
			window.location.href="index.html";
		});
		if(getCookie1("LoginSuccess"))
		{
			var cookieArr=document.cookie.split(";");
			for(var i=0;i<cookieArr.length;i++)
			{
				var smallArr=cookieArr[i].split("=");
				console.info(smallArr);
				console.log(typeof smallArr[0]);
				if(smallArr[0]==" userName")
				{
					$("#changeLogin").html(smallArr[1]+"<a class='exit' style='margin-left:20px'>退出</a>");
				}
				else
				{
				}
			}
		}
		if(getCookie1("shoppingCar"))
		{
			var eal=eval(getCookie1("shoppingCar"));
			console.info(eal);
			var sum=0;
			for(var i=0;i<eal.length;i++)
			{
				sum=sum+parseInt(eal[i].num);
			}
			//计算出购物车显示商品数量
			$("#goodsNumTop").html(sum);
			$("#goodsNumRight").html(sum);
			
		}
		//对右边固定框的我的添加事件
		$("#noChangeDiv ul li").eq(0).on("click",function()
		{
			//如果已经登录，则可以直接进入自己的空间
			if(getCookie1("LoginSuccess")=="'shide'")
			{
				window.location.href="personalSpace.html";
			}
			//如果没登录，则要进入登陆页面
			else
			{
				window.location.href="login.html";
			}
		});
		$("#shoppingCarHref1,#shoppingCarHref2").on("click",function()
		{
			window.location.href="shoppingCar.html";
		});
		
		$("#nav li").eq(5).on("click",function()
		{
			window.location.href="specialOffer.html";
		});
		$("#nav li").eq(2).on("click",function()
		{
			//创建cookieWOMAOrMASelect，会影响manSell页面的初始
			document.cookie="WOMAOrMASelect=WOMA;expires="+d;
			window.location.href="manSell.html";
		});
		$("#nav li").eq(3).on("click",function()
		{
			//创建cookieWOMAOrMASelect，会影响manSell页面的初始
			document.cookie="WOMAOrMASelect=MA;expires="+d;
			window.location.href="manSell.html";
		});
		$("#nav li").eq(4).on("click",function()
		{
			window.location.href="integral.html";
		});
		$("#nav li").eq(1).on("click",function()
		{
			window.location.href="BrandSale.html";
		});
		$("#changeLogin").delegate(".exit","click",function()
		{
			//点击头部的退出按钮，删除cookie LoginSuccess,回到登陆页面
					var d = new Date();
					d.setTime(d.getTime() -24 * 3600 * 1000);
					document.cookie="LoginSuccess=haha;expires="+d;
					alert("退出成功");
					window.location.href="login.html";
		});
		$("#topRightMy p span").eq(0).on("click",function()
		{
			//头部的我的步淘点击事件判断是否登录
			if(getCookie1("LoginSuccess")=="'shide'")
			{
				window.location.href="personalSpace.html";
			}
			//若没登陆，则进入登陆界面
			else
			{
				window.location.href="login.html";
			}
		});
		//实现跨域试用百度搜索的功能
		var oTxt = document.getElementById('txt');
		oTxt.onkeyup = function()
		{
			var oScript = document.createElement('script');
			oScript.type = 'text/javascript';
			oScript.src='https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+oTxt.value+'&cb=box';
			document.getElementsByTagName('head')[0].appendChild(oScript);
			document.getElementsByTagName('head')[0].removeChild(oScript);
		}
		$(".fixWindowLi6").on("click",function()
		{
			$('html,body').stop().animate({scrollTop: '0px'}, 1000);
		});
	}
}
var Nav = {
	navInfo: null,
	init: function() {
		navInfo = $("#nav .navInfo");
		console.info(navInfo);
		return this;
	},
	create: function() {
		$("#nav .last").hover(function() {
			navInfo.css("display", "block");
		}, function() {
			navInfo.css("display", "none");
		});
		$(".topLeft li:eq(2) span").on("click",function()
		{
			window.location.href="register.html";
		});
		$(".topRight li:eq(0) a").css("margin-right","20px");
	}
}
