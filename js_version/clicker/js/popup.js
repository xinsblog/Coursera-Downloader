$(document).ready(function(){
	
	$('#videos').click(function(){
		console.log('videos');
		chrome.tabs.executeScript(null,
							{file: "js/jquery-1.10.2.min.js"});
		chrome.tabs.executeScript(null,
                           {file: "js/videos.js"});
	});
	
	$('#slides').click(function(){
		console.log('slides');
		chrome.tabs.executeScript(null,
							{file: "js/jquery-1.10.2.min.js"});
		chrome.tabs.executeScript(null,
                           {file: "js/slides.js"});
	});
	
	$('#subtitles').click(function(){
		console.log('subtitles');
		chrome.tabs.executeScript(null,
							{file: "js/jquery-1.10.2.min.js"});
		chrome.tabs.executeScript(null,
                           {file: "js/subtitles.js"});
	});
	
});