var slides = {
  title: 'Functional test',
  slides: [
    {
      type: 'slider',
      question: 'How many slices of pizza should you eat?',
      answers: [
        {
          value: '0',
          score: 0,
          feedback: "You're going to be hungry!" // jshint ignore:line
        },
        {
          value: '1',
          score: 50,
          feedback: 'Mmmm. Yum.'
        },
        {
          value: '2',
          score: 100,
          feedback: 'Delicious.'
        },
        {
          value: '3',
          score: 50,
          feedback: 'Stuffed!'
        },
        {
          value: '4+',
          score: 0,
          feedback: "You're going to feel sick..." // jshint ignore:line
        }
      ],
      complete: 'partiallyCorrect',
      feedback: {
        complete: 'We hope you enjoy dinner.'
      }
    },
    {
      type: 'html',
      content: 'Placeholder'
    }
  ]
};

bso.run(slides);
