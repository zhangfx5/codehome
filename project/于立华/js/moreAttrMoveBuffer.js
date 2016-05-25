//function moveBuffer(myJson,obj,stepnum,fn){
//		clearInterval(obj.time);
//		var flag;
//		obj.time = setInterval(function(){
//			flag = true;//到结束位置的情况下 flag=true
//			for(var attr in myJson){
//				var end = myJson[attr];
//				var start = parseFloat(getStyle(obj,attr));
//				//start会改变 趋近于end
//				var step = (end - start)/stepnum;
//				//step减小 速度越来越慢				
//				start = start + step;
//				if(step<1&&step>0){
//					start = end;
//				}else{
//					flag = false;
//				}
//				if(step>-1&&step<0){
//					start = end;
//				}else{
//					flag = false;
//				}
//				obj.style[attr] = start+"px";
//			}
//			//所有参数都到达结束位置的情况下
//			if(flag){			
//				clearInterval(obj.time);
//				if(fn){
//					fn();
//				}
//			}		
//		},50)	
//}

//最终版
function moveBuffer(myJson,obj,stepnum,fn){
		clearInterval(obj.time);
		var flag;
		obj.time = setInterval(function(){
			flag = true;//到结束位置的情况下 flag=true
			for(var attr in myJson){
				var end = myJson[attr];
				var start = parseInt(getStyle(obj,attr));//-1
				//start会改变 趋近于end
				if(step>0){
					var step = Math.ceil((end - start)/stepnum);//if start>end  Math.floor 
				}else{
					var step = Math.floor((end - start)/stepnum);
				}
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