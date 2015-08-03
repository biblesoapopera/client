$.transition.push(
  function(from, to){
    if (from[0] === 'menu' && from.length === 2 && to[0] === 'episode' ){
      $.getEpisode(to[1]).show(to[2], true);
    }
  }
);
