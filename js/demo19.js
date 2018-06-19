(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#222222");

	var lines=[],
		ball=new Ball(50),
		gravity=0.5,
		bounce=-0.7;
		
	ball.x=canvas.width/2;
	
	lines[0]=new Line(-100,0,100,0,"#ffff00");
	lines[0].x=500;
	lines[0].y=100;
	lines[0].rotation=30*Math.PI/180;
	
	lines[1]=new Line(-100,0,100,0,"#ffff00");
	lines[1].x=500;
	lines[1].y=280;
	lines[1].rotation=45*Math.PI/180;
	
	lines[2]=new Line(-100,0,100,0,"#ffff00");
	lines[2].x=780;
	lines[2].y=250;
	lines[2].rotation=-20*Math.PI/180;
	
	lines[3]=new Line(-100,0,100,0,"#ffff00");
	lines[3].x=500;
	lines[3].y=560;
	lines[3].rotation=10*Math.PI/180;
	
	lines[4]=new Line(-100,0,100,0,"#ffff00");
	lines[4].x=770;
	lines[4].y=440;
	lines[4].rotation=-30*Math.PI/180;
	
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
	
	function checkLine(line){
		if(ball.x+ball.radius>line.getBounds().x&&ball.x-ball.radius<line.getBounds().x+line.getBounds().width){	
			var cos=Math.cos(line.rotation),
				sin=Math.sin(line.rotation);
				
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
	
	function drawLine(line){
		checkLine(line);
		line.draw(context);
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
		if(!ball.dragging){
			move(ball);
		}
		lines.forEach(drawLine);
		ball.draw(context);
	}
	
})();
