var fs = require('fs');
var path = require('path');

function build(episodePath, name, destPath, cb) {

    fs.readFile(path.join(episodePath, 'slides.json'), function (err, slidesBuffer) {
        if (err)
            console.log(err);

        fs.readFile(path.join(episodePath, 'audio.mp3'), function (err, audioBuffer) {
            if (err) {cb(err); return;}

            var length = slidesBuffer.length + '';
            while (length.length < 16)
                length = ' ' + length;

            var lengthBuffer = new Buffer(16);
            lengthBuffer.write(length);

            if (!fs.existsSync(destPath)){
                fs.mkdirSync(destPath);
            }
            
            fs.writeFile(path.join(destPath, name + '.bso'), Buffer.concat([lengthBuffer, slidesBuffer, audioBuffer]), function (err) {
                if (err) cb(err);
                else cb();
            })
        })

    })
}

function bso(destPath, cb) {
    var dataPath = path.join(__dirname, '..', 'data');
    var count = 0;
    var add = function(){count++};
    var remove = function(err){
        if (err) {cb(err); return;}
        count--;       
        if (count===0) cb()
    }
    
    fs.readdir(dataPath, function (err, files) {
        if (err) {cb(err); return;}

        files.forEach(function (file) {
            var episodePath = path.join(dataPath, file);
            fs.stat(episodePath, function (err, stats) {
                if (err) {cb(err); return;}

                if (stats.isDirectory()) {                    
                    add();
                    build(episodePath, file, destPath, remove);
                }
            })
        })        
    })
}

module.exports = bso;



