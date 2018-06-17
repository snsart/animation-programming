(function(){
	var canvas=document.getElementById("canvas");
	context=canvas.getContext("2d");
	var ball=new Ball(),
		angle=0,
		centerScale=1,
		range=0.5,
		speed=0.05;
	
	ball.x=canvas.width/2;
	ball.y=canvas.height/2;
	
	(function drawFrame(){
		if(animaClose){
			return;
		}
		window.requestAnimationFrame(drawFrame,canvas);
		context.clearRect(0,0,canvas.width,canvas.height);
		ball.scaleX=ball.scaleY=centerScale+Math.sin(angle)*range;
		angle+=speed;
		ball.draw(context);
	})()
	
})();
