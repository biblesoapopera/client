bso.go = (function(){
  var currentRoute = location.hash.slice(1);

  return function(route){

    var pieces = route.split('-');

    if (pieces.length === 1){
      var dir =
        route == currentRoute ? 'instant' :
        !currentRoute ? 'instant' :
        route == 'menu' && currentRoute == 'title' ? 'bottom' :
        'instant';
      bso.transition(bso.getScreen(route), dir);
    } else if (pieces[0] === 'episode' && pieces.length === 2){
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
