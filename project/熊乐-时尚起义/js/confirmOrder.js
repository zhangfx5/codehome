$(function() {

	var prolist = ["江西省", "北京市", "上海市", "广东省"]; //假设从后台获取的信息
	var citylist = [
			["南昌市", "鹰潭市", "宜春市", "高安市", "景德镇市"],
			["东城区", "宣武区", "崇文区", "海淀区", "朝阳区" ,"丰台区" ,"石景山区"],
			["浦东新区","黄浦区","青浦区","杨浦区","闸口区","闵行区"],
			["广州市","深圳市","珠海市","汕头市","佛山市"]
		];
	init();	
	function init(){//初始化
		
		for(var i=0;i<prolist.length;i++){
			$("<option></option>").html(prolist[i]).appendTo($(".confirm-consignee-province"));
		}
		for (var j=0;j<=citylist[0].length-1;j++) {
				$("<option></option>").html(citylist[0][j]).appendTo($(".confirm-consignee-city"));
			}
		$(".confirm-consignee-province-box").html($(".confirm-consignee-province").val());
		$(".confirm-consignee-city-box").html($(".confirm-consignee-city").val());
	}
/*收货人信息表单中的地址选择关联下拉菜单*/	
	$(".confirm-consignee-province").change(function(){
		var k=this.selectedIndex;
		$(".confirm-consignee-province-box").html(this.value);
		var city=citylist[k];
		$(".confirm-consignee-city").empty();
		for (var j=0;j<=city.length-1;j++) {
			$("<option></option>").html(city[j]).appendTo($(".confirm-consignee-city"));
		}
		$(".confirm-consignee-city-box").html($(".confirm-consignee-city").val());
	})
	$(".confirm-consignee-city").change(function(){
		$(".confirm-consignee-city-box").html(this.value);
	})
		
		
		
/*收货人信息表单提交验证*/
	$(".confirm-consignee-submit").click(function() {
		var flagsub = true; //标记是否可以提交收货人信息表单
		var cname = $(".confirm-consignee-name").val(); //收货人姓名
		var cmail=$(".confirm-consignee-mail").val();//邮编
		var cphone=$(".confirm-consignee-phone").val();//手机号码
		var ccall=$(".confirm-consignee-call").val();//固定电话
		var caddress=$(".confirm-consignee-address").val();//详细地址
		var cprovince=$(".confirm-consignee-province").val();//省份
		var ccity=$(".confirm-consignee-city").val();//城市
		if (/^\S+$/g.test(cname)) {
			flagsub=true;
			$(".confirm-consignee-input-error").eq(0).hide();
			if($(".confirm-consignee-address").val().length>0){
				flagsub=true;
				$(".confirm-consignee-input-error").eq(1).hide();
				if(/^[1-9]{1}\d{5}$/.test(cmail)){
					flagsub=true;
					$(".confirm-consignee-input-error").eq(2).hide();
					if(/^1[1-9]{10}$/.test(cphone)){
						flagsub=true;
						$(".confirm-consignee-input-error").eq(3).hide();
						if(ccall==""||/(\(\d{3,4}\)|\d{3,4}|\s)?\d{8}/.test(ccall)){
							flagsub=true;
							$(".confirm-consignee-input-error").eq(4).hide();
						}else{
							flagsub=false;
							$(".confirm-consignee-input-error").eq(4).show();
						}
					}else{
						flagsub=false;
						$(".confirm-consignee-input-error").eq(3).show();
					}
				}else{
					$(".confirm-consignee-input-error").eq(2).show();
					flagsub=false;
				}
				
			}else{
				$(".confirm-consignee-input-error").eq(1).show();
				flagsub=false;
			}
		} else {
			$(".confirm-consignee-input-error").eq(0).show();
			flagsub = false;
		}
		if(flagsub){
			var coninfo=cname+" "+cprovince+"-"+ccity+"-"+caddress+" 邮编："+cmail+" 联系方式："+cphone+" "+ccall;
			$(".confirm-consignee-info-show").show().html(coninfo);
			$(".confirm-consignee-info-select").hide();
			$(".confirm-consignee-info-body").hide();
			var conbox = $(".confirm-consignee-info-select:last").clone(true);
			conbox.children().eq(0).val(1);
			conbox.children().eq(1).html(coninfo);
			conbox.children().eq(2).show();
			conbox.insertAfter($(".confirm-consignee-info-show"));
		}
	})
	/*点击重新编辑收货人信息按钮*/
	$(".confirm-userinfo-form-tit-btn").click(function(){
		$(".confirm-consignee-info-show").hide();
		$(".confirm-consignee-info-body").hide();
		$(".confirm-consignee-info-select").show();
	})
	/*选择新的收货人信息*/
	$(".confirm-consignee-info-select").children().eq(0).change(function(){
		console.log($(this))
		if($(this).val()==0){
			$(".confirm-consignee-info-body").show();			
		}else{
//			alert($(this).val());
		}
	})
	/*点击删除收货人信息*/
	$(".confirm-consignee-info-select-btn").click(function(){
		$(this).parent().remove();
	})
	/* 配送方式表单提交 */
	$(".confirm-deliver-submit").click(function(){
		var detype=$(".confirm-deliver-type").html();
		var detime=$(".confirm-deliver-time:checked").val();
		if(detime==0){
			detime="工作日、双休日与假日均可送货";
		}else if(detime==1){
			detime="只双休日、假日送货（工作日不用送）";
		}else if(detime==2){
			detime="只工作日送货（双休日、假日不用送）";
		}else if(detime==3){
			detime=$(".confirm-deliver-time-other").val();
		}
		var basic=$(".confirm-deliver-money-basic").html();
		var extra=$(".confirm-deliver-money-extra").html();
		console.log(detime)
		var deinfo="配送方式："+detype+"；配送时间："+detime+"；基本配送费："+basic+"元；附加配送费："+extra+"元；";
		$(".confirm-deliver-info-body").hide();
		$(".confirm-deliver-info-show").html(deinfo).show();
	})
	/*当选择自定义配送时间时，输入框可以输入，否则输入框为只读*/
	$(".confirm-deliver-time").change(function(){
		if(this.value==3){
			$(".confirm-deliver-time-other").removeAttr("disabled");
		}else{
			$(".confirm-deliver-time-other").attr("disabled","disabled");
		}
	})
	/*点击重新编辑配送方式*/
	$(".confirm-deliver-form-tit-btn").click(function(){
		$(".confirm-deliver-info-body").show();
		$(".confirm-deliver-info-show").hide();
	})
	/*上一步下一步按钮事件*/
	$(".mycar-bottom-befor").mouseover(function(){
		this.style.backgroundPosition="1000px";
		this.innerHTML="重新<br/>选择";
	})
	$(".mycar-bottom-befor").mouseout(function(){
		this.style.backgroundPosition="center";
		this.innerHTML="";
	})
	$(".mycar-bottom-next").mouseover(function(){
		this.style.backgroundPosition="1000px";
		this.innerHTML="马上<br/>结算";
	})
	$(".mycar-bottom-next").mouseout(function(){
		this.style.backgroundPosition="center";
		this.innerHTML="";
	})
	$(".mycar-bottom-next").click(function(){
		window.location.href="orderSubmit.html";
	})
	$(".mycar-bottom-befor").click(function(){
		window.location.href="myCar.html";
	})
})