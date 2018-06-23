(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#000000");

	var segment0=new Segment(100,30,"#ffff00"),
		segment1=new Segment(100,30,"#ffff00"),
		segment2=new Segment(100,30,"#ffff00"),
		segment3=new Segment(100,30,"#ffff00"),
		cycle=0,
		offset=-2.2,
		gravity=0.5,
		vx=0,
		vy=0;
		
	segment0.x=400;
	segment0.y=200;
	segment2.x=400;
	segment2.y=200;
	
	segment1.x=segment0.getPin().x;
	segment1.y=segment0.getPin().y;
	segment1.draw(context);
	
	function walk(segA,segB,cyc){
		
		var angle0=(Math.sin(cyc)*50+75)*Math.PI/180,
			angle1=(Math.sin(cyc+offset)*45+45)*Math.PI/180,
			foot=segB.getPin();
		
		segA.rotation=angle0;
		segB.rotation=segA.rotation+angle1;
		segB.x=segA.getPin().x;
		segB.y=segA.getPin().y;
		
		segB.vx=segB.getPin().x-foot.x;
		segB.vy=segB.getPin().y-foot.y;
	}
	
	function setVelocity(){
		vy+=gravity;
		segment0.x+=vx;
		segment0.y+=vy;
		segment2.x+=vx;
		segment2.y+=vy;
	}
	
	function checkFloor(segment){
		var yMax=segment.getPin().y+segment.height/2;
		if(yMax>canvas.height){
			var dy=yMax-canvas.height;
			segment0.y-=dy;
			segment1.y-=dy;
			segment2.y-=dy;
			segment3.y-=dy;
			vx-=segment.vx;
			vy-=segment.vy;
		}
	}
	
	function checkWalls(){
		var w=canvas.width+200;
		if(segment0.x>canvas.width+100){
			segment0.x-=w;
			segment1.x-=w;
			segment2.x-=w;
			segment3.x-=w;
		}else if(segment0.x<-100){
			segment0.x+=w;
			segment1.x+=w;
			segment2.x+=w;
			segment3.x+=w;
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
		cycle+=0.1;
		setVelocity();
		walk(segment0,segment1,cycle);
		walk(segment2,segment3,cycle+Math.PI);
		checkFloor(segment1);
		checkFloor(segment3);
		checkWalls();
		segment0.draw(context);
		segment1.draw(context);
		segment2.draw(context);
		segment3.draw(context);
		
	}
	
})();
