$.transition.push(
  function(from, to){
    if (from[0] === 'episode' && to[0] === 'menu' && to.length === 2){
      var menu = $.getScreen('menu');
      $.animate(menu, 'top');
      $.getEpisode(from[1]).hide();
      menu.show(to[1], from[2], 'instant');
    }
  }
);
