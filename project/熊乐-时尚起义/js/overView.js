$(function(){
	init();
	function init(){
		var point=$(".mypage-overview-user-grade-point>span").html()/20;
		$(".mypage-overview-user-grade-color").css("width",point+"%")
	}
})
