$(function(){
	//1、点击手机注册或者邮箱注册(切换)
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
	
	
	
	//2、手机号码输入
//	var tips = $("#tips");
//	var ipt_tel = $("#ipt_tel");
//	var _val = ipt_tel.val();
	$("#ipt_tel").focus(function(){ 
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
			$("#tips>span").text("");
			return true;
		}
	})
	//3、密码输入
	$("#password").focus(function(){ 
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
			$("#tips2>span").text("");
			return true;
		}
    })
	//4、确认密码（密码一致）
	$("#confirm_pwd").focus(function(){ 
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
			$("#tips3 >span").text("");
			return true;
		}
	})
	//5、验证码（输入四位数字）
	var reg = /^[0-9]{4}$/;
	$("#ipt_wid1").focus(function(){ 
		$(this).css("border","1px solid red");
	})
	$("#ipt_wid1").blur(function(){
		$(this).css("border","");
//		console.log($(this).val())
//		console.log($(this).val().length)
		if($(this).val()==""){
			$("#tips4").css("display","block");
			$("#tips4>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips4>span").text("验证码不能为空");
		}else if(!(reg.test($(this).val()))){
		//	}else if(!($(this).val().match(reg))){
//			console.log($(this).val())
//			console.log($(this).val().length)
			$("#tips4").css("display","block");
			$("#tips4>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips4>span").text("验证码格式错误");
		}else{
			$("#tips4").css("display","block");
			$("#tips4>i").css("background","url(../img/login_regist.png) "+"-318px "+"-1px");
			$(this).css("border","");
			$("#tips4>span").text("");
			return true;
		}
	})
	
//	var reg = /^[0-9]{4}$/g;
	$("#ipt_wid2").focus(function(){ 
		$(this).css("border","1px solid red");
	})
	$("#ipt_wid2").blur(function(){
		$(this).css("border","");
		if($(this).val()==""){
			$("#tips5").css("display","block");
			$("#tips5>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips5>span").text("验证码不能为空");
		}else if(!($(this).val().match(reg))){
			$("#tips5").css("display","block");
			$("#tips5>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips5>span").text("验证码格式错误");
		}else{
			$("#tips5").css("display","block");
			$("#tips5>i").css("background","url(../img/login_regist.png) "+"-318px "+"-1px");
			$(this).css("border","");
			$("#tips5>span").text("");
			return true;
		}
	})

	//立即注册
	$(".reg_now1").click(function(){
		if( (/^1[34578]\d{9}$/.test($("#ipt_tel").val())) && (($("#password").val()).length>=6) && ($("#confirm_pwd").val()==$("#password").val()) && (reg.test($("#ipt_wid1").val())) && (reg.test($("#ipt_wid2").val())) ){
			setCookie("_username",$("#ipt_tel").val(),30);
			setCookie("_password",$("#password").val(),30);
			window.location.href = "regist_ok.html";
		}else{
			alert("请检查您填写的内容是否正确");
			return false;
		}
//		if(reg.test($("#ipt_wid2").val())){ //分别验证每个条件是否正确
//			alert(1);
//		}
	})
	
	
	//二、邮箱注册正则检测
//	验证规则：姑且把邮箱地址分成“第一部分@第二部分”这样
//	第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
//	第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
//	而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
	var reg3 =  /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	$("#email").focus(function(){ 
		$(this).css("border","1px solid red");
	})
	
	$("#email").blur(function(){ 
		$(this).css("border","");
		if($(this).val()==""){
			$("#tips1").css("display","block");
			$("#tips1>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips1>span").text("请输入邮箱");
		}else if(!($(this).val().match(reg3))){
			$("#tips1").css("display","block");
			$("#tips1>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips1>span").text("邮箱格式错误");
		}else{
			$("#tips1").css("display","block");
			$("#tips1>i").css("background","url(../img/login_regist.png) "+"-318px "+"-1px");
			$(this).css("border","");
			return $("#tips1>span").text("");
		}
	})
	
	//邮箱密码验证
	$("#em_pwd").focus(function(){ 
		$(this).css("border","1px solid red");
	})
	
	$('#em_pwd').keyup(function (){ 
        var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"); 
        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"); 
        var enoughRegex = new RegExp("(?=.{6,}).*", "g"); 
     
        if (false == enoughRegex.test($(this).val())) { 
            $("#em_pwdStrength").css("display","block");
            $('#em_pwdStrength>em').eq(0).addClass('red'); 
            $('#em_pwdStrength>em').eq(1).removeClass('yellow');
            $('#em_pwdStrength>em').eq(2).removeClass('green');
             //密码小于六位的时候，密码强度图片都为灰色 
        } 
        else if (strongRegex.test($(this).val())) { 
        	alert(0);//?????????????????????????????????????????????
            $("#em_pwdStrength").css("display","block");
            $('#em_pwdStrength>em').eq(2).addClass('green'); 
            $('#em_pwdStrength>em').eq(0).removeClass('red');
            $('#em_pwdStrength>em').eq(1).removeClass('yellow');
             //密码为八位及以上并且字母数字特殊字符三项都包括,强度最强 
        } 
        else if (mediumRegex.test($(this).val())) { 
            $("#em_pwdStrength").css("display","block");
            $('#em_pwdStrength>em').eq(1).addClass('yellow'); 
            $('#em_pwdStrength>em').eq(0).removeClass('red');
            $('#em_pwdStrength>em').eq(2).removeClass('green');
             //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等 
        } 
        else { 
            $('#em_pwdStrength>em').eq(0).removeClass('red');
            $('#em_pwdStrength>em').eq(1).removeClass('yellow');
            $('#em_pwdStrength>em').eq(2).removeClass('green');
            $('#em_pwdStrength>em').eq(0).addClass('red'); 
            //如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的 
        } 
        return true; 
    }); 
    
    $('#em_pwd').blur(function(){
    	if($(this).val()==""){ //输入为空时，提示"请输入手机号"
			$("#tips22").css("display","block");
			$("#tips22>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips22>span").text("请输入密码");
		}else if(($(this).val()).length<6){
    		$("#tips22").css("display","block");
			$("#tips22>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips22>span").text("密码应6-25之间");
    	}else if(($(this).val()).length>25){
    		$("#tips22").css("display","block");
			$("#tips22>i").css("background","url(../img/login_regist.png) "+"-318px "+"-1px");
    		return false;
		}else{
			$("#tips22").css("display","block");
			$("#tips22>i").css("background","url(../img/login_regist.png) "+"-318px "+"-1px");
			$(this).css("border","");
			return $("#tips22>span").text("");
		}
    })

	//确认邮箱密码（密码一致）
	$("#em_confirm_pwd").focus(function(){ 
		$(this).css("border","1px solid red");
	})
	$("#em_confirm_pwd").blur(function(){
		if($(this).val()==""){ //输入为空时，提示"请输入手机号"
			$("#tips33").css("display","block");
			$("#tips33>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips33>span").text("请输入密码");
		}else if($(this).val()!=$("#em_pwd").val()){
			$("#tips33").css("display","block");
			$("#tips33>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips33>span").text("密码输入不一致");
		}else{
			$("#tips33").css("display","block");
			$("#tips33>i").css("background","url(../img/login_regist.png) "+"-318px "+"-1px");
			$(this).css("border","");
			return $("#tips33 >span").text("");
		}
	})
	// 邮箱验证码（输入四位数字）
	var Reg = /^[0-9]{4}$/;
	$("#em_conf_code").focus(function(){ 
		$(this).css("border","1px solid red");
	})
	$("#em_conf_code").blur(function(){
		$(this).css("border","");
		if($(this).val()==""){
			$("#tips44").css("display","block");
			$("#tips44>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips44>span").text("验证码不能为空");
		}else if(!(Reg.test($(this).val()))){
			$("#tips44").css("display","block");
			$("#tips44>i").css("background","url(../img/login_regist.png) "+"-318px "+"-33px");
			return $("#tips44>span").text("验证码格式错误");
		}else{
			$("#tips44").css("display","block");
			$("#tips44>i").css("background","url(../img/login_regist.png) "+"-318px "+"-1px");
			$(this).css("border","");
			return $("#tips44>span").text("");
		}
	})
	
	
	//邮箱注册成功跳转页面
	$(".reg_now2").click(function(){
		if( (($("#email").val()).match(reg3)) && ($("#em_pwd").val().length>=6) && ($("#em_pwd").val()==$("#em_confirm_pwd").val()) && (Reg.test($("#em_conf_code").val()))){
			window.location.href = "regist_ok.html";
		}else{
			alert("请检查您填写的内容是否正确");
			return false;
		}
	})







})






























