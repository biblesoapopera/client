bso.loadEpisode = function(name){

  document.querySelector('.spinner').setAttribute('class', 'spinner');
  
  var episodeData;
  var partialAudio;
  var audioUrl;
  
  function loadEpisodeData(cb){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', name + '.bso', true);
    xhr.setRequestHeader('Range', 'bytes=0-20000');  
    xhr.responseType = "arraybuffer";

    xhr.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 206) {

        var jsonLength = parseInt(bso.decodeUtf8(new DataView(this.response, 0, 16)).trim());
        episodeData = JSON.parse(bso.decodeUtf8(new DataView(this.response, 16, jsonLength)));
        partialAudio = new DataView(this.response, 16 + length);
        
        cb();
      }
    };

    xhr.send();      
  }
  
  function loadAudio(cb){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', name + '.bso', true);
    xhr.setRequestHeader('Range', 'bytes=20001-');  
    xhr.responseType = "arraybuffer";

    xhr.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 206) {        
        audioUrl = URL.createObjectURL(new Blob([partialAudio, this.response], {type: 'audio/mpeg'}));
        cb()
      }
    };

    xhr.send();      
  }
  
  loadEpisodeData(function(){     
      episodeData.audioUrl = {
          resolve: function(result){
            if (this._callbacks){
                for(var i=0; i < this._callbacks.length; i++){
                    this._callbacks[i](result);
                }
            }
          },
          then: function(cb){
              if (!this._callbacks) this._callbacks = [];
              this._callbacks.push(cb);
          }
      }      
      
      bso.runEpisode(episodeData); 

      loadAudio(function(){
          episodeData.audioUrl.resolve(audioUrl);
          episodeData.audioUrl = audioUrl;          
      })          
  })   
}
