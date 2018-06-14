var data;
var url="config.json";
var request=new XMLHttpRequest();
request.open("GET",url);
request.onload=function(){
	if(request.status==200){
		data=JSON.parse(request.responseText);
		createIndex();
	}
}
request.send(null);

function createIndex(){
	for(var i=0;i<data.pro.length;i++){
		var chapterTxt=data.pro[i].chapter;
		var titleTxt=data.pro[i].title;
		createTitle(chapterTxt,titleTxt);
	}
}

function createTitle(chapterTxt,titleTxt){
	var pro=document.createElement("div");
	pro.setAttribute("class","pro fl");
	
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
	
	pro.appendChild(chapter);
	pro.appendChild(title);
	
	var con=document.getElementsByClassName("container");
	con[0].appendChild(pro);
}
