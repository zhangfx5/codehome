$(function() {
	init();//初始化
	
	/*回到首页*/
	$(".rightnav-tit").click(function(){
		window.location.href="index.html";	
	})
	
	/*鼠标滑过选项时，显示隐藏的内容*/
	$(".rightnav-btn").hover(function() {
		$(this).children().filter(".rightnav-btn-bg").toggle();
	})
	/*登录注册模态窗口的显示和隐藏*/
	$(".rightnav-login-box").on("click", function(e) {
//		console.log(e.target);
		if (e.target == this) {
			$(this).fadeOut(70);
		}
	})
	$(".rightnav-login").on("click", function() {
		$(".rightnav-login-box").fadeIn(70);
	})
	/*登录窗口和注册窗口的切换*/
	$(".rightnav-login-window-btn-log").on("click", function() {
		$(".rightnav-login-window-btn").addClass("rightnav-login-window-btn-log-active").removeClass("rightnav-login-window-btn-reg-active");
		$(".rightnav-login-window-logbox").show();
		$(".rightnav-login-window-regbox").hide();
		$(".rightnav-error").empty();
	})
	
	$(".rightnav-login-window-btn-reg").on("click", function() {
		$(".rightnav-login-window-btn").removeClass("rightnav-login-window-btn-log-active").addClass("rightnav-login-window-btn-reg-active");
		$(".rightnav-login-window-logbox").hide();
		$(".rightnav-login-window-regbox").show();
		$(".rightnav-error").empty();
	})
	
	$(".rightnav-login-window-logform-sub").on("click", function() {//点击登录按钮
		var flag = true;
		var mail = $(".login-email").val();
		var pwd = $(".login-pwd").val();
		flag = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/.test(mail);
		if (flag) {
			$(".rightnav-error").text("");
			flag = /^\w+$/g.test(pwd);
			if (flag) {
				$(".rightnav-error").text("");
				userlogin();
			} else {
				$(".rightnav-error").text("*请输入密码");
			}
		} else {
			$(".rightnav-error").text("*请输入正确的邮箱格式");

		}
		if($(".rightnav-login-window-logform-savemail > input").prop("checked")){//记住用户账号
			localStorage.usermail=mail;
		}else{
			localStorage.usermail="";
		}
	})
	
	$(".rightnav-login-window-regbox-regbtn").on("click", function() {//注册信息验证
		var flag = true;
		flag = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/.test($(".rightnav-login-window-regform-mail").val());
		if (flag) {
			flag = /^\w{6,}$/g.test($(".rightnav-login-window-regform-pwd").val());
			if (flag) {
				flag = $(".rightnav-login-window-regform-pwd").val() == $(".rightnav-login-window-regform-pwdagain").val();
				if (flag) {
					flag = /^[a-zA-Z]\w{2,}$/g.test($(".rightnav-login-window-regform-name").val());
					if (flag) {

						flag = $(".rightnav-login-window-regform-sex").val() == 0;
						if (flag) {
							$(".rightnav-error").text("*请选择性别");
						} else {
							$(".rightnav-error").empty();
							
							if($(".rightnav-login-window-regform-agree").prop("checked") ){
//								alert("已选择")'
								subinfo();
							}else{
								$(".rightnav-error").text("*请先阅读并同意《时尚起义用户使用条款》");
							}
						}
					} else {
						$(".rightnav-error").text("*用户名不能以数字或下滑线开头，且长度不小于3");
					}
				} else {
					$(".rightnav-error").text("*两次输入密码不一致");
				}
			} else {
				$(".rightnav-error").text("*密码至少为6位，且不包含特殊字符");
			}
		} else {
			$(".rightnav-error").text("*请输入正确的邮箱格式");
		}
	})
	
	$(".rightnav-mypage").click(function(){//登录后点击我的账户跳转到个人中心
		window.location.href="overView.html";
	})
	
	function init(){
		$(".login-email").val(localStorage.usermail);
		if(sessionStorage.logState){
			$(".rightnav-login").hide();
			$(".rightnav-mypage").show();
		}
	}
	
	function subinfo(){//用户提交注册信息
		userlogin();
		
	}
	function userlogin(){//用户登录
		$(".rightnav-login").fadeOut(70);
		$(".rightnav-mypage").fadeIn(70);
		$(".rightnav-login-box").fadeOut(70);
		sessionStorage.logState=true;
		
	}
})