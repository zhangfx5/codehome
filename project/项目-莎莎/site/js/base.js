function baseInit(){
	Topbar.init().mouseover().mouseout().loginState() //状态栏
	ShopCar.appear().hide()//购物车
}

var Topbar = {
	init : function(){
		return this ;
	},
	mouseover : function(){
		Common.changeTwoCss({  //我的账户 
			conttEle : $(".topbar_rig_bo:first"), 
			beingEle : $(".topbar_rig_con:first"), 
			move : "mouseenter",
			beingTime : 200,
			conttEleNew : {background:"#fff"} , 
			beingEleNew : {height: "135px"} , 
		})
		Common.changeTwoCss({  //关注我们 
			conttEle : $(".topbar_rig_bo:last"), 
			beingEle : $(".topbar_rig_con:last"), 
			move : "mouseenter",
			beingTime : 200,
			conttEleNew : {background:"#fff"} , 
			beingEleNew : {height: "105px"} , 
		})
		var btn = $('.topbar_rig_con:last').find(".topbar_rig_con_li").not(":first") ;
		btn.each(function(i){
			$(this).mouseover(function(){
				$('.topbar_rig_con:last').css("overflow","visible")
				$(".topbar_rig_flo img").attr({"src":'img/pic/er'+ (i+1) + '.jpg'})
			})
		})
		return this ;
	},
	mouseout : function (){
		Common.changeTwoCss({  //我的账户
			conttEle : $(".topbar_rig_bo:first"), 
			beingEle : $(".topbar_rig_con:first"), 
			move : "mouseleave",
			conttEleNew : {background:""} , 
			beingEleNew : {height: "0"} , 
			state2 : "none"
		})
		Common.changeTwoCss({  //关注我们
			conttEle : $(".topbar_rig_bo:last"), 
			beingEle : $(".topbar_rig_con:last"), 
			move : "mouseleave",
			conttEleNew : {background:""} , 
			beingEleNew : {height: "0"} , 
			state2 : "none"
		})
		$(".topbar_rig_con:first").mouseleave(function(){
			$(this).animate({height: "0"},500)
		})
		$(".topbar_rig_con:last").mouseleave(function(){
			$(this).animate({height: "0"},500)
		})
		var btn = $('.topbar_rig_con:last').find(".topbar_rig_con_li").not(":first") ;
		btn.each(function(i){
			$(this).mouseout(function(){
				$('.topbar_rig_con:last').css("overflow","hidden")
			})
		})
	return this;
	},
	// 通过cookie判断是否处于登陆状态，若是，Topbar.login()
	loginState : function(){
		var userState = Common.getCookie("userState") ;
		if(userState == "ture"){
		console.log(userState)
			Topbar.login()
		} 
	return this ;
	},
	//用户处于登陆状态时，改变顶部状态栏
	login : function(){
		var cookie = eval(Common.getCookie("userNow"))[0]
		$(".topbar_box_sp").text("您好 ! "+ cookie.userName)
		$("#topbar_left>a").remove()
		$(".topbar_left_sp").text("积分：" + cookie.integral)
		$(".topbar_left_sp").css({"color":"#CB997B","margin":"0 5px","font-weight":"900"})
		$(".topbar_left_sp").after("<a href='index.html' style='color:#EC3E7D;' class='userquit'>退出</a>")
		$(".userquit").click(function(){
			document.cookie = "userState = false" ;
			
		})
	}
}
//购物车
var ShopCar = {
	appear : function (){
		$(".shopCat_a span").mouseover(function(){
			$(".shopcatzz").css("display","block")
		})
	return this;
	},
	hide : function(){
		$(".shopCat_a span").mouseout(function(e){
			e = e || event ;
			if(Common.inside(e,$(".shopcatzz"))){
			
			}else{
				$(".shopcatzz").css("display","none")
			}
		})
		$(".shopcatzz").mouseleave(function(){
			console.log(999)
			$(".shopcatzz").css("display","none")
		})
		$(".sidebar_shopcart").click(function(){
			window.location.href="shopcar.html"
		})
	}
	
}
