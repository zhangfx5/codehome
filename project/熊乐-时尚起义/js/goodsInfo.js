$(function(){
	var flagcolor=false;
	var flagsize=false;
	//当商品颜色的按钮被点击时，改变按钮样式，同时将所选择的颜色显示在对应部分
	$(".ginfo-information-info-li-color .ginfo-information-info-li-val-select").on("click", function() {
		$(this).addClass("ginfo-information-info-li-val-select-active").siblings().removeClass("ginfo-information-info-li-val-select-active");
		var color = $(this).html();
		$(".ginfo-information-info-selected-show").eq(0).show().html(color);
		flagcolor=true;
	})
	//当商品尺寸的按钮被点击时，改变按钮样式，同时将所选择的尺寸显示在对应部分
	$(".ginfo-information-info-li-size .ginfo-information-info-li-val-select").on("click", function() {
		$(this).addClass("ginfo-information-info-li-val-select-active").siblings().removeClass("ginfo-information-info-li-val-select-active");
		var size = $(this).html();
		$(".ginfo-information-info-selected-show").eq(1).show().html(size);
		flagsize=true;
	})
	//当商品颜色和尺寸的按钮被滑过时，改变按钮样式
	$(".ginfo-information-info-li-val-select").hover(function() {
		$(this).toggleClass("ginfo-information-info-li-val-select-hover");
	})
	
	//当加入购物车和加入暂存架按钮被滑过时，改变按钮样式
	$(".ginfo-information-info-selected-btn-box").children().hover(function() {
		$(this).toggleClass("ginfo-information-info-selected-btn-hover");
	})
	//点击商品数量增加按钮
	$(".ginfo-information-info-number-add").on("click", function() {
		var num = $(".ginfo-information-info-number-show").val();
		$(".ginfo-information-info-number-show").val(parseInt(num) + 1);
	})
	//点击商品数量减少按钮
	$(".ginfo-information-info-number-minus").on("click", function() {
		var num = $(".ginfo-information-info-number-show").val();
		if (parseInt(num) - 1 >= 1) {
			$(".ginfo-information-info-number-show").val(parseInt(num) - 1);
		} else {
			alert("购买数量不能小于1");
		}
	})
	//直接在商品数量部分输入，输入完毕input失去按钮时，若输入的不是数字或者数量小于1时提示错误
	$(".ginfo-information-info-number-show").on("blur", function() {
		var flag = /^\d+$/g.test($(".ginfo-information-info-number-show").val());
		if (flag) {
			if (parseInt($(".ginfo-information-info-number-show").val())< 1){
				alert("购买数量不能小于1");	
				$(".ginfo-information-info-number-show").val("1");
			}
		}else{
			alert("请输入合法的购买数量")
			$(".ginfo-information-info-number-show").val("1");
			
		}
	})
	//当ginfo-page-btn-box部分的按钮被滑过时，改变按钮样式
	$(".ginfo-page-btn").hover(function(){
		$(this).toggleClass("ginfo-page-btn-hover");
	})
	
	//当ginfo-page-btn-box部分的按钮被点击时，改变按钮样式并且显示对应部分内容 
	$(".ginfo-page-btn").on("click",function(){
		var i=$(this).index();
		$(this).addClass("ginfo-page-btn-active").siblings().removeClass("ginfo-page-btn-active");
		
		$(".ginfo-page").hide();
		$(".ginfo-page").eq(i).show();
	})
	//放大镜特效
	var fdjbox=$(".fdj-box").get(0);
	var fdj=$(".fdj").get(0);
	var fdjshow=$(".fdj-show").get(0);
	var fdjimg=$(".fdj-img").get(0);
	fdjbox.onmouseover=function(){
		fdj.style.display="block";
		fdjshow.style.display="block";
	}
	fdjbox.onmouseout=function(){
		fdj.style.display="none";
		fdjshow.style.display="none";
	}
	fdjbox.onmousemove=function(e){
		var ev=e||event;
		var xx=ev.offsetX;
		var xy=ev.offsetY;//获得鼠标位置
		var x=xx-fdj.offsetWidth/2;
		var y=xy-fdj.offsetHeight/2;//获得放大镜位移
		if(x<0){
			x=0;
		}else if(x>fdjbox.offsetWidth-fdj.offsetWidth){
			x=fdjbox.offsetWidth-fdj.offsetWidth;
		}
		if(y<0){
			y=0;
		}else if(y>fdjbox.offsetHeight-fdj.offsetHeight){
			y=fdjbox.offsetHeight-fdj.offsetHeight;
		}
		fdj.style.left=x+"px";
		fdj.style.top=y+"px";
		var imgx=-fdj.offsetLeft*fdjshow.offsetWidth/fdj.offsetWidth;
		var imgy=-fdj.offsetTop*fdjshow.offsetHeight/fdj.offsetHeight;//获得放大图片的位置
		console.log(imgx,imgy);
		fdjimg.style.top=imgy+"px";
		fdjimg.style.left=imgx+"px";
	}
	//加入购物车
	$(".ginfo-information-info-selected-btn-shoppingcar").click(function(){
		if(flagcolor){
			if(flagsize){
				this.innerHTML="我要去结算";
				var colorselected=$(".ginfo-information-info-selected-show ").eq(0).html();//选中的颜色
				var sizeselected=$(".ginfo-information-info-selected-show ").eq(1).html();//选中的尺寸
				var num=$(".ginfo-information-info-number-show").val();//加入购物车的数量
//				alert(num);
				$(this).unbind("click");
				$(this).click(function(){
					if(sessionStorage.logState){
						window.location.href="myCar.html";
					}else{
						alert("请先登录")
					}
				})
			}else{
				alert("请选择尺寸");
			}
		}
		else{
			alert("请选择颜色")
		}
	})
})