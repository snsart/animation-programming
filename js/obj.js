/*小球类*/

function Ball(radius,color){
	if(radius===undefined){radius=40;}
	if(color===undefined){color="#ff0000";}
	this.x=0;
	this.y=0;
	this.vx=0;
	this.vy=0;
	this.radius=radius;
	this.rotation=0;
	this.scaleX=1;
	this.scaleY=1;
	this.color=utils.parseColor(color);
	this.lineWidth=1;
}

Ball.prototype.draw=function(context){
	context.save();
	context.translate(this.x,this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX,this.scaleY);
	context.lineWidth=this.lineWidth;
	context.fillStyle=this.color;
	context.beginPath();
	context.arc(0,0,this.radius,0,(Math.PI*2),true);
	context.closePath();
	context.fill();
	if(this.lineWidth>0){
		context.stroke();
	}
	context.restore();
};

Ball.prototype.getBounds=function(){
	return{
		x:this.x-this.radius,
		y:this.y-this.radius,
		width:this.radius*2,
		height:this.radius*2
	};
};

/*方块类*/

function Box(width,height,color){
	if(width===undefined){width=50;}
	if(height===undefined){height=50;}
	if(color===undefined){color="#ff0000";}
	this.x=0;
	this.y=0;
	this.width=width;
	this.height=height;
	this.vx=0;
	this.vy=0;
	this.rotation=0;
	this.scaleX=1;
	this.scaleY=1;
	this.color=utils.parseColor(color);
	this.lineWidth=1;
}

Box.prototype.draw=function(context){
	context.save();
	context.translate(this.x,this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX,this.scaleY);
	context.lineWidth=this.lineWidth;
	context.fillStyle=this.color;
	context.beginPath();
	context.rect(0,0,this.width,this.height);
	context.closePath();
	context.fill();
	if(this.lineWidth>0){
		context.stroke();
	}
	context.restore();
};

/*飞船类*/

function Ship(){
	this.x=0;
	this.y=0;
	this.width=25;
	this.height=20;
	this.rotation=0;
	this.showFlame=false;
}

Ship.prototype.draw=function(context){
	context.save();
	context.translate(this.x,this.y);
	context.rotate(this.rotation);
	context.lineWidth=1;
	context.strokeStyle="#ffffff";
	context.beginPath();
	context.moveTo(10,0);
	context.lineTo(-10,10);
	context.lineTo(-5,0);
	context.lineTo(-10,-10);
	context.lineTo(10,0);
	context.stroke();
	if(this.showFlame){
		context.beginPath();
		context.moveTo(-7.5,-5);
		context.lineTo(-15,0);
		context.lineTo(-7.5,5);
		context.stroke();
	}
	context.restore();
}

/*直线类*/
function Line(x1,y1,x2,y2,color){
	this.x=0;
	this.y=0;
	this.x1=(x1==undefined)?0:x1;
	this.y1=(y1==undefined)?0:y1;
	this.x2=(x2==undefined)?0:x2;
	this.y2=(y2==undefined)?0:y2;
	this.color=(color==undefined)?"#ff0000":color;
	this.rotation=0;
	this.scaleX=1;
	this.scaleY=1;
	this.lineWidth=1;
}

Line.prototype.draw=function(context){
	context.save();
	context.translate(this.x,this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX,this.scaleY);
	context.lineWidth=this.lineWidth;
	context.strokeStyle=this.color;
	context.beginPath();
	context.moveTo(this.x1,this.y1);
	context.lineTo(this.x2,this.y2);
	context.closePath();
	context.stroke();
	context.restore();
}

Line.prototype.getBounds=function(){
	if(this.rotation==0){
		var minX=Math.min(this.x1,this.x2),
			maxX=Math.max(this.x1,this.x2),
			minY=Math.min(this.y1,this.y2),
			maxY=Math.max(this.y1,this.y2);
		return{
			x:this.x+minX,
			y:this.y+minY,
			width:maxX-minX,
			height:maxY-minY
		}
	}else{
		var sin=Math.sin(this.rotation),
			cos=Math.cos(this.rotation),
			x1r=cos*this.x1-sin*this.y1,
			x2r=cos*this.x2-sin*this.y2,
			y1r=cos*this.y1+sin*this.x1,
			y2r=cos*this.y2+sin*this.x2;
		return{
			x:this.x+Math.min(x1r,x2r),
			y:this.y+Math.min(y1r,y2r),
			width:Math.max(x1r,x2r)-Math.min(x1r,x2r),
			height:Math.max(y1r,y2r)-Math.min(y1r,y2r)
		}
	}
}

