bso.getScreen = (function(){

  var cache = {};

  return function(id){
    if (!cache[id]){
      var screen;
      if (id === 'title'){
        screen = {
          node: document.querySelector('.screen.Title')
        }
      } else if (/episode\/\d/.test(id)){
        screen = new bso.Screen.Episode(id.split('/')[1]);
        document.body.appendChild(screen.node);
      } else {
        screen = new bso.Screen[id[0].toUpperCase() + id.slice(1)]();
        document.body.appendChild(screen.node);
      }
      cache[id] = screen;
    }
    return cache[id];
  };
})();
