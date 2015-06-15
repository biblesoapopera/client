var slides = {
  "title": "Functional test",
  "slides": [
    {
      "type": "pick",
      "question": "How many legs does a dog have?",
      "answers": [
        {
          "value": "four",
          "score": 100,
          "feedback": "Yes, a dog does have four legs."
        },
        {
          "value": "three",
          "score": 0,
          "feedback": "No, a dog does does not have three legs."
        },
        {
          "value": "two",
          "score": 0,
          "feedback": "No, a dog does not have two legs."
        }
      ],
      "complete": "always",
      "feedback": {
        "incorrect": "Please try again",
        "correct": "Good stuff"
      }
    },
    {
      "type": "html",
      "content": "Placeholder"
    }
  ]
};

bso.run(slides);
