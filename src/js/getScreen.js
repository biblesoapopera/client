$.getScreen = (function(){

  var cache = {};

  return function(id){

    if (!cache[id]){
      var screen;
      if (id === 'title'){
        screen = {
          node: document.querySelector('.screen.title')
        }
      } else if (/episode\/\d\/\d+/.test(id)){
        var parts = id.split('/');
        screen = $.getEpisode(parts[1], parts[2]).getSlide(parts[2]);
        if (screen) document.body.appendChild(screen.node);
      } else {
        screen = new $.screen[id]();
        document.body.appendChild(screen.node);
      }
      cache[id] = screen;
    }
    return cache[id];
  };
})();
