// JavaScript Document
//定义一个数组来存储队列中的值
var que = new Array();
var que2 = new Array();
var que2L = 0;//判断que2中是否有实际的数
que.push("1","哈哈哈","33","哈");
//渲染图
function renderChart(){
	var renderDiv = document.getElementById("showQue");
	var text="";
	if(que2L==1){  //有查询到结果
		for(var i=0;i<que.length;i++){
			if(que2[i]=="*"){  //第i项是否匹配
				console.log("不匹配"+i);
				text += '<div id="div'+i+'" style="height:50px; width:50px; background-color:red; color:#fff;">'+que[i]+'</div>';
			}else{  //匹配的项
				console.log("匹配"+i);
				text += '<div id="div'+i+'" style="height:50px; width:50px; background-color:red; color:green;">'+que[i]+'</div>';
				}
		}
	}else{ //没有查询到结果
		console.log("没查询结果");
		for(var i=0;i<que.length;i++){
			text += '<div id="div'+i+'" style="height:50px; width:50px; background-color:red; color:#fff;">'+que[i]+'</div>';
			}
		}
	renderDiv.innerHTML = text;
	}
	
//从textarea中取得数据，插入队列
function queIn(){
	var text = document.getElementById("input1").value.trim();
	text = text.replace(/[^0-9a-zA-Z\u4e00-\u9fa5]/ig," ");
	text=text.split(" ");
	for(var i in text){
		que.push(text[i]);
		}
	}
//查找标记	
function queSelect(){
	var j=0;
	var selectText = document.getElementById("select").value.trim();
	selectText = selectText.replace(/[^0-9a-zA-Z\u4e00-\u9fa5]/ig,"");
	for(var i=0;i<que.length;i++){
		if(que[i].indexOf(selectText)>=0){
			que2[i] = que[i];
			que2L = 1;
			}
		else{
			que2[i] = "*";
			}
		}
	}
	
function divChange(oInput,target){
	switch(target.id){
		case "queIn":   //插入数据
			queIn();  //以相反的方式模拟队列，即前端添加，后端删除
			//alert(que.join(","));
			renderChart();
			break;
		case "queSelect":
			queSelect();
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
	
	//点击某一项，删除	
	var renderDiv = document.getElementById("showQue");
	eventUtil.addHandler(renderDiv,'click',function(event){
		event = eventUtil.getEvent(event);
		var target = eventUtil.getElement(event);
		divChange2(target);
		});
}

init();// JavaScript Document// JavaScript Document