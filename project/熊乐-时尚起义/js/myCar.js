$(function() {
	init(); //初始化
	//点击商品数量增加按钮
	$(".mycar-main-list-number-add").on("click", function() {

			var num = $(this).siblings(".mycar-main-list-number-show").val();
			$(this).siblings(".mycar-main-list-number-show").val(parseInt(num) + 1);
			computed();
		})
		//点击商品数量减少按钮
	$(".mycar-main-list-number-minus").on("click", function() {
			var num = $(this).siblings(".mycar-main-list-number-show").val();
			if (parseInt(num) - 1 >= 1) {
				$(this).siblings(".mycar-main-list-number-show").val(parseInt(num) - 1);
			} else {
				alert("购买数量不能小于1");
			}
			computed();
		})
		//直接在商品数量部分输入，输入完毕input失去按钮时，若输入的不是数字或者数量小于1时提示错误
	$(".mycar-main-list-number-show").on("blur", function() {
			var flag = /^\d+$/g.test($(this).val());
			if (flag) {
				if (parseInt($(this).val()) < 1) {
					alert("购买数量不能小于1");
					$(this).val("1");
				}
			} else {
				alert("请输入合法的购买数量")
				$(this).val("1");

			}
			computed();
		})
		//鼠标滑过修改购物车按钮
	$(".mycar-main-list-active-change").hover(function(e) {
			$(this).toggleClass("mycar-main-list-active-change-hover");
			$(this).children().eq(0).css({
				"left": "21px"
			}).toggle();
		})
		//鼠标滑过删除购物车按钮
	$(".mycar-main-list-active-del").hover(function(e) {
			$(this).toggleClass("mycar-main-list-active-del-hover");
			$(this).children().eq(0).css({
				"left": "21px"
			}).toggle();
		})
		//鼠标滑过加入暂存架按钮
	$(".mycar-main-list-active-addtolove").hover(function(e) {
			var ev = e || event;
			var left = ev.offsetX;
			$(this).toggleClass("mycar-main-list-active-addtolove-hover");
			$(this).children().eq(0).css({
				"left": left
			}).toggle();
		})
		//控制全选按钮
	$(".mycar-main-list-checkall").click(function() {
		checkbool = $(this).get(0).checked;
		console.log(checkbool);
		$(".mycar-main-list-goodsinfo-check").each(function(i, n) {
			n.checked = checkbool;
			//			$(".mycar-main-list-goodsinfo-check").get(i).checked=checkbool;
		})
		computed();
	})
	$(".mycar-main-list-goodsinfo-check").click(function() {
			var flag = true;
			$(".mycar-main-list-goodsinfo-check").each(function(i, n) {
				if (!n.checked) {
					flag = false;
				}
			})
			$(".mycar-main-list-checkall").get(0).checked = flag;
			console.log(flag);
			computed();
		})
		//上一步下一步按钮的事件
	$(".mycar-bottom-befor").mouseover(function() {
		this.style.backgroundPosition = "1000px";
		this.innerHTML = "返回<br/>购物";
	})
	$(".mycar-bottom-befor").mouseout(function() {
		this.style.backgroundPosition = "center";
		this.innerHTML = "";
	})
	$(".mycar-bottom-next").mouseover(function() {
		this.style.backgroundPosition = "1000px";
		this.innerHTML = "马上<br/>结算";
	})
	$(".mycar-bottom-next").mouseout(function() {
		this.style.backgroundPosition = "center";
		this.innerHTML = "";
	})
	$(".mycar-bottom-next").click(function() {
		window.location.href = "confirmOrder.html";
	})
	$(".mycar-bottom-befor").click(function() {
			window.location.href = "index.html";
		})
		//删除购物车选项
	$(".mycar-main-list-active-del").click(function() {
			$(this).parent().parent().remove();
			computed();
		})
		//返回修改商品
	$(".mycar-main-list-active-change").click(function() {
		window.location.href = "goodsInfo.html"
	})
})

function computed() { //计算页面上的总价等可以根据订单信息自动变更的数据
	var allprice = 0; //总价
	var alldiscount = 0; //总折扣
	var pay = 0; //支付金额
	$(".mycar-main-list-tbody").each(function(i, n) {
		var price = n.children[2].children[0].innerHTML; //获取单价
		var vprice = n.children[3].children[0].innerHTML; //获取会员价
		var discount = Number(price) - Number(vprice); //会员折扣
		var num = n.children[4].children[0].children[0].value; //获取数量
		var count = Number(vprice) * Number(num); //计算单种商品总价
		var ischecked = n.children[0].children[0].checked; //判断商品是否被选中
		n.children[5].children[0].innerHTML = count;
		//console.log(n.children[0].children[0].checked);
		if (ischecked) {
			allprice += Number(price) * num;
			alldiscount += Number(discount) * num;

		}
	});
	pay = (allprice - alldiscount);
	/*alert(allprice)
	alert(alldiscount);
	alert(pay);*/
	$(".mycar-bottom-txt").children().eq(0).html(allprice);
	$(".mycar-bottom-txt").children().eq(2).html(alldiscount);
	$(".mycar-bottom-txt").children().eq(4).html(pay);
}

function init() { //初始化
	/*模拟从后台获取的购物车数据*/
//	var jsonstr='{"list":""}'; //购物车为空的情况
//	var jsonstr = '{"list":[{"price":"250","vprice":"200","num":"2"}]}';
	var jsonstr = '{"list":[{"price":"250","vprice":"200","num":"1"},{"price":"200","vprice":"150","num":"2"},{"price":"150","vprice":"100","num":"2"}]}';
	var goodslist = JSON.parse(jsonstr).list;
	if(goodslist.length==0){
		$(".mycar-main-list-null").show();
		$(".mycar-main-list-tbody").remove();
	}else{
		$(".mycar-main-list-null").hide();
		for(var i=0 ;i<goodslist.length-1;i++){
			$(".mycar-main-list-tbody").eq(0).clone(true).insertBefore($(".mycar-main-list-tfoot"));
		}
	}
	for(var k in goodslist){//放入数据
		var goods=$(".mycar-main-list-tbody").eq(k);
		var price=goodslist[k].price;
		var vprive=goodslist[k].vprice;
		var number=goodslist[k].num;
		goods.children().eq(2).children().eq(0).html(price);
		goods.children().eq(3).children().eq(0).html(vprive);
		goods.children().eq(4).children().eq(0).children().eq(0).val(number);
	}
	computed();
}