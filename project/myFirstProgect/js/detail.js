var init = function() {
	Share.init().create();
	LoadInfo.init().create();
}
var Share = {
	shareBorder: null,
	init: function() {
		shareBorder = $(".shareBorder");
		return this;
	},
	create: function() {
		$(".share").hover(function() {
			shareBorder.css("display", "block");
		},
		function() {
			shareBorder.css("display", "none");
		});
		$(".btns1").eq(0).on("click",function()
		{
			$(".goodsDetailInfo1").css("display","block");
			$(".goodsDetailInfo2").css("display","none");
			$(".goodsDetailInfo3").css("display","none");
			$(".goodsDetailInfo4").css("display","none");
		});
		$(".btns1").eq(1).on("click",function()
		{
			$(".goodsDetailInfo2").css("display","block");
			$(".goodsDetailInfo1").css("display","none");
			$(".goodsDetailInfo3").css("display","none");
			$(".goodsDetailInfo4").css("display","none");
		});
		$(".btns1").eq(2).on("click",function()
		{
			$(".goodsDetailInfo3").css("display","block");
			$(".goodsDetailInfo2").css("display","none");
			$(".goodsDetailInfo1").css("display","none");
			$(".goodsDetailInfo4").css("display","none");
		});
		$(".btns1").eq(3).on("click",function()
		{
			$(".goodsDetailInfo4").css("display","block");
			$(".goodsDetailInfo2").css("display","none");
			$(".goodsDetailInfo3").css("display","none");
			$(".goodsDetailInfo1").css("display","none");
		});
		//详情页倒计时
		setInterval(function()
		{
			var untilDate=new Date("2016/01/30");
			var nowDate=new Date();
			var time=untilDate.getTime()-nowDate.getTime();
			var day=Math.floor(time/(24*60*60*1000));
			var hour=Math.floor((time-day*24*60*60*1000)/(3600*1000));
			var min=Math.floor((time%(3600*1000))/(1000*60));
			var second=Math.floor((time%(1000*60))/(1000));
			$("#timeGo").html("仅剩"+day+"天"+hour+"时"+min+"分"+second+"秒");
		},1000);
	}
}
var LoadInfo = {
	init: function() {
		return this;
	},
	create: function() {
		var ifStain1 = 0;
		var ifStain2 = 0;
		//通过getjson方法获取数据
		$.getJSON("js/data.json", function(json) {
			var jsonArr = json.data.rows;
			//getCookie1("detailId");
			for (var i = 0; i < jsonArr.length; i++) {
				//对数据进行遍历
				//如果cookie detailId 传递的值在数据库中能找到
				if (jsonArr[i].id == getCookie1("detailId")) {
					var d=new Date();
					d.setDate(d.getDate()+3);
					//创建支付金额的cookie
					document.cookie="payPrice="+parseInt(jsonArr[i].nowPrice)+";expires"+d;
					//更改详情页面的一个一个数据
					//商品名称
					$(".goodDetailInfo1Top").html(jsonArr[i].content);
					//商品图片
					$(".goodDetailInfo1BotLef img")[0].src = jsonArr[i].imgUrl;
					//放大镜小图
					$("#border1SmallPic")[0].src = jsonArr[i].imgUrl;
					//放大镜大图
					$("#border1BigPic")[0].src = jsonArr[i].imgUrl;
					//商品现价
					$(".info11").html(jsonArr[i].nowPrice);
					//商品原价
					$(".beforePrice").html(jsonArr[i].beforePrice);
					//用户评分
					$("#userGrade").html(jsonArr[i].Evaluate);
					//星星图片
					$(".startPicDiv").css("width",12*parseInt(jsonArr[i].Evaluate)+"px");
					$("#buyCount").html(jsonArr[i].buyCount);
					$("#buyCount1").html(jsonArr[i].buyCount);
					var num = parseInt(jsonArr[i].beforePrice.split("￥")[1]) - parseInt(jsonArr[i].nowPrice.split("元")[0]);
					//节省金额
					$(".savePrice").html(num);
					$(".goodsDetailInfoBot .li2").html(jsonArr[i].nowPrice);
					//打折数
					$("#info12").html(jsonArr[i].discount);
					$("#discount").html(jsonArr[i].discount);
					//这是给颜色区域添加数据库内容
					var colorArr = jsonArr[i].color;
					for (var i = 0; i < colorArr.length; i++){
						$(".colorSelect").append($("<div class='colorSelectInfo left'>" + colorArr[i] + "</div>"));
					}
					//这是商品颜色点击事件触发
					$(".colorSelectInfo").on("click", function(){
						ifStain1 = 1;
						document.cookie = "color=" + $(this).html() + ";";
						$(this).css("background", "#E1E0E1");
						$(this).siblings().css("background", "");
					});
					//这是给衣服型号添加
					var sizeArr = jsonArr[i].size;
					for (var i = 0; i < sizeArr.length; i++){
						$(".sizeSelect").append($("<div class='sizeSelectInfo left'>" + sizeArr[i] + "</div>"));
					}
					//这是商品大小点击事件触发
					$(".sizeSelectInfo").on("click", function(){
						ifStain2 = 1;
						document.cookie = "size=" + $(this).html() + ";";
						$(this).css("background", "#E1E0E1");
						$(this).siblings().css("background", "");
					});

					//点击更换数量
					$(".numberSelectLeft").on("click", function(){
						var num = parseInt($(".numShow").html());
						if (num == 1) {
							num = 1;
							$(".numShow").html(num);
						} else {
							num = num - 1;
							$(".numShow").html(num);
						}
					});
					$(".numberSelectRight").on("click", function(){
						var num = parseInt($(".numShow").html());
						num = num + 1;
						$(".numShow").html(num);
					});
					//点击加入购物车，生成Cookie存放商品的id,颜色，大小，数量
					$(".btnsselect img").on("click", function() {
						if (ifStain1 == 0) {
						} else {
							if (ifStain2 == 0) {
							} else {
								var d = new Date();
								d.setDate(d.getDate()+3);
								var getShoppingId = getCookie1("detailId");
								var color1 = getCookie1("color");
								var size1 = getCookie1("size");
								var num1 = $(".numShow").html();
								console.log(getShoppingId + "," + color1 + "," + size1 + "," + num1);
								if (getCookie1("shoppingCar") == null) {
									document.cookie = "shoppingCar=[{id:'" + getShoppingId + "',color:'" + color1 + "',size:'" + size1 + "',num:'" + num1 + "'}];expires=" + d;
									//document.cookie="list=haha;expires="+d;

								} else {
									var cookieStr = getCookie1("shoppingCar");
									var str = "{id:'" + getShoppingId + "',color:'" + color1 + "',size:'" + size1 + "',num:'" + num1 + "'}";
									document.cookie = "shoppingCar=" + cookieStr.replace("]", "," + str + "]");
								}
								alert("添加成功！");
								$("#border").toggle();
								document.location.href = "shoppingCar.html";
							}
						}
					});
					//点击添加购物车显示模态窗口
					$("#addShoppingCar").on("click", function() {
						$("#border").show();
					});
					$(".selectBuyClose").on("click", function() {
						$("#border").hide();
					});
					$("#rightNowBuy").on("click",function()
					{
						window.location.href="addressSmall.html";
					});
					//这是在模态窗口里实现放大镜功能
					var smallPic = $(".smallPic")[0];
					var mark = $(".mark")[0];
					var smallDiv = $(".smallDiv")[0];
					var bigDiv = $(".bigDiv")[0];
					var imgBig = $(".bigDiv img")[0];
					mark.onmouseover = function() {
						smallDiv.style.display = "block";
						bigDiv.style.display = "block";
					};
					mark.onmouseout = function() {
						smallDiv.style.display = "none";
						bigDiv.style.display = "none";
					}
					mark.onmousemove = function(evt) {
						var e = evt || window.event;
						var x = e.offsetX - smallDiv.offsetWidth / 2;
						var y = e.offsetY - smallDiv.offsetHeight / 2;
						smallDiv.style.left = x + "px";
						smallDiv.style.top = y + "px";
						if (e.offsetX < (smallDiv.clientWidth / 2)) {
							smallDiv.style.left = "0px";
						}
						if (e.offsetX > (smallPic.clientWidth - smallDiv.clientWidth / 2)) {
							smallDiv.style.left = (smallPic.clientWidth - smallDiv.clientWidth) + "px";
						}
						if (e.offsetY < (smallDiv.clientHeight / 2)) {
							smallDiv.style.top = "0px";
						}
						if (e.offsetY > (smallPic.clientHeight - smallDiv.clientHeight / 2)) {
							smallDiv.style.top = (smallPic.clientHeight - smallDiv.clientHeight) + "px";
						}
						imgBig.style.left = -(e.offsetX * (bigDiv.offsetWidth / smallDiv.offsetWidth) - smallDiv.offsetWidth) + "px";
						imgBig.style.top = -(e.offsetY * (bigDiv.offsetWidth / smallDiv.offsetWidth) - smallDiv.offsetHeight) + "px";
					};
					$(".goodDetailInfo1BotLef img").on("click", function() {
						$("#border1").css("display", "block");
					});
					$("#border1Btn").on("click", function() {
						$("#border1").css("display", "none");
					});
					return;
				}
			}
		});
	}
}