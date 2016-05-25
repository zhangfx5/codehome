$(function(){
	//1、三级菜单
//	var flag;
	$("#goods_category").mouseover(function(){
		$(".second_menu").css("display","block");
	})
	
	$(".second_menu").hover(function(){
//		flag = true;
		$(this).css("display","block");
	},function(){
//		flag = false;
		$(this).css("display","none");
	})
	
//	$("#goods_category").mouseout(function(){
//		if(flag){
//			console.log(0)
//			$(".second_menu").css("display","block");
//		}else{
//			console.log(9)
//			$(".second_menu").css("display","none");
//		}
//	})
	
	//2、放大镜
	bigMirror($("#smImg"),$("#drag"),$("#bigImg"));
//	$("#tab_mn li").mouseover(function(e){
//		var e = e || event;
//		e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
//		smDiv.attr("src","../img/tebu_sm0"+($(this).index()+1)+".jpg");
//		bigDiv.attr("src","../tebu_bg0"+($(this).index()+1)+".jpg");
//	})
	$("#tab_mn li").hover(function(){
		$(this).siblings().removeClass("act_border");
		$(this).addClass("act_border");
		$("#smImg img").attr("src","../img/tebu_sm0"+($(this).index()+1)+".jpg");
		if($(this).index()==0){
			$("#bigImg img").attr("src","../img/tebu_bg01.jpg")
		}else{
			$("#bigImg img").attr("src","../img/tebu_sm0"+($(this).index()+1)+".jpg");
		}
	})
	function bigMirror(smDiv,drag,bigDiv,obj){
		smDiv.bind({
			"mouseover":function(){
				drag.css("display","block");
				bigDiv.css("display","block");
			},
			"mousemove":function(e){
				var event = e||window.event;
				var oLeft = event.pageX-(drag.outerWidth()/2);
				var oTop = event.pageY-(drag.outerHeight()/2);
				var smPicLeft = smDiv.offset().left;
				var smPicTop = smDiv.offset().top;
				var nowLeft = oLeft - smPicLeft;
				var nowTop = oTop - smPicTop;
//				console.log(nowLeft)
				if(nowLeft<=0){
					nowLeft = 0;
				}else if(nowLeft>=(smDiv.outerWidth()-drag.outerWidth())){
					nowLeft = smDiv.outerWidth()-drag.outerWidth();
				}
				if(nowTop<=0){
					nowTop = 0;
				}else if(nowTop>=(smDiv.outerHeight()-drag.outerHeight())){
					nowTop = smDiv.outerHeight()-drag.outerHeight();
				}
				drag.css({"left":nowLeft,"top":nowTop});
				bigDiv.children(0).css({"left":(-nowLeft*3)/2,"top":(-nowTop*3)/2});
			}
			,
			"mouseout":function(){
				drag.css("display","none");
				bigDiv.css("display","none");
			}
		})
	}
	
	//3.图片滚动
	//(1)右侧上下滚动
	var num = 0;
	$(".preTop").click(function(){
//		$(".virticle_ul").prepend($(".lastLI"));
		$(".virticle_ul").append($(".firstLI"));
		num--;
		if(num<0){
			num = 5;
		}
		$(".tab_virticle>ul").animate({
			"top":-480*num + "px"
		},800)
		
	})
	$(".nextDown").click(function(){
//		$(".virticle_ul").append($(".firstLI"));
		$(".virticle_ul").prepend($(".lastLI"));
		num++;
		if(num>5){
			num = 0;
		}
		$(".tab_virticle>ul").animate({
			"top":-480*num + "px"
		},800)
	})
	//(2)左右滚动
	var num_02 = 0;
	$("#prePage").click(function(){
		
		num_02--;
		if(num_02<0){
			num_02 = 3;
		}
//		console.log($("#tab_recommend"));
		$("#tab_recommend").animate({
			"left":-1116*num_02 +"px"
		},500)
	})
//	console.log($("#nextPage")) //注意定位后z-index
	$("#nextPage").click(function(){
		num_02++;
		if(num_02>3){
			num_02 = 0;
		}
		$("#tab_recommend").animate({
			"left":-1116*num_02 + "px"
		},500)
	})
	
	//4、商品详情悬浮框
	var _top = $(".details_nav").offset().top;
	$(window).scroll(function(){
		var nowTop = $(window).scrollTop();
		if(nowTop>_top){
			$(".details_nav").css({
				"position":"fixed",
				"top":"0"
			});
			$(".details_nav").offset().top = "0";
		}else{
			$(".details_nav").css({
				"position":"",
				"top":""
			});
		}
	})
	
	$(".details_nav>div").click(function(){
		$(this).addClass("bg_red").siblings().removeClass("bg_red");
		$(".block_none").eq($(this).index()).css("display","block");
		$(".block_none").eq($(this).index()).siblings(".block_none").css("display","none");
//		$(window).scrollTop() = $(".details_nav").offset().top;
		$(window).scrollTop($(".details_nav").offset().top);
		//scrollTop()方法，无参数时获取第一段相对滚动条顶部的偏移；有参数val时，设定垂直滚动条值！！！！！！！！！！！
	})
	
	//5、底部导航
	$("#botBuyNav").click(function(){
		$(this).css("display","none");
		$("#buy_off").css("display","block");
	})
	
	$("#buy_off").click(function(){
		$(this).css("display","none");
		$("#botBuyNav").css("display","block");
	})
	
	
//	console.log($(document.body).height());
//	console.log($(window).height());//浏览器窗口高度
	$(window).scroll(function(){
		if($(window).scrollTop()>$(window).height()){
			$("#up").css("display","block");
			$("#up").click(function(){
//				console.log($(window).scrollTop());
				$(window).scrollTop(0);
			})
		}else{
			$("#up").css("display","none");
		}
	})
	
	
	
	
	
	
})











































































