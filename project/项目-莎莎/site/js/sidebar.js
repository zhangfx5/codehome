function sidebarInit(){
	Sidebar.init().mouseover().mouseleave().scroll().click();  //侧边栏
}
var Sidebar = { 
	init : function(){
		return this;
	},
	mouseover : function (){
		Common.changeTwoCss({  //普通 
			conttEle : $(".sidebar_account_btn").not(":last"), 
			beingEle : $(".sidebarbj"), 
			move : "mouseover",
			conttEleNew : {"backgroundColor":'#EC3E7D'} , 
			beingEleNew : {opacity: "1",left: "-89px"} , 
		})
		Common.changeTwoCss({  //二维码 
			conttEle : $(".sidebar_account_btn2"), 
			beingEle : $(".sidebarbj2"), 
			move : "mouseenter",
			conttEleNew : {"backgroundColor":'#EC3E7D'} , 
			beingEleNew : {opacity: "1",left: "-140px"} , 
		})
		$(".sidebar_account_btn:last").mouseover(function(){
			$(this).css("backgroundColor","#EC3E7D")
		})
		$(".sidebar_shopcart").mouseover(function(){
			$(this).css("backgroundColor","#EC3E7D")
		})
		return this;
	},
	mouseleave : function(){
		Common.changeTwoCss({  //普通
			conttEle : $(".sidebar_account_btn").not(":last"), 
			beingEle : $(".sidebarbj"), 
			move : "mouseleave",
			conttEleNew : {"backgroundColor":''} , 
			beingEleNew : {opacity: "0",left: "-169px"} , 
			state2 : "none"
		})
		Common.changeTwoCss({  //二维码
			conttEle : $(".sidebar_account_btn2"), 
			beingEle : $(".sidebarbj2"), 
			move : "mouseleave",
			conttEleNew : {"backgroundColor":''} , 
			beingEleNew : {opacity: "0",left: "-220px"} , 
			state2 : "none"
		})
		$(".sidebar_account_btn:last").mouseout(function(){
			console.log(123)
			$(this).css("backgroundColor","")
		})
		$(".sidebar_shopcart").mouseout(function(){
			$(this).css("backgroundColor","")
		})
		return this ;
	},
	scroll : function(){
		$(window).scroll(function(){
			if($(document).scrollTop() > 0 ){
				$(".sidebar_account_btn:last").css("display","block");
			}else{
				$(".sidebar_account_btn:last").css("display","none");
			}
		})
	return this ;
	},
	click : function(){
		$(".sidebar_account_btn:last").click(function(){
			$("body,html").animate({scrollTop:0},600)
		})
	}
}
