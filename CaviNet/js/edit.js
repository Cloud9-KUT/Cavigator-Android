var edit_URL = "http://54.68.143.213/cgi-bin/";
//var edit_URL ="http://cloud9-server/cgi-bin/";
//var edit_URL ="http://192.168.0.101/cgi-bin/";
//var edit_URL ="http://192.168.11.51/cgi-bin/";

var xhr;

var parentData = [];
function setParams() {
    parentData = window.dialogArguments;
    console.log(parentData[0]);
    console.log(parentData[1]);
    console.log(parentData[2]);
    console.log(parentData[3]);
}

//info
function onClickSubmit_edit_Info() {
    //PageNameの送信
    var fdata = new FormData();
    var textForm = document.getElementById("page");
    xhr = XMLHttpRequestCreate();
    if(textForm.value){
	fdata.append("name",textForm.value);
    }
    fdata.append("PageID",parentData[0]);
    var u = edit_URL+"update_page.cgi";
    xhr.open("post", u, false);
    xhr.send(fdata);
    
    //本場の綴り
    var fdata = new FormData();
    var textForm = document.getElementById("page2");
    xhr = XMLHttpRequestCreate();
    if(textForm.value){
	fdata.append("name",textForm.value);
    }
    fdata.append("PageID",parentData[0]);
    fdata.append("LanguageID",parentData[2]);
    
    var u = edit_URL+"update_tpage.cgi";
    xhr.open("post", u, false);
    xhr.send(fdata);

    //file情報の送信text
    var form = document.getElementById("textfile");
    console.log(form);
    var fdata = new FormData(form);
    fdata.append("LanguageID",parentData[2]);
    fdata.append("PageID",parentData[0]);
    xhr = XMLHttpRequestCreate();
    var u = edit_URL+"update_text.cgi";
    console.log(u);
    xhr.open("post", u, false);
    xhr.send(fdata);
    
    //file情報の送信picture1
    var form = document.getElementById("picfile1");
    var fdata = new FormData(form);
    fdata.append("LanguageID",parentData[2]);
    fdata.append("PageID",parentData[0]);
    fdata.append("PictureID","Pic000");
    xhr = XMLHttpRequestCreate();
    var u = edit_URL+"update_picture.cgi";
    xhr.open("post", u, false);
    xhr.send(fdata);
    
	//file情報の送信picture2
    var form = document.getElementById("picfile2");
    var fdata = new FormData(form);
    fdata.append("LanguageID",parentData[2]);
    fdata.append("PageID",parentData[0]);
    fdata.append("PictureID","Pic001");
    xhr = XMLHttpRequestCreate();
    var u = edit_URL+"update_picture.cgi";
    xhr.open("post", u, false);
    xhr.send(fdata);
    
	//file情報の送信picture3
    var form = document.getElementById("picfile3");
    var fdata = new FormData(form);
    fdata.append("LanguageID",parentData[2]);
    fdata.append("PageID",parentData[0]);
    fdata.append("PictureID","Pic002");
    xhr = XMLHttpRequestCreate();
    var u = edit_URL+"update_picture.cgi";
    xhr.open("post", u, false);
    xhr.send(fdata);
    
	
    //Log
    var res = new CGIResponse(xhr.response);
    res.print();
    
    window.close();
}

//Voice
function onClickSubmit_edit_Voice() {
    //PageNameの送信
    var fdata = new FormData();
    var textForm = document.getElementById("page");
    xhr = XMLHttpRequestCreate();
    fdata.append("name",textForm.value);
    fdata.append("LocationID",parentData[0]);
    var u = edit_URL+"update_location.cgi";
    xhr.open("post", u, false);
    xhr.send(fdata);

    //本場の綴り TPAGE!!!
    var fdata = new FormData();
    var textForm = document.getElementById("page2");
    xhr = XMLHttpRequestCreate();
    if(textForm.value){
	fdata.append("name",textForm.value);
    }
    fdata.append("LocationID",parentData[0]);
    fdata.append("LanguageID",parentData[2]);
    
    var u = edit_URL+"update_tlocation.cgi";
    xhr.open("post", u, false);
    xhr.send(fdata);
	
	
    //file情報の送信
    var form = document.getElementById("file");
    var fdata = new FormData(form);
    fdata.append("LanguageID",parentData[2]);
    fdata.append("LocationID",parentData[0]);
    xhr = XMLHttpRequestCreate();
    var u = edit_URL+"update_voice.cgi";
    xhr.open("post", u, false);
    xhr.send(fdata);
    
    //Log
    var res = new CGIResponse(xhr.response);
    res.print();
    
    window.close();
}

//Language
function onClickSubmit_edit_Language() {
    //PageNameの送信
    var fdata = new FormData();
    var textForm = document.getElementById("page");
    xhr = XMLHttpRequestCreate();
    fdata.append("name",textForm.value);
    fdata.append("LanguageID",parentData[2]);
    var u = edit_URL+"update_language.cgi";
    xhr.open("post", u, false);
    xhr.send(fdata);

    //Log
    var res = new CGIResponse(xhr.response);
    res.print();
    
    window.close();
}


function clearfile1(){
var file = document.getElementById( 'pic1' );
file.parentNode.innerHTML = file.parentNode.innerHTML;

var input_file_show1 = document.getElementById("showPictureArea1");
for (i =input_file_show1.childNodes.length-1; i>=0; i--){
	input_file_show1.removeChild(input_file_show1.childNodes[i]);
}
}

function clearfile2(){
var file = document.getElementById( 'pic2' );
file.parentNode.innerHTML = file.parentNode.innerHTML;

var input_file_show2 = document.getElementById("showPictureArea2");
for (i =input_file_show2.childNodes.length-1; i>=0; i--){
	input_file_show2.removeChild(input_file_show2.childNodes[i]);
}
}

function clearfile3(){
var file = document.getElementById( 'pic3' );
file.parentNode.innerHTML = file.parentNode.innerHTML;

var input_file_show3 = document.getElementById("showPictureArea3");
for (i =input_file_show3.childNodes.length-1; i>=0; i--){
	input_file_show3.removeChild(input_file_show3.childNodes[i]);
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
