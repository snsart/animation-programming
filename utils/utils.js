var utils={};

if(!window.requestAnimationFrame){
	window.requestAnimationFrame=function(callback){
		return window.setTimeout(callback,1000/60);
	}
}

/*获取鼠标在canvas中的位置*/
utils.captureMouse=function(element){
	var mouse={x:0,y:0};
	element.addEventListener("mousemove",function(event){
		var x,y;
		if(event.pageX||event.pageY){
			x=event.pageX;
			y=event.pageY;
		}else{
			x=event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
			y=event.clientY+document.body.scrollTop+document.documentElement.scrollTop;
		}
		x-=getOffsetLeftByBody(element);
		y-=getOffsetTopByBody(element);
		console.log(event.pageX+"--pageX");
		console.log(getOffsetLeftByBody(element)+"--offsetLeft");
		console.log(x+"----x");
		mouse.x=x;
		mouse.y=y;
	},false);
	return mouse;
	
	function getOffsetTopByBody (el) {  
	  var offsetTop = 0  
	  while (el && el.tagName !== 'body') {  
	  	offsetTop+= el.offsetTop  
	    el = el.offsetParent  
	  }  
	  return offsetTop  
	}
	
	function getOffsetLeftByBody (el) {  
	  var offsetLeft = 0  
	  while (el && el.tagName !== 'body') {  
	  	offsetLeft += el.offsetLeft 
	    el = el.offsetParent  
	  }  
	  return offsetLeft  
	}
}

utils.colorToRGB=function(color,alpha){
	if(typeof color==="string"&&color[0]==="#"){
		color.window.parseInt(color.slice(1),16);
	}
	alpha=(alpha===undefined)?1:alpha;
	var r=color>>16&0xff,
		g=color>>8&0xff,
		b=color&0xff,
		a=(alpha<0)?0:(alpha>1?1:alpha);
		
	if(a===1){
		return "rgb("+r+","+g+","+b+")";
	}else{
		return "rgba("+r+","+g+","+b+","+a+")";
	}		
}

utils.parseColor=function(color,toNumber){
	if(toNumber===true){
		if(typeof color==="number"){
			return (color|0);
		}
		if(typeof color==="string"&&color[0]==="#"){
			color=color.slice(1);
		}
		return window.parseInt(color,16);
	}else{
		if(typeof color==="number"){
			color="#"+("000000"+color.toString(16)).substr(-6);
		}
		return color;
	}
}
