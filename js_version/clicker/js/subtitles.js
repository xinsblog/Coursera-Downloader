var links = $('a');
var i = 0;
var count = 0;
var clickFunc = function() {
	for( ; i<links.length; i++) {
		var url = $(links[i]).attr('href');
		url = url+'';
		if(url.indexOf('subtitles')>0){
			window.open(url);
			console.log(url);
			count++;
			i++;
			setTimeout('clickFunc()', 2000);
			return;
		}	
	}
}
clickFunc();
