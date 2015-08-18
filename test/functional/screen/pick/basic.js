$.load = function(id, cb){
  setTimeout(function(){
    cb({
      slides: [
        {
          type: 'pick',
          question: 'How many legs does a dog have?',
          answers: [
            {
              value: 'four',
              score: 100
            },
            {
              value: 'three',
              score: 0
            },
            {
              value: 'two',
              score: 0
            }
          ]
        },
        {
          type: 'html',
          content: 'Placeholder'
        }
      ]
    })
  },0)
}

$();

location.hash = 'episode/1/0';
