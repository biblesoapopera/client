slides.json
===========

Slides.json defines all the slides for an episode. It has the following basic structure:

```js
{
  //The episode author, currently not displayed anywhere in the ui
  "author": "tim",

  //The episode title, displayed on the title slide, and on the top-nav summary
  "title": "Episode 1",

  //The episode sub title, displayed on the title slide, and on the top-nav summary
  "subtitle": "bible soap opera demo"

  //overview array
  //used to populate the overview
  //this will be changed when the the ui is done
  "overview": []

  //slides array
  //array of slide object in order
  "slides": []
}
```

Slide Objects
=============

title
-----

Title slide type will display the episode title and sub title.

```js
{
  "type": "title"
}
```

html
----

```js
{
  "type": "html",
  "content": "<p>This will be displayed.</p>"
}
```

pick
----

Displays a multiple choice question.

The slide will be considered complete (and enable the `next` button) when one of the conditions in the `complete` object is true. Valid conditions are `correct|incorrect|partiallyCorrect`.

The `feedback` object holds conditional feedback. Valid conditions are `correct|incorrect|partiallyCorrect|complete|incomplete`.

```js
{
  "type": "pick",
  "question": "What did Paul’s uncle give him as a gift?",
  "answers": [
    {
      "value": "TV",
      "score": 100,
      "feedback": "Yes, Paul's uncle gave him a TV"
    },
    {
      "value": "phone",
      "score": 0,
      "feedback": "No, Paul's uncle didn't gave him a phone"
    },
    {
      "value": "football",
      "score": 0,
      "feedback": "No, Paul's uncle didn't gave him a football"
    }
  ],
  "complete": {
    "correct": true
  },
  "feedback": {
    "incorrect": "Please try again",
    "complete": "Good stuff"
  }
}
```

slider
------

```js
{
  "type": "slider",
  "question": "Who said this: Abraham must have done something wrong, and so God is taking away the promises by taking away Isaac.",
  "answers": [
    {
      "value": "Samson",
      "score": 100,
      "feedback": "You're right! Well done."
    },
    {
      "score": 50,
      "feedback": "Hmm. You need to make a clearer decision. Was it David or Samson? Please try again."
    },
    {
      "value": "David",
      "score": 0,
      "feedback": "Sorry, David didn't say that, Samson did."
    }
  ],
  "complete": {
    "correct": true,
    "incorrect": true
  },
  "feedback": {
    "complete": "Let's move on ..."
  }
}
```

audio
-----

```js
{
  "type": "audio",
  "text": "Let’s hear what Paul does.",
  "start": 470,
  "end": 619
}
```
