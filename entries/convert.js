var jade = require('jade');
var fs = require('fs');
//
__dirname = '/home/jw/Repos/klein/'
//

var static = fs.readdirSync('../static').filter( function(f){return f.match(/jade/)} );
var snips =	new Map();
static.forEach(function(f){
				snips.set( f.split('.')[0], fs.readFileSync('../static/'+f,'utf8'));
});

// writing index file
fs.readFile('../index.jade',function(err,doc){
	var output = jade.render(doc,{filename:__dirname+'layout.jade'});
	fs.writeFile('../index.html',output);
});

// writing static files
console.log("Converting the following files:");
snips.forEach(function(c,k){ 
				console.log(k+"\n");
				var output = jade.render(c,{filename:__dirname+'layout.jade'})
				fs.writeFile('../static/'+k+'.html',output);
});


