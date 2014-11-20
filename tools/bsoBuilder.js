var fs = require('fs');
var path = require('path');

function build(episodePath, name, destPath){

  fs.readFile(path.join(episodePath, 'slides.json'), function(err, slidesBuffer){
    if (err) console.log(err);
    
    fs.readFile(path.join(episodePath, 'audio.mp3'), function(err, audioBuffer){
      if (err) console.log(err);

      var length = slidesBuffer.length + '';
      while (length.length < 16) length = ' ' + length;

      var lengthBuffer = new Buffer(16);
      lengthBuffer.write(length);

      fs.writeFile(path.join(destPath, name + '.bso'), Buffer.concat([lengthBuffer, slidesBuffer, audioBuffer]), function(err){
        if (err) console.log(err);
      })
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
                    build(episodePath, file, destPath);
              }
            })
      })
    })
}

module.exports = bso;



