(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#000000");

	var bounce=-1;
		ball0=new Ball(100),
		ball1=new Ball(60);
		
		ball0.mass=2;
		ball0.x=canvas.width/2;
		ball0.y=canvas.height/2;
		ball0.vx=Math.random()*10-5;
		ball0.vy=Math.random()*10-5;
		
		ball1.mass=1;
		ball1.x=canvas.width/2-400;
		ball1.y=canvas.height/2;
		ball1.vx=Math.random()*10-5;
		ball1.vy=Math.random()*10-5;
		
	function rotate(x,y,sin,cos,reverse){
		return{
			x:(reverse)?(x*cos+y*sin):(x*cos-y*sin),
			y:(reverse)?(y*cos-x*sin):(y*cos+x*sin)
		};
	}
	
	function checkCollision(ball0,ball1){	
		var dx=ball1.x-ball0.x,
			dy=ball1.y-ball0.y,
			dist=Math.sqrt(dx*dx+dy*dy);
			
		if(dist<ball0.radius+ball1.radius){
			var angle=Math.atan2(dy,dx),
				sin=Math.sin(angle),
				cos=Math.cos(angle),
				pos0={x:0,y:0};
				pos1=rotate(dx,dy,sin,cos,true),
				vel0=rotate(ball0.vx,ball0.vy,sin,cos,true),
				vel1=rotate(ball1.vx,ball1.vy,sin,cos,true);
			
			vxTotal=vel0.x-vel1.x;
			vel0.x=((ball0.mass-ball1.mass)*vel0.x+2*ball1.mass*vel1.x)/(ball0.mass+ball1.mass);
			vel1.x=vxTotal+vel0.x;
			pos0.x+=vel0.x;
			pos1.x+=vel1.x;
			
			var pos0F=rotate(pos0.x,pos0.y,sin,cos,false),
				pos1F=rotate(pos1.x,pos1.y,sin,cos,false);
			
			ball1.x=ball0.x+pos1F.x;
			ball1.y=ball0.y+pos1F.y;
			ball0.x=ball0.x+pos0F.x;
			ball0.y=ball0.y+pos0F.y;
			
			var vel0F=rotate(vel0.x,vel0.y,sin,cos,false),
				vel1F=rotate(vel1.x,vel1.y,sin,cos,false);
			ball0.vx=vel0F.x;
			ball0.vy=vel0F.y;
			ball1.vx=vel1F.x;
			ball1.vy=vel1F.y;
			
		}
	}
	
	function checkWalls(ball){
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
		ball0.y+=ball0.vy;
		ball1.x+=ball1.vx;
		ball1.y+=ball1.vy;
		checkCollision(ball0,ball1);
		checkWalls(ball0);
		checkWalls(ball1);
		
		ball0.draw(context);
		ball1.draw(context);
	}
	
})();
