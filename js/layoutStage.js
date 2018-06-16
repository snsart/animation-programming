var scale=4/3;
var scalingRatio=1;//canvas缩放比例
var canvas=document.getElementById("canvas");
layoutStage();
window.onresize = function(){
	layoutStage();
	
}

window.addEventListener("orientationchange", function(){
	layoutStage();
	setTimeout(function(){
		layoutStage();
	},300)
}, false);

function layoutStage(){
	var canvasCont=$(".canvasCont")[0];
	if(innerWidth/innerHeight>scale){
		$(canvasCont).css("height","100%");
		$(canvasCont).css("width",innerHeight*scale);
		scalingRatio=canvas.height/innerHeight;
	}else{
		$(canvasCont).css("width","100%");
		$(canvasCont).css("height",innerWidth/scale);
		scalingRatio=canvas.width/innerWidth;
	}
	
}

