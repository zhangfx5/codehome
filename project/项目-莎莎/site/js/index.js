function indexInit(){
	Topad.init().close();//顶部广告
	Module.brand().hidd().lable()//模块列表
	List.rail().menu() //分类列表
	Banner.floor().play() //轮播图
	Ad.fun();
	Seek.scroll() //滚动
	Day.mouseover() //每日上新
	Main.limit().hot().hotlist() //限时特卖、热门品牌
}

//顶部广告	
var Topad = {
	init : function(){
		$("#topadbox").animate({"height":200},1200)
	return this ;	
	},
	close : function(){
		$(".topadbtn").click(function(){
			$("#topadbox").animate({"height":0},800)
		})
	return this ;
	}
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
	rail : function(){
		$(".classify_nav li").each(function(i){
			$(this).mouseover(function(){
				var _x = $(this).offset().left - 666 ;
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
	menu : function(){
		$(".list li").each(function(i){
			$(this).mouseover(function(){
				$(".list_shade").css("display","none")
				$(".list_shade").eq(i).css("display","block")
			})
		})
		$(".list li").each(function(i){
			$(this).mouseout(function(e){
				e = e || event ;
				if(Common.inside(e,($(".list_shade").eq(i)))){
					
				}else{
					$(".list_shade").css("display","none")
				}
			})
		})
		$(".list_shade").mouseover(function(){
			$(this).css("display","block")
		})
		$(".list_shade").mouseout(function(){
			$(this).css("display","none")
		})
	}
}
var Banner = {
	num : null,
	init : function(){
		num = 0;
	return this ;
	},
	floor : function(){
		$(".banner_dasha a").each(function(i){
			$(this).mouseover(function(){
				Banner.num = i ;
				$(".banner_dasha a").css("background","#fff")
				$(".banner_dasha a").eq(i).css("background","#C69A62")
				$(".banner").not($(".banner").eq(i)).animate({opacity: 0 },400)
				$(".banner").eq(i).animate({opacity:1},600)
			})
		})
	return this ;
	},
	play : function(){
		setInterval(function(){
			++Banner.num > 4 ? Banner.num = 0 : Banner.num ;
			$(".banner_dasha a").css("background","#fff")
			$(".banner_dasha a").eq(Banner.num).css("background","#C69A62")
			$(".banner").not($(".banner").eq(Banner.num)).animate({opacity: 0 },400)
			$(".banner").eq(Banner.num).animate({opacity:1},600)
		},3000)
	}
}
var Ad = {
	fun : function(){
		$(".index_adbox").mouseover(function(){
			$(this).animate({right:"37px"},600)
		})
		$(".index_adbox").mouseout(function(){
			$(this).animate({right:"-378px"},600)
		})
	}
}
var Seek = {
	scroll : function(){
		$(window).scroll(function(){
			var num = $("html body").scrollTop() ;
			if( num > 500 ){
				$(".seek-dasha").css("display","block")
				$(".seek-dasha").animate({"opacity":1},300,function(){
					$(".seekTop").css({position:"fixed",top:"10px",left:"50%",marginLeft:"-210px"})
				})
			}else{
				$(".seek-dasha").animate({"opacity":0},300,function(){
					$(".seek-dasha").css("display","none")
					$(".seekTop").css({position:"",top:"",left:"",marginLeft:""})
				})
			}
		})
	}
}
var Day = {
	mouseover : function(){
		$(".dayimg").each(function(i){
			$(this).mouseover(function(){
				$(".dayleft").css("display","none")
				$(".dayleft").eq(i).css("display","block")
				$(".dayrig").css("display","none")
				$(".dayrig").eq(i).css("display","block")
			})
		})
	}
}
var Main = {
	limit : function(){
		$(".maincon").mouseover(function(){
			$(this).css("box-shadow","10px 10px 10px #aaa")
		})
		$(".maincon").mouseout(function(){
			$(this).css("box-shadow","")
		})
	return this ;
	},
	hot : function(){
		$(".mainconlist>li").each(function(i){
			$(this).mouseover(function(){
				$(".hotlist").eq(i).css("display","block").siblings().css("display","none")
				$(".mainconlist>li").eq(i).css({borderBottom:"2px solid #C69A62",color:"#EC3E7D"}).siblings().css({borderBottom:0,color:""})
			})
		})
	return this ;
	},
	hotlist : function(){
		$(".hotimg").mouseover(function(){
			$(this).stop().animate({top:"-150px"},300)
		})
		$(".hotimg").mouseout(function(){
			$(this).stop().animate({top:0},300)
		})
	}
}
