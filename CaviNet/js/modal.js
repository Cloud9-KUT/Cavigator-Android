var modal_URL = "http://54.68.143.213/cgi-bin/";
//var modal_URL ="http://cloud9-server/cgi-bin/";
//var modal_URL ="http://192.168.0.101/cgi-bin/";
//var modal_URL ="http://192.168.11.51/cgi-bin/";
var parentData;
var xhr;
var IPPath = "http://54.68.143.213";
var Pathcount;


/* modal.jsのファイル構成
1,【モーダルを表示する】
　ー4種(テキスト・音声・言語・写真)×3種(add・edit・delete)=【12種】

2,【add】
　ー親フォルダからデータを受け取り、CGIを用いる。4種(テキスト・音声・言語・写真)

3,【edit】
　ー親フォルダからデータを受け取り、CGIを用いる。4種(テキスト・音声・言語・写真)

4,【delete】
　ー親フォルダからデータを受け取り、CGIを用いる。4種(テキスト・音声・言語・写真)
*/



/*1,【モーダルを表示する】テキスト・写真-add*/
function info_add_showModal(element) {
    
    if (alert_check2() == false) {
	return;
    }
    

    var sendArguments = [];  
    /*languageID*/
    sendArguments[2] = getLanguageID(); 
    /*モーダルダイアログを開く*/ 
    showModalDialog("Info_add_modal.html",sendArguments,"dialogWidth=550px; dialogHeight=2000px;"); 
    changeSelect();
}
 
/*1,【モーダルを表示する】音声-add*/
function voice_add_showModal(element) {

    if (alert_check2() == false) {
	return;
    }
    
    var sendArguments = [];  
    /*languageID*/
    sendArguments[2] = getLanguageID(); 
    /*モーダルダイアログを開く*/ 
    showModalDialog("Voice_add_modal.html",sendArguments,"dialogWidth=550px; dialogHeight=2000px;"); 
	changeSelect();
}

/*1,【モーダルを表示する】言語-add*/
function language_add_showModal(element) {

    if (alert_check2() == false) {
	return;
    }


    var sendArguments = [];  
    /*languageID*/
    /*sendArguments[2] = getLanguageID();*/
    /*モーダルダイアログを開く*/ 
    showModalDialog("Language_add_modal.html",sendArguments,"dialogWidth=550px; dialogHeight=2000px;"); 
	location.reload(true);
}



/*1,【モーダルを表示する】テキスト・写真-edit*/
function info_edit_showModal() {
    
     if (alert_check() == true) {
	return;
    }
    
    var sendArguments = [];  
    /*PageID*/
    sendArguments[0] = getPageID(); 
    /*Name*/
    sendArguments[1] = getName();
    /*languageID*/
    sendArguments[2] = getLanguageID(); 
    /*PictureID*/
    sendArguments[3] = getPictureID();
    /*FilePath*/
    sendArguments[4] = getFilePath();
    /*PictureIDの数 */
    sendArguments[5] = len;
    /*nativeNmae*/
    sendArguments[6] = getnativeName();
    /*pictureID ver2*/
    sendArguments[7] = getFilePath2();


    /*モーダルダイアログを開く*/ 
    showModalDialog("Info_edit_modal.html",sendArguments,"dialogWidth=900px; dialogHeight=2000px;"); 
	changeSelect();
}

/*1,【モーダルを表示する】音声-edit*/
function voice_edit_showModal(element) {

     if (alert_check() == true) {
	return;
    }
    

    var sendArguments = [];  
    /*PageID*/
    sendArguments[0] = getLocationID();
	
    sendArguments[1] = getvoiceName();
	
    /*languageID*/
    sendArguments[2] = getLanguageID();
    /*voice_nativeName*/
    sendArguments[3] = getnativeName2();
    /*モーダルダイアログを開く*/ 
    showModalDialog("Voice_edit_modal.html",sendArguments,"dialogWidth=550px; dialogHeight=2000px;"); 
	changeSelect();
}

/*1,【モーダルを表示する】言語-edit*/
function language_edit_showModal(element) {

     if (alert_check() == true) {
	return;
    }
    
    var sendArguments = [];
    sendArguments[1] = getlanguageName();
    /*languageID*/
    sendArguments[2] = getLanguageID2(); 
    /*モーダルダイアログを開く*/ 
    showModalDialog("Language_edit_modal.html",sendArguments,"dialogWidth=550px; dialogHeight=2000px;"); 
    location.reload(true);
}




/*1,【モーダルを表示する】テキスト-delete*/
function text_delete_showModal(element) {
    var sendArguments = [];

    /*PageID*/
    sendArguments[0] = getPageID();
    /*languageID*/
    sendArguments[2] = getLanguageID(); 
    /*モーダルダイアログを開く*/ 
    showModalDialog("Text_delete_modal.html",sendArguments,"dialogWidth=550px; dialogHeight=2000px;"); 
	changeSelect();
}

/*1,【モーダルを表示する】音声-delete*/
function voice_delete_showModal(element) {

    if (alert_check() == true) {
	return;
    }

    var sendArguments = [];  
    /*PageID*/
    sendArguments[0] = getLocationID();

    sendArguments[1] = getvoiceName();

    /*languageID*/
    sendArguments[2] = getLanguageID(); 
    /*モーダルダイアログを開く*/
    showModalDialog("Voice_delete_modal.html",sendArguments,"dialogWidth=550px; dialogHeight=2000px;");
	changeSelect();
}

/*1,【モーダルを表示する】言語-delete*/
function language_delete_showModal(element) {

    if (alert_check() == true) {
	return;
    }

    var sendArguments = [];  
    sendArguments[1] = getlanguageName();
    /*languageID*/
    sendArguments[2] = getLanguageID2(); 
    /*モーダルダイアログを開く*/
    showModalDialog("Language_delete_modal.html",sendArguments,"dialogWidth=550px; dialogHeight=2000px;");
location.reload(true);
}

/*1,【モーダルを表示する】写真-delete　*/
function textpic_showModal() {

    if (alert_check() == true) {
	return;
    }

    var sendArguments = [];
    sendArguments[0] = getPageID(); 
    /*Name*/
    sendArguments[1] = getName();
    /*languageID*/
    sendArguments[2] = getLanguageID(); 
    /*PictureID*/
    sendArguments[3] = getPictureID();
    /*FilePath*/
    sendArguments[4] = getFilePath();
    /*PictureIDの数 */
    sendArguments[5] = len;
    /*Text.FilePath */
    sendArguments[6] = getTextFilePath();
    /* １枚目、２枚目、３枚目を考慮したPageID */
    sendArguments[7] = getFilePath2();

    /*モーダルダイアログを開く*/
    showModalDialog("Info_delete_modal.html",sendArguments,"dialogWidth=1050px; dialogHeight=2000px;");  
    changeSelect();
}


/*2,【add】テキスト */
/*2,【add】音声 */
/*2,【add】言語 */
/*2,【add】写真 */


/*3,【edit】テキスト */
/*3,【edit】音声 */
/*3,【edit】言語 */
/*3,【edit】写真 */



/*4,【delete】テキスト */
    /*親ウインドウからデータを受け取る*/
    function text_setParams() {
	parentData = window.dialogArguments;
	
	console.log(parentData);
	console.log(parentData[0]);
	console.log(parentData[2]);
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


function text_kesu() {
    console.log(parentData[6]);
    
    if (parentData[6] == "pic/notext.txt") {
	return;
    }
    
    console.log("iii"); 
    
    xhr = XMLHttpRequestCreate();
    xhr.open("POST", modal_URL+"delete_text.cgi", false);
    
    var fdata = new FormData();
    fdata.append("LanguageID", parentData[2]);
    fdata.append("PageID", parentData[0]);
    
    xhr.send(fdata);
    
    var res = new CGIResponse(xhr.response);
    //if (res.isSuccess) {
    // リクエストが成功したとき
    //console.log(res.Response);
    //} else {
    // リクエストが失敗したとき。
    // 中身を表示する
    res.print();
    //}    
 
    window.close();

}

/*4, 【delete】音声  */

    <!--親ウインドウからデータを受け取る-->
    function voice_setParams() {
	parentData = window.dialogArguments;
	
	console.log(parentData);
	console.log(parentData[0]);
	console.log(parentData[1]);
	console.log(parentData[2]);
	console.log(parentData[3]);
    }


function voice_kesu() {
    xhr = XMLHttpRequestCreate();
    xhr.open("POST", modal_URL+"delete_voice.cgi", false);
    
    var fdata = new FormData();
    fdata.append("LanguageID", parentData[2]);
    fdata.append("LocationID", parentData[0]);
    
    xhr.send(fdata);
    
    var res = new CGIResponse(xhr.response);
    res.print();

    
    window.close();
}


/*4, 【delete】音声の案内場所（Location）  */

function location_kesu() {
    xhr = XMLHttpRequestCreate();
    xhr.open("POST", modal_URL+"delete_location.cgi", false);
    
    var fdata = new FormData();
    fdata.append("LocationID", parentData[0]);
    
    xhr.send(fdata);
    
    var res = new CGIResponse(xhr.response);
    res.print();

    window.close();

}






/*4, 【delete】言語  */    
/*親ウインドウからデータを受け取る*/
function language_setParams() {
    parentData = window.dialogArguments;
    
    console.log(parentData);
    console.log(parentData[2]);
}

function language_kesu() {
    xhr = XMLHttpRequestCreate();
    xhr.open("POST", modal_URL+"delete_language.cgi", false);
    
    var fdata = new FormData();
    fdata.append("LanguageID", parentData[2]);     
    xhr.send(fdata);
    
    var res = new CGIResponse(xhr.response);
    res.print();

    window.close();

}





/*4, 【delete】インフォメーション(テキスト&写真)　*/
function textpic_setParams() {
    parentData = window.dialogArguments;
    
    console.log(parentData);
    console.log(parentData[0]); //PageID
    console.log(parentData[1]); //Page.Name
    console.log(parentData[2]); //LanguageID
    console.log(parentData[3]); //PictureID
    console.log(parentData[4]); //Picture.FilePath
    console.log(parentData[5]); //PictureID数
    console.log(parentData[6]); //Text.FilePath


    var input_file_show = document.getElementById("showTextArea111");
    
    var iframe = document.createElement("iframe");
    iframe.width = 470;
    if(parentData[6] == undefined){
	iframe.src = "pic/notext.txt";   
    } else {
	iframe.src = parentData[6];
    }
    input_file_show.appendChild(iframe);
  
    
    // 写真は３枚まで載せるということで,下のiの値は3にしている。
    for(i = 0; i < 3; i++) {
	var checkContents = document.getElementById("picture"+i);
	console.log("picture"+i);

	//var newInput = document.createElement("input");
	//newInput.type = "radio";
	//newInput.checked = true;
	//checkContents.appendChild(newInput);

	var createImg = document.createElement("img");
	if(parentData[4][i] == undefined){
	    createImg.src ="pic/noimage.png";
	} else {
	    createImg.src = parentData[4][i];
	}
	createImg.width = 150;
	checkContents.appendChild(createImg);
    }
}


/* 　追加の時は表からの写真を表示させる必要がないので、↑の関数の下半分がいらない */
function textpic_setParams2() {
    parentData = window.dialogArguments;
    
    console.log(parentData);
    console.log(parentData[0]); //PageID
    console.log(parentData[1]); //Page.Name
    console.log(parentData[2]); //LanguageID
    console.log(parentData[3]); //PictureID
    console.log(parentData[4]); //FilePath
    console.log(parentData[5]); //PictureID数
}

function textpic_setParams3() {
    parentData = window.dialogArguments;
    
    //console.log(parentData);
    console.log(parentData[0]); //PageID
    //console.log(parentData[1]); //Page.Name
    //console.log(parentData[2]); //LanguageID
    //console.log(parentData[3]); //PictureID
    //console.log(parentData[4]); //Picture.FilePath
    //console.log(parentData[5]); //PictureID数
    //console.log(parentData[6]); //Page.nativeName
    //console.log(parentData[7]); //Page.PitureID


var AWSURL="http://54.68.143.213/CaviNet/Picture/";
//テスト中
    var checkContents = document.getElementById("picture2");

    for(i=0; i<3; i++){
        if(parentData[7][i] != null) {
            var createImg = document.createElement("img");
            createImg.src = parentData[4][i];
            createImg.width = 200;
            document.getElementById("picture"+i).appendChild(createImg);            
        } else {
            var createImg = document.createElement("img");
            createImg.src = "pic/noimage.png";
            createImg.width = 200;
            document.getElementById("picture"+i).appendChild(createImg);
        }
    }
}
/*
	//1番目の画像
	var createImg = document.createElement("img");
	createImg.src = AWSURL + parentData[0] + "_Pic000" + ".jpg";
	createImg.width = 200;
	console.log("picture"+0)
	document.getElementById("picture"+0).appendChild(createImg);

	
	//2番目の画像
	var createImg = document.createElement("img");
	createImg.src = AWSURL + parentData[0] + "_Pic001" + ".jpg";
	createImg.width = 200;
	console.log("picture"+1)
	document.getElementById("picture"+1).appendChild(createImg);

	//3番目の画像
	var createImg = document.createElement("img");
	createImg.src = AWSURL + parentData[0] + "_Pic002" + ".jpg";
	createImg.width = 200;
	console.log("picture"+2)
	document.getElementById("picture"+2).appendChild(createImg);
	}
*/
/* 【delete】案内場所(Page) ←　これをやると関連するテキストと写真も消える...よ*/
function page_setParams() {
    parentData = window.dialogArguments;

    console.log(parentData);
    console.log("PageID" + parentData[0]);
}

function page_kesu() {
    if(window.confirm('本当によろしいですか？\n選択している『案内場所』の画像・テキストが\n全て消えますよ？')){
    } else{
	return;	
    }
    
    xhr = XMLHttpRequestCreate();
    xhr.open("POST", modal_URL+"delete_page.cgi", false);

    var fdata = new FormData();
    fdata.append("PageID", parentData[0]);
    xhr.send(fdata);

    var res = new CGIResponse(xhr.response);
    res.print();

     window.close();
    
}


/* 【delete】写真 */
function picture_kesu() {
    xhr = XMLHttpRequestCreate();
    xhr.open("POST", modal_URL+"delete_picture.cgi", false);
    console.log(parentData[3]);
    
    var fdata = new FormData();
     console.log("あああ");
    fdata.append("PageID", parentData[0]);
     console.log("いいい");
    for(i = 0; i < 3; ++i) {
	console.log("ううう");
	var tr = document.getElementById("picture"+i); 
	if(tr.firstElementChild.checked) {
	    console.log("えええ");
	    fdata.append("PictureID", parentData[3][i]);
	}
    }
    xhr.send(fdata);
    var res = new CGIResponse(xhr.response);
    res.print();

   window.close();

}

function picture_kesu0() {
     if(parentData[4][0] == undefined){
	return;
    }

    xhr = XMLHttpRequestCreate();
    xhr.open("POST", modal_URL+"delete_picture.cgi", false);
    console.log(parentData[3]);
  
    var fdata = new FormData();
    fdata.append("PageID", parentData[0]);
    fdata.append("PictureID", parentData[7][0]);
    xhr.send(fdata);
    var res = new CGIResponse(xhr.response);
    res.print();
    window.close();   
}

function picture_kesu1() {
     if(parentData[4][1] == undefined){
	return;
    }

    xhr = XMLHttpRequestCreate();
    xhr.open("POST", modal_URL+"delete_picture.cgi", false);
    console.log(parentData[3]);
  
    var fdata = new FormData();
    fdata.append("PageID", parentData[0]);
    fdata.append("PictureID", parentData[7][1]);
    xhr.send(fdata);
    var res = new CGIResponse(xhr.response);
    res.print();
    window.close();   
}

function picture_kesu2() {
     if(parentData[4][2] == undefined){	 
	return 0;
    }

    xhr = XMLHttpRequestCreate();
    xhr.open("POST", modal_URL+"delete_picture.cgi", false);
    console.log(parentData[7]);
    console.log(Pathcount);
  
    var fdata = new FormData();
    fdata.append("PageID", parentData[0]);
    fdata.append("PictureID", parentData[7][2]);
    xhr.send(fdata);
    var res = new CGIResponse(xhr.response);
    res.print();
    window.close();   
}


/* ============================ 関数 ===================================== */

function getPageID() {
    var len = document.getElementById("TbodyArea").childNodes;
    console.log(len.length);
    for (var i = 0; i < len.length; ++i) {
	var tr = document.getElementById("Info(" + i + ",0)"); 
	if (tr.firstElementChild.checked) {
	    var td = document.getElementById("Info(" + i + ",7)");
	    console.log(td);
	    var id = "Pag" + td.textContent;
	    
	    return id;
	}
    }
}


function getName() {
    var len = document.getElementById("TbodyArea").childNodes;
    console.log(len.length);
    for (var i = 0; i < len.length; ++i) {
	var tr = document.getElementById("Info(" + i + ",0)"); 
	if (tr.firstElementChild.checked) {
	    var name = InfoTable[i][1];
	    console.log(name);
	    return name;
	    break;
	}
    }
}


function getvoiceName() {
    var len = document.getElementById("TbodyArea").childNodes;
    console.log(len.length);
    console.log(voiceInfoTable);
    for (var i = 0; i < len.length; ++i) {
	var tr = document.getElementById("Info(" + i + ",0)"); 
	if (tr.firstElementChild.checked) {
	    var name = voiceInfoTable[i][1];
	    console.log(name);
	    return name;
	    break;
	}
    }
}


function getlanguageName() {
    var len = document.getElementById("TbodyArea").childNodes;
    console.log(len.length);
    for (var i = 0; i < len.length; ++i) {
	var tr = document.getElementById("Info(" + i + ",0)"); 
	if (tr.firstElementChild.checked) {
	    var name = langInfoTable[i][1];
	    console.log(name);
	    return name;
	    break;
	}
    }
}




function getLanguageID(){
    var selected = document.getElementById("LanguageID")
    var id = selected.options[selected.selectedIndex].value;
    return id;
}


function getLanguageID2() {
    var len = document.getElementById("TbodyArea").childNodes;
    console.log(len.length);
    for (var i = 0; i < len.length; ++i) {
	var tr = document.getElementById("Info(" + i + ",0)"); 
	console.log(tr);
	if (tr.firstElementChild.checked) {
	    var td = document.getElementById("Info(" + i + ",1)");
	    console.log(td);
	    var id = "Lan" + td.textContent;
	    console.log(id);
	    return id;
	    break;
	}
    }
}


function getPictureID() {
    var id = [];
    var pageid = getPageID();
    //var count = InfoTable[5];
    var count = 0;
    console.log(InfoPicTable);


    for(i = 0; i < InfoPicTable.length; ++i){
	if( InfoPicTable[i][1] == pageid ) {
	    console.log(InfoPicTable[i][0]);
	    id[count] = InfoPicTable[i][0]; //PictureID
	    count++;
	}	
    }
    return id;
}

var len;
function getFilePath() {
    var FilePath = [];
    var count = 0;
    var Picture_count = [];
    var pageid = getPageID();
    //console.log("a" + pageid);
    for(i = 0; i < InfoPicTable.length; i++) {
		if(InfoPicTable[i][1] == pageid) {
		    console.log(InfoPicTable[i][0]);
		    count = InfoPicTable[i][3].substring(37,38);
		    Picture_count[count] = InfoPicTable[i][0];
		    console.log(count);
		    var Path = InfoPicTable[i][3].substring(8);
		    FilePath[count] = IPPath + Path;
		    //count++;
		}
    }
    console.log(Picture_count);
    Pathcount = Picture_count;
    return FilePath;
}

/* １枚目、２枚目、３枚目それぞれの場所を考慮したPageIDを格納したものを返す関数*/
function getFilePath2() {
    var FilePath = [];
    var count = 0;
    var Picture_count = [];
    var pageid = getPageID();
    for(i = 0; i < InfoPicTable.length; i++) {
		if(InfoPicTable[i][1] == pageid) {
		    count = InfoPicTable[i][3].substring(37,38);
		    Picture_count[count] = InfoPicTable[i][0];
		}
    }
    return Picture_count;
}


function getTextFilePath() {
    
    var FilePath2 = [];
    var count2 = 0;
    var pageid2 = getPageID();
    //console.log("a" + pageid);
    for(i = 0; i < InfoTable.length; i++) {
	if(InfoTable[i][0] == pageid2) {
	    console.log(InfoTable[i][7]);
	    if(InfoTable[i][7] == undefined) {
		var notext = "pic/notext.txt";
		return notext;
	    }
	    var Path2 = InfoTable[i][7].substring(8);
	    FilePath2[count2] = IPPath + Path2;
	    count2++;
	}
    }
    return FilePath2;
}



function getLocationID() {
	var len = document.getElementById("TbodyArea").childNodes;
	for (var i = 0; i < len.length; ++i) {
		var tr = document.getElementById("Info(" + i + ",0)"); 
		if (tr.firstElementChild.checked) {
			var td = document.getElementById("Info(" + i + ",5)");
			var id = "Loc" + td.textContent;

			return id;
		        break;
		}
	}
}


/* 表から編集・削除(edit,delete)する際チェックボタンにチェックしているか確認or警告するやつ */
function alert_check() {
    var count = 0;
    var len = document.getElementById("TbodyArea").childNodes;
    for (var i = 0; i < len.length; ++i) {
	var tr = document.getElementById("Info(" + i + ",0)");
	console.log(tr);
	if (tr.firstElementChild.checked == true) {
	    count++;
	}
    }
    if(count == 0) {
	document.getElementById("alert").innerHTML = "表にチェックを付けてください";
	return true;
    } else {
	document.getElementById("alert").innerHTML = "";
	return false;
    }
}

/* 表に追加(add)する際、チェックが付いていたらモーダルを開かなくする */
function alert_check2() {
    var count = 0;
    var len = document.getElementById("TbodyArea").childNodes;
    for (var i = 0; i < len.length; ++i) {
	var tr = document.getElementById("Info(" + i + ",0)");
	console.log(tr);
	if (tr.firstElementChild.checked == true) {
	    count++;
	}
    }
    if(count == 0) {
	document.getElementById("alert").innerHTML = "";
	return true;
    } else {
	document.getElementById("alert").innerHTML = "表にチェックを付けないでください";
	return false;
    }
}




/* 追加・編集のモーダル内で必要なフォーム入力が満たされているか確認or警告するやつ（未完成） */
function alert_modal() {
    var count = 0;
    
    var ess = new Array("page", "page2");
    for(i = 0; i < ess.length; i++) {
	var txt = document.location.ess[i].value;
	console.log(txt);
	if(txt == "") {
	    document.getElementById("location").innerHTML = "案内場所に入力してください";
	} else {
	document.getElementById("location").innerHTML = "";
	}    
    }
}


function getnativeName() {
    var len = document.getElementById("TbodyArea").childNodes;
    console.log("len" + len.length);
    for (var i = 0; i < len.length; ++i) {
	var tr = document.getElementById("Info(" + i + ",0)"); 
	if (tr.firstElementChild.checked == true) {
	    var name = InfoTable[i][9];
	    console.log("nativeName" + name);
	    return name;
	    break;
	}
    }
}    

/* 音声ページのネイティブ名を持ってくる */
function getnativeName2() {
    var len = document.getElementById("TbodyArea").childNodes;
    console.log("len" + len.length);
    for (var i = 0; i < len.length; ++i) {
	var tr = document.getElementById("Info(" + i + ",0)"); 
	if (tr.firstElementChild.checked == true) {
	    var name = voiceInfoTable[i][6];
	    console.log("nativeName" + name);
	    return name;
	    break;
	}
    }
}    
