(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#000000");

	var balls=[],
		numBalls=2,
		sun=new Ball(100,"#ffff00"),
		planet=new Ball(10,"#000fff"),
		planetTails=[],
		easing=0.1,
		Numtails=20;
		
		
	sun.x=canvas.width/2;
	sun.y=canvas.height/2;
	sun.mass=10000;
	balls.push(sun);
	
	planet.x=canvas.width/2+200;
	planet.y=canvas.height/2;
	planet.vy=8;
	planet.mass=1;
	balls.push(planet);
		
	for(var tail,i=0;i<Numtails;i++){
		tail=new Ball(5,0xff0000);
		planetTails.push(tail);
	}
	
	function moveTail(tail,i){
		var targetX,targetY;
		if(i==0){
			targetX=planet.x;
			targetY=planet.y;
		}else{
			targetX=planetTails[i-1].x;
			targetY=planetTails[i-1].y;
		}
		var dx=targetX-tail.x,
			dy=targetY-tail.y;
		tail.x+=dx*easing;
		tail.y+=dy*easing;
	}
	
	function drawTail(tail){
		tail.draw(context);
	}
	
	
	function checkBoundrays(ball){
		if(ball.x-ball.radius>canvas.width){
			ball.x=-ball.radius;
		}else if(ball.x+ball.radius<0){
			ball.x=canvas.width+ball.radius;
		}
		if(ball.y-ball.radius>canvas.height){
			ball.y=-ball.radius;
		}else if(ball.y+ball.radius<0){
			ball.y=canvas.height+ball.radius;
		}
	}
	
	function move(ballA,i){
		console.log(i);
		ballA.x+=ballA.vx;
		ballA.y+=ballA.vy;
		for(var ballB,j=i+1;j<numBalls;j++){
			ballB=balls[j];
			checkCollision(ballA,ballB);
			gravitate(ballA,ballB);
		}
		//checkBoundrays(ballA);
	}
	
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
			
			var absV=Math.abs(vel0.x)+Math.abs(vel1.x),
				overlap=(ball0.radius+ball1.radius)-Math.abs(pos0.x-pos1.x);
			pos0.x+=vel0.x/absV*overlap;
			pos1.x+=vel1.x/absV*overlap;
			
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
	
	function gravitate(ballA,ballB){
		var dx=ballB.x-ballA.x,
			dy=ballB.y-ballA.y,
			distSQ=dx*dx+dy*dy,
			dist=Math.sqrt(distSQ),
			force=ballA.mass*ballB.mass/distSQ,
			fx=force*dx/dist,
			fy=force*dy/dist;
		ballA.vx+=fx/ballA.mass;
		ballA.vy+=fy/ballA.mass;
		ballB.vx-=fx/ballB.mass;
		ballB.vy-=fy/ballB.mass;
	}
	
	function draw(ball){
		ball.draw(context);
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
		balls.forEach(move);
		balls.forEach(draw);
		planetTails.forEach(moveTail);
		planetTails.forEach(drawTail);
	}
	
})();
