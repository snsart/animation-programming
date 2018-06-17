(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#222222");

	var targetBall=new Ball(40,"#ffff00"),
		spring=0.02,//弹性系数
		friction=0.9,
		gravity=2,
		balls=[],
		numBalls=5,
		isMouseDown=false;
		
	targetBall.x=canvas.width/2;
	targetBall.y=50;
	
	canvas.addEventListener(myEvent.mousedown,function(event){
		event.preventDefault();
		if(utils.containsPoint(targetBall.getBounds(),myEvent.mouse.x,myEvent.mouse.y)){
			isMouseDown=true;
			canvas.addEventListener(myEvent.mouseup,onMouseup,false);
			canvas.addEventListener(myEvent.mousemove,onMousemove,false);
		}
	},false);
	
	function onMouseup(event){
		event.preventDefault();
		isMouseDown=false;
		canvas.removeEventListener(myEvent.mouseup,onMouseup,false);
		canvas.removeEventListener(myEvent.mousemove,onMousemove,false);
	}
	
	function onMousemove(event){
		event.preventDefault();
		targetBall.x=myEvent.mouse.x;
		targetBall.y=myEvent.mouse.y;
	}
	
	function createBalls(){
		while(numBalls--){
			balls.push(new Ball(20));
		}
	}
	
	function move(ball,targetX,targetY){
		ball.vx+=(targetX-ball.x)*spring;
		ball.vy+=(targetY-ball.y)*spring;
		ball.vy+=gravity;
		ball.vx*=friction;
		ball.vy*=friction;
		ball.x+=ball.vx;
		ball.y+=ball.vy;
	}
	
	function draw(ball,i){
		context.strokeStyle="#FFFFFF";
		if(i==0){
			move(ball,targetBall.x,targetBall.y);
			context.moveTo(targetBall.x,targetBall.y);
		}else{
			var ballA=balls[i-1];
			move(ball,ballA.x,ballA.y);
			context.moveTo(ballA.x,ballA.y);
		}
		context.lineTo(ball.x,ball.y);
		context.stroke();
		ball.draw(context);
	}
	
	createBalls();
	
	(function drawFrame(){
		if(animaClose){
			return;
		}
		window.requestAnimationFrame(drawFrame,canvas);
		context.clearRect(0,0,canvas.width,canvas.height);
		enterFrameHandler();
	})()
	
	function enterFrameHandler(){
		context.beginPath();
		targetBall.draw(context);
		balls.forEach(draw);
	}
	
})();
