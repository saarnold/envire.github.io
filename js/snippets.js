/**
 *
 *
 * <script src="js/jquery-1.12.3.min.js"></script>
 *
 *
 * <link rel="stylesheet" href="/css/default.min.css">
 * <script src="/js/highlight.min.js"></script>
 *
 *
 * <body onload='init_snippets()'>
 * <pre><code data-snippetId="first" data-file="http://localhost:9292/asguard/test.cpp">test</code></pre>
 *
 */




 function escapeHtml(unsafe) {
     return unsafe
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
  }



function get(url){
	var loader = $.get( url, function() {
		//console.log( "success" );
		})
		.done(function() {
			//console.log( "done" );
		})
		.fail(function(err) {
			alert("error reading: " + url + err);
		})
		.always(function() {
		//console.log( "complete" );
		});
	return loader;
}

function load(url,callback){
	//console.log( "loadTasks" );
	var loader = get(url);
	loader.done(function(data){
		callback(data);
	});
};

function loadto(url,snippetId,target,callback){
	var x;
	load(url,function(file){
		//var target = document.getElementById("text");
		//console.log("-----------------------");
		//console.log("id " + snippetId);
		var starttag = '#snippet_begin:'+snippetId;
		var stoptag = '#snippet_end:'+snippetId;
		//console.log("starttag " + starttag);
		//console.log("stoptag " + stoptag);
		var start = file.indexOf(starttag);
		var stop = file.indexOf(stoptag);
		//console.log("start " + start);
		//console.log("stop " + stop);
    if (target.innerHTML != "")
    {
        return;
    }
		if (start == -1){
			target.innerHTML = "could not find snippet start tag " + starttag + "<br>in " + url;
			return;
		}
		if (stop == -1){
			target.innerHTML = "could not find snippet tag " + stoptag + "<br>in " + url;
			return;
		}

		var snippet = file.substring(start,stop);

		//remove potential \r
		//snippet = snippet.replace(/(\r)/gm,"");
		var lines = snippet.split("\n");

		//remove tag lines
		snippet = lines.slice(1,-1);
		snippet = snippet.join("\n");
		//console.log(snippet);
		//extract code
		target.innerHTML = escapeHtml(snippet);
		callback(target);
	});

}

function init_snippets(){
	$("pre code").each(function(key, value){
		var file = value.getAttribute("data-file");
		var id = value.getAttribute("data-snippetId");
		loadto(file,id,value,function(target){
			hljs.highlightBlock(target);
		});
	})
}
