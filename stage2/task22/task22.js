// JavaScript Document
treeArray=[];
var timer;
function restart(){
	treeArray = [];
	clearInterval(timer);
	}
	
function changeColor(){
	var i = 0;
	treeArray[i].style.backgroundColor = "blue";
	timer = setInterval(function(){
		i++;
		if(i<treeArray.length){
			treeArray[i-1].style.backgroundColor = "#fff";
			treeArray[i].style.backgroundColor = "blue";
			}else{
			clearInterval(timer);
			treeArray[i-1].style.background = "#fff";
				}
		},500)
	}

function preOrder(root){//先序遍历
	if(!(root==null)){
		treeArray.push(root);
		preOrder(root.firstElementChild);
		preOrder(root.lastElementChild);
		}
	}
function inOrder(root){//中序遍历
	if(!(root==null)){
		inOrder(root.firstElementChild);
		treeArray.push(root);
		inOrder(root.lastElementChild);
		}
	}

function postOrder(root){//后序遍历
	if(!(root==null)){
		postOrder(root.firstElementChild);
		postOrder(root.lastElementChild);
		treeArray.push(root);
		}
	}

function init() {
	root = document.getElementsByClassName('root')[0];
	var btn1 = document.getElementById("btn1");
	btn1.onclick = function(){
		restart();
		preOrder(root);
		changeColor();
		}
		
	var btn2 = document.getElementById("btn2");
	btn2.onclick = function(){
		restart();
		inOrder(root);
		changeColor();
		}
		
	var btn3 = document.getElementById("btn3");
	btn3.onclick = function(){
		restart();
		postOrder(root);
		changeColor();
		}
}

init();// JavaScript Document// JavaScript Document