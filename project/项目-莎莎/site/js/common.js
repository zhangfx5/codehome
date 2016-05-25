
var Common = window.Common || {} ;

//通过A元素的某个事件，通过制定方式改变A，B两个元素，并判断执行完毕后鼠标是否在B元素上方
//通过json格式传入需要的参数 
Common.changeTwoCss = function(parameter){
	var defa = {
		conttEle : null, //控制元素
		beingEle : null,  //被控制元素
		move : "mouseenter", //触发事件
		conttEleFun : "css" ,    //控制元素样式变化方式
		beingEleFun : "animate" ,    //被控制元素样式变化方式  
		conttEleNew : {} ,  //控制元素新样式
		beingEleNew : {} ,   //被控制元素新样式
		conttTime : 500,   //控制元素样式变化时间	
		beingTime : 500,   //被控制元素样式变化时间	
		state1 : "block" ,   //元素状态
		state2 : "block" ,
		bool : "ture"  , //是否打开检测2级菜单停留
	}
	var para = $.extend( {} , defa , parameter ); 
	var conttEleNew=para.conttEleNew ;
	var beingEleNew=para.beingEleNew ;
	para.conttEle.each(function(i){
		if(para.bool == "ture" && para.move == "mouseover"){
			$(this)[para.move](function(e){
				var num = i ;
				var _x = e.pageX ;
				var _y = e.pageY ;
				var nx = $(para.beingEle[i]).offset().left;
				var ny = $(para.beingEle[i]).offset().top;
				var mx = $(para.beingEle[i]).width();
				var my = $(para.beingEle[i]).height();
				if(_x > nx && _x < (nx + mx) && _y > ny && _y < (ny + my) ){
					
				}else{
		console.log(123)
					var num = i ;
					$(this).stop()[para.conttEleFun](conttEleNew,para.conttTime);
					$(para.beingEle[i]).css("display",para.state1) ;
					$(para.beingEle[i]).stop()[para.beingEleFun](beingEleNew,para.beingTime,function(){
 
					})
				}
			})
		
		}else{
			$(this)[para.move](function(){
				var num = i ;
				$(this).stop()[para.conttEleFun](conttEleNew,para.conttTime);
				$(para.beingEle[i]).css("display",para.state1) ;
				$(para.beingEle[i]).stop()[para.beingEleFun](beingEleNew,para.beingTime,function(){
					$(para.beingEle[i]).css("display",para.state2) ;
				}) ;
			})
		}
		return
	})
}
//判断鼠标的当前是否在传入对象的范围内
//在范围内返回true，不在返回false
Common.inside = function(e,dom){
	var _x = e.pageX ;
	var _y = e.pageY ;
	var nx = dom.offset().left;
	var ny = dom.offset().top;
	var mx = dom.width();
	var my = dom.height();
//	console.log(_x,_y,nx,ny,mx,my)
	if(_x > nx && _x < (nx + mx) && _y > ny && _y < (ny + my)){
		return true;
	}else{
		return false;
	}
}
//将json格式字符串处理为可直接使用的对象
Common.jsonToObj = function(json){
	return eval(json)[0]
}
//在cookie中的查找ostr项/组并返回
Common.getCookie = function(ostr){
	var str = document.cookie;
	var str1=str.split("; ");
	var strend = '';
	for(var i=0;i<str1.length;i++){
		var arr = str1[i].split("=") ;
		if( arr[0] == ostr ) strend = arr[1]
	}
	return strend ;
}

//删除指定cookid
Common.delCookie = function(str){
	var time = new Date() ;
	time.setTime(time.getTime() - 1);
	var oldCookie = Common.getCookie(str) ;
	if(oldCookie != null ){
		document.cookie= str + "="+oldCookie+";expires="+time.toGMTString()
	}
}


//放大镜
function Magn(obj){
		var that=this;
		this.small=$(obj.small);
		this.box=$(obj.box);
		this.big=$(obj.big);
		this.bigImg=$(obj.bigImg);
		this.sleft=$(obj.small).offset().left;
		this.stop=$(obj.small).offset().top;
		this.boxw=$(obj.box).width();
		this.boxh=$(obj.box).height();
		this.move=function(){
			that.small.mousemove(function(e){
				that.big.css("display","block");
				that.box.css({display:"block"});
				that.box.css({left:e.pageX-that.sleft-that.boxw/2,top:e.pageY-that.stop-that.boxh/2})
				if(e.pageX-that.sleft<that.boxw/2){
					that.box.css("left","0px")
				};
				if(e.pageX>that.sleft+that.small.width()-that.boxw/2){
					that.box.css("left",that.small.width()-that.boxw);
				};
				if(e.pageY-that.stop<that.boxh/2){
					that.box.css("top","0px")
				};
				if(e.pageY>that.stop+that.small.height()-that.boxh/2){
					that.box.css("top",that.small.height()-that.boxh);
				};
				that.bigImg.css("left",-that.box.position().left*2);
				that.bigImg.css("top",-that.box.position().top*2);
			})
			that.small.mouseout(
				function(){
					that.box.css({display:"none"});
					that.big.css("display","none");
				}
			)
		}
}

















