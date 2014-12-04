var Transform = require('stream').Transform;
var path = require('path');
var util = require('util');
var File = require('vinyl');

util.inherits(GulpBase64, Transform);

function GulpBase64() {
    if (!(this instanceof GulpBase64)) return new GulpBase64();
    Transform.call(this, {objectMode: true});
}

GulpBase64.prototype._transform = function (file, encoding, done) {

    var pageName = path.basename(file.path).replace('.png', '');
    file.path = file.path.replace(path.basename(file.path), pageName + '.base64');    
    file.contents = new Buffer(file.contents.toString('base64'), 'utf8');

    this.push(file);

    done();
};

module.exports = function () {
    return new GulpBase64()
}
