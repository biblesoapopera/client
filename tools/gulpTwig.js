var Transform = require('stream').Transform;
var Twig = require('twig');
var path = require('path');
var util = require('util');
var File = require('vinyl');

Twig.cache(false);
var twig = Twig.twig;

util.inherits(GulpTwig, Transform);

function GulpTwig() {
    if (!(this instanceof GulpTwig)) return new GulpTwig();
    Transform.call(this, {objectMode: true});
}

GulpTwig.prototype._transform = function (file, encoding, done) {

    var template = twig({path: file.path, async: false});
    var pageName = path.basename(file.path).replace('.twig', '');
    file.contents = new Buffer(template.render());
    file.path = file.path.replace(path.basename(file.path), pageName + '.html');

    this.push(file);

    done();
};

module.exports = function () {
    return new GulpTwig()
}
