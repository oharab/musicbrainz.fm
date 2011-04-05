$(document).ready(function() {
	var imageUrl=chrome.extension.getURL("audioscrobbler.png");
   $('.track .title').prepend(
   		$('<img />')
			.attr('src',imageUrl)
			.attr('title','Scrobble')
			.addClass('scrobblebutton')
			.click(function(){
				var trackEl=$(this).next();
		   		var track,artist,mbid;
				track=trackEl.text();
				artist=$('.artisttitle tr td.title a[title="Go to the artist page"]').text();
				mbid=trackEl.attr("href").substring(7,43);
				scrobble(track,artist,mbid);
		   })
   );
 });
 
 
 function scrobble(track, artist, mbid)
 {
	chrome.extension.sendRequest({'action' : 'scrobbleTrack',
								 	'artist':artist,
									'track':track,
									'mbid':mbid
	},function(result){
		
		if(!result.success)
			return;
	});
 }
 
 
