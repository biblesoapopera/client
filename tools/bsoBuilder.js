var fs = require('fs');
var path = require('path');

function build(episodePath, name, destPath){

  var slides = JSON.stringify(require(path.join(episodePath, 'slides')));

  fs.readFile(path.join(episodePath, 'audio.mp3'), function(err, audioBuffer){
    if (err) console.log(err);

    var slidesBuffer = new Buffer(slides);

    var length = slidesBuffer.length + '';
    while (length.length < 16) length = ' ' + length;

    var lengthBuffer = new Buffer(16);
    lengthBuffer.write(length);

    fs.writeFile(path.join(destPath, name + '.bso'), Buffer.concat([lengthBuffer, slidesBuffer, audioBuffer]), function(err){
      if (err) console.log(err);
      console.log('bso done');
    })
  })
}

function bso(destPath){
	var dataPath = path.join(__dirname,'..', 'data');

	fs.readdir(dataPath, function(err, files){
	  if (err) console.log(err);

	  files.forEach(function(file){
		var episodePath = path.join(dataPath, file);
		fs.stat(episodePath, function(err, stats){
		  if (err) console.log(err);

		  if (stats.isDirectory()){
			build(episodePath, dir, destPath);
		  }
		})
	  })
	})
}

module.exports = bso;



