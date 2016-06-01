// JavaScript Document
//定义一个数组来存储队列中的值
var que = new Array();
var que2 = new Array();  //放兴趣爱好的数组
que.push("1","哈哈哈","33","哈");

//渲染图,数据从que中取得
function renderChart(que,event){
	var target = eventUtil.getElement(event);
	//alert(target.id);
	//通过传入的参数看到底渲染那个div
	var text="";
	if(target.id=="input1"||target.id.match("^div")){ //input或以div开头的
		var renderDiv = document.getElementById("showQue1");
		for(var i=0;i<que.length;i++){
			text += '<span id="div'+i+'" style="height:50px; width:50px; background-color:red; color:#fff;"}>'+que[i]+'</span>';
	}
	}
	else if(target.id=="button1"||target.id.match("^dia")){
		var renderDiv = document.getElementById("showQue2");
		for(var i=0;i<que.length;i++){
			text += '<span id="dia'+i+'" style="height:50px; width:50px; background-color:red; color:#fff; ">'+que[i]+'</span>';
		}
		}
	renderDiv.innerHTML = text;
	}
	
//在数组que中查找是否有oInput这一项
function queSelect(oInput,que){
	//在que中查询是否有oInput
	var queSel=false;
	for(var i=0;i<que.length;i++){
		if(oInput==que[i]){
			queSel=true;
			}
		}
	return queSel;
	}	
	
	
//从textarea中取得数据，插入队列que
function queIn(oInput,que){
	var text = oInput.trim();
	if(queSelect(text,que)==true){//判断是否重复
		alert("已存在，请重新输入");
		}
	else{
		if(que.length<=9){
			que.push(text);
		}
		else{//若大于10个，则删除前面的，再添加
			que.shift();
			que.push(text);
			}
		}
	}
	
function divChange(oInput,event){
	if(event.keyCode=="32"||event.keyCode=="188"||event.keyCode=="13"){
		console.log("添加que的divChange");
		queIn(oInput,que);  //将输入的函数插入队列
		renderChart(que,event);   //渲染图
		}
	}
function div2Change(oInput,event){
	if(event.target.id="button1"){  //点击按钮后
		console.log("添加que2");
		var text = oInput.replace(/[^0-9a-zA-Z\u4e00-\u9fa5]/ig," ");
		text=text.split(" ");
		for(var i in text){
			queIn(text[i],que2);
			}
		renderChart(que2,event);
		}
	}
		
//删除数组que中的某一项
function divDelete(que,id){
	//alert(target.id);
	var index = id.substring(3);  //通过div的id和que的下标关系得到要删除的数组元素的下标
	//alert(index);
	que.splice(index,1);  //删除起始下标为index,长度为1的值
	renderChart(que,event);
	}
	
function init() {
	var input1 = document.getElementById("input1");
	eventUtil.addHandler(input1,'keyup',function(event){//若用keydown,则中文输入法的时候，keyCOde都是229
		console.log("添加que");
		event = eventUtil.getEvent(event);
		var oInput = document.getElementById("input1").value;
		divChange(oInput,event);
		});
		
	
	//点击某一项，删除	
	var renderDiv = document.getElementsByClassName("showQue");
	eventUtil.addHandler(renderDiv[0],'click',function(event){//删除技能
		event = eventUtil.getEvent(event);
		var target = eventUtil.getElement(event);
		var id=target.id;
		//event.target.textContent = '删除：'+event.target.textContent;
		divDelete(que,id);
		});
	eventUtil.addHandler(renderDiv[0],'mouseover',function(event){//删除技能提示（移入）
		event = eventUtil.getEvent(event);
		var target = eventUtil.getElement(event);
		if(target.nodeName=="SPAN"){//这里加一个判断，就不会在刚进入父元素的时候就产生事件了
			target.textContent = '删除：'+target.textContent;
			}
		});
	eventUtil.addHandler(renderDiv[0],'mouseout',function(event){//删除技能提示（移出）
		event = eventUtil.getEvent(event);
		var target = eventUtil.getElement(event);
		if(target.nodeName=="SPAN"){//这里加一个判断，就不会在刚进入父元素的时候就产生事件了
			target.textContent = target.textContent.substring(3);
			}
		});
	eventUtil.addHandler(renderDiv[1],'click',function(event){//删除兴趣爱好
		event = eventUtil.getEvent(event);
		var target = eventUtil.getElement(event);
		var id=target.id;
		divDelete(que2,id);
		});
	eventUtil.addHandler(renderDiv[1],'mouseover',function(event){//删除兴趣爱好提示，移入时
		event = eventUtil.getEvent(event);
		var target = eventUtil.getElement(event);
		if(target.nodeName=="SPAN"){//这里加一个判断，就不会在刚进入父元素的时候就产生事件了
			target.textContent = '删除：'+target.textContent;
			}
		});
	eventUtil.addHandler(renderDiv[1],'mouseout',function(event){//删除兴趣爱好提示（移出）
		event = eventUtil.getEvent(event);
		var target = eventUtil.getElement(event);
		if(target.nodeName=="SPAN"){//这里加一个判断，就不会在刚进入父元素的时候就产生事件了
			target.textContent = target.textContent.substring(3);
			}
		});
		
	//添加兴趣爱好
	var button1 = document.getElementById("button1");
	eventUtil.addHandler(button1,'click',function(event){
		event = eventUtil.getEvent(event);
		var oInput = document.getElementById("input2").value;
		div2Change(oInput,event);
		});
}

init();// JavaScript Document// JavaScript Document