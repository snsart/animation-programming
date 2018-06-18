(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#222222");

	var balls=[],
		numBalls=5;
		spring=0.01,//弹性系数
		friction=0.95,
		springLength=200,
		isMouseDown=false;
	
	function createBalls(){
		while(numBalls--){
			var ball=new Ball();
			ball.x=Math.random()*canvas.width;
			ball.y=Math.random()*canvas.height;
			ball.dragging=false;
			balls.push(ball);
		}
	}
	createBalls();
	canvas.addEventListener(myEvent.mousedown,function(event){
		event.preventDefault();
		function drag(ball){
			if(utils.containsPoint(ball.getBounds(),myEvent.mouse.x,myEvent.mouse.y)){
				ball.dragging=true;
			}
		}
		balls.forEach(drag)
	},false);
	
	canvas.addEventListener(myEvent.mouseup,onMouseup,false);
	canvas.addEventListener(myEvent.mousemove,onMousemove,false);
	
	function onMouseup(event){
		event.preventDefault();
		balls.forEach(function(ball){
			ball.dragging=false;
		})
	}
	
	function onMousemove(event){
		event.preventDefault();
		balls.forEach(function(ball){
			if(ball.dragging){
				ball.x=myEvent.mouse.x;
				ball.y=myEvent.mouse.y;
			}
		})
	}
	
	function sprintTo(ballA,ballB){
		var dx=ballB.x-ballA.x,
		 	dy=ballB.y-ballA.y,
			angle=Math.atan2(dy,dx),
			targetX=ballB.x-Math.cos(angle)*springLength,
			targetY=ballB.y-Math.sin(angle)*springLength;
		ballA.vx+=(targetX-ballA.x)*spring;
		ballA.vy+=(targetY-ballA.y)*spring;
		ballA.vx*=friction;
		ballA.vy*=friction;
		ballA.x+=ballA.vx;
		ballA.y+=ballA.vy;
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
		console.log(balls.length);
		balls.forEach(function(ball,i){
			if(!ball.dragging){
				if(i==0){
					sprintTo(ball,balls[1]);
					sprintTo(ball,balls[balls.length-1]);
				}else if(i==balls.length-1){
					sprintTo(ball,balls[0]);
					sprintTo(ball,balls[balls.length-2]);
				}else{
					sprintTo(ball,balls[i-1]);
					sprintTo(ball,balls[i+1]);
				}
			}
		})
		context.strokeStyle="#FFFFFF"
		context.beginPath();
		
		balls.forEach(function(ball,i){
			if(i==0){
				context.moveTo(ball.x,ball.y);
			}else{
				context.lineTo(ball.x,ball.y);
			}
		})
		context.lineTo(balls[0].x,balls[0].y);
		context.stroke();
		balls.forEach(function(ball){
			ball.draw(context);
		})
	}
	
})();
