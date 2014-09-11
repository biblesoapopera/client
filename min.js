bso.decodeUtf8 = function(data) {
  var result = "";
  var i = 0;
  var c = 0;
  var c1 = 0;
  var c2 = 0;

  // If we have a BOM skip it
  if (data.byteLength >= 3 && data.getUint8(0) === 0xef && data.getUint8(1) === 0xbb && data.getUint8(2) === 0xbf) {
    i = 3;
  }

  while (i < data.byteLength) {
    c = data.getUint8(i);

    if (c < 128) {
      result += String.fromCharCode(c);
      i++;
    } else if (c > 191 && c < 224) {
      if( i+1 >= data.byteLength ) {
        throw "UTF-8 Decode failed. Two byte character was truncated.";
      }
      c2 = data.getUint8(i+1);
      result += String.fromCharCode( ((c&31)<<6) | (c2&63) );
      i += 2;
    } else {
      if (i+2 >= data.byteLength) {
        throw "UTF-8 Decode failed. Multi byte character was truncated.";
      }
      c2 = data.getUint8(i+1);
      c3 = data.getUint8(i+2);
      result += String.fromCharCode( ((c&15)<<12) | ((c2&63)<<6) | (c3&63) );
      i += 3;
    }
  }
  return result;
}

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

//var activeScreenId = 'three';
//
//function transition(newScreenId, direction){
//
//  var activeScreen = document.getElementById(activeScreenId);
//  var newScreen = document.getElementById(newScreenId);
//
//  activeScreen.addEventListener('transitionend', transitionend);
//
//  //position screen ready for transiton
//  newScreen.setAttribute('class', 'screen ' + direction);
//
//  //wait for repaint
//  setTimeout(function(){
//    //now apply the transitions
//    var outDirection = direction == 'left' ? 'right' : direction == 'right' ? 'left' : direction == 'up' ? 'down' : 'up';
//
//    activeScreen.setAttribute('class', 'screen ' + outDirection);
//    newScreen.setAttribute('class', 'screen active');
//  }, 10);
//}
//
//function transitionend(evt){
//  evt.target.removeEventListener('transitionend', transitionend);
//  evt.target.setAttribute('class', 'screen');
//}
//
//document.getElementById('down').addEventListener('click', function(evt){
//  transition('two', 'up');
//})
//
//function playAudio(url){
//  var player = new Audio();
//  player.src = url;
//  player.play();
//}
//
//function loadEpisode(){
//
//  var xhr = new XMLHttpRequest();
//  xhr.open("GET", "/sample.bso", true);
//  xhr.responseType = "arraybuffer";
//
//  xhr.onreadystatechange = function() {
//    if (this.readyState == 4 && this.status == 200) {
//
//      var ab1 = new DataView(this.response, 0, 16);
//      var length = parseInt(decodeUtf8(ab1).trim());
//      var ab2 = new DataView(this.response, 16, length);
//      var structure = decodeUtf8(ab2);
//
//      console.log(structure);
//
//      var ab3 = new DataView(this.response, 16 + length);
//      var blob = new Blob([ab3], {type: 'audio/mpeg'});
//      var url = URL.createObjectURL(blob);
//      playAudio(url);
//    }
//  };
//
//  xhr.send();
//}
//
//loadEpisode();

bso.runEpisode = function(structure){
  console.log(structure);
  
  //create top nav
  structure.groups.forEach(function(group){
      
  })
}

bso.start = function(){
  bso.loadEpisode('ep1');
}

var activeScreenId = 'three';

bso.screenTransition = function(newScreenId, direction){

  var activeScreen = document.getElementById(activeScreenId);
  var newScreen = document.getElementById(newScreenId);

  activeScreen.addEventListener('transitionend', transitionend);

  //position screen ready for transiton
  newScreen.setAttribute('class', 'screen ' + direction);

  //wait for repaint
  setTimeout(function(){
    //now apply the transitions
    var outDirection = direction == 'left' ? 'right' : direction == 'right' ? 'left' : direction == 'up' ? 'down' : 'up';

    activeScreen.setAttribute('class', 'screen ' + outDirection);
    newScreen.setAttribute('class', 'screen active');
  }, 10);
}

function transitionend(evt){
  evt.target.removeEventListener('transitionend', transitionend);
  evt.target.setAttribute('class', 'screen');
}
