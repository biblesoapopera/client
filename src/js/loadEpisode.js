bso.loadEpisode = function(name){

  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/' + name + '.bso', true);
  xhr.responseType = "arraybuffer";

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      var length = parseInt(bso.decodeUtf8(new DataView(this.response, 0, 16)).trim());
      var structure = JSON.parse(bso.decodeUtf8(DataView(this.response, 16, length)));
      structure.audioUrl = URL.createObjectURL(new Blob([new DataView(this.response, 16 + length)], {type: 'audio/mpeg'}));
      bso.runEpisode(structure);
    }
  };

  xhr.send();
}
