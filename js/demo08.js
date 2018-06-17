(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#222222");

	var targetBall=new Ball(5,"#ffff00"),
		ball=new Ball(50),
		easing=0.05,
		isMouseDown=false;
		
	targetBall.x=canvas.width/2;
	targetBall.y=canvas.height/2;
	ball.x=canvas.width/2;
	ball.y=canvas.height/2;
	
	canvas.addEventListener(myEvent.mousedown,function(event){
		event.preventDefault();
		if(utils.containsPoint(ball.getBounds(),myEvent.mouse.x,myEvent.mouse.y)){
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
		ball.x=myEvent.mouse.x;
		ball.y=myEvent.mouse.y;
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
		if(!isMouseDown){
			ball.x+=(targetBall.x-ball.x)*easing;
			ball.y+=(targetBall.y-ball.y)*easing;
		}
		targetBall.draw(context);
		ball.draw(context);
	}
	
})();
