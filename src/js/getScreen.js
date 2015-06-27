bso.getScreen = (function(){

  var cache = {};

  return function(id, type, config){
    if (!cache[id]){
      var screen = new bso.Screen[type](config);
      document.body.appendChild(screen.node);
      cache[id] = screen;
    }
    return cache[id];
  };
})();
