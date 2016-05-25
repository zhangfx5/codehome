//回到顶部
var backTop=function(){
	$("html,body").animate({scrollTop:0},500);
}


$(".footer-top-btn").on("click",backTop);
$(".rightnav-backtop").on("click",backTop);


//nav部分的jquery
$("#navigation li").hover(function(){
	$(this).toggleClass("nav-active");
})
$("#nav_specail").hover(function(){
	$("#nav_specail_div").toggle();
})


//控制覆盖全部图片的模态窗口的显示
	$(".modal-all-box").hover(function(){
		var mtleft=$(this).position().left+parseInt($(this).css("margin-left"));
		var mttop=$(this).position().top+parseInt($(this).css("margin-top"));
		var mtwidth=$(this).width();
		var mtheight=$(this).height();
		$(this).children().eq(1).toggle().css({left:mtleft,top:mttop,width:mtwidth,height:mtheight});
	})
	
//我的账户导航栏公共js
	$(".mypage-nav-li").hover(function(){
		$(this).toggleClass("mypage_nav_li_hover");
	})
