1， 运动原理
Js运动， 本质来说， 就是让 web 上 DOM 元素动起来。 而想要 DOM 动起来， 改变其自身的位置属性， 比如高宽， 左边距， 上边距， 透明度等。
动画的原理就是把不同状态的物体， 串成连续的样子， 就像一本书， 画了几个小人， 然后一翻书， 就看见小人在动。 
js动画也一样。 不同状态的DOM， 用定时器控制， 就能得到动画效果。
window.onload = function() {
	var oBtn = document.getElementById('btn');
	oBtn.onclick = function() {
		var oDiv = document.getElementById('div1');
		//设置定时器
		setInterval(function() {
			//改变物体位置
			oDiv.style.left = oDiv.offsetLeft + 10 + 'px';
		}, 30)

	}
}
上述代码， 点击btn之后， 就能是物体向左运动。 可是会一直向右动， 不会停止。
因此需要创立一个停止的条件。 在条件符合的情况下， 清楚定时器。 其中对于目标点的判断， 尤为重要。
window.onload = function() {
	var oBtn = document.getElementById('btn');
	oBtn.onclick = function() {
		var oDiv = document.getElementById('div1');
		//设置定时器
		var timer = setInterval(function() {
			//判断停止条件
			if (oDiv.offsetLeft > 300) {
				clearInterval(timer);
			} else {
				//改变物体位置
				oDiv.style.left = oDiv.offsetLeft + 10 + 'px';
				document.title = oDiv.offsetLeft;
			}
		}, 30);

	}
}
上述代码中， 但物体的位置大于300的时候， 将停止运动。 但是上述代码还有个问题， 就是连续点击按钮， 物体会运动越来越快。
因为每点击一次， 就开了一个定时器， 累加的定时器。 造成运动混乱。
2， 运动框架（ 滑入滑出， 淡入淡出）
为了解决上述问题， 则必须在开启定时器之前， 先清除定时器， 因此需要一个全局变量 timer保存定时器。 如下面代码。
window.onload = function() {
	var oBtn = document.getElementById('btn');
	oBtn.onclick = function() {
		startMove();
	}
}
var timer = null;

function startMove() {
	var oDiv = document.getElementById('div1');
	clearInterval(timer);
	//设置定时器
	timer = setInterval(function() {
		//判断停止条件
		if (oDiv.offsetLeft > 300) {
			clearInterval(timer);
		} else {
			//改变物体位置
			oDiv.style.left = oDiv.offsetLeft + 10 + 'px';
			document.title = oDiv.offsetLeft;
		}
	}, 30);
}
此外， 在改变物体位置的时候， 那个“ 10” 则是更改的数量， 其实也就是速度。 如果更改速度， 运动的快慢就能确定。 因此， 运动框架的原理， 基本步骤为。
先清除定时器

开启定时器， 计算速度

判断停止条件， 执行运动
var timer = null;

function startMove() {
	var oDiv = document.getElementById('div1');
	clearInterval(timer);
	//计算速度
	var iSpeed = 10;
	//设置定时器
	timer = setInterval(function() {
		//判断停止条件
		if (oDiv.offsetLeft > 300) {
			clearInterval(timer);
		} else {
			//改变物体位置
			oDiv.style.left = oDiv.offsetLeft + iSpeed + 'px';
			document.title = oDiv.offsetLeft;
		}
	}, 30);
}
对于停止条件， 写死在里面了， 所以需分离出参数。 下面是一个分享到的例子。 主要是根据目标判断速度的正负。 从而在鼠标滑入画出时候进行运动 / 恢复的效果。
window.onload = function() {
	var oDiv = document.getElementById('div1');
	oDiv.onmouseover = function() {
		startMove(0);
	}
	oDiv.onmouseout = function() {
		startMove(-100);
	}
}
var timer = null;
var iSpeed;

function startMove(iTatget) {
	var oDiv = document.getElementById('div1');
	clearInterval(timer);
	timer = setInterval(function() {
		//计算速度
		if (iTatget - oDiv.offsetLeft > 0) {
			iSpeed = 10;
		} else {
			iSpeed = -10;
		}

		if (oDiv.offsetLeft == iTatget) {
			clearInterval(timer);
		} else {
			oDiv.style.left = oDiv.offsetLeft + iSpeed + 'px';
		}
		document.title = oDiv.offsetLeft;
	}, 30)
}
另外一个小例子， 淡入淡出， 即改变物体的透明度， 由于没有像原生的位置属性那样的offsetLset.需要一个变量来保存透明度的值， 用来和速度加减， 最后付给元素的透明度样式。
从而实现淡入淡出效果。
window.onload = function() {
	var oImg = document.getElementById('img1');
	oImg.onmouseover = function() {
		startMove(100);
	}
	oImg.onmouseout = function() {
		startMove(30);
	}
}
var timer = null;
//保存透明度的数字值
var alpha = 30;

function startMove(iTarget) {
	var oDiv = document.getElementById('img1');
	clearInterval(timer);
	timer = setInterval(function() {
		var iSpeed = 0;
		if (alpha > iTarget) {
			iSpeed = -1;
		} else {
			iSpeed = 1;
		}
		if (alpha == iTarget) {
			clearInterval(timer);
		} else {
			//改变透明度速度值
			alpha += iSpeed;
			oDiv.style.filter = 'alpha(opacity:' + alpha + ')';
			oDiv.style.opacity = alpha / 100;
			document.title = alpha;
		}

	}, 30)
}
3， 缓冲运动
缓冲运动原理就是， 改变速度的值。 每次累加的速度值变小， 就是会是整个物体看起来越来越慢， 以至于最后停掉。
相当于改变使物体具有一个加速度。 这个加速度， 可以由物体当前位置和目标位置之间的距离得到， 因为两者之间的距离一直在变小， 所以速度也一直在变小。 如下：
window.onload = function() {
	var btn = document.getElementsByTagName('input')[0];
	btn.onclick = function() {
		startMove(300);
	}
}
var timer = null;

function startMove(iTarget) {
	var oDiv = document.getElementById('div1');
	clearInterval(timer);
	timer = setInterval(function() {
		//求出带有变化的速度 
		var iSpeed = (iTarget - oDiv.offsetLeft) / 8;
		if (oDiv.offsetLeft == iTarget) {
			clearInterval(timer);
		} else {
			oDiv.style.left = oDiv.offsetLeft + iSpeed + 'px';
		}
		document.title = oDiv.offsetLeft + '...' + iSpeed;
	}, 30);
}
上述方法可以得到缓冲运动， 但是实际运行效果， 物体并没有在 300 的位置停掉， 而是在 293 的位置就停掉了。 
究其原因。 因为当物体的速度小于1 的时候。 物体位置为293。 
此时计算的速度是 0.875.通过 oDiv.style.left = oDiv.offsetLeft + iSpeed + 'px';
物体的位置为 293.875.可是计算机不能识别小数， 将小数省略了。
此时的 位置offsetLeft仍然是 293. 再计算一次， 还是同样的结果。 定时器没有关掉， 但是物体的位置却再也无法改变， 故停留在了 293 的位置。 
解决方案， 就是将速度进行向上取整。 但是， 像上述运动， 速度是正的， 可是， 当速度是负的时候， 就同样会有相同的结果， 因此需要在速度为负的时候， 向下取整。
function startMove(iTarget) {
	var oDiv = document.getElementById('div1');
	clearInterval(timer);
	timer = setInterval(function() {
		var iSpeed = (iTarget - oDiv.offsetLeft) / 8;
		//对正的速度向上取整，负的速度向下取整
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if (oDiv.offsetLeft == iTarget) {
			clearInterval(timer);
		} else {
			oDiv.style.left = oDiv.offsetLeft + iSpeed + 'px';
		}
		document.title = oDiv.offsetLeft + '...' + iSpeed;
	}, 30);
}
4. 多物体运动
下一步， 就是处理多物体运动， 运动函数里面每次都要选取一个元素加事件。 如果需要对多个物体进行同样的运动， 需要将运动对象作为参数传进来。

window.onload = function() {
	var aDiv = document.getElementsByTagName('div');
	for (var i = 0; i < aDiv.length; i++) {
		aDiv[i].onmouseover = function() {
			startMove(this, 300);
		}
		aDiv[i].onmouseout = function() {
			startMove(this, 100);
		}
	}
}
var timer = null;

function startMove(obj, iTarget) {
	clearInterval(timer);
	timer = setInterval(function() {
		var iSpeed = (iTarget - obj.offsetWidth) / 8;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if (obj.offsetWidth == iTarget) {
			clearInterval(timer);
		} else {
			obj.style.width = obj.offsetWidth + iSpeed + 'px';
		}

	}, 30)
}
通过循环物体， 将物体的 this传给运动函数， 使得多物体可以运动。 但是这样有一个弊端， 即当滑入第一个运动的时候， 开启了定时器。
如果此时， 滑入另外一个物体， 将会清理上一个定时器。 这就造成了， 上一次运动， 很有可能还没完成结束， 定时器就没关闭了。 
解决的方法， 每个运动的物体， 都能开了一个属于自己的定时器。 因此， 把定时器当成物体的属性。 清理的时候也就是清理自己的定时器。
window.onload = function() {
	var aDiv = document.getElementsByTagName('div');
	for (var i = 0; i < aDiv.length; i++) {
		aDiv[i].onmouseover = function() {
			startMove(this, 300);
		}
		aDiv[i].onmouseout = function() {
			startMove(this, 100);
		}
	}
}

function startMove(obj, iTarget) {
	//将定时器，变成物体的属性，类似给物体添加索引
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var iSpeed = (iTarget - obj.offsetWidth) / 8;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if (obj.offsetWidth == iTarget) {
			clearInterval(obj.timer);
		} else {
			obj.style.width = obj.offsetWidth + iSpeed + 'px';
		}

	}, 30)
}
多物体的淡入淡出的时候， 也有类似的问题。 因为修改透明度的时候， 是先用一个变量保存透明度， 必须针对每个物体设立透明度值属性。
window.onload = function() {
	var aDiv = document.getElementsByTagName('div');
	for (var i = 0; i < aDiv.length; i++) {
		//将透明度值当初属性
		aDiv[i].alpha = 30;
		aDiv[i].onmouseover = function() {
			startMove(this, 100);
		}
		aDiv[i].onmouseout = function() {
			startMove(this, 30);
		}
	}
}

function startMove(obj, iTarget) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var iSpeed = (iTarget - obj.alpha) / 8;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if (obj.alpha == iTarget) {
			clearInterval(obj.timer);
		} else {
			obj.alpha += iSpeed;
			obj.style.filter = 'alpha(opacity:' + obj.alpha + ')';
			obj.style.opacity = obj.alpha / 100;
		}
		document.title = obj.alpha;
	}, 30);
}

4.1 位置属性的bug
offsetWidth 或者 offsetHeight 等位置属性， 一旦给他们加上 border。 则会有诡异的现象出现。
window.onload = function() {
	var oDiv = document.getElementById('div1');
	setInterval(function() {
		oDiv.style.width = oDiv.offsetWidth - 1 + "px";
	}, 30)
}
例如 oDiv.style.width = oDiv.offsetWidth - 1 + 'px';
如果给 oDiv 的width 为一百， border 为 1. 则这个物体的 width是100px；
offsetWidth 为102px； 带入公式之后， 即减一之后。 100 = 102 - 1， 反而等于101；
即 物体本来要减小， 事实却增大了。 解决的方案就是， 加减的时候， 必须使用物体的内联样式。
但是 火狐 和 IE 又有兼容模式。 解决方案如下：
window.onload = function() {
	var oDiv = document.getElementById('div1');
	setInterval(function() {

		oDiv.style.width = parseInt(getStyle(oDiv, 'width')) - 1 + 'px';

	}, 30)
}

function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}
其中， getStyle函数， 传入一个元素对象， 和其 css 属性， 获取的是元素的样式， 即 witdh 100 px； 因此需要parseInt转换
5. 任意值运动
通过 getStyle 函数， 可以获取元素的样式， 还可也通过 attr 制定需要修改的 css属性。 这样就能是物体有不同的运动形式
window.onload = function() {
	var aDiv = document.getElementsByTagName('div');
	aDiv[0].onmouseover = function() {
		startMove(this, 'width', 300);
	}
	aDiv[0].onmouseout = function() {
		startMove(this, 'width', 100);
	}
	aDiv[1].onmouseover = function() {
		startMove(this, 'height', 100);
	}
	aDiv[1].onmouseout = function() {
		startMove(this, 'height', 50);
	}
}

function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle(attr);
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function startMove(obj, attr, iTarget) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var iCur = parseInt(getStyle(obj, attr));
		var iSpeed = (iTarget - iCur) / 8;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if (iCur == iTarget) {
			clearInterval(obj.timer);
		} else {
			obj.style[attr] = iCur + iSpeed + 'px';
		}

	}, 30)
}
5.1 任意值完美版
上述版本， 还不能处理透明度的任意值， 因此需要增加额外的兼容hack。
window.onload = function() {
	var aDiv = document.getElementsByTagName('div');
	aDiv[0].onmouseover = function() {
		startMove(this, 'opacity', 100);
	}
	aDiv[0].onmouseout = function() {
		startMove(this, 'opacity', 30);
	}
}

function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyleattr[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function startMove(obj, attr, iTarget) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var iCur = 0;
		if (attr == 'opacity') {
			iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
		} else {
			iCur = parseInt(getStyle(obj, attr));
		}
		var iSpeed = (iTarget - iCur) / 8;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if (iCur == iTarget) {
			clearInterval(obj.timer);
		} else {
			if (attr == 'opacity') {
				iCur += iSpeed
				obj.style.filter = 'alpha(opacity:' + iCur + ')';
				obj.style.opacity = iCur / 100;
			} else {
				obj.style[attr] = iCur + iSpeed + 'px';
			}
			document.title = obj.style[attr];
		}

	}, 30)
}
6. 链式运动
我们的运动框架到目前为止， 基本功能都能实现了。 现在拓展。 
所谓链式运动， 即运动接着运动。 当运动停止的时候， 如果回调一个函数。
回调一个运动函数， 就能出现这样的效果。 因此传入一个函数作为回调函数。
window.onload = function() {
	var oDiv = document.getElementById('div1');
	oDiv.onclick = function() {
		startMove(this, 'width', 300, function() {
			startMove(oDiv, 'height', 300, function() {
				startMove(oDiv, 'opacity', 100)
			})
		})
	}
}

function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyleattr[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function startMove(obj, attr, iTarget, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var iCur = 0;
		if (attr == 'opacity') {
			iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
		} else {
			iCur = parseInt(getStyle(obj, attr));
		}
		var iSpeed = (iTarget - iCur) / 8;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if (iCur == iTarget) {
			clearInterval(obj.timer);
			//回调函数
			if (fn) fn();
		} else {
			if (attr == 'opacity') {
				iCur += iSpeed
				obj.style.filter = 'alpha(opacity:' + iCur + ')';
				obj.style.opacity = iCur / 100;
			} else {
				obj.style[attr] = iCur + iSpeed + 'px';
			}
			document.title = obj.style[attr];
		}

	}, 30)
}
7. 同时运动
目前为止， 我们的运动框架还有个小缺点， 就是不能同时该两个属性进行运动， 比如同时更改宽和高。
这个要求传入的属性是不同的几个值。 则考虑传入一个 json用来保存需要更改的属性。
window.onload = function() {
	var oDiv = document.getElementById('div1');
	oDiv.onclick = function() {
		startMove(this, {
			'width': 300,
			'height': 400
		});
	}
}

function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function startMove(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		// 循环json 
		for (var attr in json) {
			var iCur = 0;
			if (attr == 'opacity') {
				iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}
			var iSpeed = (json[attr] - iCur) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if (iCur == json[attr]) {
				clearInterval(obj.timer);
				if (fn) fn();
			} else {
				if (attr == 'opacity') {
					iCur += iSpeed
					obj.style.filter = 'alpha(opacity:' + iCur + ')';
					obj.style.opacity = iCur / 100;
				} else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
				document.title = obj.style[attr];
			}
		}
	}, 30)

	上述代码， 可以解决了同时运动的问题。 但是还是有一个bug。 
	比如， 同时运动的某个属性， 如果变化很小， 马上就停止了， 即关掉了定时器。
	那么会造成其他属性的变化也停止。 因为这些属性都共用了一个定时器。 
	因此需要判断， 假设有三个人要来， 然后一起去爬山。 三个人有的先来， 有的后来， 只要三个人都到齐了， 才出发。 
	也就是只有三个属性都到了目标值， 才关定时器。 一开始， 设立一个检查量， 为真。
	假设所有人都到了， 然后循环， 只有有一个人没有到， 检查就为假。
	直到所有的都到了， 检测为真。 则停止定时器。
	window.onload = function() {
		var oDiv = document.getElementById('div1');
		oDiv.onclick = function() {
			startMove(this, {
				'width': 102,
				'height': 400,
				'opacity': 100
			});
		}
	}

	function getStyle(obj, attr) {
		if (obj.currentStyle) {
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj, false)[attr];
		}
	}

	function startMove(obj, json, fn) {
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			var bStop = true;
			for (var attr in json) {
				//取当前值  
				var iCur = 0;
				if (attr == 'opacity') {
					iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
				} else {
					iCur = parseInt(getStyle(obj, attr));
				}
				//计算速度
				var iSpeed = (json[attr] - iCur) / 8;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				//检测停止
				if (iCur != json[attr]) {
					bStop = false;
				}
				if (attr == 'opacity') {
					iCur += iSpeed
					obj.style.filter = 'alpha(opacity:' + iCur + ')';
					obj.style.opacity = iCur / 100;
				} else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
			if (bStop) {
				clearInterval(obj.timer);
				if (fn) fn();
			}
		}, 30)
	}
再循环外定义一个 标志变量 bStop = true。用来表示所有属性到达目标值。
等循环结束了，如果这个值是真的，则停止定时器。因为，每次运行定时器，都会初始化这个值。
循环的过程中，只要有一个没有到，bStop就被设定为 false。如果某个到了，此时 iCur != json[attr]，表示速度为0 后面执行的结果，也不会有变化。
只有所有的都达到目标值。循环则不再改变 bStop的值。
此时，只要下一次运行定时器。就是初始化 bStop为真。而循环因为都到了，所以速度为0 也就再也没有变化。
循环结束，sBstop还是真，表示所有都到了。因此此时结束定时器。
最后附上完美运动框架，封装成 move.js 就可以调用了。
/**
 * @author rsj217
 * getStyle 获取样式
 * startMove 运动主程序
 */
               
function getStyle(obj, attr){
    if(obj.currentStyle)    {
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj, false)[attr];
    }
}
function Move(obj,json,fn){
    //停止上一次定时器
    clearInterval(obj.timer);
    //保存每一个物体运动的定时器
    obj.timer = setInterval(function(){
        //判断同时运动标志
        var bStop = true;
        for(var attr in json){  
            //取当前值  
            var iCur = 0;
            if(attr == 'opacity'){
                iCur = parseInt(parseFloat(getStyle(obj, attr))*100);
            }else{
                iCur = parseInt(getStyle(obj,attr));
            }
            //计算速度
            var iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            //检测同时到达标志
            if(iCur != json[attr]){
                bStop = false;
            }   
            //更改属性，获取动画效果
            if(attr=='opacity'){
                iCur += iSpeed
                obj.style.filter='alpha(opacity:' + iCur + ')';
                obj.style.opacity=iCur / 100;
            }
            else{
                obj.style[attr]=iCur+iSpeed+'px';
            }
        }
        //检测停止
        if(bStop){
            clearInterval(obj.timer);
            if(fn) fn();
        }
    },30)
}