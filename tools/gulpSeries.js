var Transform = require('stream').Transform;
var path = require('path');
var util = require('util');
var fs = require('fs');

util.inherits(GulpSeries, Transform);

function GulpSeries() {
  if (!(this instanceof GulpSeries)) return new GulpSeries();
  Transform.call(this, {objectMode: true});
  this.episodes = [];
}

GulpSeries.prototype._transform = function (file, encoding, done) {

  this.episodes.push({
    path: file.path,
    contents: JSON.parse(file.contents.toString())
  });

  done();
};

GulpSeries.prototype._flush = function(done){

  var series = '$.series = [';
  for (var i=0; i<this.episodes.length; i++){
    series += '{title: "' + this.episodes[i].contents.title + '",';
    series += 'subtitle: "' + this.episodes[i].contents.subtitle + '",';
    series += 'summary: "' + this.episodes[i].contents.summary + '"},';
  }
  series = series.slice(0,-1) + '];';

  fs.writeFile(process.cwd() + '/temp/series.js', new Buffer(series), done);
}

module.exports = function () {
  return new GulpSeries()
}
