bso.go = (function(){
  var currentRoute = location.hash.slice(1);

  return function(route){

    var pieces = route.split('/');

    if (pieces.length === 1 && pieces[0] === 'menu' && /menu\/\d/.test(currentRoute)){
      var menu = bso.getScreen('menu');
      menu.enter();
    } else if (pieces.length === 1){
      var dir =
        route === currentRoute ? 'instant' :
        route === 'menu' && currentRoute === '' ? 'bottom' :
        route === '' && currentRoute === 'menu' ? 'top' :
        'instant';
      bso.transition(bso.getScreen(route || 'title'), dir);
    } else if (pieces[0] === 'menu' && pieces.length === 2){
      var menu = bso.getScreen('menu');
      if (currentRoute != 'menu') bso.transition(menu, 'instant');
      menu.show(pieces[1]);
    }

    currentRoute = route;
  }
})();

window.onhashchange = function(){
  bso.go(location.hash.slice(1))
};
