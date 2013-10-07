var links = $('a');
var i = 0;
var count = 0;
var promptFlag = true;

var extractFunc = function() {

};

var mapFunc = function() {

};

var downloadFunc = function() {

};

var clickFunc = function() {
	
	if ( promptFlag == true) {
		var lectureInfo = 'line\nline\nline\nline\nline\nline\nline\nline\nline\nline\nline\nline\nline\nline\nline\nline\n\n';
		var inputInfo = '输入起止编号, 以"-"分隔, 如1-13';
		var hintMessage = lectureInfo + inputInfo;
		var downloadNo = prompt(hintMessage,'1-13');
		console.log(downloadNo);
		promptFlag = false;
	}
	
	for( ; i<links.length; i++) {
		var url = $(links[i]).attr('href');
		url = url+'';
		if(url.indexOf('mp4')>0 && count<1){
			window.open(url);
			console.log(url);
			count++;
			setTimeout('clickFunc()', 2000);
			i++;
			return;
		}	
	}
}
clickFunc();
