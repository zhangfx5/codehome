var init = function() {
	checkIsClick.init().create()
}

var checkIsClick={
	radioArr:null,
	ifCheck:null,
	subBtn:null,
	init:function()
	{
		radioArr=$("input");
		ifCheck=false;
		subBtn=$(".buyStyleBtn1");
		return this;
	},
	create:function()
	{
		subBtn.on("click",function()
		{
			//遍历，如果有一个被选中，则可以执行支付
			for(var i=0;i<radioArr.length;i++)
			{
				if(radioArr[i].checked)
				{
					ifCheck=true;
				}
			}
			if(ifCheck)
			{
				alert("支付成功");
				window.location.href="paySuccess.html";
			}
			else
			{
				alert("请选择支付方式");
			}
		});
		$("#onlinePayPrice").html(getCookie1("payPrice"));
		
	}
}
