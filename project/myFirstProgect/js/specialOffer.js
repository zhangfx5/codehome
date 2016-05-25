var init = function() {
	loadInfo.init().create();
}
var loadInfo={
	specialUl:null,
	specialLi:null,
	init:function()
	{
		specialUl=$("#main1 ul");
		specialLi=$("#main1 ul li");
		return this;
	},
	create:function()
	{
		//获取json数据转换成json对象
		$.getJSON("js/data.json", function(json){
		  var dataArr=json.data.rows;
		  //对json对象进行遍历
		  for(var i=0;i<dataArr.length;i++)
		  {
		  	//如果相对应的物品id前两个字符是SP，则取出这段数据
		  	if(dataArr[i].id.substring(0,2)=="SP")
		  	{
		  		//添加到specialUl里
		  		var str="<li class='style5'><div class='style5Left left'><img src='"+dataArr[i].imgUrl+"' /></div><div class='style5Right left'><div class='style5RightInfo1'>"+dataArr[i].content+"</div><div class='style5RightInfo2'>超值雪地靴全网最低价</div><div class='style5RightInfo3'><div class='specialRitBtn'><p class='p1'>"+dataArr[i].nowPrice+"</p><p class='p2'>"+dataArr[i].discount+"</p><p class='p3'>"+dataArr[i].beforePrice+"</p></div></div></div></li>";
		  		specialUl.append(str);
		  		$(".style5").hover(function()
		  		{
		  			$(this).addClass("box-shadow-6");
		  			$(this).css("border","1px solid red");
		  		},
		  		function()
		  		{
		  			$(this).removeClass("box-shadow-6");
		  			$(this).css("border","");
		  		})
		  	}
		  }
		});
		//给每一个新添加的物品li天价出发时间
		specialUl.delegate(".style5","click",function()
		{
			var index=$("#main1 .style5").index($(this));
			var str1="SP2"+index;
			var d1 = new Date();
			d1.setDate(d1.getDate()+3);
			document.cookie="detailId="+str1+"; expires="+d1;
			window.location.href="detail.html";
		});
	
	}
}
