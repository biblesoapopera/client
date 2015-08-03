$.transition.push(
  function(from, to){
    if (from[0] === 'menu' && to[0] === 'menu' && from.length ===2 && to[1] === from[1]){

      var menu = $.getScreen('menu');
      $.animate(menu, 'instant');
      menu.show(to[1], 0, false);
    }
  }
);
