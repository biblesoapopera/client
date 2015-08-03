$.transition.push(
  function(from, to){
    if (from[0] === 'menu' && from.length === 1 && to[0] === 'menu' && to.length === 1){
      $.animate($.getScreen('menu'), 'instant');
    }
  }
);
