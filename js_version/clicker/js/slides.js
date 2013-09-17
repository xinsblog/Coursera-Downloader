var links = $('a');
var i = 0;
var count = 0;
var clickFunc = function() {
	for( ; i<links.length; i++) {
		var url = $(links[i]).attr('href');
		url = url+'';
		if(url.indexOf('pdf')>0 || url.indexOf('ppt')>0){
			window.open(url);
			console.log(url);
			count++;
			setTimeout('clickFunc()', 1000);
			i++;
			return;
		}	
	}
}
clickFunc();