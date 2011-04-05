$(document).ready(function() {
	var imageUrl=chrome.extension.getURL("audioscrobbler.png");
   $('.track .title').append($('<img />').attr('src',imageUrl).attr('title','scrobble').click(function(){
   	alert('wow')
   }));
 });