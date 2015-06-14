bso.slide = function(slideType, config){

  this._config = config;
  this.attempt = -1;
  bso.evented(this);

  var tempNode = document.createElement('div');
  tempNode.innerHTML = document.querySelector('[data-slide="base"]').innerHTML;
  var inner = tempNode.querySelector('.slide-container-inner');
  inner.setAttribute('class', 'slide-container-inner ' + slideType);
  inner.innerHTML = document.querySelector('[data-slide=' + slideType + ']').innerHTML;
  this.node = tempNode.firstElementChild;

  return this.node;
}

bso.slide.prototype._attempt = function(answer){
  ++this.attempt;

  var attemptObj = {
    attempt: this.attempt,
    value: answer.value,
    score: answer.score
  };

  attemptObj.complete = this._checkComplete(attemptObj);
  attemptObj.feedback = this._feedbackContent(attemptObj, answer.feedback);

  this.emit('attempt', attemptObj);

  if (attemptObj.complete) this._complete();

  return attemptObj;
};

bso.slide.prototype._checkComplete = function(attemptObj){

  var key = this._config.complete || 'correct';

  if (key === 'always'){
    return true
  } else if (key === 'correct'){
    return attemptObj.score === 100
  } else if (key === 'partiallyCorrect'){
    return attemptObj.score > 0 && attemptObj.score < 100
  }
}

bso.slide.prototype._complete = function(){
  this.complete = true;
  this.emit('complete');
}

bso.slide.prototype._feedbackContent = function(attemptObj, answerFeedback){
  var ret = [];

  if (answerFeedback) ret.push(answerFeedback);

  if (!this._config.feedback) return ret;

  Object.keys(this._config.feedback).forEach(function(key){
    if (key === 'correct' && attemptObj.score === 100) {
      ret.push(this._config.feedback.correct)
    } else if (key === 'incorrect' && attemptObj.score === 0) {
      ret.push(this._config.feedback.incorrect)
    } else if (key === 'partiallyCorrect' && attemptObj.score > 0 && attemptObj.score < 100){
      ret.push(this._config.feedback.partiallyCorrect)
    } else if (key === 'complete' && attemptObj.complete) {
      ret.push(this._config.feedback.complete)
    } else if (key === 'incomplete' && !attemptObj.complete) {
      ret.push(this._config.feedback.incomplete)
    }
  }.bind(this))

  return ret;
}
