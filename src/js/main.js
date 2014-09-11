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
