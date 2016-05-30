// JavaScript Document
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	//trim()去除字符串两端空格
	var oCity = document.getElementById("aqi-city-input").value.trim();
	var oAqiInput = document.getElementById("aqi-value-input").value.trim();
	//加判断  /^开始 $/结束
	if(!oCity.match(/^[A-Za-z\u4e00-\u9fa5]+$/)){
		alert("城市名必须为中英文字符");
		return;
		}
	if(!oAqiInput.match(/^\d+$/)){
		alert("空气质量指数必须为整数");
		return;
		}
	aqiData[oCity] = oAqiInput;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var oTable = document.getElementById("aqi-table");
	oTable.innerHTML="";
	oTable.innerHTML = "<tr> <td>城市</td> <td>空气质量</td> <td>操作</td> </tr>";
		for(var oCity in aqiData){
			 var tr = document.createElement("tr");
       		 var td1 = document.createElement("td");
       		 td1.innerHTML = oCity;
       		 tr.appendChild(td1);
       		 var td2 = document.createElement("td");
       		 td2.innerHTML = aqiData[oCity];
       		 tr.appendChild(td2);
       		 var td3 = document.createElement("td");
       		 td3.innerHTML = "<button class='del-btn'>删除</button>";
       		 tr.appendChild(td3);
       		 oTable.appendChild(tr);
		}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
	var tr = target.parentElement.parentElement;
	var oCity = tr.childNodes[0].innerHTML;
	delete aqiData[oCity];
    renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var oBtn = document.getElementById("add-btn");
	oBtn.onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	var oTable = document.getElementById("aqi-table");
	oTable.addEventListener("click",function(event){
		if(event.target && event.target.nodeName == "BUTTON"){  //nodeName获得节点名称,大写
			delBtnHandle(event.target);
			}
		})
}

init();