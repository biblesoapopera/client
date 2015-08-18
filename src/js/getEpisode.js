$.getEpisode = (function(){

  var cache = {};

  return function(id){
    if (!cache[id]) cache[id] = new $.episode(id)
    return cache[id];
  };
})();
