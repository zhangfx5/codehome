$(function(){
	$(".login_a").click(function(){
		if(($("#username").val()==getCookie("_username"))&&($("#password").val()==getCookie("_password"))){
			setCookie("flag","true",30);
			window.location.href = "index.html";
		}else{
			alert("您输入的用户名与密码不符");
		}
	})
	
	
	
	
	
	
})
