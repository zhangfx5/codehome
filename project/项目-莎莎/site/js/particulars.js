function particularsInit(){
	Module.brand().hidd().lable()//模块列表
	List.rail().menu().appear() //分类列表
	ParImg.magnifying().imgReplace().standard().num().listFloat().click().scroll() //
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
//商品图片
var ParImg = {
//	//放大镜效果
//	magnifying : function(){
//		$(".par_1left_conimg_box").mouseover(function(){
//			console.log(111)
//			$(".par_1shade,.par_1left_conimg_s").css("display","block")  //右侧和鼠标框出现
//			$(".par_1left_conimg_box").mousemove(function(e){ //鼠标移动时
//				var _x = e.pageX ; //鼠标位置
//				var _y = e.pageY ;
//				var nx = $(".par_1left_conimg_box").offset().left //图片的位置
//				var ny = $(".par_1left_conimg_box").offset().top //图片的位置
//				//阻止鼠标超出范围
//				if( _x <= 205 ) _x = 205
//				if( _x >= 520 ) _x = 520
//				if( _y <= 363 ) _y = 363
//				if( _y >= 513 ) _y = 513
//				$(".par_1left_conimg_s").css({"top":_y - ny - 75})
//				$(".par_1left_conimg_s").css({"left":_x - nx - 90})
//				//右侧图片变化
//				$(".par_1shade>img").css({"top":- 2 *(_y - ny - 75)})
//				$(".par_1shade>img").css({"left":-(_x - nx - 75)})
//			})
//		})
//			$(".par_1left_conimg_box").mouseout(function(){
//				$(".par_1shade,.par_1left_conimg_s").css("display","none")  //右侧和鼠标框消失
//			})
//	return this ;
//	},
	magnifying : function(){
		var fdj = new Magn({
			small:".par_1left_conimg",
			box : ".par_1left_conimg_s",
			big : ".par_1shade",
			bigImg : ".par_1shade_img",
			
		})
		fdj.move()
	return this ;
	},
	//商品图片替换效果
	imgReplace : function(){
		$(".par_1left_ulbox img").each(function(i){
			$(this).mouseover(function(){
				var str = $(this).attr("src")
				$(".par_1left_conimg>img").attr("src",str)
				$(".par_1shade>img").attr("src",str)
				$(".par_1left_ulbox li").css("border","1px solid #ddd")
				$(".par_1left_ulbox img").css("border","4px solid #fff")
				
				$(".par_1left_ulbox li").eq(i).css("border","1px solid #C69A62")
				$(".par_1left_ulbox img").eq(i).css("border","4px solid #C69A62")
				
			})
		})
		$(".par_1left_ulbtn1").click(function(){
			console.log($(".par_1left_ul").css("margin-left"))
			$(".par_1left_ul").animate({
				marginLeft: parseInt($(".par_1left_ul").css("marginLeft")) + 100 + "px"  
			},200)
		})
		$(".par_1left_ulbtn2").click(function(){
			console.log($(".par_1left_ul").css("margin-left"))
			$(".par_1left_ul").animate({
				marginLeft: parseInt($(".par_1left_ul").css("marginLeft")) - 100 + "px"  
			},400)
		})
	return this ;	
	},
	//选择规格
	standard : function(){
		$(".par_1rig_standard p").click(function(){
			$(".par_1rig_standard p").css("border","1px solid #888")
			$(this).css({border:"1px solid #DB3F7E"})
		})
	return this ;
	},
	//商品数量
	num : function(){
//		按钮增加个数
		$(".par_1rig_standard2_a1").click(function(){
			var numbers = $(".par_1rig_standard2_a input").val()
			if( numbers > 1 ) --numbers;
			$(".par_1rig_standard2_a input").val(numbers)
		})
//		按钮减少个数
		$(".par_1rig_standard2_a2").click(function(){
			var numbers = $(".par_1rig_standard2_a input").val()
			if( numbers < 99 ) ++numbers;
			$(".par_1rig_standard2_a input").val(numbers)
		})
//		失去焦点时检测
		$("#btn_input").blur(function(){
			console.log(111)
			var numbers = $(".par_1rig_standard2_a input").val();
			if( numbers < 1 ){
				numbers = 1 ;
			}else if( numbers > 99 ){
				numbers = 99 ;
			}
			$(".par_1rig_standard2_a input").val(numbers)
		})
	return this ;
	},
	//商品详情list浮动
	listFloat : function(){
		$(window).scroll(function(){
			var _top = $(".par_2rig_tab").offset().top;
			var _left = $(".par_2rig_tab").offset().left;
			var otop = $(document).scrollTop()
			console.log(_top,otop)
			if( otop > 964){
				$(".par_2rig_tab").css({position:"fixed",zIndex:999,top:0,left:_left,boxShadow:"2px 2px 10px #333"})
			}else{
				$(".par_2rig_tab").css({position:"",boxShadow:""})
			}
		})
	return this ;
	},
	click : function(){
		$(".par_2rig_tab_li1").click(function(){
			$("body,html").animate({scrollTop:960},600)
			$(".par_2rig_tab li").css("border-bottom","3px solid #fff")
			$(this).css("border-bottom","3px solid #C69A62")
		})
		$(".par_2rig_tab_li2").click(function(){
			$("body,html").animate({scrollTop:1360},600)
			$(".par_2rig_tab li").css("border-bottom","3px solid #fff")
			$(this).css("border-bottom","3px solid #C69A62")
		})
		$(".par_2rig_tab_li3").click(function(){
			$("body,html").animate({scrollTop:3710},600)
			$(".par_2rig_tab li").css("border-bottom","3px solid #fff")
			$(this).css("border-bottom","3px solid #C69A62")
		})
	return this ;
	},
	//滑动变换
	scroll : function(){
		$(window).scroll(function(){
			var otop = $(document).scrollTop();
			if( otop <= 960 ){
				$(".par_2rig_tab li").css("border-bottom","3px solid #fff")
				$(".par_2rig_tab_li1").css("border-bottom","3px solid #C69A62")
			}else if( otop > 960 && otop <= 1360 ){
				$(".par_2rig_tab li").css("border-bottom","3px solid #fff")
				$(".par_2rig_tab_li2").css("border-bottom","3px solid #C69A62")
			}else{
				$(".par_2rig_tab li").css("border-bottom","3px solid #fff")
				$(".par_2rig_tab_li3").css("border-bottom","3px solid #C69A62")
			}
		})
	}
}
