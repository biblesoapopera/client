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
