/*宇宙飞船*/
/*标签：加速度，边界处理，摩擦力*/
(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#222222");
	
	var ship=new Ship(),
		vr=0,
		vx=0,
		vy=0,
		thrust=0,//加速度
		friction=0.99;
	ship.x=canvas.width/2;
	ship.y=canvas.height/2;
	
	window.addEventListener("keydown",function(event){
		switch(event.keyCode){
			case 37:
				vr=-3;
				break;
			case 39:
				vr=3;
				break;
			case 38:
				thrust=0.05;
				ship.showFlame=true;
				break;	
		}
	},false);
	
	window.addEventListener("keyup",function(){
		vr=0;
		thrust=0;
		ship.showFlame=false;
	},false);
		
	(function drawFrame(){
		if(animaClose){
			return;
		}
		window.requestAnimationFrame(drawFrame,canvas);
		context.clearRect(0,0,canvas.width,canvas.height);
		enterFrameHandler()
	})()
	
	function enterFrameHandler(){
		ship.rotation+=vr*Math.PI/180;
		var angle=ship.rotation,
			ax=Math.cos(angle)*thrust,
			ay=Math.sin(angle)*thrust;
		vx+=ax;
		vy+=ay;
		vx*=friction;
		vy*=friction;
		ship.x+=vx;
		ship.y+=vy;
		if(ship.x+ship.width/2<0){
			ship.x=canvas.width+ship.width/2;
		}else if(ship.x-ship.width/2>canvas.width){
			ship.x=0-ship.width/2;
		}
		if(ship.y+ship.height/2<0){
			ship.y=canvas.height+ship.height/2;
		}else if(ship.y-ship.height/2>canvas.height){
			ship.y=0-ship.height/2;
		}
		
		ship.draw(context);
	}
	
})();
