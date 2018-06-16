(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#000000");

	var touch=utils.captureTouch(canvas),
		mouse=utils.captureMouse(canvas),
		ball=new Ball(50),
		vx=Math.random()*10-5,
		vy=-10,
		bounce=-0.7,//弹力，每反弹一次速度下降到原来的0.7倍；
		gravity=0.2,
		isTouchDown=false,
		oldX,oldY;
	
	ball.x=canvas.width/2;
	ball.y=canvas.height/2;
	
	canvas.addEventListener("mousedown",function(){
		
	});
	
	canvas.addEventListener("touchstart",function(event){
		event.preventDefault();
		if(utils.containsPoint(ball.getBounds(),touch.x,touch.y)){
			isTouchDown=true;
			oldX=ball.x;
			oldY=ball.y;
			canvas.addEventListener("touchend",onTouchend,false);
			canvas.addEventListener("touchmove",onTouchmove,false);
		}
	},false);
	
	function onTouchend(event){
		event.preventDefault();
		isTouchDown=false;
		canvas.removeEventListener("touchend",onTouchend,false);
		canvas.removeEventListener("touchmove",onTouchmove,false);
	}
	
	function onTouchmove(event){
		event.preventDefault();
		ball.x=touch.x;
		ball.y=touch.y;
	}
	
	function checkBoundaries(){
		var left=0,
			right=canvas.width,
			top=0,
			bottom=canvas.height;
		vy+=gravity;
		ball.x+=vx;
		ball.y+=vy;
		
		if(ball.x+ball.radius>right){
			ball.x=right-ball.radius;
			vx*=bounce;
		}else if(ball.x-ball.radius<left){
			ball.x=left+ball.radius;
			vx*=bounce;
		}
		
		if(ball.y+ball.radius>bottom){
			ball.y=bottom-ball.radius;
			vy*=bounce;
		}else if(ball.y-ball.radius<top){
			ball.y=top+ball.radius;
			vy*=bounce;
		}
	}
	
	//设置投掷时的vx和vy
	function trackVelocity(){
		vx=ball.x-oldX;
		vy=ball.y-oldY;
		oldX=ball.x;
		oldY=ball.y;
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
		if(!isTouchDown){
			checkBoundaries();
		}else{
			trackVelocity();
		}
		ball.draw(context);
	}
	
})();
