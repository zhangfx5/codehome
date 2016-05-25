
//控制banner部分的模态窗口的显示
$("#banner img").parent().hover(function(event){
	var mtleft=$(this).children().eq(0).offset().left;
	var mttop=$(this).children().eq(0).offset().top + $(this).children().eq(0).height()-$(this).children().eq(1).height();
	var mtwidth=$(this).children().eq(0).width();
	$(this).children().eq(1).toggle().css({left:mtleft,top:mttop,width:mtwidth});
})
//控制轮播图的切换
$(".lbt-left-btn").on("click",function(){//点击向左移动按钮
	var wid=$(".lbt-img").eq(0).width();
	$(".lbt-img").eq(0).animate({width:0},500,function(){
		$(".lbt-img").eq(0).appendTo($(".lbt-img-list")).css({"width":wid});
	});
	
});
$(".lbt-right-btn").on("click",function(){//点击向右移动按钮
	var wid=$(".lbt-img").filter(":last").width();
	$(".lbt-img").filter(":last").css({"width":0}).prependTo($(".lbt-img-list"));
	$(".lbt-img").eq(0).animate({width:wid},500,"linear");
});

//跳转至商品详细页面
$(".nav-specail-div-img,#banner div>img,.lbt-img,.img-modal-all,#main img,.img-modal").on("click",function(){
	console.log("1");
	window.location.href="goodsInfo.html";
})
