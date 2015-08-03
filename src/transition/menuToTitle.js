$.transition.push(
  function(from, to){
    if (from[0] === 'menu' && from.length === 1 && to[0] === ''){
      $.animate($.getScreen('title'), 'top');
    }
  }
);
