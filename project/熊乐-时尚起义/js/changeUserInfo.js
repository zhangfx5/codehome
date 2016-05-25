$(function() {
	var prolist = ["江西省", "北京市", "上海市", "广东省"]; //假设从后台获取的信息
	var citylist = [
		["南昌市", "鹰潭市", "宜春市", "高安市", "景德镇市"],
		["东城区", "宣武区", "崇文区", "海淀区", "朝阳区", "丰台区", "石景山区"],
		["浦东新区", "黄浦区", "青浦区", "杨浦区", "闸口区", "闵行区"],
		["广州市", "深圳市", "珠海市", "汕头市", "佛山市"]
	];
	init();
	/*初始化*/
	function init() {
		for (var i = 0; i < prolist.length; i++) {
			$("<option></option>").html(prolist[i]).appendTo($(".mypage-changeuserinfo-pro"));
		}
		creatCitySel();
	}
	/*根据省份信息自动生成城市下拉菜单*/
	function creatCitySel(city) {
		$(".mypage-changeuserinfo-city").empty();
		var i = $(".mypage-changeuserinfo-pro>option:selected").index();
		var city = citylist[i];
		for (var k in city) {
			$("<option></option>").html(city[k]).appendTo($(".mypage-changeuserinfo-city"));
		}
	}
	$(".mypage-changeuserinfo-pro").change(function() {
		creatCitySel();
	})
	/*点击确认*/
	$(".mypage-changeuserinfo-submit").click(function(){
		var flag=true;
		var address=$(".mypage-changeuserinfo-address").val();
		var mail=$(".mypage-changeuserinfo-mail").val();
		var phone=$(".mypage-changeuserinfo-phone").val();
		var birthday=$(".mypage-changeuserinfo-date").val();
		var job=$(".mypage-changeuserinfo-job").val();
		var icome=$(".mypage-changeuserinfo-income").val();
		if(/\S+/.test(address)){
			flag=true;
			$(".changeuserinfo-error").eq(0).hide();
			if(/^[1-9]{1}\d{5}$/.test(mail)){
				flag=true;
				$(".changeuserinfo-error").eq(1).hide();
				if(/^1[1-9]{10}$/.test(phone)){
					flag=true;
					$(".changeuserinfo-error").eq(2).hide();
					if(birthday!=""){
						flag=true;
						$(".changeuserinfo-error").eq(3).hide();
						if(job==0){
							flag=false;	
							$(".changeuserinfo-error").eq(4).show();
						}else{
							flag=true;
							$(".changeuserinfo-error").eq(4).hide();
							if(icome==0){
								flag=false;	
								$(".changeuserinfo-error").eq(5).show();
							}else{
								flag=true;
								$(".changeuserinfo-error").eq(5).hide();
							}
						}
					}else{
						flag=false;
						$(".changeuserinfo-error").eq(3).show();
					}
				}else{
					flag=false;
					$(".changeuserinfo-error").eq(2).show();
				}
			}else{
				flag=false;
				$(".changeuserinfo-error").eq(1).show();
			}
		}else{
			flag=false;
			$(".changeuserinfo-error").eq(0).show();
		}
		if(flag){
			alert("修改成功");
			window.location.reload();
		}
		console.log(address,mail,phone,birthday,job,icome);
	})
})