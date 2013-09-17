$(document).ready(function(){
	
	$('#stop').click(function(){
		console.log('stop');
		chrome.tabs.executeScript(null,
							{file: "js/jquery-1.10.2.min.js"});
		chrome.tabs.executeScript(null,
							{file:"js/stop.js"});
	});
	
	$('#extract').click(function(){
		console.log('extract');
		chrome.tabs.executeScript(null,
							{file: "js/jquery-1.10.2.min.js"});
		chrome.tabs.executeScript(null,
							{file:"js/extract.js"});
	});
	
});
