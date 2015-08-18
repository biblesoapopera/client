$.load = function(id, cb){
  setTimeout(function(){
    cb({
      slides: [
        {
          type: 'html',
          content: '<p>Episode Loaded</p>'
        }
      ]
    })
  },0)
}

$();

location.hash = 'episode/1/0';

