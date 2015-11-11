var URL = "http://54.68.143.213/cgi-bin/";
//var URL ="http://cloud9-server/cgi-bin/";
//var URL ="http://192.168.0.101/cgi-bin/";
//var URL ="http://192.168.11.51/cgi-bin/";

var xhr;

//取ってきた値↓
var CID = "";
var upID = "";
var downID ="";

//矢印ボタン↑を入力した時の処理
function swap_up() {
    if (alert_check() == true) {
	return;
    }

    setSwapPageID();
    if(upID == null) return;

    //CGIに送れる形に変更
    var sendID = CID + "," + upID;
    
    var selected = document.getElementById("LanguageID");
    var id = selected.options[selected.selectedIndex].value;
    var sendLangID = id+","+id;

    var fdata = new FormData();
    xhr = XMLHttpRequestCreate();
    fdata.append("PageID",sendID);
    fdata.append("LanguageID",sendLangID);
    var u = URL+"swap_page.cgi";
    xhr.open("post", u, false);
    xhr.send(fdata);

    changeSelect();

    setCheckPageID(CID);
}
//矢印ボタン↓を入力した時の処理
function swap_down() {
    if (alert_check() == true) {
	return;
    }

    setSwapPageID();
    if(downID == null) return;
    //CGIに送れる形に変更
    var sendID = CID + "," + downID;

    var selected = document.getElementById("LanguageID");
    var id = selected.options[selected.selectedIndex].value;
    var sendLangID = id+","+id;


    var fdata = new FormData();
    xhr = XMLHttpRequestCreate();
    fdata.append("PageID",sendID);
    fdata.append("LanguageID",sendLangID);
    var u = URL+"swap_page.cgi";
    xhr.open("post", u, false);
    xhr.send(fdata);

    changeSelect();

    setCheckPageID(CID);
}

/* Infomation.js で生成した表に対応 */
function setCheckPageID(checkPageID){
    var tableLength = document.getElementById("TbodyArea").childNodes.length;
    for (var i = 0; i < tableLength; i++) {
	var cellPageIDLocate = document.getElementById("Info(" + i + ",7)");
	var cellCheckLocate = document.getElementById("Info(" + i + ",0)");
	if("Pag"+cellPageIDLocate.textContent == checkPageID){
	    cellCheckLocate.firstElementChild.checked = true;
	}
    }
}

function setSwapPageID() {
    var tableLength = document.getElementById("TbodyArea").childNodes.length;
    for (var i = 0; i < tableLength; ++i) {
	var cell = document.getElementById("Info(" + i + ",0)");
	if (cell.firstElementChild.checked) {
	    var count = i;
	    var CIDLocate = document.getElementById("Info(" + count + ",7)");
	    CID = "Pag" + CIDLocate.textContent;
	    if(i == 0){ // 最初の行にチェックが入っていた場合
		upID = null;
		count = i + 1;
		CIDLocate = document.getElementById("Info(" + count + ",7)");
		downID = "Pag" + CIDLocate.textContent;
	    } else if(i == tableLength-1){ // 最後の行にチェックが入っていた場合
		downID = null;
		count = i - 1;
		CIDLocate = document.getElementById("Info(" + count + ",7)");
		upID = "Pag" + CIDLocate.textContent;
	    } else { // 通常の処理
		count = i + 1;
		CIDLocate = document.getElementById("Info(" + count + ",7)");
		downID = "Pag" + CIDLocate.textContent;
		count = i - 1;
		CIDLocate = document.getElementById("Info(" + count + ",7)");
		upID = "Pag" + CIDLocate.textContent;
	    }
	} else {
	    kyomu();
	}
    }
}
function kyomu(){}


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
