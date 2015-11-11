var IPPath = "http://54.68.143.213";
//var IPPath = "http://192.168.11.51";
function previewText(n){
return function(){
	var FilePath = InfoTable[n][7].substring(8);

	var sendArguments = [];
	sendArguments[0] = 0;
	sendArguments[1] =  "「" + InfoTable[n][2] + "」番目の「"+ InfoTable[n][1] +"」についてのテキスト";
	sendArguments[2] =  IPPath + FilePath;
	/*モーダルダイアログを開く*/ 
	showModalDialog("preview.html",sendArguments,"dialogWidth=600px; dialogHeight=800px;");
}
}

function previewPic(n){
return function(){
	var PageID = InfoTable[n][0];

	var sendArguments = [];
	sendArguments[0] = 1;
	sendArguments[1] = "「" + InfoTable[n][2] + "」番目の「"+ InfoTable[n][1] +"」についての写真";
	

	var count = 1;
	for(i=0; i<InfoPicTable.length; i++){
		if(InfoPicTable[i][1] == PageID){
			count = count + 1;
			var FilePath = InfoPicTable[i][3].substring(8);
			sendArguments[count] = IPPath + FilePath;
		}
	}

	showModalDialog("preview.html",sendArguments,"dialogWidth=600px; dialogHeight=800px;");
}
}

function previewVoice(n){
return function(){
	var FilePath = voiceInfoTable[n][5].substring(8);
	var sendArguments = [];
	sendArguments[0] = 2;
	sendArguments[1] = "「" + voiceInfoTable[n][2] + "」番目の「"+ voiceInfoTable[n][1] +"」についての音声";
	sendArguments[2] =  IPPath + FilePath;

	showModalDialog("preview.html",sendArguments,"dialogWidth=600px; dialogHeight=800px;");
}
}

