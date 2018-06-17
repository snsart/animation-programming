(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#222222");
	
	var balls=[],
		numBalls=150,
		wind=0,//添加风
		gravity=0.5;//添加重力效果
		
	function createballs(){
		for(var i=0;i<numBalls;i++){
			var ball=new Ball(2,Math.random()*0xffffff);
			ball.x=canvas.width/2;
			ball.y=canvas.height;
			ball.lineWidth=0;
			ball.vx=Math.random()*2-1;
			ball.vy=Math.random()*-20-10;
			balls.push(ball);
		}
	}
	createballs();
	
	function drawAndMoveBall(ball){
		ball.vx+=wind;
		ball.vy+=gravity;
		ball.x+=ball.vx;
		ball.y+=ball.vy;
		if(ball.x-ball.radius>canvas.width||ball.x+ball.radius<0||ball.y-ball.radius>canvas.height||ball.y+ball.radius<0){
			ball.x=canvas.width/2;
			ball.y=canvas.height;
			ball.vx=Math.random()*2-1;
			ball.vy=Math.random()*-20-10;
			console.log(ball.vy);
		}
		ball.draw(context);
	}
	
	
	window.addEventListener("keydown",function(event){
		switch(event.keyCode){
			case 37://left
				wind=-0.5;
				break;
			case 39://right
				wind=0.5;
				break;
		}
	},false);
	
	window.addEventListener("keyup",function(){
		wind=0;
	},false);
		
	(function drawFrame(){
		if(animaClose){
			return;
		}
		window.requestAnimationFrame(drawFrame,canvas);
		context.clearRect(0,0,canvas.width,canvas.height);
		enterFrameHandler();
	})()
	
	function enterFrameHandler(){
		balls.forEach(drawAndMoveBall);
	}
	
})();
