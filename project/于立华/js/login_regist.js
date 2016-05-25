$(function(){
	//1、点击手机注册或者邮箱注册
	$(".reg_tab>div").click(function(){
		$(this).siblings("div").removeClass("tolerant")
		$(this).siblings("div").addClass("emali_reg")
		$(this).addClass("tolerant");
	})
	$(".mobile_reg").click(function(){
		$(".content_mobile").css("display","block");
		$(".content_email").css("display","none");
	})
	$(".emali_reg").click(function(){
		$(".content_email").css("display","block");
		$(".content_mobile").css("display","none");
	})
	
	
	
	//手机号码输入
//	var tips = $("#tips");
//	var ipt_tel = $("#ipt_tel");
//	var _val = ipt_tel.val();
	$("#ipt_tel").focus(function(){ //??????????????????????????
		$(this).css("border","1px solid red");
	})
	$("#ipt_tel").blur(function(){
		if($(this).val()==""){ //输入为空时，提示"请输入手机号"
			$("#tips").css("display","block");
			$("#tips>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips>span").text("请输入手机号");
		}else if(!(/^1[34578]\d{9}$/.test($(this).val()))){ //输入格式错误时，提示"格式错误"
			$("#tips").css("display","block");
			$("#tips>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips>span").text("格式错误");
		}else{
			$("#tips").css("display","block");
			$("#tips>i").css("background","url(../img/login_regist.png) "+"-318px "+"-1px");
			$(this).css("border","");
			return $("#tips>span").text("");
		}
	})
	//密码输入
	$("#password").focus(function(){ //??????????????????????????
		$(this).css("border","1px solid red");
	})
	
	$('#password').keyup(function (){ 
        var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"); 
        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"); 
        var enoughRegex = new RegExp("(?=.{6,}).*", "g"); 
     
        if (false == enoughRegex.test($(this).val())) { 
            $("#pwdStrength").css("display","block");
            $('#pwdStrength>em').eq(0).addClass('red'); 
            $('#pwdStrength>em').eq(1).removeClass('yellow');
            $('#pwdStrength>em').eq(2).removeClass('green');
             //密码小于六位的时候，密码强度图片都为灰色 
        } 
        else if (strongRegex.test($(this).val())) { 
        	alert(0);//?????????????????????????????????????????????
            $("#pwdStrength").css("display","block");
            $('#pwdStrength>em').eq(2).addClass('green'); 
            $('#pwdStrength>em').eq(0).removeClass('red');
            $('#pwdStrength>em').eq(1).removeClass('yellow');
             //密码为八位及以上并且字母数字特殊字符三项都包括,强度最强 
        } 
        else if (mediumRegex.test($(this).val())) { 
            $("#pwdStrength").css("display","block");
            $('#pwdStrength>em').eq(1).addClass('yellow'); 
            $('#pwdStrength>em').eq(0).removeClass('red');
            $('#pwdStrength>em').eq(2).removeClass('green');
             //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等 
        } 
        else { 
            $('#pwdStrength>em').eq(0).removeClass('red');
            $('#pwdStrength>em').eq(1).removeClass('yellow');
            $('#pwdStrength>em').eq(2).removeClass('green');
            $('#pwdStrength>em').eq(0).addClass('red'); 
            //如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的 
        } 
        return true; 
    }); 
    
    $('#password').blur(function(){
    	if($(this).val()==""){ //输入为空时，提示"请输入手机号"
			$("#tips2").css("display","block");
			$("#tips2>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips2>span").text("请输入密码");
		}else if(($(this).val()).length<6){
    		$("#tips2").css("display","block");
			$("#tips2>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips2>span").text("密码应6-25之间");
    	}else if(($(this).val()).length>25){
    		$("#tips2").css("display","block");
			$("#tips2>i").css("background","url(../img/login_regist.png) "+"-318px "+"-1px");
    		return false;
		}else{
			$("#tips2").css("display","block");
			$("#tips2>i").css("background","url(../img/login_regist.png) "+"-318px "+"-1px");
			$(this).css("border","");
			return $("#tips2>span").text("");
		}
    })
	//确认密码（密码一致）
	$("#confirm_pwd").focus(function(){ //??????????????????????????
		$(this).css("border","1px solid red");
	})
	$("#confirm_pwd").blur(function(){
		if($(this).val()==""){ //输入为空时，提示"请输入手机号"
			$("#tips3").css("display","block");
			$("#tips3>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips3>span").text("请输入密码");
		}else if($(this).val()!=$("#password").val()){
			$("#tips3").css("display","block");
			$("#tips3>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips3>span").text("密码输入不一致");
		}else{
			$("#tips3").css("display","block");
			$("#tips3>i").css("background","url(../img/login_regist.png) "+"-318px "+"-1px");
			$(this).css("border","");
			return $("#tips3 >span").text("");
		}
	})






})






























