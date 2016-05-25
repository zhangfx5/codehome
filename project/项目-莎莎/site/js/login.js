//登陆页面
function loginInit(){
	Login.init().username().userpassword().sub()
}
var Login = {
	init : function (){
		var cookie = Common.getCookie("userRemember")
		if(cookie == ""){
			
		}else{
			var str = Common.jsonToObj(cookie)
			$("#userpassword").attr("type","password")
			$("#username").val(str.userName);
			$("#userpassword").val(str.userPassword);
		}
	return this ;	
	},
	//判断用户名input是否输入内容
	username : function(){
		$("#username").focus(function(){
			$(this).val() == "邮箱/手机" ? 	$(this).val("") :  $(this).val( $(this).val())
		})
		$("#username").focusout(function(){
			$(this).val() == "" ? $(this).val("邮箱/手机") : $(this).val($(this).val())
			$(".usernameNull").remove() ;
			$("#username").css("margin-bottom","25px") 
		})
	return this ;
	},
	//判断密码input是否输入内容
	userpassword : function(){
		$("#userpassword").focus(function(){
			$(this).attr("type","password")
			$(this).val() == "填写密码" ? 	$(this).val("") :  $(this).val( $(this).val())
		})
		$("#userpassword").focusout(function(){
			if($(this).val() == ""){
				$(this).val("填写密码") ;
				$(this).attr("type","text") ;
			}else{
				$(this).val($(this).val()) ;	
			}
			$(".userpassNull").remove() ;
			$("#userpassword").css("margin-bottom","25px") 
		})
	return this ;
	},
	//提交信息  1.输入框不为空  2.匹配用户名密码对应  3.是否记录密码
	sub : function(){
		$(".login_sub").click(function(e){
			e.preventDefault() ;
			var cookie;
		//若没有储存信息将cookie改为null 
			if(Common.getCookie("userBase") == "") {
				cookie = null ;
			}else{
				cookie = eval( Common.getCookie("userBase") )[0]
			}
			console.log(cookie )
		//判断用户名是否为空
			if( $("#username").val() == "邮箱/手机" ){
				$("#username").after($("<p style='height:25px;color:red;' class='usernameNull'>用户名不能为空</p>")) ;
				$("#username").css("margin-bottom","0") ;
		//判断密码是否为空
			}else if( $("#userpassword").val() == "填写密码" ){
				$("#userpassword").after($("<p style='height:25px;color:red;' class='userpassNull'>密码不能为空</p>")) ;
				$("#userpassword").css("margin-bottom","0") ;
		//判断用户名是否存在
			}else if( cookie == null ){
				$("#usershade").css("display","block")
				$(".userbox").text("您输入的账号不存在")
				$("#usershade").animate({"opacity":1},600,function(){
					setTimeout(function(){
						$("#usershade").animate({"opacity":0},600,function(){
							$("#usershade").css("display","none")
						})
					},1000)
				})
			//判断用户名和密码是否匹配
			}else if( $("#username").val() != cookie.userName || $("#userpassword").val() != cookie.userPassword ){
				$("#usershade").css("display","block")
				$(".userbox").text("用户名或密码输入错误！")
				$("#usershade").animate({"opacity":1},600,function(){
					setTimeout(function(){
						$("#usershade").animate({"opacity":0},600,function(){
							$("#usershade").css("display","none")
						})
					},1000)
				})
//		用户名密码正确情况下
			}else{
			//选择记录密码的情况下 3天后过期
				if($("#rememeber").is(':checked')  == true){
					var userName = $("#username").val() ;
					var userPassword = $("#userpassword").val() ;
					var d = new Date() ;
					var ex = d.getTime() +　(24*60*60*1000 *3) ;
					d.setTime(ex)
					document.cookie = "userRemember=[{'userName':'" + userName + "','userPassword':'" + userPassword + "'}];expires=" + d;
					document.cookie = "userNow = [{'userName':'" + userName + "','userPassword':'" + userPassword + "','integral':'0'}]"
					document.cookie = "userState = ture" ;
					window.location.href="index.html"
				}else{
					var userName = $("#username").val() ;
					var userPassword = $("#userpassword").val() ;
					Common.delCookie("userRemember") ;
					document.cookie = "userNow = [{'userName':'" + userName + "','userPassword':'" + userPassword + "','integral':'0'}]"
					document.cookie = "userState = ture" ;
					window.location.href="index.html"
				}

			}
		})
	}
}
