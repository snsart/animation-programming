window.onload=function(){
	layoutStage(canvasHeightScale);	
	layoutPros();
}

window.onresize = function(){
	layoutStage(canvasHeightScale);	
	layoutPros();
}

//布局播放器界面

var scale=4/3;//舞台容器的宽高比
var scalingRatio=1;//canvas缩放比例
var canvasHeightScale=0.75;//canvas在容器中所占比例
var canvas=document.getElementById("canvas");
layoutStage(canvasHeightScale);

window.addEventListener("orientationchange", function(){
	layoutStage();
	setTimeout(function(){
		layoutStage();
		layoutPros();
	},300)
}, false);

var fullScreen=$(".fullScreenIcon")[0];
var isFull=false;
fullScreen.addEventListener("click",function(){
	isFull=!isFull;
	if(isFull){
		fullScreenHandler();
	}else{
		initScreen();
	}	
});

function fullScreenHandler(){
	scale=16/9;
	canvasHeightScale=1;
	$($(".canHeader")[0]).css("display","none");
	$($(".canMid")[0]).css("height","100%");
	$($(".canBottom")[0]).css("display","none");
	$($(".fullScreenIcon")[0]).css("background-image","url(img/arrow-small-09.png)");
	layoutStage();
}

function initScreen(){
	scale=4/3;
	canvasHeightScale=0.75;
	$($(".canHeader")[0]).css("display","block");
	$($(".canMid")[0]).css("height","75%");
	$($(".canBottom")[0]).css("display","block");
	$($(".fullScreenIcon")[0]).css("background-image","url(img/arrow-big-09.png)");
	layoutStage();
}

function layoutStage(){
	var canvasCont=$(".canvasCont")[0];
	if(innerWidth/innerHeight>scale){
		$(canvasCont).css("height","100%");
		$(canvasCont).css("width",innerHeight*scale);
		scalingRatio=canvas.height/(innerHeight*canvasHeightScale);
	}else{
		$(canvasCont).css("width","100%");
		$(canvasCont).css("height",innerWidth/scale);
		scalingRatio=canvas.width/innerWidth;
	}
}

/*布局导航界面*/

var ratio=0.6;//pro长宽比
var fontSize=$("html").css("font-size").slice(0,-2);
if(isPC){
	ratio=0.6;
}else{
	ratio=0.46;
}

function layoutPros(){
	var minProWidth=Number($(".pro-cont").css("min-width").slice(0,-2));
	var containerWidth=$(".container").width();
	var numPro=Math.floor(containerWidth/minProWidth);
	var proWidth=100/numPro+"%";
	$(".pro-cont").css("width",proWidth);
	var proHeight=$(".pro-cont").width()*ratio
	$(".pro-cont").css("height",proHeight);
}

