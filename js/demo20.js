(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#000000");

	var bounce=-1;
		ball0=new Ball(50),
		ball1=new Ball(30);
		
		ball0.mass=2;
		ball0.x=50;
		ball0.y=canvas.height/2;
		ball0.vx=2;
		
		ball1.mass=1;
		ball1.x=canvas.width-50;
		ball1.y=canvas.height/2;
		ball1.vx=-2;
	
	canvas.addEventListener(myEvent.mousedown,function(){
		event.preventDefault();
		if(utils.containsPoint(ball.getBounds(),myEvent.mouse.x,myEvent.mouse.y)){
			ball.dragging=true;
			ball.vx=0;
			ball.vy=0;
		}
	});
	
	canvas.addEventListener(myEvent.mouseup,function(){
		ball.dragging=false;
	});
	
	canvas.addEventListener(myEvent.mousemove,function(){
		if(ball.dragging){
			ball.x=myEvent.mouse.x;
			ball.y=myEvent.mouse.y;
		}
	});
	
	function checkBoundary(ball){
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
		ball0.x+=ball0.vx;
		ball1.x+=ball1.vx;
		var dist=ball1.x-ball0.x;
		if(Math.abs(dist)<ball0.radius+ball1.radius){
			/*求相对速度*/
			var vxTotal=ball0.vx-ball1.vx;
			var vx0Final=((ball0.mass-ball1.mass)*ball0.vx+2*ball1.mass*ball1.vx)/(ball0.mass+ball1.mass);
			/*var vx1Final=((ball1.mass-ball0.mass)*ball1.vx+2*ball0.mass*ball0.vx)/(ball0.mass+ball1.mass);*/
			var vx1Final=vxTotal+ball0.vx;
			ball0.vx=vx0Final;
			ball1.vx=vx1Final;
			ball0.x+=ball0.vx;
			ball1.x+=ball1.vx;
		}
		checkBoundary(ball0);
		checkBoundary(ball1);
		
		ball0.draw(context);
		ball1.draw(context);
	}
	
})();
