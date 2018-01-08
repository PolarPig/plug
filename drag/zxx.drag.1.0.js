// by zhangxinxu welcome to visit my personal website http://www.zhangxinxu.com/
// zxx.drag v1.0 2010-03-23 元素的拖拽实现

var params = {
	left: 0,
	top: 0,
	currentX: 0,
	currentY: 0,
	flag: false

};
//获取相关CSS属性
var getCss = function (o, key) {
	return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
};




//拖拽的实现
var startDrag = function (bar, target, callback) {
	if (getCss(target, "left") !== "auto") {
		params.left = getCss(target, "left");
	}
	if (getCss(target, "top") !== "auto") {
		params.top = getCss(target, "top");
	}
	//o是移动对象
	bar.onmousedown = function (event) {
		params.flag = true;
		if (!event) {
			event = window.event;
			//防止IE文字选中
			bar.onselectstart = function () {
				return false;
			}
		}
		var e = event;
		params.currentX = e.clientX;
		params.currentY = e.clientY;
	};
	document.onmouseup = function () {
		params.flag = false;
		if (getCss(target, "left") !== "auto") {
			params.left = getCss(target, "left");
		}
		if (getCss(target, "top") !== "auto") {
			params.top = getCss(target, "top");
		}
	};
	document.onmousemove = function (event) {
		var e = event ? event : window.event;
		if (params.flag) {
			var nowX = e.clientX,
				nowY = e.clientY;
			var disX = nowX - params.currentX,
				disY = nowY - params.currentY;
			target.style.left = parseInt(params.left) + disX + "px";
			target.style.top = parseInt(params.top) + disY + "px";

			if (typeof callback == "function") {
				callback((parseInt(params.left) || 0) + disX, (parseInt(params.top) || 0) + disY);
			}

			if (event.preventDefault) {
				event.preventDefault();
			}
			return false;
		}
	}
};



// 首先定义xMax/xMin/yMax/yMin四个参数，然后在startDrag里对其赋值：

// paras.xMax = document.documentElement.clientWidth– parseInt(getCss(target, “width”));
// paras.yMax = document.documentElement.clientHeight– parseInt(getCss(target, “height”));
// paras.xMin = 0;
// paras.yMin = 0;

// 然后定义Median函数，用于在目标位置、最小值、最大值三者中取得中间值：

// function Median(target, min, max) {
// 	if (target > max) return max;
// 	else if (target < min) return min;
// 	else return target;
// }

// 最后在onmousemove函数中将原来的css赋值语句改成这样就可以了：

// var targetX = parseInt(paras.left) + distX;
// var targetY = parseInt(paras.top) + distY;
// target.style.left = Median(targetX, paras.xMin, paras.xMax) + "px";
// target.style.top = Median(targetY, paras.yMin, paras.yMax) + "px";