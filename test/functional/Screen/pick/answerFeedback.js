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
              score: 100,
              feedback: 'Yes, a dog does have four legs.'
            },
            {
              value: 'three',
              score: 0,
              feedback: 'No, a dog does does not have three legs.'
            },
            {
              value: 'two',
              score: 0,
              feedback: 'No, a dog does not have two legs.'
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

//click an answer to open the feedback bubble
setTimeout(function(){
  document.querySelector('.active .pick .answers').children[0].click();
}, 200);
