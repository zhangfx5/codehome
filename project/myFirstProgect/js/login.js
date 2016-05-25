var init = function() {
	CheckInfo.init().create();
}
var CheckInfo = {
	nameEmailInfo: null,
	passwordInfo: null,
	subBtn: null,
	checkBox: null,
	init: function() {
		//登录的用户名框
		nameEmailInfo = $("input[type='text']").eq(0);
		//登录的密码框
		passwordInfo = $("input[type='text']").eq(1);
		//登录的是否记住密码的checkBox框
		checkBox = $("input[type='checkbox']").eq(0);
		//提交按钮
		subBtn = $(".loginBot2Btn");
		return this;
	},
	create: function() {
		//判断是否存在cookie ShowName
		if (getCookie1("ShowName") == null) {
		} else {
			//如果存在，则添加进用户名框内
			nameEmailInfo.val(getCookie1("ShowName"));
		}
		//提交按钮的验证
		subBtn.on("click", function() {
			//标识符,满足置1
			var k = 0;
			//获取存储用户名，密码的cookie
			var cookieName = getCookie1("list");
			//将cookie list的值进行转换，转换为json对象数组
			var a = eval(cookieName);
			//对json对象数组进行遍历
			for (var i = 0; i < a.length; i++) {
				if ((a[i].addName === nameEmailInfo.val() || a[i].addEmail === nameEmailInfo.val()) && a[i].addPassword1 === passwordInfo.val()) {
					var d = new Date();
					d.setDate(d.getDate()+3);
					//判断select框是否选中
					if (checkBox[0].checked) {
						//这是创建一个新的cook，判断是否要在用户名框自动填写这次登录用户名
						document.cookie = "ShowName=" + nameEmailInfo.val() + "; expires=" + d;
					} else {
						//让其值为“”
						document.cookie = "ShowName=" + "" + "; expires=" + d;
					}
					//登陆成功创建标识cookie ，是否已经登录
					document.cookie = "LoginSuccess='shide';expires=" + d;
					//登陆成功创建cookie保存用户名 
					document.cookie = "userName=" + nameEmailInfo.val() + "; expires=" + d;
					k = 1;
				}
			}
			if (k == 1) 
			{
				alert("登陆成功！");
				window.location.href = "index.html";
			} else {
				alert("登录失败！");
			}
		});
	}
}