/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);//returnData[日期]=降水量
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}
var city = ["北京","上海","广州","深圳","成都","西安","福州","厦门","沈阳"];
var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
	var chartWrap = document.getElementById("aqi-chart-wrap");
	var text = '',color='';
	for(var e in chartData){
		//alert(chartData[e]);
		color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
		text += '<div title="'+e+":"+chartData[e]+'" style="height:'+chartData[e]+'px; background-color:'+color+'"></div>';
		}
	chartWrap.innerHTML = text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(target) {
  // 确定是否选项发生了变化 
	var nowChoice = target.value;
	//alert(nowChoice);
	if(nowChoice!=pageState.nowGraTime){
  // 设置对应数据
  		pageState.nowGraTime = nowChoice;
		initAqiChartData();
		renderChart();
  // 调用图表渲染函数
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(target) {
  // 确定是否选项发生了变化 
	var nowChoice = target.value;
	//alert(target.value);
	if(nowChoice!=pageState.nowSelectCity){
  // 设置对应数据
		pageState.nowSelectCity = nowChoice;
		initAqiChartData();
		renderChart();
  // 调用图表渲染函数
	}
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	/*var timeRadio = document.getElementsByName("gra-time");
	for(var i=0;i<timeRadio.length;i++){
			eventUtil.addHandler(timeRadio[i],'click',function(event){
				event = eventUtil.getEvent(event);
				var target = eventUtil.getElement(event);
				graTimeChange(target);
				});
			}	*/
	var selectRadio = document.getElementById("form-gra-time");
	eventUtil.addHandler(selectRadio,'click',function(event){
				event = eventUtil.getEvent(event);
				var target = eventUtil.getElement(event);
				graTimeChange(target);
				});
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById("city-select");
  var i=0;
  for(var x in aqiSourceData){
	  var newOption = document.createElement("option");
	  newOption.value = i++;
	  newOption.innerHTML = x;
	  citySelect.appendChild(newOption);
	  }
	//for(var i=0;i<)
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
		
	eventUtil.addHandler(citySelect,'change',function(event){//选项发生改变时调动调用
		event = eventUtil.getEvent(event);
		var target = eventUtil.getElement(event);
		citySelectChange(target);
		});
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  nowselectCity = city[pageState.nowSelectCity];
  var cityData = aqiSourceData[nowselectCity];   //格式为cityData[日期],是个数组
  //alert(aqiSourceData["1"]["2016-01-01"]);
  if(pageState.nowGraTime == 'day'){
	  chartData = cityData;
	  }
   if(pageState.nowGraTime == 'week'){
	   chartData = {};
	   var daysum=0,weeksum=0,countSum=0;
	   for (var key in cityData){
		   countSum += cityData[key];   //将一周中每天的数相加 
		   daysum++;
		   if((new Date(key)).getDay()==6){//6为星期6
			   weeksum ++;//星期数加1
			   chartData['第'+weeksum+'周'] = Math.floor(countSum/daysum);
			   daysum = 0;
			   countSum = 0;
			   }//if
		   }//for
		if(daysum!=0){//若最后不是以整周结束
			weeksum++;
			chartData['第'+weeksum+'周'] = Math.floor(countSum/daysum);
			}
			//alert(weeksum);
	   }//if
	if(pageState.nowGraTime == 'month'){
		chartData = {};
		var daysum=0,month=0,countSum=0;
		for( var key in cityData){
			daysum++;
		    countSum += cityData[key]; 
			if((new Date(key)).getMonth()!== month){
				month++;//第几月
				chartData['第'+month+'周'] = Math.floor(countSum/daysum);
				countSum = 0;
				daysum = 0;
				}
			}
		if(daysum != 0 ){
			month++;
			chartData['第'+month+'月'] = Math.floor(countSum/daysum);
			}
		}
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();// JavaScript Document