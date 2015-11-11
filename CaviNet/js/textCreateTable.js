var URL = "http://54.68.143.213/cgi-bin/";
//var URL ="http://cloud9-server/cgi-bin/";
//var URL ="http://192.168.0.101/cgi-bin/";
//var URL ="http://192.168.11.51/cgi-bin/";


function changeSelect(){
    var selected = document.getElementById("LanguageID")
    index = selected.selectedIndex;
}


function getCheckedID() {
    var len = document.getElementById("TbodyArea").childNodes;
    for (var i = 0; i < len.length; ++i) {
	var tr = document.getElementById("Info(" + i + ",0)"); 
	if (tr.firstElementChild.checked) {
	    var td = document.getElementById("Info(" + i + ",7)");
	    var id = "Tes" + td.textContent;
	    break;
	}
    }
}


function clearCheckbox() {
    var len = document.getElementById("TbodyArea").childNodes;
    for (var i = 0; i < len.length; ++i) {
	document.getElementById("Info(" + i + ",0)").firstElementChild.checked = false;
    }
}


function getLanguageID(){
    var selected = document.getElementById("LanguageID")
    var id = selected.options[selected.selectedIndex].value;
    return id;
}


function getPageID() {
    var len = document.getElementById("TbodyArea").childNodes;
    for (var i = 0; i < len.length; ++i) {
	var tr = document.getElementById("Info(" + i + ",0)"); 
	if (tr.firstElementChild.checked) {
	    var td = document.getElementById("Info(" + i + ",7)");
	    var id = "Tes" + td.textContent;
	    return id;
	    break;
	}
    }
}

function getName() {
    var len = document.getElementById("TbodyArea").childNodes;
    for (var i = 0; i < len.length; ++i) {
	var tr = document.getElementById("Info(" + i + ",0)"); 
	if (tr.firstElementChild.checked) {
	    var td = document.getElementById("Info(" + i + ",2)");
	    var name = td.textContent;
	    return name;
	    break;
	}
    }
}






