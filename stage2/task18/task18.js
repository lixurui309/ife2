// JavaScript Document
//定义一个数组来存储队列中的值
var que = new Array();
//que.push("1","22","33");
//渲染图
function renderChart(){
	var renderDiv = document.getElementById("showQue");
	var text="";
	for(var i=0;i<que.length;i++){
		text += '<div id="div'+i+'" style="height:50px; width:50px; background-color:red;">'+que[i]+'</div>';
		}
	renderDiv.innerHTML = text;
	}
function divChange(oInput,target){
	switch(target.id){
		case "leftIn":
			que.unshift(oInput);  //以相反的方式模拟队列，即前端添加，后端删除
			//alert(que.join(","));
			renderChart();
			break;
		case "rightIn":
			que.push(oInput);
			//alert(que.join(","));
			renderChart();
			break;
		case "leftOut":
			que.shift();     //取得第一项，正好对应于左删除
			//alert(que.join(","));
			renderChart();
			break;
		case "rightOut":
			que.pop();
			//alert(que.join(","));
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
function init() {
	var aButton = document.getElementById("buttonSet");
	eventUtil.addHandler(aButton,'click',function(event){
		event = eventUtil.getEvent(event);
		var target = eventUtil.getElement(event);
		var oInput = document.getElementById("input1").value;
		divChange(oInput,target);
		});
		
	var renderDiv = document.getElementById("showQue");
	eventUtil.addHandler(renderDiv,'click',function(event){
		event = eventUtil.getEvent(event);
		var target = eventUtil.getElement(event);
		divChange2(target);
		});
}

init();// JavaScript Document