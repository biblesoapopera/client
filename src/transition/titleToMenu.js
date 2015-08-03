$.transition.push(
  function(from, to){
    if (from[0] === '' && to[0] === 'menu' && to.length === 1){
      $.animate($.getScreen('menu'), 'bottom');
    }
  }
);
