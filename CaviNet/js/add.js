var add_URL = "http://54.68.143.213/cgi-bin/";
//var add_URL ="http://cloud9-server/cgi-bin/";
//var add_URL ="http://192.168.0.101/cgi-bin/";
//var add_URL ="http://192.168.11.51/cgi-bin/";

var xhr;

var parentData = [];

//info
function onClickSubmit_add_Info() {

    //alert_modal();

    var xhr = XMLHttpRequestCreate();
    xhr.open("GET", add_URL+"getTable.cgi?tbl=Page", false);
    xhr.send("");

    var res = new CGIResponse(xhr.response).Response.split("\n");

	var max = 0;
	var pages = [];
    for (var i = 0; i < res.length; ++i) {
		var r = res[i].split(",");
        if (r.length == 1) {
		
            break;
        }

		var id = parseInt(r[0].substr(3,3));

		if (max < id) max = id;
		pages[id] = r[1];
    }
	
	var id;
	for (id = 1; id <= max; ++id) {
		if (pages[id] == undefined) {
			break;
		}
	}
	
    var lid;
    if (id < 10) {
        lid = "Pag00" + id;
    } else if (id <100 ) {
        lid = "Pag0" + id;
    } else {
        lid = "Pag" + id;
    }
	
	//Seq
	var xhr = XMLHttpRequestCreate();
    xhr.open("GET", add_URL+"getTable.cgi?tbl=Page", false);
    xhr.send("");

    var res = new CGIResponse(xhr.response).Response.split("\n");

	var max = 0;
	var pages = [];
    for (var i = 0; i < res.length; ++i) {
		var r = res[i].split(",");
        if (r.length == 1) {
		
            break;
        }

		var seq = parseInt(r[2]);
		if (max < seq) max = seq;
		pages[seq] = r[1];
    }
	
	var seq;
	for (seq = 1; seq <= max; ++seq) {
		if (pages[seq] == undefined) {
			break;
		}
	}
		
    //PageNameの送信
	//console.log(lid);
	//console.log(parentData[2]);
	var fdata = new FormData();
	var textForm = document.getElementById("page");
	xhr = XMLHttpRequestCreate();
	fdata.append("name",textForm.value);
	console.log(textForm.value);
	fdata.append("PageID",lid);
	fdata.append("Sequence",seq);
	var u = add_URL+"update_page.cgi";
	console.log(u);
	xhr.open("post", u, false);
	xhr.send(fdata);
	console.log(fdata);

//本場の綴り
	var fdata = new FormData();
	var textForm = document.getElementById("page2");
	xhr = XMLHttpRequestCreate();
	fdata.append("LanguageID",parentData[2]);
	fdata.append("name",textForm.value);
	console.log(textForm.value);
	fdata.append("PageID",lid);
	var u = add_URL+"update_tpage.cgi";
	console.log(u);
	xhr.open("post", u, false);
	xhr.send(fdata);
	console.log(fdata);

	//file情報の送信
	var form = document.getElementById("textfile");
	var fdata = new FormData(form);
	fdata.append("LanguageID" , parentData[2]);
	fdata.append("PageID",lid);
	xhr = XMLHttpRequestCreate();
	var u = add_URL+"update_text.cgi";
	xhr.open("post", u, false);
	xhr.send(fdata);


	//Picturefile情報の送信
	var form = document.getElementById("picfile1");
	var fdata = new FormData(form);
	fdata.append("PageID",lid);
	fdata.append("PictureID","Pic000");
	xhr = XMLHttpRequestCreate();
	var u = add_URL+"update_picture.cgi";
	xhr.open("post", u, false);
	xhr.send(fdata);

	var form = document.getElementById("picfile2");
	var fdata = new FormData(form);
	fdata.append("PageID",lid);
	fdata.append("PictureID","Pic001");
	xhr = XMLHttpRequestCreate();
	var u = add_URL+"update_picture.cgi";
	xhr.open("post", u, false);
	xhr.send(fdata);
	
	var form = document.getElementById("picfile3");
	var fdata = new FormData(form);
	fdata.append("PageID",lid);
	fdata.append("PictureID","Pic002");
	xhr = XMLHttpRequestCreate();
	var u = add_URL+"update_picture.cgi";
	xhr.open("post", u, false);
	xhr.send(fdata);
	
	//Log
	//console.log(xhr.response);
	var res = new CGIResponse(xhr.response);
	res.print();
	window.close();
}
//Voice
function onClickSubmit_add_Voice() {
	var xhr = XMLHttpRequestCreate();
    xhr.open("GET", add_URL+"getTable.cgi?tbl=Location", false);
    xhr.send("");

    var res = new CGIResponse(xhr.response).Response.split("\n");

	var max = 0;
	var pages = [];
    for (var i = 0; i < res.length; ++i) {
		var r = res[i].split(",");

        if (r.length == 1) {
            break;
        }

		var id = parseInt(r[0].substr(3,3));
		if (max < id) max = id;
		pages[id] = r[1];
    }
	
	var id;
	for (id = 0; id <= max; ++id) {
		if (pages[id] == undefined) {
			break;
		}
	}
	
    var lid;
    if (id < 10) {
        lid = "Loc00" + id;
    } else if (id <100 ) {
        lid = "Loc0" + id;
    } else {
        lid = "Loc" + id;
    }
	
	//Seq
	var xhr = XMLHttpRequestCreate();
    xhr.open("GET", add_URL+"getTable.cgi?tbl=Location", false);
    xhr.send("");

    var res = new CGIResponse(xhr.response).Response.split("\n");

	var max = 0;
	var pages = [];
    for (var i = 0; i < res.length; ++i) {
		var r = res[i].split(",");
        if (r.length == 1) {
		
            break;
        }

		var seq = parseInt(r[2]);
		if (max < seq) max = seq;
		pages[seq] = r[1];
    }
	
	var seq;
	for (seq = 1; seq <= max; ++seq) {
		if (pages[seq] == undefined) {
			break;
		}
	}
    //PageNameの送信
	var fdata = new FormData();
	var textForm = document.getElementById("page");
	xhr = XMLHttpRequestCreate();
	fdata.append("name",textForm.value);
	//console.log(textForm.value);
	fdata.append("LocationID",lid);
	fdata.append("Sequence",seq);
	var u = add_URL+"update_location.cgi";
	//console.log(u);
	xhr.open("post", u, false);
	xhr.send(fdata);
	//console.log(fdata);
	
	//本場の綴り TPAGE!!!
	var fdata = new FormData();
	var textForm = document.getElementById("page2");
	xhr = XMLHttpRequestCreate();
	fdata.append("LanguageID",parentData[2]);
	fdata.append("name",textForm.value);
	console.log(textForm.value);
	fdata.append("LocationID",lid);
	var u = add_URL+"update_tlocation.cgi";
	console.log(u);
	xhr.open("post", u, false);
	xhr.send(fdata);
	console.log(fdata);

	//file情報の送信
	var form = document.getElementById("file");
	var fdata = new FormData(form);
	fdata.append("LanguageID",parentData[2]);
	fdata.append("LocationID",lid);
	xhr = XMLHttpRequestCreate();
	var u = add_URL+"update_voice.cgi";
	//console.log(u);
	xhr.open("post", u, false);
	xhr.send(fdata);
	
	//Log
	//console.log(xhr.response);
	var res = new CGIResponse(xhr.response);
	res.print();
	
	window.close();
}


//Language
function onClickSubmit_add_Language() {
	var xhr = XMLHttpRequestCreate();
    xhr.open("GET", add_URL+"getTable.cgi?tbl=Language", false);
    xhr.send("");

    var res = new CGIResponse(xhr.response).Response.split("\n");

	var max = 0;
	var pages = [];
    for (var i = 0; i < res.length; ++i) {
		var r = res[i].split(",");

        if (r.length == 1) {
            break;
        }

		var id = parseInt(r[0].substr(3,3));
		if (max < id) max = id;
		pages[id] = r[1];
    }
	
	var id;
	for (id = 0; id <= max; ++id) {
		if (pages[id] == undefined) {
			break;
		}
	}
	
    var lid;
    if (id < 10) {
        lid = "Lan00" + id;
    } else if (id <100 ) {
        lid = "Lan0" + id;
    } else {
        lid = "Lan" + id;
    }
	
    //PageNameの送信
	//console.log(lid);
	var fdata = new FormData();
	var textForm = document.getElementById("page");
	xhr = XMLHttpRequestCreate();
	fdata.append("name",textForm.value);
	//console.log(textForm.value);
	fdata.append("LanguageID",lid);
	//fdata.append("Sequence",id);
	var u = add_URL+"update_language.cgi";
	//console.log(u);
	xhr.open("post", u, false);
	xhr.send(fdata);
	//console.log(fdata);
	
	//Log
	//console.log(xhr.response);
	var res = new CGIResponse(xhr.response);
	res.print();
	
	window.close();
}

function clearfile1(){
var file = document.getElementById( 'picform1' );
file.parentNode.innerHTML = file.parentNode.innerHTML;

var input_file_show1 = document.getElementById("showPictureArea1");
for (i =input_file_show1.childNodes.length-1; i>=0; i--){
	input_file_show1.removeChild(input_file_show1.childNodes[i]);
}
}

function clearfile2(){
var file = document.getElementById( 'picform2' );
file.parentNode.innerHTML = file.parentNode.innerHTML;

var input_file_show2 = document.getElementById("showPictureArea2");
for (i =input_file_show2.childNodes.length-1; i>=0; i--){
	input_file_show2.removeChild(input_file_show2.childNodes[i]);
}
}

function clearfile3(){
var file = document.getElementById( 'picform3' );
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
