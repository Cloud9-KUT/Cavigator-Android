var URL = "http://54.68.143.213/cgi-bin/";
var xhr;
var maxCol = 6;
var voiceInfoTable;


window.onload = function() {
    var el = document.getElementById("LanguageID");

    xhr = XMLHttpRequestCreate();
    xhr.open("GET", URL+"getLang.cgi", false);
    xhr.send(null);

    var res = new CGIResponse(xhr.response).Response.split("\n");
    for (var i = 0; i < res.length; ++i) {
	var r = res[i].match(/(.+),\s?(.+)/);
	if (r == null) {
	    break;
	}
	var e = document.createElement("option");
	e.value = RegExp.$1;
	e.text = RegExp.$2;
	el.appendChild(e);
    }
    document.getElementById("voiceForm").appendChild(el);

    /* thead */
    /* 表示項目の表示 */
    var newThead = document.getElementById("TheadArea");
    var newTheadTr = document.createElement("tr");
    newTheadTr.id = "TheadTr";
    newThead.appendChild(newTheadTr);
    for (var j = 0; j < maxCol; j++) {
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
	    newTheadTr.appendChild(newTd).innerHTML = "案内場所";
	} else if(j == 3){
	    var newTd = document.createElement("td");
	    newTd.id = "Thead(" + j + ")";
	    newTd.width = "80px";
	    newTheadTr.appendChild(newTd).innerHTML = "音声◯/×";
	} else if(j == 4){
	    var newTd = document.createElement("td");
	    newTd.id = "Thead(" + j + ")";
	    newTd.width = "210px";
	    newTheadTr.appendChild(newTd).innerHTML = "更新日時";
	} else if(j == 5){
	    var newTd = document.createElement("td");
	    newTd.id = "Thead(" + j + ")";
	    newTheadTr.appendChild(newTd).innerHTML = "LocationID";
	}
    }
    /* Table & Thead生成 終了 */
    getFileInfo(0);
};


function changeSelect(){
    var selected = document.getElementById("LanguageID");
    selectNum = selected.selectedIndex;
    getFileInfo(selectNum);
}


function getFileInfo(selectNum) {
    xhr = XMLHttpRequestCreate();
    var selected = document.getElementById("LanguageID");
    index = selected.options[selectNum].value;

    xhr.open("GET", URL+"getValue.cgi?tbl=Voice&LanguageID=" + index, false);
    xhr.send(null);
    var VoiceTable = new CGIResponse(xhr.response).Response.split("\n");

    xhr.open("GET", URL+"getTable.cgi?tbl=Location", false);
    xhr.send(null);
    var LocateTable = new CGIResponse(xhr.response).Response.split("\n");

    xhr.open("GET", URL+"getValue.cgi?tbl=TLocation&LanguageID=" + index, false);
    xhr.send(null);
    var TrancerateTable = new CGIResponse(xhr.response).Response.split("\n");

    createMatrix(VoiceTable, LocateTable, TrancerateTable);

}


function createMatrix(VoiceTable, LocateTable, TrancerateTable){
    var voice_table = []; //VoiceTableを格納する行列
    for (i=0; i<VoiceTable.length; i++) {
	  voice_table[i] = VoiceTable[i].split(",");
    }
	
    var trancerate_table = []; // TrancerateTableを格納する行列 [LanguageID | PageID | Name]
    for (i=0; i<TrancerateTable.length; i++) {
	trancerate_table[i] = TrancerateTable[i].split(",");
    }
	
    var locate_table = []; // LocateTableを格納する行列
    for (i=0; i<LocateTable.length-1; i++) {
	  var voiceCount = 0;
	  locate_table[i] = LocateTable[i].split(",");
	
	  for(j=0; j<VoiceTable.length; j++){
		if(locate_table[i][0] == voice_table[j][1]){
		  voiceCount = voiceCount + 1;
		  locate_table[i][4] = voice_table[j][2];
		  locate_table[i][5]=voice_table[j][3];
		}
	  }
	  if(voiceCount >= 1){
		locate_table[i][3] = "◯";
	  } else {
		locate_table[i][3] = "×";
		locate_table[i][4] = "";
	  }
	  
	  for(j=0; j<TrancerateTable.length; j++){
//	  console.log(trancerate_table[j][0],trancerate_table[j][1]);
		if(locate_table[i][0] == trancerate_table[j][1]){
		  locate_table[i][6] = trancerate_table[j][2];// 7番目にtrancerate.name
	    }
	  }
	}
	
    createTable(locate_table);
    voiceInfoTable = locate_table;

}

var count = 0;
var maxRow = 0;
function createTable(lTable){
    maxRow = lTable.length;
    var newTbody = document.getElementById("TbodyArea");

    /* 初期化処理 */
    for (i =newTbody.childNodes.length-1; i>=0; i--){
	newTbody.removeChild(newTbody.childNodes[i]);
    }	

    /* tbody */
    for(i = 0; i < lTable.length; i++) {
	var newTbodyTr = document.createElement("tr");
	newTbodyTr.id = "InfoRow(" + i + ")";
	newTbody.appendChild(newTbodyTr);

	for(var j = 0; j < maxCol; j++) {
	    if(j == 0){
		  var newTbodyTd = document.createElement("td");
		  newTbodyTd.id = "Info(" + i + "," + j + ")";
		  newTbodyTd.width = "30px";
		  newTbodyTr.appendChild(newTbodyTd);
		  var first = document.getElementById("Info(" + i + ",0)");
		  var newInput = document.createElement("input");
		  newInput.type = "radio";
		  newInput.name = "first";
		  newTbodyTd.appendChild(newInput);
	    } else if(j == 1){
		  var newTbodyTd = document.createElement("td");
		  newTbodyTd.id = "Info(" + i + "," + j + ")";
		  newTbodyTd.width = "40px";
		  newTbodyTr.appendChild(newTbodyTd).innerHTML = lTable[i][2];// 案内順番 sequence
	    } else if(j == 2){
		  var newTbodyTd = document.createElement("td");
		  newTbodyTd.id = "Info(" + i + "," + j + ")";
		  newTbodyTd.width = "200px";
		  if(lTable[i][6]!=null){
			newTbodyTr.appendChild(newTbodyTd).innerHTML = lTable[i][1]+"<br>"+"[ "+lTable[i][6]+" ]";
		  } else {
			newTbodyTr.appendChild(newTbodyTd).innerHTML = lTable[i][1];// 案内場所 Name
		  }
	    } else if(j == 3){
		  var newTbodyTd = document.createElement("td");
		  newTbodyTd.id = "Info(" + i + "," + j + ")";
		  newTbodyTd.width = "70px";
		  newTbodyTr.appendChild(newTbodyTd).innerHTML = lTable[i][3];// まるばつ
		  if(lTable[i][3] == "◯"){
		    var createbutton = document.createElement("input");
		    createbutton.type = "button";
		    createbutton.value = "音声を確認";
		    createbutton.id = "checkVoice("+ i +")";
		    document.getElementById("Info(" + i + ",3)").appendChild(createbutton);
		    document.getElementById("checkVoice("+ i +")").onclick = previewVoice(i);
		  }
		} else if(j == 4){
		  var newTbodyTd = document.createElement("td");
		  newTbodyTd.id = "Info(" + i + "," + j + ")";
		  newTbodyTd.width = "200px";
		  newTbodyTr.appendChild(newTbodyTd).innerHTML = lTable[i][4];// 更新日時 Date
	    } else if(j == 5){
		  var newTbodyTd = document.createElement("td");
		  newTbodyTd.id = "Info(" + i + "," + j + ")";
		  newTbodyTr.appendChild(newTbodyTd).innerHTML = lTable[i][0].substring(3, 6);// LocationID(hidden)
	    }
	}
    }
}


function clearCheckbox() {
    for (var i = 0; i < maxRow; ++i) {
	var tr = document.getElementById("Info(" + i + ",0)");
	if(document.getElementById("Info(" + i + ",0)").firstElementChild.checked == true){
	    document.getElementById("Info(" + i + ",0)").firstElementChild.checked = false;
	}
    }
}

function getCheckedID(){
    var checkID = document.getElementById("Info(0,2)").text;
    var target = document.getElementById("test");
}

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

