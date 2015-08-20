$.analytics = {

  setup: function(){
    //called when the app is first loaded
    //TODO localhost check is added for local developement, should be removed when building dist
    ga('create', 'UA-66544379-1', document.location.hostname === 'localhost' ? {'cookieDomain': 'none'}: 'auto');
  },

  nav: function(){
    //logs when the user moves to a new screen
    ga('set', 'page', location.hash.slice(1));
    ga('send', 'pageview');
  },

  attempt: function(attemptObj){
    //logs when the user attempts a question

    ga('send', {
      'hitType': 'event',
      'eventCategory': 'question',
      'eventAction': 'attempt',
      'metric1': attemptObj.attempt, //this is a counter of how many times the user has attempted a question during a session
      'metric2': attemptObj.score, //the score for this attempt, from 0 to 100
      'dimension1': attemptObj.value //the specific answer selected
    });
  }
};
