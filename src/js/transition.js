bso.transition = (function(){

  var activeScreen = bso.getScreen('title');

  var end = function(evt){
    evt.target.removeEventListener('transitionend', end);
    evt.target.classList.remove('active', 'left', 'right', 'top', 'bottom');
  }

  return function (newScreen, direction) {

    var activeNode = activeScreen.node;
    var newNode = newScreen.node;

    if (activeScreen && activeScreen.exit) activeScreen.exit()
    if (newScreen.enter) newScreen.enter()

    if (direction === 'instant'){
      newNode.classList.add('active');
      activeNode.classList.remove('active');
      activeNode = newScreen;
      return;
    }

    //position slide ready for transiton
    newNode.classList.add(direction);

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

      activeNode.addEventListener('transitionend', end);

      activeNode.classList.remove('active');
      activeNode.classList.add(outDirection);
      newNode.classList.add('active');
      newNode.classList.remove(direction);
      activeScreen = newScreen;
    }, 80);

  };
})();
