var eventUtil = {
	//添加
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,handler);
		}else{
			element['on'+type]=handler;
		}
		},//function
	//删除时间
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent('on'+type,handler);
		}else{
			element['on'+type]=handler;
		}
		},//function
	//获得事件对象
	getEvent:function(event){
		return event?event:window.event;
		},
	//获得事件类型
	getType:function(event){
		return event.type;
		},
	//获取事件的目标
	getElement:function(event){
		return event.target||event.srcElement;
		},
	//阻止事件默认行为
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault;
		}else{
			event.returnValue=false;
			}
		},
	//阻止事件冒泡
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
			}
		}
	}// JavaScript Document