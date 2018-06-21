var animaClose=false;
var canvas=document.getElementById("canvas");
var data;
var url="config.json";
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
		createTitle(chapterTxt,titleTxt,jssrc);
	}
	
	if(isPC){
		$(".container").css("width","80%");
	}else{
		$(".container").css("width","95%");
	}
}

function createTitle(chapterTxt,titleTxt,jssrc){
	
	/*var proCont=document.createElement("div");
	proCont.setAttribute("class","pro-cont fl");
	
	var pro=document.createElement("div");
	pro.setAttribute("class","pro");
	
	var chapter=document.createElement("div");
	chapter.setAttribute("class","chapter");
	var h2=document.createElement("h2");
	h2.innerText=chapterTxt;
	chapter.appendChild(h2);
	
	var title=document.createElement("div");
	title.setAttribute("class","title");
	var h1=document.createElement("h1");
	h1.innerText=titleTxt;
	title.appendChild(h1);
	
	var fileInfo=document.createElement("div");
	fileInfo.setAttribute("class","fileInfo");
	var p=document.createElement("p");
	p.innerText=jssrc;
	fileInfo.appendChild(p);
	
	pro.appendChild(chapter);
	pro.appendChild(title);
	pro.appendChild(fileInfo);
	proCont.appendChild(pro);*/
	
	
	var proCont=$($(".pro-cont")[0]).clone();
	$(proCont).css("display","block");
	$(proCont).find(".pro-index")[0].innerText=chapterTxt;
	$(proCont).find(".pro-title p")[0].innerText=titleTxt;
	$(proCont).find(".fileInfo p")[0].innerText=jssrc;
	console.log()
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
