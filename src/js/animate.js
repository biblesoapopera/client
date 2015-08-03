$.animate = (function(){

  var activeScreen = $.getScreen('title');
  var pending = [];
  var animating;

  var end = function(evt){
    evt.target.removeEventListener('transitionend', end);
    evt.target.classList.remove('active', 'left', 'right', 'top', 'bottom');
    next();
  }

  var next = function(){
    if (pending.length) {
      var args = pending.pop();
      doAnimation(args[0], args[1]);
    } else {
      animating = false;
    }
  }

  var doAnimation = function(newScreen, direction){
    animating = true;
    var activeNode = activeScreen.node;
    var newNode = newScreen.node;

    if (activeNode === newNode) return;
    if (activeScreen && activeScreen.exit) activeScreen.exit()
    if (newScreen.enter) newScreen.enter()

    if (direction === 'instant'){
      newNode.classList.add('active');
      activeNode.classList.remove('active');
      activeScreen = newScreen;
      next();
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
  }

  return function (newScreen, direction) {

    if (animating) {
      pending.unshift([newScreen, direction]);
      return;
    }

    doAnimation(newScreen,direction);
  };
})();
