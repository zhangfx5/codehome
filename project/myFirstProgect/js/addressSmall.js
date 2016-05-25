var init = function() {
	insertCity.init().create();
	onloadInfo.init().create();
}
var insertCity={
	smallCity:null,
	bigCity:null,
	inputs:null,
	init:function()
	{
		inputs=$(".infoText");
		return this;
	},
	create:function()
	{
		//http://api.laoxiangbang.com.cn/index.php?index.php?m=Home&c=Api&a=area
		//这是调用外部接口实现城市二级挑选
		$.ajax
		({
		type:'GET',
        	url:"http://api.laoxiangbang.com.cn/index.php?index.php?m=Home&c=Api&a=area&format=html", 
        //data:{mobile:13013054321,password:123456,channel_id:12345678},
        //dataType:'json',      
	        success:function(data)
	        {
	        	
	        	var dataArr=data.data;
	        	for( var i=0;i<dataArr.length;i++)
	        	{
	        		
	        		var options=$("<option></option>");
	        		options.html(dataArr[i].name);
	        		$("#bigCity").append(options);
	        	}
	        	$("#bigCity").on("change",function()
	        	{
	        		//每次点击让第二个select值为空
	        		$("#smallCity").html("");
	        		//这是记录第一个select点击的option的下标
	        		var index=$("option").index($(this).children("option:selected"));
	        		var dataArr2=dataArr[index].child;
	        		console.info(dataArr2);
	        		//如果第一个select没有相对应的第二个select的值，使其为空
	        		if(dataArr2=="")
	        		{
	        			$("#smallCity").html("");
	        		}
	        		else
	        		{
		        		for(var j=0;j<dataArr2.length;j++)
		        		{
		        			//动态添加option
		        			var smallOption=$("<option></option>");
		        			smallOption.html(dataArr2[j].name);
		        			$("#smallCity").append(smallOption);
		        		}
	        		}
	        	});
	        }
     	});
     	$(".subBtn").on("click",function()
		{
			$(".errorInfo").css("display","none");
			var i=1;
			if(inputs.eq(0).val()=="")
			{
				$(".errorInfo").eq(0).css("display","inline");
				i=0;
			}
			if(inputs.eq(1).val()=="")
			{
				$(".errorInfo").eq(1).css("display","inline");
				i=0;
			}
			if((inputs.eq(2).val()=="")||(!(/^\d{6}$/.test(inputs.eq(2).val()))))
			{
				$(".errorInfo").eq(2).css("display","inline");
				i=0;
				
			}
			if((inputs.eq(3).val()=="")||!(/^1\d{10}$/.test(inputs.eq(3).val())))
			{
				$(".errorInfo").eq(3).css("display","inline");
				i=0;
			}
			if(i==1)
			{
				alert("保存成功，货物将准确送到您身边！");
			}
		});
	}
}
var onloadInfo={
	init:function()
	{
		return this;
	},
	create:function()
	{
		//让textarea内容为空
		$("textarea").val("");
		$(".addressFormTop span").eq(1).css("color","red");
		$(".activePayBtn").on("click",function()
		{
			window.location.href="onlinePay.html";
		});
		//实现样式切换
		$(".addressFormTop span").eq(1).on("click",function()
		{
			$(".addressFormTop span").eq(1).css("color","red");
			$(".addressFormTop span").eq(2).css("color","#000");
			$(".addressFormBot").css("display","block");
			$(".addressFormBot1").css("display","none");
		});
		$(".addressFormTop span").eq(2).on("click",function()
		{
			//如果是未登录，则不能拥有个人地址
			if(getCookie1("LoginSuccess")=="'shide'")
			{
				$(".addressFormTop span").eq(2).css("color","red");
				$(".addressFormTop span").eq(1).css("color","#000");
				$(".addressFormBot1").css("display","block");
				$(".addressFormBot").css("display","none");
			}
			else
			{
				alert("请登录！");
			}
		});
		if(getCookie1("address"))
		{
			//实现cookie存储的多个地址添加
			var obj=eval(getCookie1("address"));
			for(var i=0;i<obj.length;i++)
			{
				var str="<div class='addressList'><div class='left'><input type='radio'  name='select'/></div><div class='left'>"+obj[i].receiveName+"</div><div class='left' >"+obj[i].receiveDiqu+"</div><div class='left'>"+obj[i].receiveJiedao+"</div><div class='left'>"+obj[i].receiveYouzheng+"</div><div class='left'>"+obj[i].receivePhone+"</div></div>";
				$(".addressFormBot2").append(str);
			}
		}
		$("#userNameForAdd").html(getCookie1("userName"));
	}
}
