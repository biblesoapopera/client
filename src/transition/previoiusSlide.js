$.transition.push(
  function(from, to){
    if (from[0] === 'episode' && to[0] === 'episode' && parseInt(to[2]) < parseInt(from[2])){
      $.getEpisode(to[1]).previous();
    }
  }
);
