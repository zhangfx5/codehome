function shoplistInit(){
	Module.brand().hidd().lable()//模块列表
	List.rail().menu().appear() //分类列表
	Com.show()//商品
	LeftList.parameter().open().change().init2()//左侧列表栏
//	Shopcars.
}

var Module = {
	brand : function(){
		$(".modulenavli").mouseover(function(){
			$(".allbrand").css("display","block");
			$(".allbrand").stop().animate({
				"height":280
			},300)
		})
	return this ;	
	},
	hidd : function(){
		$(".modulenavli").mouseout(function(e){
			e = e||event;
			
			if(Common.inside(e,$(".allbrand"))){

			}else{
				$(".allbrand").stop().animate({
					"height":0
				},300,function(){
					$(".allbrand").css("display","none");
				})
			}
		})
	return this ;
	},
	lable : function(){
		$(".modulelable_img").each(function(i){
			$(this).mouseover(function(){
				$(".modulelable_txt").not($(".modulelable_txt").eq(i)).css("display","none")
					$(".modulelable_txt").eq(i).css("display","block")
			})
		})
	}
}
var List = {
	//所有列表行划过效果
	rail : function(){
		$(".classify_nav li").each(function(i){
			$(this).mouseover(function(){
				var _x = $(this).offset().left - 345 ;
				$(".classify_nav_b").css("display","block")
				$(".classify_nav_b").stop().animate({
					"left" : _x
				},400)
			})
		})
		$(".classify_nav li").mouseout(function(){
			$(".classify_nav_b").css("display","none")
		})
	return this ;
	},
	//二级菜单划入划出效果 li
	menu : function(){
		$(".list li").each(function(i){
			$(this).mouseover(function(){
				$(".list_shade").css("display","none")
				$(".list_shade").eq(i).css("display","block")
			})
		})
		$(".list li").each(function(i){
			$(this).mouseout(function(e){
//				e.stopPropagation()
				if(Common.inside(e,($(".list_shade").eq(i))) || Common.inside(e,$(".list"))  ){
					
				}else{
					$(".list_shade").css("display","none")
					$(".list").css("display","none")
				}
			})
		})
		$(".list_shade").mouseover(function(){
			$(this).css("display","block")
			$(".list").css("display","block")
		})
		$(".list_shade").mouseout(function(e){
			if( Common.inside(e,$(".list")) || Common.inside(e,$(".list_shade").eq(0)) ){
				}else{
					$(".list").css("display","none") ;
					$(this).css("display","none") ;
				}
			
		
		})
	return this ;
	},
	//移入移出一级菜单
	appear : function(){
		$(".classify_p").mouseover(function(){
			$(".list").css("display","block")
		})
		$(".classify_p").mouseout(function(e){
			if(Common.inside(e,$(".list")) ){
				
			}else{
				$(".list").css("display","none")
			}
		})
	}
}
var Com = {
	show : function(){
		//划入
		$(".commodity").each(function(i){
			$(this).mouseover(function(e){
//				var _top = $(this).offset().top ;
//				var _left = $(this).offset().left ;
				$(this).css({boxShadow:"5px 5px 15px #aaa",zIndex: 50},200) //box阴影

				$(this).stop().animate({width:"338px",height:"502px"},200) //box变大
				$(".commodity_top_imgbox").eq(i).stop().animate({width:"84px"},200) //img
				$(".commodity_con").eq(i).stop().animate({width:"338px"},200)
				$(".commodity_ma").eq(i).stop().animate({width:"338px"},200)
				$(".commodity_ma_btn").eq(i).stop().animate({opacity:1},200)
			})
		})
		//划出
		$(".commodity").each(function(i){
			$(this).mouseout(function(){
				$(this).stop().animate({width:"253px",height:"482px"},200) //box变大
				$(this).css({boxShadow:"",zIndex: 10},200) //box阴影
				$(".commodity_top_imgbox").eq(i).stop().animate({width:0},200) //img
				$(".commodity_con").eq(i).stop().animate({width:"253px"},200)
				$(".commodity_ma").eq(i).stop().animate({width:"253px"},200)
				$(".commodity_ma_btn").eq(i).stop().animate({opacity:0},200)
			})
		})
		//图片切换
		$(".commodity_top_imgch").mouseover(function(){
			var str = $(this).attr("src") ;
			$(this).parent().parent().find(".commodity_top_imgz").attr("src",str) ;
			$(this).parent().find(".commodity_top_imgch").css("border","4px solid #fff")
			$(this).css("border","4px solid #C69A62")
		})
	return this ;
	}
}
var LeftList = {
	numNow : null,
	numAll : null,
	parameter : function(){
		LeftList.numNow = 1 ;
		LeftList.numAll = 0 ;
	return this ;
	},
	
	//点击打开关闭二级菜单
	open : function(){
		$(".prolisttit").each(function(i){
			$(this).click(function(){
				if($(".prolist_ul").eq(i).css("display") == "none"){
					$(".prolist_ul").eq(i).css("display","block")
					$(".prolisttit>span").eq(i).css("background-position","0 0")
				}else{
					$(".prolist_ul").eq(i).css("display","none")
					$(".prolisttit>span").eq(i).css("background-position","-16px 0px")
				}
//				Screen.init().add();
			})
		})
	return this ;
	},
	//选择二级菜单切换右边list信息
	change : function(){
		$(".prolist_ul a").each(function(i){
			$(this).click(function(event){
				event.preventDefault();
				$(".prolist_ul li a").css("color","#828282");
				$(this).css("color","#C7A06B");
				//获取并替换列表信息
				var str = $(this).parent().parent().attr("na") ; //点击对象所属的类
				var str2 = str + "jg" ;
				$.getJSON("data/list.json",function(data){
					var arr = [];
					var arr2 = [];
					var _data = data[str] ;
					var _data2 = data[str2]
					var ostr = JSON.stringify(_data) ;
					var ostr2 =JSON.stringify(_data2) ;
					var num = ostr.split(",").length ;
					for(var i=0;i<num;i++){
						arr.push(_data[i])
						arr2.push(_data2[i])
					}
					$(".proscreen_list>li").remove()
					$(".proscreen_jg>li").remove()
					for(var j=0;j<arr.length;j++){
						$(".proscreen_list").append("<li><a href='#'>" + arr[j]+ "</a></li>")
						$(".proscreen_jg").append("<li><a href='#'>" + arr2[j]+ "</a></li>")
					}
//					Screen.init().add();
				})
				//获取并替换品牌
				$.getJSON("data/comlist.json",function(data){
					var ostr = JSON.stringify(data) ;
					var num = ostr.split("}").length - 2;
					var arrEnd = [] ;
					for(var i=0;i<num;i++){
						var o = "comId_"+i;
						var brand = data[o].brand;
						var old = 0;
						for(var t=0;t<arrEnd.length;t++){
							if( arrEnd[t] == brand ) old = 1 ;
						}
						if(old == 0){
							arrEnd.push(brand) ;
						}else{
							old = 1 ;
						}
					}
					$(".proscreen_pp>li").remove()	
					for(var u=0;u<arrEnd.length;u++){
						$(".proscreen_pp").append("<li><a href='#'>" + arrEnd[u] + "</a></li>")
					}
					Screen.init().add();
				})
				if(i%2 == 0 ){
					LeftList.init2();
				}else{
					LeftList.init();
				}
			})
		})
		console.log(1)
	
	return this ;
	},
	init : function(){
		var pagesAll = "";
		var num = "" ;
		//默认加载内容
		$.getJSON("data/comlist.json",function(data){
			var ostr = JSON.stringify(data) ; //解析数据
			num = ostr.split("}").length - 2; //计算商品数量
			pagesAll = Math.ceil(num / 8)    //计算商品页数
			LeftList.numAll = pagesAll   //保存总页数
			LeftList.numNow = 1
			//将当前页数和总页数插入页面
			$(".pages_sp1,.sorkpage_main_2").text(LeftList.numNow)
			$(".pages_sp3,.sorkpage_main_3").text(LeftList.numAll)
			$(".sorknum>span").text(num) //商品总数
			//将第一页商品信息插入页面
			var startNum = LeftList.numNow * 8 - 7 ;
			for(var i=0;i<8;i++){
				var nnum = startNum + i ;//当前商品
				$(".commodity_top_imgz").eq(i).attr("src","img/com/" +nnum + "-1.jpg")
				$(".commodity_top_imgbox").eq(i).find("img").eq(1).attr("src","img/com/" +nnum + "-1.jpg")
				$(".commodity_top_imgbox").eq(i).find("img").eq(2).attr("src","img/com/" +nnum + "-2.jpg")
				$(".commodity_top_imgbox").eq(i).find("img").eq(3).attr("src","img/com/" +nnum + "-3.jpg")
				var str = "comId_" + nnum ;
				$(".commodity_con_price").eq(i).text("￥" + data[str].price + ".0") //价格
				$(".commodity_con_privilege").eq(i).text(data[str].favorable + "折") //折扣
				$(".commodity_ma").eq(i).find("h4").text( data[str].brand ) //品牌
				$(".commodity_ma_p").eq(i).text( data[str].describe ) //介绍
				$(".commodity_ma").eq(i).find("span").text( "销量：" + data[str].num ) //介绍
			}
			//切换上下页
			$(".sorkpage_btn1>img,.pages_left").click(function(event){
//				event.prelatedTarget()
				$(".boxbox").css("display","block")
				$(".boxbox2").css("mrginLeft","0")
				--LeftList.numNow < 1 ? LeftList.numNow = 1 : LeftList.numNow ; //计算变换后的当前页数
				$(".sorkpage_main_2,.pages_sp1").text(LeftList.numNow) ; //当前页数写进页面
				//刷新商品信息
				$.getJSON("data/comlist.json",function(data){
					var ostr = JSON.stringify(data) ; //解析数据
					LeftList.numAll = pagesAll   //保存总页数
					//将当前页数和总页数插入页面
					$(".pages_sp1,.sorkpage_main_2").text(LeftList.numNow)
					$(".pages_sp3,.sorkpage_main_3").text(LeftList.numAll)
					$(".sorknum>span").text(num) //商品总数
					//将第一页商品信息插入页面
					var startNum = LeftList.numNow * 8 - 7 ;
					for(var i=0;i<8;i++){
						var nnum = startNum + i ;//当前商品
						$(".commodity_top_imgz").eq(i).attr("src","img/com/" +nnum + "-1.jpg")
						$(".commodity_top_imgbox").eq(i).find("img").eq(1).attr("src","img/com/" +nnum + "-1.jpg")
						$(".commodity_top_imgbox").eq(i).find("img").eq(2).attr("src","img/com/" +nnum + "-2.jpg")
						$(".commodity_top_imgbox").eq(i).find("img").eq(3).attr("src","img/com/" +nnum + "-3.jpg")
						var str = "comId_" + nnum ;
						$(".commodity_con_price").eq(i).text("￥" + data[str].price + ".0") //价格
						$(".commodity_con_privilege").eq(i).text(data[str].favorable + "折") //折扣
						$(".commodity_ma").eq(i).find("h4").text( data[str].brand ) //品牌
						$(".commodity_ma_p").eq(i).text( data[str].describe ) //介绍
						$(".commodity_ma").eq(i).find("span").text( "销量：" + data[str].num ) //介绍
					}
				})
			})
//		下一页
			$(".sorkpage_btn2>img,.pages_rig,.boxbox2>img").click(function(event){
//				event.prelatedTarget()
				++LeftList.numNow > LeftList.numAll ? LeftList.numNow = LeftList.numAll  : LeftList.numNow ; //计算变换后的当前页数
				$(".sorkpage_main_2,.pages_sp1").text(LeftList.numNow) ; //当前页数写进页面
				//刷新
				$.getJSON("data/comlist.json",function(data){
					var ostr = JSON.stringify(data) ; //解析数据
					LeftList.numAll = pagesAll   //保存总页数
					//将当前页数和总页数插入页面
					$(".pages_sp1,.sorkpage_main_2").text(LeftList.numNow)
					$(".pages_sp3,.sorkpage_main_3").text(LeftList.numAll)
					$(".sorknum>span").text(num) //商品总数
					//将商品信息插入页面
					if(LeftList.numNow == pagesAll){
						var remainder = num % 8;
						$(".boxbox").eq(remainder,7).css("display","none")
						$(".boxbox").eq(6).css("marginRight","25px")
					}					
					var startNum = LeftList.numNow * 8 - 7 ;
					for(var i=0;i<8;i++){
						var nnum = startNum + i ;//当前商品
						$(".commodity_top_imgz").eq(i).attr("src","img/com/" +nnum + "-1.jpg")
						$(".commodity_top_imgbox").eq(i).find("img").eq(1).attr("src","img/com/" +nnum + "-1.jpg")
						$(".commodity_top_imgbox").eq(i).find("img").eq(2).attr("src","img/com/" +nnum + "-2.jpg")
						$(".commodity_top_imgbox").eq(i).find("img").eq(3).attr("src","img/com/" +nnum + "-3.jpg")
						var str = "comId_" + nnum ;
						$(".commodity_con_price").eq(i).text("￥" + data[str].price + ".0") //价格
						$(".commodity_con_privilege").eq(i).text(data[str].favorable + "折") //折扣
						$(".commodity_ma").eq(i).find("h4").text( data[str].brand ) //品牌
						$(".commodity_ma_p").eq(i).text( data[str].describe ) //介绍
						$(".commodity_ma").eq(i).find("span").text( "销量：" + data[str].num ) //介绍
					}
				})
			})
		})
	return this ;
	},
	init2 : function(){
		var numNow = 1 ;
		var numAll = 0 ;
		var num = 185
		//默认加载内容
		$.getJSON("data/comlist.json",function(data){
			numAll = Math.ceil(num / 8)
			//将当前页数和总页数插入页面
			$(".pages_sp1,.sorkpage_main_2").text(numNow)
			$(".pages_sp3,.sorkpage_main_3").text(numAll)
			$(".sorknum>span").text(numAll) //商品总数
			//将第一页商品信息插入页面
			var startNum = 15 ;
			for(var i=0;i<8;i++){
				var nnum = startNum + i ;//当前商品
				$(".commodity_top_imgz").eq(i).attr("src","img/com/" +nnum + "-1.jpg")
				$(".commodity_top_imgbox").eq(i).find("img").eq(1).attr("src","img/com/" +nnum + "-1.jpg")
				$(".commodity_top_imgbox").eq(i).find("img").eq(2).attr("src","img/com/" +nnum + "-2.jpg")
				$(".commodity_top_imgbox").eq(i).find("img").eq(3).attr("src","img/com/" +nnum + "-3.jpg")
				var str = "comId_" + nnum ;
				$(".commodity_con_price").eq(i).text("￥" + data[str].price + ".0") //价格
				$(".commodity_con_privilege").eq(i).text(data[str].favorable + "折") //折扣
				$(".commodity_ma").eq(i).find("h4").text( data[str].brand ) //品牌
				$(".commodity_ma_p").eq(i).text( data[str].describe ) //介绍
				$(".commodity_ma").eq(i).find("span").text( "销量：" + data[str].num ) //介绍
			}
			
		})
	}
}
//商品筛选
var Screen = {
	classify : null,//分类
	brand : null,//品牌
	price : null, //价格
//	arr_end : null,
	init : function(){
		Screen.classify = "" ;
		Screen.brand = "" ;
		Screen.price = "" ;
//		Screen.arr_end = [];
	return this ;
	},
	play : function(){
		var arr_end = [];
		$.getJSON("data/comlist.json",function(data){
			var ostr = JSON.stringify(data);  //解析数据
			var num = ostr.split("}").length - 2; //计算商品总数量
			for(var i=0;i<num;i++){
				var str = "comId_" + i ;
				var price_num = data[str].price ;
				if(price_num >= 0 && price_num < 100){
					price_num = "0-100元" ;
				}else if(price_num >=100 && price_num < 200 ){
					price_num = "100-200元" ;
				}else if(price_num >=200 && price_num < 500 ){
					price_num = "200-500元" ;
				}else if(price_num >=500 && price_num < 1000 ){
					price_num = "500-1000元" ;
				}else{
					price_num = "1000元以上" ;
				}
				//筛选出符合要求的加入数组
				if(
					(Screen.classify == data[str].classify || Screen.classify == "")
					&& (Screen.brand == data[str].brand || Screen.brand == "")
					&& (Screen.price == price_num || Screen.price == "")
				){
					arr_end.push(str)
				}
			}
			var arr_num = arr_end.length ;
			
			pagesAll = Math.ceil(arr_num / 8)    //计算商品页数
//			LeftList.numAll = pagesAll   //保存总页数
//			LeftList.numNow = 1
			//将当前页数和总页数插入页面
			$(".pages_sp1,.sorkpage_main_2").text(LeftList.numNow)
			$(".pages_sp3,.sorkpage_main_3").text(pagesAll)
			$(".sorknum>span").text(arr_num) //商品总数
			
			//删除多余
			$(".boxbox").css("display","block")
			if( arr_num <= 8 ){
				$(".boxbox").slice(arr_num,8).css("display","none")
			}else{
				arr_num = 8 ;
			}
			//将第一页商品信息插入页面
			var startNum = 1 ;
			for(var i=0;i<arr_num;i++){
				var nnum = startNum + i ;//当前商品
				var data_num = arr_end[i]
				var _data = data[data_num]
				$(".commodity_top_imgz").eq(i).attr("src","img/com/" +nnum + "-1.jpg")
				$(".commodity_top_imgbox").eq(i).find("img").eq(1).attr("src","img/com/" +nnum + "-1.jpg")
				$(".commodity_top_imgbox").eq(i).find("img").eq(2).attr("src","img/com/" +nnum + "-2.jpg")
				$(".commodity_top_imgbox").eq(i).find("img").eq(3).attr("src","img/com/" +nnum + "-3.jpg")
				var str = "comId_" + nnum ;
				$(".commodity_con_price").eq(i).text("￥" + data[data_num].price + ".0") //价格
				$(".commodity_con_privilege").eq(i).text(data[data_num].favorable + "折") //折扣
				$(".commodity_ma").eq(i).find("h4").text( data[data_num].brand ) //品牌
				$(".commodity_ma_p").eq(i).text( data[data_num].describe ) //介绍
				$(".commodity_ma").eq(i).find("span").text( "销量：" + data[data_num].num ) //介绍
			}
			
		})
	return this ;
	},
	add : function(){
	//分类增加
		$(".proscreen_list a").each(function(i){
			$(this).click(function(e){
				e.stopPropagation()
				var str = $(".proscreen_list a").eq(i).text() ;
				$(".pro_classify").css("display","block")
				$(".pro_classify span").text(str)
				Screen.classify =str;
				Screen.play();
			})
		})
	//分类删除
		$(".pro_classify img").click(function(){
			$(".pro_classify").css("display","none")
			Screen.classify = "";
			Screen.play();
		})
	//品牌增肌	
		$(".proscreen_pp li a").each(function(i){
			$(this).click(function(e){
				e.stopPropagation()
				var str = $(".proscreen_pp a").eq(i).text() ;
				$(".pro_brand").css("display","block")
				$(".pro_brand span").text(str)
				Screen.brand = str ;
				Screen.play();
			})
		})
		
	//品牌删除
		$(".pro_brand img").click(function(){
			$(".pro_brand").css("display","none")
			Screen.brand = "";
			Screen.play();
		})
	//价格增加	
		$(".proscreen_jg li a").each(function(i){
			$(this).click(function(e){
				e.stopPropagation()
				var str = $(".proscreen_jg a").eq(i).text() ;
				$(".pro_price").css("display","block")
				$(".pro_price span").text(str)
				Screen.price = str ;
				Screen.play();
			})
		})
		
	//价格删除
		$(".pro_price img").click(function(){
			$(".pro_price").css("display","none")
			Screen.price = "";
			Screen.play();
		})
	//	全部清除	
		$(".proscreen_protit_2").click(function(){
			$(".pro_classify").css("display","none")
			$(".pro_brand").css("display","none")
			$(".pro_price").css("display","none")
			Screen.classify = "";
			Screen.brand = "";
			Screen.price = "";
			Screen.play();
		})
	//销售量排序
		$(".sork_xs").click(function(){
			var arr_end = [];
			$.getJSON("data/comlist.json",function(data){
				var ostr = JSON.stringify(data);  //解析数据
				var num = ostr.split("}").length - 2; //计算商品总数量
				for(var i=0;i<num;i++){
					var str = "comId_" + i ;
					var price_num = data[str].price ;
					if(price_num >= 0 && price_num < 100){
						price_num = "0-100元" ;
					}else if(price_num >=100 && price_num < 200 ){
						price_num = "100-200元" ;
					}else if(price_num >=200 && price_num < 500 ){
						price_num = "200-500元" ;
					}else if(price_num >=500 && price_num < 1000 ){
						price_num = "500-1000元" ;
					}else{
						price_num = "1000元以上" ;
					}
					//筛选出符合要求的加入数组
					if(
						(Screen.classify == data[str].classify || Screen.classify == "")
						&& (Screen.brand == data[str].brand || Screen.brand == "")
						&& (Screen.price == price_num || Screen.price == "")
					){
						arr_end.push(str)
					}
				}
			console.log(11111,arr_end)
			if(arr_end.length>8) arr_end.length = 8 ;
			for(var j=0;j<arr_end.length;j++){
				for(var n=0;n<arr_end.length-j;n++){
					console.log(data.arr_end[n])
					if(data.arr[n].num < objB[num] ){
						var num_end;
						num_end = arr_end[j];
						arr_end[j] = arr_end[j+1];
						arr_end[j+1] = num_end;
					}
					
				}
			}
			console.log(22222,arr_end)
			})
			
			
		})
		$(".commodity_top_imgz ").click(function(){
			window.location.href="particulars.html"
		})
	return this ;	
	}
}
//var Shopcars = {
//	$(".commodity_ma_btn").each(function(i){
//		$(this).click(function(){
//			console.log($(this))
//		})
//	})
//}




