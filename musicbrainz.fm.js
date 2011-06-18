    var imageUrl=chrome.extension.getURL("audioscrobbler.png");
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
 
 
 
 function scrobble(artist,album,track,mbid)
 {
 	console.log('scrobbling %s %s %s %s',artist,album,track,mbid);
	chrome.extension.sendRequest({'artist' : artist
								 ,'album' : album
								 ,'track' : track
								 ,'mbid' : mbid}, onScrobbled);
 }
 
 function onScrobbled(result){
 	console.log('scrobbled: %s',result);
 }
