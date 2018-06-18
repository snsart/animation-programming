(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#222222");

	var balls=[],
		numBalls=10,
		angle=0,
		centerX=canvas.width/2,
		centerY=canvas.height/2,
		cos,sin;
		
	function createBalls(){
		while(numBalls--){
			var ball=new Ball(Math.random()*40+5,Math.random()*0xffffff);
			ball.x=Math.random()*canvas.width;
			ball.y=Math.random()*canvas.height;
			balls.push(ball);
		}
	}
	createBalls();
	
	function draw(ball){
		ball.draw(context);
	}
	
	function move(ball){
		var x1=ball.x-centerX,
			y1=ball.y-centerY,
			x2=x1*cos-y1*sin,
			y2=y1*cos+x1*sin;
		ball.x=centerX+x2;
		ball.y=centerY+y2;
	}

	
	(function drawFrame(){
		if(animaClose){
			return;
		}
		window.requestAnimationFrame(drawFrame,canvas);
		context.clearRect(0,0,canvas.width,canvas.height);
		enterFrameHandler();
	})()
	
	function enterFrameHandler(){
		var angle=(myEvent.mouse.x-centerX)*0.0005;
		if(!myEvent.mouse.x){
			angle=0;
		}
		cos=Math.cos(angle);
		sin=Math.sin(angle);
		balls.forEach(move);
		balls.forEach(draw);
	}
	
})();
