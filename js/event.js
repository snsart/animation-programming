var isPC=!/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent);
var myEvent={};
if(isPC){
	myEvent.mousedown="mousedown";
	myEvent.mouseup="mouseup";
	myEvent.mousemove="mousemove";
	myEvent.mouse=utils.captureMouse(canvas);
}else{
	myEvent.mousedown="touchstart";
	myEvent.mouseup="touchend";
	myEvent.mousemove="touchmove";
	myEvent.mouse=utils.captureTouch(canvas);
}
