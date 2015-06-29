bso.getScreen = (function(){

  var cache = {};

  return function(id, config){
    if (!cache[id]){
      var screen = new bso.Screen[id[0].toUpperCase() + id.slice(1)](config);
      document.body.appendChild(screen.node);
      cache[id] = screen;
    }
    return cache[id];
  };
})();
