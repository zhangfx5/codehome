$(function(){
	//1、三级菜单
	$("#goods_category").mouseover(function(){
		$(".second_menu").css("display","block");
	})
	
	$(".second_menu").hover(function(){
		$(this).css("display","block");
	},function(){
		$(this).css("display","none");
	})
	
	//2、滚动
	var num_02 = 0;
	$("#prePage").click(function(){
		
		num_02--;
		if(num_02<0){
			num_02 = 3;
		}
		$("#tab_recommend").animate({
			"left":-1116*num_02 +"px"
		},500)
	})
	$("#nextPage").click(function(){
		num_02++;
		if(num_02>3){
			num_02 = 0;
		}
		$("#tab_recommend").animate({
			"left":-1116*num_02 + "px"
		},500)
	})
	
	
	//3、tab切换(自动切换，不同时)
	function moveLay(obj){
		var num = 0;
		var t = setInterval(function(){
			num++;
			if(num>5){
				num = 0;
			}
//			console.log(obj.children(0).children(1).find("li"));
//			console.log(obj.children(1).children("div"));
			obj.children(0).children(1).find("li").removeClass("active_black");
			obj.children(0).children(1).find("li").eq(num).addClass("active_black");
			obj.children(1).children("div").removeClass("act_block");
			obj.children(1).children("div").eq(num).addClass("act_block");
		},2000);
		obj.children(0).children(1).find("li").bind({
			"mouseover":function(){
				clearInterval(t);
				$(this).addClass("active_black");
				$(this).siblings().removeClass("active_black");
				$(this).parent().parent().next().children("div").removeClass("act_block");
				$(this).parent().parent().next().children("div").eq($(this).index()).addClass("act_block");
			},
			"mouseout":function(){
				t = setInterval(function(){
					num++;
					if(num>5){
						num = 0;
					}
		//			console.log(obj.children(0).children(1).find("li"));
		//			console.log(obj.children(1).children("div"));
					obj.children(0).children(1).find("li").removeClass("active_black");
					obj.children(0).children(1).find("li").eq(num).addClass("active_black");
					obj.children(1).children("div").removeClass("act_block");
					obj.children(1).children("div").eq(num).addClass("act_block");
				},2000);
			}
		})
	}
	
	moveLay($("#model_01"));
	
	setTimeout(function(){
		moveLay($("#model_02"));
	},2000)
	
	setTimeout(function(){
		moveLay($("#model_03"));
	},3000)
	
	setTimeout(function(){
		moveLay($("#model_04"));
	},4000)
	

//	var t = setInterval(function(){
//			num++;
//			if(num>5){
//				num = 0;
//			}
////			console.log(obj.children(0).children(1).find("li"));
////			console.log(obj.children(1).children("div"));
//			obj.children(0).children(1).find("li").removeClass("active_black");
//			obj.children(0).children(1).find("li").eq(num).addClass("active_black");
//			obj.children(1).children("div").removeClass("act_block");
//			obj.children(1).children("div").eq(num).addClass("act_block");
//		},2000);
	
	
//	obj.children(0).children(1).find("li").bind({
//			"mouseover":function(){
//				clearInterval(t);
//				$(this).addClass("active_black");
//				$(this).siblings().removeClass("active_black");
//				$(this).parent().parent().next().children("div").removeClass("act_block");
//				$(this).parent().parent().next().children("div").eq($(this).index()).addClass("act_block");
//			},
//			"mouseout":function(){
//				moveLay(obj);
//			}
//		})
//	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})





















