$.load = function(id, cb){
  setTimeout(function(){
    cb({
      slides: [
        {
          type: 'audio',
          text: "Let's ROCK!", //jshint ignore:line
          start: 10,
          end: 20
        },
        {
          type: 'html',
          content: 'Placeholder'
        }
      ]
    })
  },0)
}

$.player('resource');

$();

location.hash = 'episode/1/0';
