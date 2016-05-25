/** 随机产生一个指定范围内的整数 */
function randomInt(min, max) {
	return parseInt(Math.random() * (max + 1 - min) + min);
}

//去空格
function trim(str) {
	var arr = [];
	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) != 32) {
			arr.push(str[i]);
		}
	}
	return arr.join("");
}

//console.log打印
function log(obj) {
	console.log(obj);
}

//通过for in 循环json对象给标签对象设置css样式
function css(mJson, obj) {  
	/*
	 	这是的mJson里是这样写的,大括号里的内容就等同于mJson
	 	注意：json里每一条用逗号分隔
	 	css({
	 		"width":"200px",
	 		"height":"30px",
	 		"background":"red"
	 	})
	 */
	for (key in mJson) {
		obj.style[key] = mJson[key];
	}
}

//判断是否为闰年
function isLeapYear(day) {
	var year = day.getFullYear();
	if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
		return true;
	}
	return false;
}

//判断时间，小于10的时候用双位数字表示
function dateFormat(day, sp) {
	return day.getFullYear() + sp + toDouble((day.getMonth() + 1)) + sp + toDouble(day.getDate());
}

function toDouble(num) {
	return num < 10 ? "0" + num : num;
}

//获取月份对应天数（包括是否闰年）
function getDays(day) {
	var month = day.getMonth() + 1;
	switch (month) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			return 31;
		case 4:
		case 6:
		case 9:
		case 11:
			return 30;
		case 2:
			if (isLeapYear(day.getFullYear())) {
				return 29;
			} else {
				return 28;
			}
	}
}

//日期格式化
function toDate(str, sp) {
	if (sp == undefined) {
		for (var i in str) {
			if (!(str.charCodeAt(i) >= 48 && str.charCodeAt(i) <= 57)) {
				sp = str[i];
				break;
			}
		}
	}
	var arr = str.split(sp); //["2013","06","11"] ---> "2013-06-11"
	return new Date(arr.join("-"));
}

//获取标签节点（解决兼容）
function getChildElements(obj) {
	var arr = new Array();
	var nodeList = obj.childNodes;
	for (var i = 0; i < nodeList.length; i++) {
		if (nodeList[i].nodeType == 1) {
			arr.push(nodeList[i]);
		}
	}
	return arr;
}

/*function getStyle(obj) {
	if (obj.currentStyle) {
		return obj.currentStyle;
	} else {
		return getComputedStyle(obj, null);
	}
}*/
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj)[attr];
	}
}

function moverLine( /*indexObj*/ end, /*size,*/ obj, attr, spendNum, fn) {
	//定时器绑定在对象，不会影响全局下的定时器，对象之间的定时器互补干扰
	/*		var start=parseInt(getStyle(obj)[attr]);
			var end=indexObj*(-size);*/
	clearInterval(obj.time);
	var start = parseInt(getStyle(obj, attr));
	var spend = (end - start) / spendNum; //spend 为-的时候 向左运动 step为+的时候向右运动
	obj.time = setInterval(move, 10);

	function move() {
		start += spend;
		if (start <= end && spend < 0) {
			clearInterval(obj.time);
			start = end;
			if (fn) {
				fn();
			}
		}
		if (start >= end && spend > 0) {
			clearInterval(obj.time);
			start = end;
			if (fn) {
				fn();
			}
		}
		obj.style[attr] = start + "px";
	}
}


//阻止冒泡
function stopProp(e) {
	var event = event || window.event;
	if (event.stopPropagation) {
		event.stopPropagation()
	} else {
		event.cancelBubble = true;
	}
}

//cookeie？？？？？？？？？？？？？？？？？？
function getCookie(key) {
	var cookiestr = document.cookie;
	var list = cookiestr.split(";");
	for (var i in list) {
		var arr = list[i].split("=");
		if (trim(arr[0]) == key) {
			return arr[1];
		}
	}
	return null;
}

//事件监听（兼容）
function addEvent(target, eventName, fun, bubble) {
	if (target.attachEvent) {
		target.attachEvent("on" + eventName, fun);
	} else {
		target.addEventListener(eventName, fun, bubble);
	}
}

//通过class名获取元素（兼容）
function getClass(cName, obj) {
	var obj = obj || document;
	if (obj.getElementsByClassName) {
		return obj.getElementsByClassName(cName);
	} else {
		var allClass = obj.getElementsByTagName("*");
		var arrName = [];
		for (var i = 0; i < allClass.length; i++) {
			var arr = allClass[i].className.split(" ");
			for (var j = 0; j < arr.length; j++) {
				if (arr[j] = cName) { //判断所有元素类名和传入类名是否相等
					arrName.push(allClass[i]); //如果相等把类名相同所对应的该元素保存到数组里面
				}
			}
		}
		return arrName;
	}

}

//？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
//function $(obj) {
//	return {
//		hide: function() {
//			obj.style.display = "none";
//		},
//		show: function() {
//			obj.style.display = "block";
//			return this;
//		},
//		siblings: function() { //获取obj的同辈元素
//			var list = obj.parentNode.children;
//			var arr = [];
//			for (var i = 0; i < list.length; i++) {
//				if (list[i] !== obj) {
//					arr.push(list[i]);
//				}
//			}
//			return {
//				hide: function() {
//					for (var j = 0; j < arr.length; j++) {
//						arr[j].style.display = "none";
//					}
//				}
//			};
//		},
//		draggble: function() {
//			obj.onmousedown = function(evt) {
//				var layer = this.parentNode;
//				var event = evt || event;
//				var reX = event.offsetX;
//				var reY = event.offsetY;
//				layer.className = "layerDrag";
//				layer.style.left = event.clientX - reX + "px";
//				layer.style.top = event.clientY - reY + "px";
//				document.onmousemove = function(evt) {
//					var event = evt || event;
//					var x = event.clientX;
//					var y = event.clientY;
//					layer.style.left = x - reX + "px";
//					layer.style.top = y - reY + "px";
//				}
//				obj.onmouseup = function() {
//					document.onmousemove = "";
//				}
//			}
//		}
//	};
//}