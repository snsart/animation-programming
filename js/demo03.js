(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d"),
		mouse=utils.captureMouse(canvas);
	console.log(45454545);
	
	(function drawFrame(){
		if(animaClose){
			console.log(12);
			return;
		}
		window.requestAnimationFrame(drawFrame,canvas);
		
		for(var i=0;i<canvas.width;i+=10){
			for(var j=0;j<canvas.height;j+=10){
				context.fillStyle=(i%20===0)?"#f00":(i%30===0?"#0f0":"#00f");
				context.fillRect(i,j,10,10);
			}
		}
		console.log(mouse.x,mouse.y);
		var imagedata=context.getImageData(0,0,canvas.width,canvas.height),
			pixels=imagedata.data;
			
		for(var y=0;y<imagedata.height;y++){
			for(var x=0;x<imagedata.width;x++){
				var dx=x-mouse.x,
					dy=y-mouse.y,
					dist=Math.sqrt(dx*dx+dy*dy),
					offset=(x+y*imagedata.width)*4,
					r=pixels[offset],
					g=pixels[offset+1],
					b=pixels[offset+2];
				pixels[offset]=Math.cos(r*dist*0.001)*256;
				pixels[offset+1]=Math.sin(g*dist*0.001)*256;
				pixels[offset+2]=Math.cos(b*dist*0.0005)*256;
			}
		}
		context.putImageData(imagedata,0,0);
	})()
	
})();
