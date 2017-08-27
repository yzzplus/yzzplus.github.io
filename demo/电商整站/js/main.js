window.onload = function(){
	mv.app.toInput();
	mv.app.toBanner();
	mv.app.toSel();
	mv.app.toRun();
}
var mv = {};

mv.tools = {};

mv.tools.getByClass = function(oParent,sClass){
	var aEle = oParent.getElementsByTagName('*');
	var arr = [];
	
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className == sClass){
			arr.push(aEle[i])
		}
	}
	
	return arr;
}

mv.tools.getStyle = function(obj,attr){
	obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

mv.ui = {};

mv.ui.textChange = function(obj,str){
	obj.onfocus = function(){
		if(obj.value == str){
			obj.value = '';
		}
	}
	obj.onblur = function(){
		if(obj.value == ''){
			obj.value = str;
		}
	}
}

mv.ui.fadeIn = function(obj){
	var iCur = mv.tools.getStyle(obj,'opacity');
	if(iCur == 1) {
		return false;
	}
	
	var value = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var speed = 5;
		if(value == 100){
			clearInterval(obj.timer);
		}else{
			value += speed;
			obj.style.opacity = value/100;
			obj.style.filter = 'alpha(opacity='+value+')';
		}
	},30)
}
mv.ui.fadeOut = function(obj){
	var iCur = mv.tools.getStyle(obj,'opacity');
	if(iCur == 0) { 
		return false; 
	}
	
	var value = 100;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var speed = -5;
		if(value == 0){
			clearInterval(obj.timer);
		}else{
			value += speed;
			obj.style.opacity = value/100;
			obj.style.filter = 'alpha(opacity='+value+')';
		}
	},30)
}

mv.ui.moveLeft = function(obj,old,now){
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		var speed = (now - old)/10;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		
		if(now == old){
			clearInterval(obj.timer);
		}
		else{
			old += speed;
			obj.style.left = old + 'px';
		}
		
	},30);
	
};


mv.app = {};

mv.app.toInput = function(){
	var oText1 = document.getElementById('text1');
	var oText2 = document.getElementById('text2');
	mv.ui.textChange(oText1,"Search website");
	mv.ui.textChange(oText2,"Search website");
}

mv.app.toBanner = function(){
	var oAd =document.getElementById('ad');
	var aLi = oAd.getElementsByTagName('li');
	var num=0;
	var timer = setInterval(changeN,3000);
	
	function changeN(){
		if(num == aLi.length-1){
			num = 0;
		}else{
			num++;
		}
		for(var i=0;i<aLi.length;i++){
			mv.ui.fadeOut(aLi[i]);
		}
		mv.ui.fadeIn(aLi[num]);
	}
	function changeP(){
		if(num == 0){
			num = aLi.length-1;
		}else{
			num--;
		}
		for(var i=0;i<aLi.length;i++){
			mv.ui.fadeOut(aLi[i]);
		}
		mv.ui.fadeIn(aLi[num]);
	}
	
	var aPrevBg = mv.tools.getByClass(oAd,'prev_bg')[0];
	var aNextBg = mv.tools.getByClass(oAd,'next_bg')[0];
	var aPrev = mv.tools.getByClass(oAd,'prev')[0];
	var aNext = mv.tools.getByClass(oAd,'next')[0];
	
	aPrevBg.onmouseover = aPrev.onmouseover =  function(){
		aPrev.style.display = 'block';
		clearInterval(timer);
	}
	aNextBg.onmouseover = aNext.onmouseover = function(){
		aNext.style.display = 'block';
		clearInterval(timer);
	}
	aPrevBg.onmouseout = aPrev.onmouseout = function(){
		aPrev.style.display = 'none';
		timer = setInterval(changeN,3000);
	}
	aNextBg.onmouseout = aNext.onmouseout = function(){
		aNext.style.display = 'none';
		timer = setInterval(changeN,3000);
	}
	aPrev.onclick = function(){
		changeP();
	}
	aNext.onclick =function(){
		changeN();
	}
}

mv.app.toSel = function(){
	var oSel = document.getElementById('sel');
	var aDd = oSel.getElementsByTagName('dd');
	var aUl = oSel.getElementsByTagName('ul');
	var aH2 = oSel.getElementsByTagName('h2');
	
	for(var i=0;i<aDd.length;i++){
		aDd[i].index = i;
		aDd[i].onclick = function(ev){
			var ev = ev || window.event;
			var This = this;
			
			for(var i=0;i<aUl.length;i++){
				aUl[i].style.display = 'none';
			}
			
			aUl[this.index].style.display = 'block';
			
			document.onclick = function(){
				aUl[This.index].style.display = 'none';
			};
			
			ev.cancelBubble = true;
			
		};
		
	}
	
	for(var i=0;i<aUl.length;i++){
		
		aUl[i].index = i;
		
		(function(ul){
			
			var aLi = ul.getElementsByTagName('li');
			
			for(var i=0;i<aLi.length;i++){
				aLi[i].onmouseover = function(){
					this.className = 'active';
				};
				aLi[i].onmouseout = function(){
					this.className = '';
				};
				aLi[i].onclick = function(ev){
					var ev = ev || window.event;
					aH2[this.parentNode.index].innerHTML = this.innerHTML;
					ev.cancelBubble = true;
					this.parentNode.style.display = 'none';
				};
			}
			
		})(aUl[i]);
	}
}

mv.app.toRun = function(){
	var oRun = document.getElementById('run');
	var oUl = oRun.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');
	var oPrev = mv.tools.getByClass(oRun,'prev')[0];
	var oNext = mv.tools.getByClass(oRun,'next')[0];
	
	var num =0;
	
	oUl.innerHTML += oUl.innerHTML;
	oUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';
	
	oPrev.onclick = function(){
		if(num == 0){
			num = aLi.length/2;
			oUl.style.left = -oUl.offsetWidth/2 + 'px';
		}
		
		mv.ui.moveLeft(oUl,-num*aLi[0].offsetWidth,-(num-1)*aLi[0].offsetWidth);
		
		num--;

	}
	
	oNext.onclick = function(){
		
		if(num == aLi.length/2){
			num = 0;
			oUl.style.left = 0;
		}
		
		mv.ui.moveLeft(oUl,-num*aLi[0].offsetWidth,-(num+1)*aLi[0].offsetWidth);
		
		num++;
		
	};
}
