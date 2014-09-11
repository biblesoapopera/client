var fs = require('fs');

function build(path, name){

  var structure = JSON.stringify(require(path + 'structure'));

  fs.readFile(path + 'audio.mp3', function(err, audioBuffer){
    if (err) console.log(err);

    //prepend some bytes

    var structureBuffer = new Buffer(structure);

    var length = structureBuffer.length + '';
    while (length.length < 16) length = ' ' + length;

    var lengthBuffer = new Buffer(16);
    lengthBuffer.write(length);

    fs.writeFile(__dirname + '/../' + name + '.bso', Buffer.concat([lengthBuffer, structureBuffer, audioBuffer]), function(err){
      if (err) console.log(err);
      console.log('done');
    })
  })
}

var path = __dirname + '/../data';

fs.readdir(__dirname + '/../data', function(err, files){
  if (err) console.log(err);

  files.forEach(function(file){
    fs.stat(path + '/' + file, function(err, stats){
      if (err) console.log(err);

      if (stats.isDirectory()){
        build(path + '/' + file + '/', file);
      }
    })
  })
})

