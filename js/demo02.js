(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d"),
		angle=0,
		rangle=50,
		centerY=canvas.height/2,
		vx=1,
		vy=0.05,
		xPos=0,
		yPos=centerY;
		
	context.lineWidth=2;
	(function drawFrame(){
		if(animaClose){
			return;
		}
		window.requestAnimationFrame(drawFrame,canvas);
		context.beginPath();
		context.strokeStyle="#5F55D9";
		context.moveTo(xPos,yPos);
		xPos+=vx;
		angle+=vy;
		yPos=centerY+Math.sin(angle)*rangle;
		context.lineTo(xPos,yPos);
		context.stroke();
			
	})()
	
})();
