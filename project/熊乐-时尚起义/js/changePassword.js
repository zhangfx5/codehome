$(function() {
	var pwd_db = "123456"; //假定从后台获取的用户密码
	$(".changepwd-box-form-sub").click(function() {
		var flag = true;
		var pwd = $(".changepwd-box-form-li-pwd").val();
		var new_pwd = $(".changepwd-box-form-li-newpwd").val();
		var new_pwd_ag = $(".changepwd-box-form-li-newpwd-again").val();
		console.log(pwd, new_pwd, new_pwd_ag);
		if (pwd.length == 0) {
			alert("请输入密码");
			flag = false;
		} else {
			if (pwd == pwd_db) {
				if (/^[0-9a-zA-Z]\w{5,15}$/.test(new_pwd)) {
					if (new_pwd == new_pwd_ag) {
						if(new_pwd==pwd){
							alert("新密码与旧密码相同");
							flag=false;
						}
					} else {
						alert("两次密码输入不一致");
						flag=false;
					}
				} else {
					alert("请输入6到16位新密码，且密码不能以特殊字符开头");
					flag=false;
				}
			} else {
				alert("密码错误");
				flag=false;
			}
		}
		if(flag){
			alert("密码修改成功");
		}

	})
})