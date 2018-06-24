(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#000000");

	var segment0=new Segment(150,30,"#ffff00"),
		segment1=new Segment(150,30,"#ffff00");
		
		segment0.x=300;
		segment0.y=300;
		segment1.x=500;
		segment1.y=canvas.height-20;
	
	(function drawFrame(){
		if(animaClose){
			return;
		}
		window.requestAnimationFrame(drawFrame,canvas);
		context.clearRect(0,0,canvas.width,canvas.height);
		enterFrameHandler();
	})()
	
	
	function enterFrameHandler(){
		var dx=myEvent.mouse.x-segment0.x,
			dy=myEvent.mouse.y-segment0.y;
		segment0.rotation=Math.atan2(dy,dx);
		var w=segment0.getPin().x-segment0.x,
			h=segment0.getPin().y-segment0.y,
			tx=myEvent.mouse.x-w,
			ty=myEvent.mouse.y-h,
			dx1=tx-segment1.x,
			dy1=ty-segment1.y;
		segment1.rotation=Math.atan2(dy1,dx1);
		segment0.x=segment1.getPin().x;
		segment0.y=segment1.getPin().y;
		segment0.draw(context);
		segment1.draw(context);
	}
	
})();
