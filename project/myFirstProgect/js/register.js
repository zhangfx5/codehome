var init = function() {
	CheckInfo.init().create();
}
var CheckInfo={
	userEmailInfo:null,
	userNameInfo:null,
	userPasswordInfo:null,
	userPasswordInfoAgain:null,
	submitBtn:null,
	ifPass:null,
	errorInfos:null,
	errorPics:null,
	init:function()
	{
		//邮箱
		userEmailInfo=$("input[type='text']").eq(0);
		//用户名
		userNameInfo=$("input[type='text']").eq(1);
		//密码
		userPasswordInfo=$("input[type='text']").eq(2);
		//确认密码
		userPasswordInfoAgain=$("input[type='text']").eq(3);
		//提交按钮
		submitBtn=$(".loginBot2Btn");
		//错误信息
		errorInfos=$(".errorInfo");
		//错误显示的图片
		errorPics=$(".trueOrFalse");
		//判断是否注册成功的标识
		ifPass=true;
		return this;
	},
	create:function()
	{
		var  m=0;
		var n=0;
		$("input[type='text']:first").focusin(function()
		{
			
			if(m==0)
			{
				$(this).val("");
				m=1;
			}
			else
			{
				
			}
		});
		$("input[type='text']:eq(1)").focusin(function()
		{
			$(".errorInfo1").eq(0).css("display","none");
			if(n==0)
			{
				$(this).val("");
				n=1;
			}
			else
			{
				
			}
		});
		$("input[type='text']:eq(2)").focusin(function()
		{
			
			$(".errorInfo1").eq(1).css("display","none");
			if(n==0)
			{
				$(this).val("");
				n=1;
			}
			else
			{
				
			}
		});
		//错误图片和信息隐藏
		errorInfos.css("display","none");
		errorPics.css("display","none");
		//设置焦点离开事件触发检测文本框信息正确性
		$("input[type='text']").focusout(function()
		{
			//每次点击都让错误信息和错误图片隐藏
			errorInfos.css("display","none");
			errorPics.css("display","none");
			ifPass=true;
			//对用户名检测
			if(!(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(userEmailInfo.val())))
			{
				ifPass=false;
				errorInfos.eq(0).css("display","block");
				errorPics.eq(0).css("display","block");
				//退出函数
				return;
			}
			//判断一下这一个文本框是不是第二个，使其焦点离开的时候触发时间
			if($("input[type='text']").index($(this))==1)
			{
				if(!(/^[a-zA-Z]\w{5,14}$/).test(userNameInfo.val()))
				{
					ifPass=false;
					errorInfos.eq(1).css("display","block");
					errorPics.eq(1).css("display","block");
					return;
				}
			}
			if($("input[type='text']").index($(this))==2)
			{
				if(!(/^\S{6,15}$/).test(userPasswordInfo.val()))
				{
					ifPass=false;
					
					errorInfos.eq(2).css("display","block");
					errorPics.eq(2).css("display","block");
						return;
				}
			}
			if($("input[type='text']").index($(this))==3)
			{
				if(!(userPasswordInfo.val()==userPasswordInfoAgain.val()))
				{
					ifPass=false;
					errorInfos.eq(3).css("display","block");
					errorPics.eq(3).css("display","block");
						return;
				}
			}
		});
		submitBtn.on("click",function()
		{
			//判断是否都验证成功
			if(ifPass)
			{
				//查找cookie list
				var cookieName=getCookie1("list");
				//对其等号后面相连的字符串通过eval方法转换
				var a=eval(cookieName);
				//判断是否已经注册的
				var k=0;
				if(a==null)
				{
					//如果cookie list不存在
					var d=new Date();
					d.setDate(d.getDate()+3);
					var addEmail1=userEmailInfo.val();
					var addName1=userNameInfo.val();
					var addPassword1=userPasswordInfo.val();
					/*if(getCookie1("list")==null)
					{*/
						document.cookie="list=[{addEmail:'"+addEmail1+"',addName:'"+addName1+"',addPassword1:'"+addPassword1+"'}];expires="+d;
						//document.cookie="list=haha;expires="+d;
						console.log(document.cookie);
					//判断select框是否选中
					if ($("input[type=checkbox]")[0].checked) {
						//这是创建一个新的cook，判断是否要在用户名框自动填写这次登录用户名
						document.cookie = "ShowName=" + $(".loginBot2 ul:first-child input").val() + "; expires=" + d;
					} else {
						//让其值为"" 也可以让其过期
						document.cookie = "ShowName=" + "" + "; expires=" + d;
					}
					//}
					//如果cookie list存在
					/*else
					{
						
						var str="{addEmail:'"+addEmail1+"',addName:'"+addName1+"',addPassword1:'"+addPassword1+"'}";
						var cookieStrLong=getCookie1("list").replace("]",","+str+"]");
						document.cookie="list="+cookieStrLong+"expires="+d;
						
						console.log(document.cookie);
					}*/
					window.location.href="login.html";
				}
				else
				{
					//对json对象遍历，查看有没有有相同的用户名，如果相同不能注册
					for(var i=0;i<a.length;i++)
					{
						if(a[i].addName===userNameInfo.val())
						{
							k=1;
						}
					}
					
					if(k)
					{
						alert("本用户已经注册，请重新填写信息！");
					}
					else
					{
						//继续添加list的字符串，实现多次注册
						var d=new Date();
						d.setDate(d.getDate()+3);
						var addEmail1=userEmailInfo.val();
						var addName1=userNameInfo.val();
						var addPassword1=userPasswordInfo.val();
						/*if(getCookie1("list")==null)
						{
							document.cookie="list=[{addEmail:'"+addEmail1+"',addName:'"+addName1+"',addPassword1:'"+addPassword1+"'}];expires="+d;
							//document.cookie="list=haha;expires="+d;
							console.log(document.cookie);
						}
						else
						{*/
							var str="{addEmail:'"+addEmail1+"',addName:'"+addName1+"',addPassword1:'"+addPassword1+"'}";
							var str1=getCookie1("list").replace("]",","+str+"]");
							document.cookie="list="+str1+";expires="+d;
							//document.cookie=document.cookie.replace("]",","+str+"]");
							console.log(document.cookie);
						//}
						window.location.href="login.html";
					}
				}
			}
		});
	}
	
	
}
