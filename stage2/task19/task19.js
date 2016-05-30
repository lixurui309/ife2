// JavaScript Document
//定义一个数组来存储队列中的值
var que = new Array();
que.push("11","22","33","67","14","78");
//渲染图
function renderChart(){
	console.log("重新显示");
	var renderDiv = document.getElementById("showQue");
	var text="";
	for(var i=0;i<que.length;i++){
		text += '<div id="div'+i+'" style="height:'+que[i]*4+'px; width:50px; background-color:red; bottom:0px; left:'+i*55+'px">'+que[i]+'</div>';
		}
	renderDiv.innerHTML = text;
	}
	
	
function renderChart2(queNow){
	console.log("重新显2示");
	var renderDiv = document.getElementById("showQue");
	var text="";
	for(var i=0;i<queNow.length;i++){
			text += '<div id="div'+i+'" style="height:'+queNow[i]*4+'px; width:50px; background-color:red; bottom:0px; left:'+i*55+'px">'+queNow[i]+'</div>';
		}
	renderDiv.innerHTML = text;
	}
	
	
function divChange(oInput,target){
	switch(target.id){
		case "leftIn":
			que.unshift(oInput);  //以相反的方式模拟队列，即前端添加，后端删除
			//alert(que.join(","));
			if(que.length>60){
				alert("输入的已超过60个");
				break;
				}
			renderChart();
			break;
		case "rightIn":
			que.push(oInput);
			//alert(que.join(","));
			if(que.length>60){
				alert("输入的已超过60个");
				break;
				}
			renderChart();
			break;
		case "leftOut":
			que.shift();     //取得第一项，正好对应于左删除
			//alert(que.join(","));
			if(que.length<0){
				alert("队列已空");
				break;
				}
			renderChart();
			break;
		case "rightOut":
			que.pop();
			//alert(que.join(","));
			if(que.length<0){
				alert("队列已空");
				break;
				}
			renderChart();
			break;
		}
	}
//删除数组中的某一项
function divChange2(target){
	//alert(target.id);
	var id = target.id;
	var index = id.substring(3);  //通过div的id和que的下标关系得到要删除的数组元素的下标
	//alert(index);
	que.splice(index,1);  //删除起始下标为index,长度为1的值
	renderChart();
	}


var queSort = new Array();//创建一个数组，来存储每一步的排序结果
function bubbleSort(){  //冒泡排序
	var t=0,k=0;
	for(var i=0;i<que.length-1;i++){  //que是原来的数组
		for(var j=0;j<que.length-i;j++){
			if(que[j]<que[j+1]){
				t=que[j];
				que[j]=que[j+1];
				que[j+1]=t;   
				//queSort.push(que);
				queSort[k] = que.slice();  //将que克隆给queSort[i]
				console.log(queSort[k]);
				k++;			
			}//if
		}//for
	}//for
	//alert(queSort[0][0]);
	console.log("bbb");
	for(var i=0;i<queSort.length;i++){
		console.log(queSort[i]);
		}
}

var timer = null;

function bubble(){
	bubbleSort();
	var i=0;
	var length = queSort.length;
	timer = setInterval(paint,500);
	function paint(){
		if(i<queSort.length){
		renderChart2(queSort[i]);
		i++;
		}
		else{
		clearInterval(timer);}
		}
	}
//判断为什么排序
function sortChoice(target){
	switch(target.id){
		case "bubbleSort":
			bubble();
			break;
	}
}

function init() {

	renderChart();
	var aButton = document.getElementById("buttonSet");
	var oInput = document.getElementById("input1");

	eventUtil.addHandler(aButton,'click',function(event){
		event = eventUtil.getEvent(event);
		var target = eventUtil.getElement(event);
		var oInput = document.getElementById("input1").value;
		document.getElementById("input1").value="";
		//判断输入数字
		if(oInput>=10&&oInput<=100){
			divChange(oInput,target);
		}else{
			alert("输入不符合规定:要输入10到100之间的数");
			}
		});
		
	var suijishu = document.getElementById("suijishu");	
	eventUtil.addHandler(suijishu,'click',function(event){
		event = eventUtil.getEvent(event);
		que=[];
		for(var i=0;i<20;i++){
			que.push(Math.floor(Math.random()*90+10));
			}	
		eventUtil.stopPropagation(event);
		renderChart();
		});
	
	//判断到底为如何插入
	var renderDiv = document.getElementById("showQue");
	eventUtil.addHandler(renderDiv,'click',function(event){
		event = eventUtil.getEvent(event);
		var target = eventUtil.getElement(event);
		divChange2(target);
		});
		
	var bubbleSort = document.getElementById("reSort");
	eventUtil.addHandler(bubbleSort,'click',function(event){
		event = eventUtil.getEvent(event);
		var target = eventUtil.getElement(event);
		sortChoice(target);
		});
}

init();// JavaScript Document