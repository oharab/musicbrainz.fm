jQuery.fn.log = function (msg) {
      console.log("%s: %o", msg, this);
      return this;
  };

$(document).ready(function() {
	
    var imageUrl=chrome.extension.getURL("audioscrobbler.png");
	console.log('Sorting out images...');
	var artist=$('a[rel="foaf:maker"]').text();
	console.log('artist=' + artist);
	var album=$('a[rel="foaf:isPrimaryTopicOf"]').text();
	console.log('album=' + album);
   $('td > span[property="dct:title rdfs:label"]').prepend(
   		$('<img />')
			.attr('src',imageUrl)
			.attr('title','Scrobble')
			.addClass('scrobblebutton')
			.click(function(){
				var trackEl=$(this).parent().next();
		   		var track,mbid;
				track=trackEl.text();
				mbid=trackEl.attr("href").substring(33,99);
				scrobble(artist,album,track,mbid);
		   })
   );
 });
 
 
 
 function scrobble(artist,album,track,mbid)
 {
 	console.log('scrobbling %s %s %s %s',artist,album,track,mbid);
	console.log('md5: %s',hex_md5(artist));
	chrome.extension.sendRequest({'action' : 'scrobbleTrack',
								 	'artist':artist,
									'album':album,
									'track':track,
									'mbid':mbid
	},function(result){
		
		if(!result.success)
			return;
	});
 }
 
 
