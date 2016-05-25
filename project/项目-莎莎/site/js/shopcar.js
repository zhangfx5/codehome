function shopcarInit(){
	init.num().btn2()
}


var init = {
	btn : function(){
		var leng = $(".shopcarcon_main").length ;
		var num = 0;
		for(var i=0;i<leng;i++){
			var num1 = $(".shopcarcon_main_ttt").eq(i).attr("num") * $(".btn_input").eq(i).val();
			console.log($(".btn_input").eq(i).val()  )
			num = num + num1 ;
		}
		var num2 = $(".shopcarcon_main_ttt").eq(0).attr("num") * $(".btn_input").eq(0).val();
		$(".shopcarcon_main_price").eq(0).text("￥"+ num2 + ".0" )
			
		var num3 = $(".shopcarcon_main_ttt").eq(1).attr("num") * $(".btn_input").eq(1).val();
		$(".shopcarcon_main_price").eq(1).text("￥"+ num3 + ".0" )
		
		$(".shopEnd_con_sp2").text("￥"+num) //总价
		
	return this ;
	},
	btn2 : function(){
		$("#logo_shopcar").click(function(){
			window.location.href="index.html"
		})
	return this ;	
	},
	num : function(){
//		按钮增加个数
		$(".par_1rig_standard2_a1").each(function(i){
			$(this).click(function(){
				var numbers = $(".par_1rig_standard2_a input").eq(i).val()
				if( numbers > 1 ) --numbers;
				$(".par_1rig_standard2_a input").eq(i).val(numbers)
				init.btn()
			})
		})
		
		
//		按钮减少个数
		$(".par_1rig_standard2_a2").each(function(i){
			$(this).click(function(){
				var numbers = $(".par_1rig_standard2_a input").eq(i).val()
				if( numbers < 99 ) ++numbers;
				$(".par_1rig_standard2_a input").eq(i).val(numbers)
				init.btn()
			})
		})

//		失去焦点时检测
		$("#btn_input").blur(function(){
			console.log(111)
			var numbers = $(".par_1rig_standard2_a input").val();
			if( numbers < 1 ){
				numbers = 1 ;
			}else if( numbers > 99 ){
				numbers = 99 ;
			}
			$(".par_1rig_standard2_a input").val(numbers)
		})
	return this ;
	}

}