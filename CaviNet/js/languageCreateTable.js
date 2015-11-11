var URL = "http://54.68.143.213/cgi-bin/";
//var URL ="http://cloud9-server/cgi-bin/";
//var URL ="http://192.168.0.101/cgi-bin/";
//var URL ="http://192.168.11.51/cgi-bin/";

var xhr;
var lang_table;
var langInfoTable;
var count = 0;

window.onload = function() {
    /* thead */
    /* 表示項目の表示 */
    var newThead = document.getElementById("TheadArea");
    var newTheadTr = document.createElement("tr");
    newTheadTr.id = "TheadTr";
    newThead.appendChild(newTheadTr);
    for (j = 0; j < maxCol; j++) {
	if(j == 0){
	    var newTd = document.createElement("td");
	    newTd.id = "Thead(" + j + ")";
	    newTd.width = "40px";
	    newTheadTr.appendChild(newTd).innerHTML = "選択";
	} else if(j == 1){
	    var newTd = document.createElement("td");
	    newTd.id = "Thead(" + j + ")";
	    newTd.width = "50px";
	    newTheadTr.appendChild(newTd).innerHTML = "順番";
	} else if(j == 2){
	    var newTd = document.createElement("td");
	    newTd.id = "Thead(" + j + ")";
	    newTd.width = "210px";
	    newTheadTr.appendChild(newTd).innerHTML = "登録中の言語";
	}
    }
    /* Table & Thead生成 終了 */
    getFileInfo();

};

function XMLHttpRequestCreate(){
    try {
	return new XMLHttpRequest();
    } catch(e) {}
    try {
	return new ActiveXObject('MSXML2.XMLHTTP.6.0');
    } catch(e) {}
    try {
	return new ActiveXObject('MSXML2.XMLHTTP.3.0');
    } catch(e) {}
    try {
	return new ActiveXObject('MSXML2.XMLHTTP');
    } catch(e) {}

    return null;
}

function getFileInfo() {
    xhr = XMLHttpRequestCreate();
    xhr.open("GET", URL+"getTable.cgi?tbl=Language", false);
    xhr.send(null);
    var LangTable = new CGIResponse(xhr.response).Response.split("\n");

    createMatrix(LangTable);
}

var maxCol = 3;
function createMatrix(LangTable){
    var lang_table = []; //LanguageTableを格納する行列
    var rowLength = LangTable.length-1; // 空行を含まないように-1
    for (var i = 0; i < rowLength; ++i) {
	lang_table[i] = LangTable[i].split(",");
    }
    createTable(lang_table);
    langInfoTable=lang_table;
}

function createTable(lang_table){
    var newTbody = document.getElementById("TbodyArea");

    /* 初期化処理 */
    for (i =newTbody.childNodes.length-1; i>=0; i--){
	newTbody.removeChild(newTbody.childNodes[i]);
    }	
    
    /* tbody */
    for(i = 0; i < lang_table.length; i++) {
	var newTbodyTr = document.createElement("tr");
	newTbodyTr.id = "InfoRow(" + i + ")";
	newTbody.appendChild(newTbodyTr);
	
	for(j = 0; j < maxCol; j++) {
	    if(j == 0){
		var newTbodyTd = document.createElement("td");
		newTbodyTd.id = "Info(" + i + "," + j + ")";
		newTbodyTd.width = "30px";
		newTbodyTr.appendChild(newTbodyTd);
		var first = document.getElementById("Info(" + i + ",0)");
		var newInput = document.createElement("input");
		newInput.type = "radio";
		newInput.id = "first("+i+")";
		newInput.name="langCheckBox";
		newTbodyTd.appendChild(newInput);
	    } else if(j == 1){
		var newTbodyTd = document.createElement("td");
		newTbodyTd.id = "Info(" + i + "," + j + ")";
		newTbodyTd.width = "40px";
		newTbodyTr.appendChild(newTbodyTd).innerHTML = lang_table[i][0].substring(3, 6);// 案内順番 PageID
	    } else if(j == 2){
		var newTbodyTd = document.createElement("td");
		newTbodyTd.id = "Info(" + i + "," + j + ")";
		newTbodyTd.width = "200px";
		newTbodyTr.appendChild(newTbodyTd).innerHTML = lang_table[i][1];// 案内場所 Name
	    }
	}
    }
}

function clearCheckbox() {
    for (var i = 0; i < langInfoTable.length; ++i) {
	if(document.getElementById("Info(" + i + ",0)").firstElementChild.checked == true){
	    document.getElementById("Info(" + i + ",0)").firstElementChild.checked = false;
	}
    }
}



