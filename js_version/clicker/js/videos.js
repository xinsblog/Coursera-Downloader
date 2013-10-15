var j = 0;
var downloadLinks = new Array();

var extractFunc = function() {
	
	var titles = $('.course-item-list-header h3');
	console.log(titles);
	var titleStr = '';
	for(var i=0; i<titles.length; i++) {
		var title = $(titles[i]).text();
		console.log(title);
		var no = i + 1;
		titleStr += no + title + '\n';
	}
	return titleStr;
};

var mapFunc = function(downloadNo) {
	
	var sections = $('.course-item-list-section-list');
	var countArr = new Array();
	var acc = 0;
	for(var i=0; i<sections.length; i++) {
		var items = $(sections[i]).children('li');
		acc += items.length;
		console.log(acc);
		countArr.push(acc);
	}
	console.log(countArr);
	
	var limits = downloadNo.split('-');
	var first = parseInt(limits[0]);
	var last = parseInt(limits[1]);
	
	var firstCount = 0;
	if( first == 1) 
		firstCount = 1;
	else 
		firstCount = countArr[first-2]+1;
	var lastCount = countArr[last-1];
	console.log(firstCount);
	console.log(lastCount);
	
	var links = $('a');
	var mapLinks = new Array();
	var count = 0;
	for( var i=0; i<links.length; i++) {
		var url = $(links[i]).attr('href') + '';
		var flag = false;
		if( url.indexOf('mp4')>0 ) {
			count++;
			flag = true;
		}
		if( count >= firstCount && flag) {
			mapLinks.push(url);
		}
		if( count > lastCount) {
			break;
		}
	}
	
	console.log(mapLinks);
	return mapLinks;
};

var downloadFunc = function() {
	
	for( ; j<downloadLinks.length; ) {
		var url = downloadLinks[j];
		window.open(url);
		setTimeout('downloadFunc()', 1000);
		j++;
		return;
		
	}

};

var clickFunc = function() {

	var lectureInfo = extractFunc();
	
	var inputInfo = '输入起止编号, 以"-"分隔, 如1-10';
	var hintMessage = lectureInfo + '\n' + inputInfo;
	var downloadNo = prompt(hintMessage,'1-10');
	console.log(downloadNo);
	
	downloadLinks = mapFunc(downloadNo);
	
	downloadFunc();

}
clickFunc();
