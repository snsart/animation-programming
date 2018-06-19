(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#222222");

	var line=new Line(0,0,500,0,"#ffff00"),
		ball=new Ball(50),
		gravity=0.5,
		bounce=-0.7;
	
	ball.x=canvas.width/2;
	line.x=300;
	line.y=500;
	line.rotation=10*Math.PI/180;
	var cos=Math.cos(line.rotation),
		sin=Math.sin(line.rotation);
	
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
	
	function move(ball){
		
		ball.vy+=gravity;
		ball.x+=ball.vx;
		ball.y+=ball.vy;
			
		if(ball.x+ball.radius>line.getBounds().x&&ball.x-ball.radius<line.getBounds().x+line.getBounds().width){
			var dx=ball.x-line.x,
				dy=ball.y-line.y,
				dyr=cos*dy-sin*dx;
				vyr=cos*ball.vy-sin*ball.vx;
			
			if(dyr>-ball.radius&&dyr<vyr){
				dxr=cos*dx+sin*dy,
				vxr=cos*ball.vx+sin*ball.vy,
				
				dyr=-ball.radius;
				vyr*=bounce;
				
				dx=cos*dxr-sin*dyr;
				dy=cos*dyr+sin*dxr;
				ball.vx=cos*vxr-sin*vyr;
				ball.vy=cos*vyr+sin*vxr;
				ball.x=dx+line.x;
				ball.y=dy+line.y;
			}
		}
			
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
		line.draw(context);
		if(!ball.dragging){
			move(ball);
		}
		ball.draw(context);
	}
	
})();
