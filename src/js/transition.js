bso.transition = (function(){

  var activeScreen;

  var end = function(evt){
    evt.target.removeEventListener('transitionend', end);
    evt.target.setAttribute('class', 'screen');
  }.bind(this);

  return function (newScreen, direction) {

    var activeNode;
    var newNode;

    if (activeScreen) activeNode = activeScreen.node
    else activeNode = document.querySelector('.screen.active')

    newNode = newScreen.node;

    activeNode.addEventListener('transitionend', end);

    if (activeScreen && activeScreen.exit) activeScreen.exit()
    if (newScreen.enter) newScreen.enter()

    if (direction === 'instant'){
      newNode.setAttribute('class', 'screen active');
      activeNode.setAttribute('class', 'screen');
      activeNode = newScreen;
      return;
    }

    //position slide ready for transiton
    newNode.setAttribute('class', 'screen ' + direction);

    //wait for repaint
    setTimeout(function () {
      //now apply the transitions
      var outDirection =
        direction === 'left' ?
          'right' :
          direction === 'right' ?
            'left' :
            direction === 'bottom' ?
              'top' :
              'bottom';

      activeNode.setAttribute('class', 'screen ' + outDirection);
      newNode.setAttribute('class', 'screen active');
      activeScreen = newScreen;
    }, 80);

  };
})();
