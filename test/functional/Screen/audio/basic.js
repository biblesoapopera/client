$.load = function(id, cb){
  setTimeout(function(){
    cb({
      slides: [
        {
          type: 'audio',
          text: "Let's ROCK!",
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

/*
var slides = {
  title: 'Functional test',
  slides: [
    {
      type: 'audio',
      text: 'Let’s ROCK!',
      start: 10,
      end: 20
    },
    {
      type: 'html',
      content: 'Placeholder'
    }
  ]
};

bso.player('resource');
bso.run(slides);*/
