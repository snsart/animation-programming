
for(var i=1;i<=100;i++){
	var chapterTxt="第"+i+"章";
	var titleTxt="节点花园"+i;
	createTitle(chapterTxt,titleTxt);
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
	console.log("1245");
	
}
