//var IP_URL = "http://192.168.11.51/cgi-bin/"; // cloud9_server
var IP_URL = "http://54.68.143.213/cgi-bin/"; // AWS
var index = null;
var maxCol = 8;
var maxRow = 0;
var InfoTable;
var InfoTextTable;
var InfoPicTable;

window.onload = function() {
    var el = document.getElementById("LanguageID");

    var xhr = XMLHttpRequestCreate();
    xhr.open("GET", IP_URL+"getLang.cgi", false);
    xhr.send("");

    var res = new CGIResponse(xhr.response).Response.split("\n");
    var e0 = document.createElement("option");
    for (i = 0; i < res.length; ++i) {
	var r = res[i].match(/(.+),\s?(.+)/);
	if (r == null) {
	    break;
	}
	var e1 = document.createElement("option");
	e1.value = RegExp.$1;
	e1.text = RegExp.$2;
	el.appendChild(e1);
    }
    document.getElementById("textForm").appendChild(el);

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
	    newTd.width = "40px";
	    newTheadTr.appendChild(newTd).innerHTML = "順番";
	} else if(j == 2){
	    var newTd = document.createElement("td");
	    newTd.id = "Thead(" + j + ")";
	    newTd.width = "250px";
	    newTheadTr.appendChild(newTd).innerHTML = "案内場所";
	} else if(j == 3){
	    var newTd = document.createElement("td");
	    newTd.id = "Thead(" + j + ")";
	    newTd.width = "80px";
	    newTheadTr.appendChild(newTd).innerHTML = "テキスト◯/×";
	} else if(j == 4){
	    var newTd = document.createElement("td");
	    newTd.id = "Thead(" + j + ")";
	    newTd.width = "180px";
	    newTheadTr.appendChild(newTd).innerHTML = "テキスト更新日時";
	} else if(j == 5){
	    var newTd = document.createElement("td");
	    newTd.id = "Thead(" + j + ")";
	    newTd.width = "80px";
	    newTheadTr.appendChild(newTd).innerHTML = "写真枚数";
	} else if(j == 6){
	    var newTd = document.createElement("td");
	    newTd.id = "Thead(" + j + ")";
	    newTd.width = "180px";
	    newTheadTr.appendChild(newTd).innerHTML = "写真更新日時";
	} else if(j == 7){
	    var newTd = document.createElement("td");
	    newTd.id = "Thead(" + j + ")";
	    newTd.width = "50px";
	    newTheadTr.appendChild(newTd).innerHTML = "PageID";
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
    var xhr = XMLHttpRequestCreate();
    var selected = document.getElementById("LanguageID");
    index = selected.options[selectNum].value;

    xhr.open("GET", IP_URL+"getValue.cgi?tbl=Picture", false);
    xhr.send(null);
    var PictureTable = new CGIResponse(xhr.response).Response.split("\n");

    xhr.open("GET", IP_URL+"getValue.cgi?tbl=Text&LanguageID=" + index, false);
    xhr.send(null);
    var TextTable = new CGIResponse(xhr.response).Response.split("\n");

    xhr.open("GET", IP_URL+"getValue.cgi?tbl=TPage&LanguageID=" + index, false);
    xhr.send(null);
    var TrancerateTable = new CGIResponse(xhr.response).Response.split("\n");

    xhr.open("GET", IP_URL+"getTable.cgi?tbl=Page", false);
    xhr.send(null);
    var PageTable = new CGIResponse(xhr.response).Response.split("\n");

    createMatrix(PictureTable, TextTable, TrancerateTable, PageTable);
}

function createMatrix(PictureTable, TextTable, TrancerateTable, PageTable){
    var pic_table = []; //PictureTableを格納する行列 [PictureID | PageID | Date | Path]
    for (i=0; i<PictureTable.length; ++i) {
	pic_table[i] = PictureTable[i].split(",");
    }

    var text_table = []; // TextTableを格納する行列 [pageID | LanguageID | Date | Path]
    for (i=0; i<TextTable.length; i++) {
	text_table[i] = TextTable[i].split(",");
    }

    var trancerate_table = []; // TrancerateTableを格納する行列 [LanguageID | PageID | Name]
    for (i=0; i<TrancerateTable.length; i++) {
	trancerate_table[i] = TrancerateTable[i].split(",");
    }

    var page_table = []; //PageTableを格納する行列 [pageID | Name | Sequence]
    for (i=0; i<PageTable.length-1; ++i) {
	page_table[i] = PageTable[i].split(",");
	/* テキストについて格納（PageIDを確認しつつ） */
	var textCount = 0;
	for(j=0; j<TextTable.length; j++){
	    if(page_table[i][0] == text_table[j][0]){
		textCount = textCount + 1;
		page_table[i][4] = text_table[j][2];// 4番目にtext.Date
		page_table[i][7] = text_table[j][3];// 7番目にtext.Path
	    }
	}
	if(textCount >= 1){
	    page_table[i][3] = "◯";
	} else {
	    page_table[i][3] = "×";
	    page_table[i][4] = "";
	}
	/* 写真について格納（PageIDを確認しつつ） */
	var pictureCount = 0;
	for(j=0; j<PictureTable.length; j++){
	    if(page_table[i][0] == pic_table[j][1]){
		pictureCount = pictureCount + 1;
		page_table[i][6] = pic_table[j][2];// 6番目にpicture.Date
		page_table[i][8] = pic_table[j][3];// 8番目にpicture.Path
	    }
	}
	if(pictureCount >= 1){
	    page_table[i][5] = pictureCount;
	} else {
	    page_table[i][5] = "×";
	    page_table[i][6] = "";
	}
	/* ネイティブの綴りについて格納 */
	for(j=0; j<TrancerateTable.length; j++){
	    if(page_table[i][0] == trancerate_table[j][1]){
		page_table[i][9] = trancerate_table[j][2];// 9番目にtrancerate.name
	    }
	}

    }
    // page_table[n][PageID | Name | Sequence | ◯/× | text.Date | 1~n/× | pic.Date | text.Path | pic.Path | tt.Name | trance.Name]
    createTable(page_table);
    InfoTable = page_table; // グローバル変数へ格納
    InfoTextTable = text_table;
    InfoPicTable = pic_table;
}


function createTable(pTable){
    maxRow = pTable.length;
    var newTbody = document.getElementById("TbodyArea");

    /* 初期化処理 */
    for (i =newTbody.childNodes.length-1; i>=0; i--){
	newTbody.removeChild(newTbody.childNodes[i]);
    }

    /* tbody */
    for(i = 0; i < pTable.length; i++) {
	var newTbodyTr = document.createElement("tr");
	newTbodyTr.id = "InfoRow(" + i + ")";
	newTbody.appendChild(newTbodyTr);

	for(j = 0; j < maxCol; j++) {
	    if(j == 0){// checkbox
		var newTbodyTd = document.createElement("td");
		newTbodyTd.id = "Info(" + i + "," + j + ")";
		newTbodyTd.width = "30px";
		newTbodyTr.appendChild(newTbodyTd);
		var first = document.getElementById("Info(" + i + ",0)");
		var newInput = document.createElement("input");
		newInput.type = "radio";
		newInput.name = "first";
		newTbodyTd.appendChild(newInput);
	    } else if(j == 1){// 順番 seaquence
		var newTbodyTd = document.createElement("td");
		newTbodyTd.id = "Info(" + i + "," + j + ")";
		newTbodyTd.width = "30px";
		newTbodyTr.appendChild(newTbodyTd).innerHTML = pTable[i][2];
	    } else if(j == 2){// 場所 Name
		var newTbodyTd = document.createElement("td");
		newTbodyTd.id = "Info(" + i + "," + j + ")";
		newTbodyTd.width = "240px";
		if(pTable[i][9]!=null){
		    newTbodyTr.appendChild(newTbodyTd).innerHTML = pTable[i][1]+"<br>"+"[ "+pTable[i][9]+" ]";
		} else {
		    newTbodyTr.appendChild(newTbodyTd).innerHTML = pTable[i][1];
		}
	    } else if(j == 3){// テキスト◯×
		var newTbodyTd = document.createElement("td");
		newTbodyTd.id = "Info(" + i + "," + j + ")";
		newTbodyTd.width = "70px";
		newTbodyTr.appendChild(newTbodyTd).innerHTML = pTable[i][3];
		if(pTable[i][3] == "◯"){
		    var createbutton = document.createElement("input");
		    createbutton.type = "button";
		    createbutton.value = "テキストを確認";
		    createbutton.id = "checkText("+ i +")";
		    document.getElementById("Info(" + i + ",3)").appendChild(createbutton);
		    document.getElementById("checkText("+ i +")").onclick = previewText(i);
		}
	    } else if(j == 4){// テキスト更新日時 Date
		var newTbodyTd = document.createElement("td");
		newTbodyTd.id = "Info(" + i + "," + j + ")";
		newTbodyTd.width = "170px";
		newTbodyTr.appendChild(newTbodyTd).innerHTML = pTable[i][4];
	    } else if(j == 5){// 写真枚数
		var newTbodyTd = document.createElement("td");
		newTbodyTd.id = "Info(" + i + "," + j + ")";
		newTbodyTd.width = "70px";
		newTbodyTr.appendChild(newTbodyTd).innerHTML = pTable[i][5];
		if(pTable[i][5] >= 1){
		    var createbutton = document.createElement("input");
		    createbutton.type = "button";
		    createbutton.value = "写真を確認";
		    createbutton.id = "checkPic("+ i +")";
		    document.getElementById("Info(" + i + ",5)").appendChild(createbutton);
		    document.getElementById("checkPic("+ i +")").onclick = previewPic(i);
		}
	    } else if(j == 6){// 写真更新日時 Date
		var newTbodyTd = document.createElement("td");
		newTbodyTd.id = "Info(" + i + "," + j + ")";
		newTbodyTd.width = "170px";
		newTbodyTr.appendChild(newTbodyTd).innerHTML = pTable[i][6];
	    } else if(j == 7){// PageID(hidden)
		var newTbodyTd = document.createElement("td");
		newTbodyTd.id = "Info(" + i + "," + j + ")";
		newTbodyTd.width = "40px";
		newTbodyTr.appendChild(newTbodyTd).innerHTML = pTable[i][0].substring(3, 6);
	    }
	}
    }
}

function clearCheckbox() {
    for (var i = 0; i < maxRow; ++i) {
	if(document.getElementById("Info(" + i + ",0)").firstElementChild.checked == true){
	    document.getElementById("Info(" + i + ",0)").firstElementChild.checked = false;
	}
    }
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

