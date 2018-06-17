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
		x-=$(element).offset().left;
		y-=$(element).offset().top;
		mouse.x=x*scalingRatio;
		mouse.y=y*scalingRatio;
	},false);
	return mouse;
	
/*	function getOffsetTopByBody (el) {  
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
	}*/
}

utils.captureTouch=function(element){
	var touch={x:null,y:null,isPressed:false};
	element.addEventListener("touchstart",function(event){
		touch.isPressed=true;
		setTouch(event);
	},false);
	
	element.addEventListener("touchend",function(event){
		touch.isPressed=false;
		touch.x=null;
		touch.y=null;
	},false);
	
	element.addEventListener("touchmove",function(event){
		setTouch(event);
	},false);
	
	function setTouch(event){
		var x,y,
			touch_event=event.touches[0];
		if(touch_event.pageX||touch_event.pageY){
			x=touch_event.pageX;
			y=touch_event.pageY;
		}else{
			x=touch_event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
			y=touch_event.clientY+document.body.scrollTop+document.documentElement.scrollTop;
		}
		x-=$(element).offset().left;
		y-=$(element).offset().top;
		touch.x=x*scalingRatio;
		touch.y=y*scalingRatio;
	}
	
	return touch;
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

utils.containsPoint=function(rect,x,y){
	return !(x<rect.x||x>rect.x+rect.width||y<rect.y||y>rect.y+rect.height);
};
