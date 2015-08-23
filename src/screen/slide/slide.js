$.screen.slide = function(config){
  this.config = config;
  this.attemptNum = -1;
  $.screen.call(this, 'slide');
  this.content = this.node.querySelector('.content');
  this.content.classList.add(config.type);

  var template = document.querySelector('.template.' + config.type);
  if (template) this.content.innerHTML = template.innerHTML;
}

$.extend($.screen, $.screen.slide);

$.screen.slide.prototype.enter = function(){
  if (this.complete) $.nav.complete = true;
}

$.screen.slide.prototype.setComplete = function(val){
  this.complete = val;
  $.nav.complete = val;
}

$.screen.slide.prototype.attempt = function(answer){
  ++this.attemptNum;

  var attemptObj = {
    attempt: this.attemptNum,
    value: answer.value,
    score: answer.score
  };

  attemptObj.complete = this.checkComplete(attemptObj);
  attemptObj.feedback = this.feedbackContent(attemptObj, answer.feedback);

  this.setComplete(attemptObj.complete);

  $.analytics.attempt(attemptObj);
  return attemptObj;
};

$.screen.slide.prototype.checkComplete = function(attemptObj){

  var key = this.config.complete || 'correct';

  if (key === 'always'){
    return true
  } else if (key === 'correct'){
    return attemptObj.score === 100
  } else if (key === 'partiallyCorrect'){
    return attemptObj.score > 0 && attemptObj.score < 100
  }
}

$.screen.prototype.feedbackContent = function(attemptObj, answerFeedback){

  var ret = [];

  if (answerFeedback) ret.push(answerFeedback);

  if (!this.config.feedback) return ret;

  for (var key in this.config.feedback){
    if (key === 'correct' && attemptObj.score === 100) {
      ret.push(this.config.feedback.correct)
    } else if (key === 'incorrect' && attemptObj.score === 0) {
      ret.push(this.config.feedback.incorrect)
    } else if (key === 'partiallyCorrect' && attemptObj.score > 0 && attemptObj.score < 100){
      ret.push(this.config.feedback.partiallyCorrect)
    } else if (key === 'complete' && attemptObj.complete) {
      ret.push(this.config.feedback.complete)
    } else if (key === 'incomplete' && !attemptObj.complete) {
      ret.push(this.config.feedback.incomplete)
    }
  }

  return ret;
}
