var Transform = require('stream').Transform;
var path = require('path');
var util = require('util');
var File = require('vinyl');
var twig = "{% extends '../../../../../src/twig/include/skeleton.twig' %}"+
  "{% block title %}Functional Test{% endblock %}"+
  "{% block execute %}"+
  "TEST_JS"+
  "{% endblock %}";

util.inherits(GulpFunctionalTestWriter, Transform);

function GulpFunctionalTestWriter() {
    if (!(this instanceof GulpFunctionalTestWriter)) return new GulpFunctionalTestWriter();
    Transform.call(this, {objectMode: true});
}

GulpFunctionalTestWriter.prototype._transform = function (file, encoding, done) {

    var pageName = path.basename(file.path).replace('.js', '');
    file.path = file.path.replace(path.basename(file.path), pageName + '.twig');
    file.contents = new Buffer(twig.replace('TEST_JS', file.contents.toString()));

    this.push(file);

    done();
};

module.exports = function () {
    return new GulpFunctionalTestWriter()
}
