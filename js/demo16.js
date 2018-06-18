(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#222222");

	var balls=[],
		numBalls=20;
		spring=0.05,//弹性系数
		bounce=-0.5,
		gravity=0.1;
		
	function createBalls(){
		while(numBalls--){
			var ball=new Ball(Math.random()*40+5,Math.random()*0xffffff);
			ball.x=Math.random()*canvas.width;
			ball.y=Math.random()*canvas.height;
			ball.vx=Math.random()*6-3;
			ball.vy=Math.random()*6-3;
			balls.push(ball);
		}
	}
	createBalls();
	
	function checkCollision(ballA,i){
		for(var ballB,dx,dy,dis,minDist,j=i+1;j<balls.length;j++){
			ballB=balls[j];
			dx=ballB.x-ballA.x;
			dy=ballB.y-ballA.y;
			dist=Math.sqrt(dx*dx+dy*dy);
			minDist=ballA.radius+ballB.radius;
			if(dist<minDist){
				var tx=ballA.x+dx/dist*minDist,
					ty=ballA.y+dx/dist*minDist,
					ax=(tx-ballB.x)*spring*0.5,
					ay=(ty-ballB.y)*spring*0.5;
				ballA.vx-=ax;
				ballA.vy-=ay;
				ballB.vx+=ax;
				ballB.vy+=ay;
			}
		}
	}
	
	function draw(ball){
		ball.draw(context);
	}
	
	function move(ball){
		ball.vy+=gravity;
		ball.x+=ball.vx;
		ball.y+=ball.vy;
		if(ball.x+ball.radius>canvas.width){
			ball.x=canvas.width-ball.radius;
			ball.vx*=bounce;
		}else if(ball.x-ball.radius<0){
			ball.x=ball.radius;
			ball.vx*=bounce;
		}
		if(ball.y+ball.radius>canvas.height){
			ball.y=canvas.height-ball.radius;
			ball.vy*=bounce;
		}else if(ball.y-ball.radius<0){
			ball.y=ball.radius;
			ball.vy*=bounce;
		}
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
		balls.forEach(checkCollision);
		balls.forEach(move);
		balls.forEach(draw);
	}
	
})();
