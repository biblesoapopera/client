$.load = function(id, cb){
  setTimeout(function(){
    cb({
      title: 'Functional test',
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

