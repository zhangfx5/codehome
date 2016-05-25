$(function(){
	//手机优购滑过时显示buy_hidebox
	$(".mobile_buy").bind({
		"mouseover":function(){
			$(this).css("background","#fff");
			$(".buy_hidebox").css("display","block");
		},
		"mouseout":function(){
			$(this).css("background","");
			$(".buy_hidebox").css("display","");
		}
	})
	
	//购物车结算
	function zj(){
		var zj = 0;
		$(".addModel").each(function(){
			zj += Number($(this).children().eq(5).text());
		})
		return zj;
	}
	
	$(".reduce").click(function(){
		var num = $(this).next().text();
//		console.log(num);
		num--;
		if(num<=1){
			num = 1;
		}
		$(this).next().text(num);
		var  unitPrice = $(this).parent().prev().text();
		$(this).parent().next().find("span").text(num*unitPrice);
		$("#zj").text(zj());
	})
	
	
	$(".add").click(function(){
		var num = $(this).prev().text();
		num++;
		$(this).prev().text(num);
		var  unitPrice = $(this).parent().prev().text();
		$(this).parent().next().find("span").text(num*unitPrice);
		$("#zj").text(zj());
	})
	
	$(".delete").click(function(){
		$(this).parent().parent().remove();
		$("#zj").text(zj());
	})
	
	
	//开关量控制checkbox(i)样式
	var flag = true;//标志所有选框选中状态
	var flag2 = true;//标记是否全选
	function Change(obj){
		if(flag){   //flag为true时代表未选中状态
			$(obj).css({"background":"url(../img/shopCar_checkbox.png) "+"-17px "+"-197px"});
			return flag = false;
		}
		if(flag==false){  //flag为true时代表选中状态
			$(obj).css({"background":"url(../img/shopCar_checkbox.png) "+"-34px "+"-197px"});
			return flag = true;
		}
	}
	
	$(".allCheck>i").click(function(){ //全选
		Change($(this));
		if(flag2){
			$(this).css({"background":"url(../img/shopCar_checkbox.png) "+"-17px "+"-197px"});
			$(".addModel>.picture>i").css({"background":"url(../img/shopCar_checkbox.png) "+"-17px "+"-197px"});
			$(".model_footer .all_check>i").css({"background":"url(../img/shopCar_checkbox.png) "+"-17px "+"-197px"})
			return flag2 = false;
		}
		if(flag2==false){
			$(this).css({"background":"url(../img/shopCar_checkbox.png) "+"-34px "+"-197px"});
			return flag2 = true;
		}
	})
	
	$(".addModel>.picture>i").click(function(){
		Change($(this));
	})
	
	$(".model_footer .all_check>i").click(function(){ //全选
		Change($(this));
	})
	
//	var zj = 0;
//	$(".addModel").each(function(){
////		console.log($(this).children().eq(3).text());
//		zj += Number($(this).children().eq(3).text());
//		
//		//console.log($(this).children().eq(3).text().length);
//
//	})
////  console.log(zj);




	
	
})

















