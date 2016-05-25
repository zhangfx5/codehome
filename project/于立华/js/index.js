$(function(){
	//手机优购滑过时显示buy_hidebox
	$("#mobile_buy").bind({
		"mouseover":function(){
			$(this).css("background","#fff");
			$(".buy_hidebox").css("display","block");
		},
		"mouseout":function(){
			$(this).css("background","");
			$(".buy_hidebox").css("display","");
		}
	})

	
	//1、轮播图
	var page = 1;
	var t;
	var _order = $("#banner_order>li");
	t = setInterval(move,3000);
	function move(){
		page++;
		if(page>8){
			page = 1;
		}
		$("#banner>img").attr("src","../img/banner"+page+".jpg");
		_order.eq(page-1).siblings().removeClass("active");
		_order.eq(page-1).addClass("active");
//		$("#banner>img").eq(page-1).siblings().fadeOut(200,function(){
//			$("#banner>img").eq(page-1).fadeIn(200);
//		})
	}
	_order.bind({"mouseover":function(){
		clearInterval(t);
		$("#banner>img").attr("src","../img/banner"+($(this).index()+1)+".jpg");
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
	},
	"mouseout":function(){
		t = setInterval(move,3000); 
		$(this).removeClass("active");
	}})
	
	//2、滚动（logo小图）
	var num = 0;
	$("#prePage").click(function(){
		num--;
		if(num<0){
			num = 2;
		}
//		console.log(num);
//		console.log($("#AList").css("left"));
		$("#AList").animate({
			"left":-1175*num + "px"
		},500)
	})
//	console.log($("#nextPage")) //注意定位后z-index
	$("#nextPage").click(function(){
		num++;
		if(num>2){
			num = 0;
		}
		$("#AList").animate({
			"left":-1175*num + "px"
		},500)
	})
	
//	moveAttr($("#prePage"),$("#nextPage"),$("#AList"),"left",500)
//	function moveAttr(pre,next,obj,attr,speed){
//		var num = 0;
//		pre.click(function(){
//			num--;
//			if(num<-2){
//				num = 0;
//			}
////			console.log((obj.parent(".tab_outer").outerWidth())*num)
//			obj.animate({
//				attr:(obj.parent().outerWidth())*num + "px"
//			},speed)
//		})
//		next.click(function(){
//			num++;
//			if(num>2){
//				num = 0;
//			}
//			obj.animate({
//				attr:-(obj.parent().outerWidth())*num + "px" 
//			},speed)
//		})
//	}
	
	//3、tab切换
	$("#tab_list>ul>li").mouseover(function(){
		index = $(this).index();
		$(this).css({"background":"#000","color":"#fff"}).siblings().css({"background":"","color":""});
		$("#tab_content>div").eq(index).siblings().css("display","none");
		$("#tab_content>div").eq(index).css("display","block");
	})
	
	//4、跳转楼层（判断高度大于某值使其固定）
	var _top = $("#content_nav").offset().top;
	var _top2 = $("#content_nav").outerHeight();
//	console.log(_top);//203px
//	console.log($(window))
	$(window).scroll(function(){
		var nowTop = $(window).scrollTop();
//		console.log(nowTop);
		if(nowTop>_top){
			$("#top").css({
				"position":"fixed",
				"top":_top2
			});
		}else{
			$("#top").css({
				"position":"absolute",
				"top":_top
			});
		}
	})
		
	//点击top回到顶部
	$("#top>ul>li").eq(10).click(function(){
		$(window).scrollTop(0);
	})
	//点击各个li找到对应div并获取其高度
	$("#top>ul>.jump").click(function(){
		var arr = ($(this).children(0).attr("href")).split("#");
		var ID = arr[1];
//		console.log(ID);
//		console.log($("#"+ID));
//		console.log($("#"+ID).offset().top);
		$(window).scrollTop($("#"+ID).offset().top);
	})
	
	
	
	
	//4、http://www.yougou.com/ssc/suggest.sc?term=a
	
	
	
	//5、跳转后显示用户名
	if(getCookie("flag")){
		$("#cookieUser").text("您好!"+ getCookie("_username"));
		$("#cookieUser").css("color","#333");
		$("#cookieUser").attr("href","");
		$("#quit").text("退出");
		$("#quit").attr("href","");
		$("#quit").css("color","#333");
	}else{
		$("#cookieUser").text("登录");
		$("#quit").text("注册");
		$("#cookieUser").css("color","");
		$("#quit").css("color","");
		$("#cookieUser").attr("href","login.html");
		$("#quit").attr("href","regist.html");
	}
	//点击退出后删除cookei
	$("#quit").click(function(){
		setCookie("_username","",-1);
		setCookie("_password","",-1);
		setCookie("flag","",-1);
		$("#cookieUser").text("登录");
		$("#quit").text("注册");
		$("#cookieUser").css("color","");
		$("#quit").css("color","");
//		$("#cookieUser").attr("href","login.html");
//		$("#quit").attr("href","regist.html");
	})
	



})








































































