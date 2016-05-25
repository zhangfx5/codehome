function regusterInit(){
	Reguster.username().userpass().userpass2().sub()
}
var Reguster = {
	name_s : false ,
	pass1_s : false ,
	pass2_s : false ,
	
	username : function(){
		$("#username").focus(function(){
			$(this).val() == "请填写邮箱或手机号，最少5个字符" ? 	$(this).val("") :  $(this).val( $(this).val())
		})
		$("#username").focusout(function(){
			$(this).val() == "" ? $(this).val("请填写邮箱或手机号，最少5个字符") : $(this).val($(this).val())
			var name = 	$(this).val() ;
			if(name  == "请填写邮箱或手机号，最少5个字符" ){
				Reguster.name_s = false;
				return ;
			}else{
				if( /^1\d{10}$/.test(name) ||/^[0-9a-z_-]{5,}@[0-9a-z]{2,6}\.(com|cn|com.cn|net)$/.test(name) ){
					console.log(099)
					$(".namealert").remove() ;
					$("#username").css("margin-bottom","25px") ;
					Reguster.name_s = true;
					return
				}else{
					Reguster.name_s = false;
					Reguster.namealert();
				}
			}
			
		})
	return this;
	},
	userpass : function(){
		$("#userpassword").focus(function(){
			$(this).attr({type:"password"})
			$(this).val() == "请输入密码6-16位字母和数字的组合" ? 	$(this).val("") :  $(this).val( $(this).val())
		})
		$("#userpassword").focusout(function(){
			$(this).val() == "" ? $(this).val("请输入密码6-16位字母和数字的组合") : $(this).val($(this).val())
			var pass = 	$(this).val() ;
			if(pass  == "请输入密码6-16位字母和数字的组合" ){
				$(this).attr({type:"text"})
				Reguster.pass1_s = false;
				return ;
			}else{
				if( /^[0-9a-z]{6,16}$/.test(pass) ){
					$(".passalert").remove() ;
					$("#userpassword").css("margin-bottom","25px") ;
					Reguster.pass1_s = true;
					return ;
				}else{
					Reguster.passalert();
					Reguster.pass1_s = false;
				}
			}
		})
	return this;
	},
	userpass2 : function(){
		$("#userpassword2").focus(function(){
			$(this).attr({type:"password"})
			$(this).val() == "再次填写密码" ? 	$(this).val("") :  $(this).val( $(this).val())
		})
		$("#userpassword2").focusout(function(){
			$(this).val() == "" ? $(this).val("再次填写密码") : $(this).val($(this).val())
			var pass2 = $(this).val() ;
			var pass = $("#userpassword").val();
			if(pass2  == "再次填写密码" ){
				$(this).attr({type:"text"})
				Reguster.pass2_s = false;
				return ;
			}else{
				if( pass == pass2 ){
					$(".passalert2").remove() ;
					$("#userpassword2").css("margin-bottom","25px") ;
					Reguster.pass2_s = true;
					return ;
				}else{
					Reguster.pass2_s = false;
					Reguster.passalert2();
				}
			}
		})
	return this;
	},
	sub : function(){
		console.log(123)
		$(".login_sub").click(function(e){
			e = e || event ;
			e.preventDefault()
			var judge ;
			$(".protocol").attr("checked") == "checked" ? judge = true : judge = false ;
			if(Reguster.name_s == false || Reguster.pass1_s == false || Reguster.pass2_s == false || judge == false ){
				return ;
			}else{
				var name = $("#username").val() ;
				var pass = $("#userpassword").val() ;
				document.cookie = "userNow = [{'userName':'" + name + "','userPassword':'" + pass + "','integral':'0'}]" ;
				document.cookie = "userBase = [{'userName':'" + name + "','userPassword':'" + pass + "','integral':'0'}]" ;
				document.cookie = "userState = ture" ;
				window.location.href="index.html"
			}
		})
	},
	
	
	namealert : function(){
		$(".namealert").remove() ;
		$("#username").after($("<p style='height:25px;color:red;' class='namealert'>格式有误，请使用正确的邮箱地址或手机号码</p>")) ;
		$("#username").css("margin-bottom","0") ;
	},
	passalert : function(){
		$(".passalert").remove() ;
		$("#userpassword").after($("<p style='height:25px;color:red;' class='passalert'>输入不正确，请输入6-16个字符</p>")) ;
		$("#userpassword").css("margin-bottom","0") ;
	},
	passalert2 : function(){
		$(".passalert2").remove() ;
		$("#userpassword2").after($("<p style='height:25px;color:red;' class='passalert2'>两次密码输入不一致</p>")) ;
		$("#userpassword2").css("margin-bottom","0") ;
	}
}
