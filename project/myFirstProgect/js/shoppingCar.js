var init = function() {
	onloadInfo.init().create();
}
var onloadInfo={
	init:function()
	{
		return this;
	},
	create:function()
	{
		var numberOfGoods=0;
		var priceAll=0;
		var dataArr=[];
		var cookieStr=getCookie1("shoppingCar");
		var json=eval(cookieStr);
		console.info(json);
		//通过getJson获取Json文件数据
		$.getJSON("js/data.json", function(json1)
		{
		  dataArr=json1.data.rows;
		  for(var i=0;i<json.length;i++)
			{	
				//创建tr
			var tr=$("<tr></tr>");
			//创建n记住当前遍历位置
			var n=i;
			 for(var j=0;j<dataArr.length;j++)
			  {
			  	if(dataArr[j].id==json[n].id)
			  	{
			  		//添加元素
			  		var deletePrice=parseInt(dataArr[j].beforePrice.split("￥")[1])-parseInt(dataArr[j].nowPrice.split("元")[0]);
			  		var tds="<td class='first'><div class='shoppingPic left'><img src='"+dataArr[j].imgUrl+"' /></div><div class='shoppingInfo left'>"+dataArr[j].content+"</div></td><td><div class='numShow left'>"+json[n].num+"</div></td><td style='text-align: center;'>"+dataArr[j].beforePrice+"</td><td style='text-align: center;'>"+deletePrice+"</td><td style='text-align: center;'>"+dataArr[j].nowPrice+"</td><td><button>删除</button></td>";
			  		//每添加一条数据就对其数量进行累加
			  		numberOfGoods=numberOfGoods+parseInt(json[n].num);
			  		tr.html(tds);
			  		$("tbody").append(tr);
			  		//每添加一条数据就对其价格进行累加
			  		priceAll=priceAll+parseInt(json[n].num)*parseInt(dataArr[j].nowPrice.split("元")[0]);
			  	
			  		//更改购物车购买数量
			  		$(".numShopping").html(numberOfGoods);
			  		//更改总金额
			  		$(".priceShopping").html("￥"+priceAll);
			  	}
			  }
			}
		});
		//对每一个tr邮编的delete button添加事件
		$("table").delegate("button","click",function(){
						
			var goodPrice=parseInt($(this).parent().prev().html().split("元")[0]);
			var goodNumber=parseInt($(this).parent().prev().prev().prev().prev().children().first().html());
			numberOfGoods=numberOfGoods-goodNumber;
			priceAll=priceAll-goodPrice*goodNumber;
			//动态更改数量和价格
			$(".numShopping").html(numberOfGoods);
  			$(".priceShopping").html("￥"+priceAll);
  			//相应tr隐藏
  			$(this).parent().parent().fadeOut(500);
  			return;
		});
		$("#mainShoppingSure .img1").on("click",function()
		{
			window.location.href="index.html";
		});
		$("#mainShoppingSure .img2").on("click",function()
		{
			window.location.href="address.html";
		});
	}
}

