var animaClose=false;
var canvas=document.getElementById("canvas");
var data;
var url="config2.json";
var request=new XMLHttpRequest();
request.open("GET",url);
request.onload=function(){
	if(request.status==200){
		data=JSON.parse(request.responseText);
		createIndex();
		layoutPros();
	}
}
request.send(null);

function createIndex(){
	for(var i=0;i<data.pro.length;i++){
		var chapterTxt=data.pro[i].chapter;
		var titleTxt=data.pro[i].title;
		var jssrc=data.pro[i].jssrc;
		var imgsrc=data.pro[i].imgSrc;
		var key=data.pro[i].key;
		createTitle(chapterTxt,titleTxt,jssrc,imgsrc,key);
	}
	
	if(isPC){
		$(".container").css("width","80%");
	}else{
		$(".container").css("width","95%");
	}
}

function createTitle(chapterTxt,titleTxt,jssrc,imgsrc,key){
	
	var proCont=$($(".pro-cont")[0]).clone();
	$(proCont).css("display","block");
	$(proCont).find(".pro-index")[0].innerText=chapterTxt;
	$(proCont).find(".pro-title p")[0].innerText=titleTxt;
	var iconImgSrc="url("+imgsrc+")";	
	$($(proCont).find(".pro-img")).css("background-image",iconImgSrc);
	$(proCont).find(".pro-filesrc")[0].innerText=jssrc;
	$(proCont).find(".pro-key")[0].innerText=key;
	
	var con=document.getElementsByClassName("container");
	$(con[0]).append(proCont);
	
	$(proCont).click(function(e){
		clearCanvas();
		showStage(jssrc,titleTxt);
	});
}

function clearCanvas(){
	var context=canvas.getContext("2d");
	context.clearRect(0,0,canvas.width,canvas.height);
}

function showStage(jssrc,titleTxt){
	animaClose=false;
	var stage=document.getElementsByClassName("stage");
	
	var title=$($(".canHeader")[0]).children("h2")[0];
	if(title!=null){
		$(".canHeader")[0].removeChild(title);
	}
	var newTitle=document.createElement("h2");
	newTitle.innerText=titleTxt;
	$(".canHeader")[0].appendChild(newTitle);
	
	$(stage[0]).fadeIn();
	
	var script=document.getElementById("canvasScript");
	var body=document.getElementById("body");
	if(script!=null){
		body.removeChild(script);
	}
	var newScript=document.createElement("script");
	newScript.type="text/javascript";
	newScript.charset="UTF-8";
	newScript.setAttribute("id","canvasScript");
	newScript.src=jssrc;
	body.appendChild(newScript);	
}

var closeBtn=document.getElementById("closeBtn");
closeBtn.addEventListener("click",function(e){
	var stage=document.getElementsByClassName("stage");
	$(stage[0]).fadeOut();
	var canvas=document.getElementById("canvas");
	$(canvas).css("background-color","#FFFFFF");
	animaClose=true;
	clearCanvas();
});
