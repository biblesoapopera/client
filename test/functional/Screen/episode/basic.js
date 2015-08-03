bso.load = function(id, cb){
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

bso.go('episode/1');

