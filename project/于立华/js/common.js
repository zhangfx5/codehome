//1、获取非行内元素属性；
//顺序？？？？？？？？？？？？？？？
function getStyle(obj,attr){
	if( obj.currentStyle ){
		return obj.currentStyle[attr]; //兼容IE6、7、8；
	}else{
		return getComputedStyle(obj)[attr];//getComputedStyle.width 中的"."连接的具体的某个属性；
	}
}
//function getStyle(obj,attr){
//	if( obj.getComputedStyle ){
//		return getComputedStyle(obj)[attr];//getComputedStyle.width 中的"."连接的具体的某个属性；
//	}else{
//		return obj.currentStyle[attr]; //兼容IE6、7、8；
//	}
//}

//2、阻止冒泡；
function stopProp(e){
	var e = e || event;
	//e.stopPropagation ?　e.stopPropagation() : e.cancelBubble = true ;
	if(e.stopPropagation){
		return e.stopPropagation();//非IE写法；
	}else{
		return e.cancelBubble = true;//IE写法；
	}
}

//3、阻止浏览器默认行为（rerun false）；
//非IE event.preventDefault();
//IE window.event.returnValue = false;

//4、获取时间目标对象；
function getTarget(e){
	var e = e || event;
	var targetElement = e.target || e.srcElement;
	return targetElment;
}

//5、获取class名；
function getClass(cName,obj){//若传入obj则在其父元素范围获取，不传则认为在全局中获取；
	var obj = obj || document;
	var cNameArr = [];
	
	var all = obj.getElementsByTagName("*");
	for(var i=0;i<all.length;i++){
		var clsNameArr = all[i].className.split(" ");//取多个class名时，用空格分割；
		for(var j=0;j<clsNameArr.length;j++){
			if( cName == clsNameArr[j] ){
				cNameArr.push( clsNameArr[j] );
			}
		}
	}
	return cNameArr;
}

////封装函数，兼容获取class名
//			function getClass(clsName,parent){//传入class名、父层标签（也可以不传）；
//				var par = parent || document;
//				
//				var cNameArr = [];//存放class名为clsName的标签
//				var all = par.getElementsByTagName("*");//获取par下所有标签
//				for(var i=0;i<all.length;i++){//遍历获取的父层或document下的所有标签
//					var cName = all[i].className;//获取上述获取标签的class名
//					var arr = cName.split(" ");//将获取class名用空格切割(多个class名时)，返回到数组arr
//					for(var j=0;j<arr,length;j++){//遍历切割后的class名中每一个class名
//						if(  arr[j] == clsName ){//如果和传入的clsName一样
//							cNameArr.push(all[i]);//放入数组cNameArr中
//						}
//					}
//					
//				}
//				return cNameArr;//返回得到的数组（包含所有类名为clsName的标签），即取到所有类名为clsName的标签
//			}

//6、无缝滚动效果；
function tabLinear(InnerDiv,ImgWid,ImgNum){
	var start = 0;
	var t = setInterval(move,10);
	var t2;
	function move(){
		start++;
		if(start>(ImgWid*ImgNum)){
			start = 0;
		}
		if(start%ImgWid==0){
			clearImmediate(t);
			t2 = setTimeout(function(){
				t = setInterval(move,10);
			},1000)
		}
		InnerDiv.style.left = -start + "px";
	}
	InnerDiv.onmouseover = function(){
		clearInterval(t);
		clearInterval(t2);
	}
	InnerDiv.onmouseout = function(){
		t = setInterval(move,10);
	}
}

//7、三级菜单；


//8、运动（）
//非完整版
function moveLinear(end,start,attr,obj,stepnum){
	var step = (end - start)/stepnum;  //step 为-的时候 向左运动 step为+的时候向右运动
	this.time = setInterval(function(){
		start = start + step;
		if(start<=end&&step<0){
			clearInterval(this.time);
			start = end;
		}
		if(start>=end&&step>0){
			clearInterval(this.time);
			start = end;
		}
		obj.style[attr] = start+"px";
	},10)
}
//完整版：（结束，对象，步数，回调函数），fn可以不传
function moveLinear(end,obj,attr,stepnum,fn){
	clearInterval(obj.time);
	//clearInterval(obj,attr);//??????
	var start = parseInt(getStyle(obj,attr));//需调用封装函数获取非行内元素，兼容问题
	var step = (end - start)/stepnum;  //step 为-的时候 向左运动 step为+的时候向右运动
	obj.time = setInterval(function(){  //obj.time！！！！！
		start = start + step;
		if(start<=end&&step<0){
			clearInterval(obj.time); //obj.time！！！！！
			start = end;
			if(fn){
				fn();
			}
		}
		if(start>=end&&step>0){
			clearInterval(obj.time);
			start = end;
			if(fn){ //改写法使fn可以不传
				fn();
			}
		}
		obj.style[attr] = start+"px";
	},10)
}


//9、类似分享效果
function StartMove(obj,num,speed,time){
	clearInterval(window.timer); //window.timer???????????
	
	var step = speed;
	this.timer = setInterval(function(){ //this.timer???????????????
		if(obj.offsetLeft>num){
			step = -speed;
		}
		if(obj.offsetLeft<num){
			step = speed;
		}
		if(obj.offsetLeft==num){
			clearInterval(timer);
		}else{
			obj.style.left = obj.offsetLeft + step + "px";
		}
	},time)
}


//10、多属性缓速运动
function moveBuffer(myJson,obj,stepnum,fn){
	clearInterval(obj.time);
	var flag;
	obj.time = setInterval(function(){
		flag = true;//到结束位置的情况下 flag=true
		for(var attr in myJson){
			var end = myJson[attr];
			var start = parseFloat(getStyle(obj,attr));
			//start会改变 趋近于end
			var step = (end - start)/stepnum;
			//step减小 速度越来越慢				
			start = start + step;
			if(step<1&&step>0){
				start = end;
			}else{
				flag = false;
			}
			if(step>-1&&step<0){
				start = end;
			}else{
				flag = false;
			}
			obj.style[attr] = start+"px";
		}
		//所有参数都到达结束位置的情况下
		if(flag){			
			clearInterval(obj.time);
			if(fn){
				fn();
			}
		}		
	},50)	
}















































