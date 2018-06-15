(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
	
	var ball=new Ball(),
		vx=0,
		ax=0;//加速度
	ball.x=canvas.width/2;
	ball.y=canvas.height/2;
	
	window.addEventListener("keydown",function(event){
		if(event.keyCode===37){
			ax=-0.1;
		}else if(event.keyCode===39){
			ax=0.1;
		}
	},false);
	
	window.addEventListener("keyup",function(){
		ax=0;
	},false);
		
	(function drawFrame(){
		if(animaClose){
			return;
		}
		window.requestAnimationFrame(drawFrame,canvas);
		context.clearRect(0,0,canvas.width,canvas.height);
		enterFrameHandler()
	})()
	
	function enterFrameHandler(){
		vx+=ax;//将x轴上的加速度ax累加在vx上
		ball.x+=vx;
		ball.draw(context);
	}
	
})();
