(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#222222");

	var targetBall=new Ball(30,"#ffff00"),
		ball=new Ball(50),
		spring=0.01,//弹性系数
		vx=0,
		vy=0,
		friction=0.98,
		gravity=2;
		isMouseDown=false;
		
	targetBall.x=canvas.width/2;
	targetBall.y=canvas.height/2;
	ball.x=canvas.width/2;
	ball.y=canvas.height/2;
	
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
	
	(function drawFrame(){
		if(animaClose){
			return;
		}
		window.requestAnimationFrame(drawFrame,canvas);
		context.clearRect(0,0,canvas.width,canvas.height);
		enterFrameHandler();
	})()
	
	function enterFrameHandler(){
		
		var ax=(targetBall.x-ball.x)*spring;
		var ay=(targetBall.y-ball.y)*spring;
		vx+=ax;
		vy+=ay;
		vy+=gravity;
		vx*=friction;
		vy*=friction;
		ball.x+=vx;
		ball.y+=vy;
		
		context.beginPath();
		context.strokeStyle="#FFFFFF"
		context.moveTo(ball.x,ball.y);
		context.lineTo(targetBall.x,targetBall.y);
		context.stroke();
		targetBall.draw(context);
		ball.draw(context);
	}
	
})();
