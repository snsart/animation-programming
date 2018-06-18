(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#222222");

	var ball0=new Ball(40),
		ball1=new Ball(40,"#ffff00"),
		ball0_dragging=false,
		ball1_dragging=false,
		spring=0.01,//弹性系数
		friction=0.95,
		springLength=200,
		isMouseDown=false;
	
	ball0.x=Math.random()*canvas.width;
	ball0.y=Math.random()*canvas.height;
	ball1.x=Math.random()*canvas.width;
	ball1.y=Math.random()*canvas.height;

	canvas.addEventListener(myEvent.mousedown,function(event){
		event.preventDefault();
		if(utils.containsPoint(ball0.getBounds(),myEvent.mouse.x,myEvent.mouse.y)){
			ball0_dragging=true;
		}
		if(utils.containsPoint(ball1.getBounds(),myEvent.mouse.x,myEvent.mouse.y)){
			ball1_dragging=true;
		}
		
	},false);
	
	canvas.addEventListener(myEvent.mouseup,onMouseup,false);
	canvas.addEventListener(myEvent.mousemove,onMousemove,false);
	
	function onMouseup(event){
		event.preventDefault();
		if(ball0_dragging||ball1_dragging){
			ball0_dragging=false;
			ball1_dragging=false;
		}
	}
	
	function onMousemove(event){
		event.preventDefault();
		if(ball0_dragging){
			ball0.x=myEvent.mouse.x;
			ball0.y=myEvent.mouse.y;
		}
		if(ball1_dragging){
			ball1.x=myEvent.mouse.x;
			ball1.y=myEvent.mouse.y;
		}
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
		if(!ball0_dragging){
			sprintTo(ball0,ball1);
		}
		if(!ball1_dragging){
			sprintTo(ball1,ball0);
		}
		context.strokeStyle="#FFFFFF"
		context.beginPath();
		context.moveTo(ball0.x,ball0.y);
		context.lineTo(ball1.x,ball1.y);
		context.stroke();
		ball0.draw(context);
		ball1.draw(context);
	}
	
})();
