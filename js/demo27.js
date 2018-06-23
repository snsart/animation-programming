(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#000000");

	var segments=[],
		numSegments=20;
	
	while(numSegments--){
		segments.push(new Segment(50,15));
	}
	
	(function drawFrame(){
		if(animaClose){
			return;
		}
		window.requestAnimationFrame(drawFrame,canvas);
		context.clearRect(0,0,canvas.width,canvas.height);
		enterFrameHandler();
	})()
	
	function drag(segment,xpos,ypos){
		var dx=xpos-segment.x,
			dy=ypos-segment.y;
		segment.rotation=Math.atan2(dy,dx);
		var w=segment.getPin().x-segment.x,
			h=segment.getPin().y-segment.y;
		segment.x=xpos-w;
		segment.y=ypos-h;
	}
	
	function move(segment,i){
		if(i!=0){
			drag(segment,segments[i-1].x,segments[i-1].y);
		}
	}
	
	function draw(segment){
		segment.draw(context);
	}
	
	function enterFrameHandler(){
		drag(segments[0],myEvent.mouse.x,myEvent.mouse.y);
		segments.forEach(move);
		segments.forEach(draw);
		
	}
	
})();
