(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#222222");

	var spring=0.02,//弹性系数
		friction=0.9,
		ball=new Ball(40),
		numHandles=5,//5个目标控制点
		handles=[],
		moveHandle=null,
		isMouseDown=false;

	
	canvas.addEventListener(myEvent.mousedown,function(event){
		event.preventDefault();
		handles.forEach(addDrag);
		function addDrag(handle){
			if(utils.containsPoint(handle.getBounds(),myEvent.mouse.x,myEvent.mouse.y)){
				isMouseDown=true;
				moveHandle=handle;
			}
		}
	},false);
	
	canvas.addEventListener(myEvent.mouseup,onMouseup,false);
	canvas.addEventListener(myEvent.mousemove,onMousemove,false);
	
	function onMouseup(event){
		event.preventDefault();
		if(moveHandle){
			moveHandle=null;
		}
	}
	
	function onMousemove(event){
		event.preventDefault();
		if(moveHandle){
			moveHandle.x=myEvent.mouse.x;
			moveHandle.y=myEvent.mouse.y;
		}
	}
	
	function createHandles(){
		while(numHandles--){
			var ball=new Ball(30,"#ffff00");
			ball.x=Math.random()*canvas.width;
			ball.y=Math.random()*canvas.height;
			handles.push(ball);
		}
	}
	
	function applyHandle(handle){
		ball.vx+=(handle.x-ball.x)*spring;
		ball.vy+=(handle.y-ball.y)*spring;
	}
	
	function drawHandle(handle){
		context.strokeStyle="#FFFFFF";
		context.moveTo(ball.x,ball.y);
		context.lineTo(handle.x,handle.y);
		context.stroke();
		handle.draw(context);
	}
	
	createHandles();
	
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
		handles.forEach(applyHandle);
		ball.vx*=friction;
		ball.vy*=friction;
		ball.x+=ball.vx;
		ball.y+=ball.vy;
		handles.forEach(drawHandle);
		ball.draw(context);
	}
	
})();
