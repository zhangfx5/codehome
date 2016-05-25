$(function(){
	
	
	//收货人姓名验证 (请您使用真实姓名，不能全部是数字，不能包含特殊符号（括号、井号等）)
	$("#contacterName").blur(function(){
		var reg = /^[\u4E00-\u9FA5]{1,6}$/;
		if(!(reg.test($(this).val()))){
			$("#tipName>i").css({"display":"block","background":"url(../img/login_regist.png) "+"-318px "+"-33px"});
			$("#tipName").css({"color":"red","fontSize":"12px"});
		}else{
			$("#tipName>i").css({"display":"block","background":"url(../img/login_regist.png) "+"-318px "+"-1px"});
			$("#tipName").css({"color":"#fff","fontSize":""});
//			$("#tipName").text("");
		}
	})
	
	
	//邮编验证
	$("#postcode").blur(function(){
		var reg = /^[0-9]{6}$/;
		if(!(reg.test($(this).val()))){
			$(".postcode>span>i").css("display","block");
			$(".postcode>span").css({"color":"red","fontSize":"12px"});
		}else{
			$(".postcode>span>i").css({"display":"block","background":"url(../img/login_regist.png) "+"-318px "+"-1px"});
			$(".postcode>span").css({"color":"#fff","fontSize":""});
		}
	})
	
	
	//请输入收货人地址，要求5-120个字符
	
	
	
	
	//收货人手机验证(请您输入正确格式的手机号码)
	$("#contacterTel").blur(function(){
		if($(this).val()==""){ //输入为空时，提示"请输入手机号"
			$(".contacterTel>span>i").css("display","block");
			$(".contacterTel>span>em").text("请输入手机号");
		}else if(!(/^1[34578]\d{9}$/.test($(this).val()))){ //输入格式错误时，提示"请输入正确格式的手机号"
			$(".contacterTel>span>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $(".contacterTel>span>em").text("请输入正确格式的手机号");
		}else{
			$(".contacterTel>span>i").css("background","url(../img/login_regist.png) "+"-318px "+"-1px");
			return $(".contacterTel>span>em").text("");
		}
	})
	
	
	//请选择支付方式
	
	
	//提交订单
	$("#conform_order").click(function(){
//		if(){
//			window.location.href = "order_ok.html";
//		}else{
//			
//		}
	})
	
	
	
	
	
	
	
	
	
	
	
	
})
