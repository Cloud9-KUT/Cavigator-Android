
function getPageID() {
    var len = document.getElementById("TbodyArea").childNodes;
    for (var i = 0; i < len.length; ++i) {
	var tr = document.getElementById("Info(" + i + ",0)"); 
	if (tr.firstElementChild.checked) {
	    var td = document.getElementById("Info(" + i + ",7)");
	    var id = "Tes" + td.textContent;
	    
	    return id;
	}
    }
}

function getPictureID() {
    var pageid = getPageID();
    for(i = 0; i < InfoPicTable.length; ++i){
	if( InfoPicTable[i][1] == pageid ) {
	    var id = InfoPicTable[i][0]; //PictureID
	    return id;
	}	
    }
}

