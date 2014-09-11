module.exports = {
  author: 'tim',
  groups: [
    {
      type: 'first',
      screens: [
        {
          type: 'title',
          title: 'Episode 1',
          subtitle: 'BSO demo'
        }
      ]
    },
    {
      type: 'quiz',
      screens: [
        {
          type: 'pick',
          question: 'What is the answer?',
          answers: [
            'answer 1',
            'answer 2',
            'answer 3'
          ]
        },
        {
          type: 'slider',
          question: 'How big is an apple?',
          left: 'small',
          right: 'large'
        },
        {
          type: 'sort',
          question: 'Put these in order from smallest to largest:',
          answers: [
            'mouse',
            'elephant',
            'grape',
            'pig'
          ]
        },
        {
          type: 'open',
          question: 'Discuss: how big is the sky?'
        }
      ]
    },
    {
      type: 'audio',
      screens: [
        {
          type: 'audio',
          start: 0,
          end: 60
        }
      ]
    },
    {
      type: 'last',
      screens: [
        {
          type: 'info',
          text: 'Thanks for trying out the demo'
        }
      ]
    },
  ]
}
