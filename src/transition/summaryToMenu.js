$.transition.push(
  function(from, to){
    if (from[0] === 'menu' && from.length === 2 && to[0] === 'menu' && to.length === 1){
      $.getScreen('menu').enter();
    }
  }
);
