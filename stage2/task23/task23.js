// JavaScript Document
var nodeList = [];
var timer;
var BFindex = 0;
function resetColor(root){
	if(root){
		root.style.backgroundColor = "#fff";	
		for(var i=0;i<root.children.length;i++){
			resetColor(root.children[i]);
			}
	}	
}
function restart(root){
	nodeList = [];	
	clearInterval(timer);
	BFindex = 0;
	resetColor(root);
}
function changeColor(){
	var i = 0;
	nodeList[i].style.backgroundColor = "blue";
	timer = setInterval(function(){
		i++;
		if(i<nodeList.length){
			nodeList[i-1].style.backgroundColor = "#fff";
			nodeList[i].style.backgroundColor = "blue";
			}else{
			clearInterval(timer);
			nodeList[i-1].style.background = "#fff";
				}
		},500)		
}

//深度遍历
function traverseDF(root){
	if(root){
		nodeList.push(root);	
		for(var i=0;i<root.children.length;i++){
			traverseDF(root.children[i]);
			}
	}	
}

//广度优先遍历
function traverseBF(root){
	if(root){
		nodeList.push(root);
		if(root.parentNode.nodeName!="BODY"){
		traverseBF(root.nextElementSibling);
		}
		root = nodeList[BFindex++];
		traverseBF(root.firstElementChild);
	}	
}

function init(){
	var root = document.getElementsByClassName('super')[0];
	var btn1 = document.getElementById("btn1");	
	var btn2 = document.getElementById("btn2");	
	
	btn1.onclick = function(){
		restart(root);
		traverseDF(root);
		changeColor();
	}
	btn2.onclick = function(){
		restart(root);
		traverseBF(root);
		changeColor();
	}
}
init();