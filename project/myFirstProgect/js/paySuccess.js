var init = function() {
	timeGo.init().create();
}
var timeGo={
	timeShowDiv:null,
	init:function()
	{
		timeShowDiv=$(".showInfoSuccessTime");
		return this;
	},
	create:function()
	{
		var i=3;
		var e;
	
		e=setInterval(function()
		{
			i--;
			timeShowDiv.html(i+"秒后自动跳转");
			if(i==0)
			{
				clearInterval(e);
				setTimeout(function()
				{
					window.location.href="index.html";
				},1000);
				
			}
		
		},1000);
	}
}

