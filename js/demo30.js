(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#000000");

	var segments=[],
		numSegments=4,
		target;
	var ball=new Ball(50),
		gravity=0.5,
		bounce=-0.9;
	ball.vx=10;
	
	function moveBall(){
		ball.vy+=gravity;
		ball.x+=ball.vx;
		ball.y+=ball.vy;
		checkWalls(ball);
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
		
	for(var i=0;i<numSegments;i++){
		var seg=new Segment(80,20,"#ffff00");
		segments.push(seg);
	}
	
	segments[segments.length-1].x=canvas.width/2;
	segments[segments.length-1].y=canvas.height/2+200;
	
	
	function reach(seg,tx,ty){
		var dx=tx-seg.x,
			dy=ty-seg.y;
		seg.rotation=Math.atan2(dy,dx);
		var w=seg.getPin().x-seg.x,
			h=seg.getPin().y-seg.y;
		return{
			x:tx-w,
			y:ty-h
		}	
	}
	
	function position(segmentA,segmentB){
		segmentA.x=segmentB.getPin().x;
		segmentA.y=segmentB.getPin().y;		
	}
	
	function move(seg,i){
		if(i!=0){
			target=reach(seg,target.x,target.y);
			position(segments[i-1],seg);
		}
	}
	
	function draw(segment){
		segment.draw(context);
	}
	
	function checkHit(){
		var segment=segments[0],
			dx=segment.getPin().x-ball.x,
			dy=segment.getPin().y-ball.y,
			dist=Math.sqrt(dx*dx+dy*dy);
		
		if(dist<ball.radius){
			ball.vx+=Math.random()*4-2;
			ball.vy-=2;
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
		moveBall();
		target=reach(segments[0],ball.x,ball.y);
		segments.forEach(move);
		checkHit();
		segments.forEach(draw);	
		ball.draw(context);
	}
	
})();
