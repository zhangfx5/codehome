 var init = function() {
	insertCity.init().create();
	onloadInfo.init().create();
}
var insertCity={
	smallCity:null,
	bigCity:null,
	init:function()
	{
		return this;
	},
	create:function()
	{
		//http://api.laoxiangbang.com.cn/index.php?index.php?m=Home&c=Api&a=area
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
	        		$("#smallCity").html("");
	        		var index=$("option").index($(this).children("option:selected"));
	        		var dataArr2=dataArr[index].child;
	        		console.info(dataArr2);
	        		if(dataArr2=="")
	        		{
	        			$("#smallCity").html("");
	        		}
	        		else
	        		{
		        		for(var j=0;j<dataArr2.length;j++)
		        		{
		        			var smallOption=$("<option></option>");
		        			smallOption.html(dataArr2[j].name);
		        			$("#smallCity").append(smallOption);
		        		}
	        		}
	        	});
	        }
     	});
	}
}
var onloadInfo={
	inputs:null,
	init:function()
	{
		inputs=$(".infoText");
		//console.info(inputs);
		return this;
	},
	create:function()
	{
		$("textarea").val("");
		var numberOfGoods=0;
		var priceAll=0;
		var dataArr=[];
		var cookieStr=getCookie1("shoppingCar");
		$(".addressFormTop span").eq(1).css("color","red");
		var json=eval(cookieStr);
		console.info(json);
		//通过getJson获取Json文件数据
		$.getJSON("js/data.json", function(json1)
		{
		  dataArr=json1.data.rows;
		  for(var i=0;i<json.length;i++)
			{	
			var tr=$("<tr></tr>");
			var n=i;
			 for(var j=0;j<dataArr.length;j++)
			  {
			  	if(dataArr[j].id==json[n].id)
			  	{
			  		//添加元素
			  		var deletePrice=parseInt(dataArr[j].beforePrice.split("￥")[1])-parseInt(dataArr[j].nowPrice.split("元")[0]);
			  		var tds="<td class='first'><div class='shoppingPic left'><img src='"+dataArr[j].imgUrl+"' /></div><div class='shoppingInfo left'>"+dataArr[j].content+"</div></td><td style='text-align:center;'>"+json[n].num+"</td><td style='text-align: center;'>"+dataArr[j].beforePrice+"</td><td style='text-align: center;'>"+deletePrice+"</td><td style='text-align: center;'>"+dataArr[j].nowPrice+"</td>";
			  		numberOfGoods=numberOfGoods+parseInt(json[n].num);
			  		tr.html(tds);
			  		$("tbody").append(tr);
			  		priceAll=priceAll+parseInt(json[n].num)*parseInt(dataArr[j].nowPrice.split("元")[0]);
			  		//更改购物车购买数量
			  		$(".numShopping").html(numberOfGoods);
			  		$(".priceShopping").html("￥"+priceAll);
			  		var d=new Date();
			  		d.setDate(d.getDate()+3);
			  		document.cookie="payPrice="+priceAll+";expires="+d;
			  	}
			  }
			}
		});
		$(".activePayBtn").on("click",function()
		{
			window.location.href="onlinePay.html";
		});
		$(".addressFormTop span").eq(1).on("click",function()
		{
			$(".addressFormTop span").eq(1).css("color","red");
			$(".addressFormTop span").eq(2).css("color","#000");
			$(".addressFormBot").css("display","block");
			$(".addressFormBot1").css("display","none");
		});
		$(".addressFormTop span").eq(2).on("click",function()
		{
			if(getCookie1("LoginSuccess")=="'shide'")
			{
				$(".addressFormTop span").eq(2).css("color","red");
				$(".addressFormTop span").eq(1).css("color","#000");
				$(".addressFormBot1").css("display","block");
				$(".addressFormBot").css("display","none");
			}
		});
		if(getCookie1("address"))
		{
			var obj=eval(getCookie1("address"));
			for(var i=0;i<obj.length;i++)
			{
				var str="<div class='addressList'><div class='left'><input type='radio'  name='select'/></div><div class='left'>"+obj[i].receiveName+"</div><div class='left' >"+obj[i].receiveDiqu+"</div><div class='left'>"+obj[i].receiveJiedao+"</div><div class='left'>"+obj[i].receiveYouzheng+"</div><div class='left'>"+obj[i].receivePhone+"</div></div>";
				$(".addressFormBot2").append(str);
			}
		}
		$("#userNameForAdd").html(getCookie1("userName"));
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
