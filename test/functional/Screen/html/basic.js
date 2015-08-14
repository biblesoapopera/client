$.load = function(id, cb){
  setTimeout(function(){
    cb({
      title: 'Functional test',
      slides: [
        {
          type: 'html',
          content: '<p>HTML slide 1</p>'
        },
        {
          type: 'html',
          content: '<p>HTML slide 2</p>'
        }
      ]
    })
  },0)
}

$();

location.hash = 'episode/1/0';
