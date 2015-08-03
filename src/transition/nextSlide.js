$.transition.push(
  function(from, to){
    if (from[0] === 'episode' && to[0] === 'episode' && to[2] > from[2]){
      $.getEpisode(to[1]).next();
    }
  }
);
