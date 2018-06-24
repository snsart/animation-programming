(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#000000");

	var segments=[],
		numSegments=5,
		target;
		
	for(var i=0;i<numSegments;i++){
		var seg=new Segment(80,20,"#ffff00");
		segments.push(seg);
	}
	
	segments[segments.length-1].x=canvas.width/2;
	segments[segments.length-1].y=canvas.height/2;
	
	
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
	
	(function drawFrame(){
		if(animaClose){
			return;
		}
		window.requestAnimationFrame(drawFrame,canvas);
		context.clearRect(0,0,canvas.width,canvas.height);
		enterFrameHandler();
	})()
	
	
	function enterFrameHandler(){
		target=reach(segments[0],myEvent.mouse.x,myEvent.mouse.y);
		segments.forEach(move);
		segments.forEach(draw);
		
	}
	
})();
