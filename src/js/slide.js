bso.slide = function(slideType, config){

  this._config = config;
  this.attempt = -1;
  bso.evented(this);

  var tempNode = document.createElement('div');
  tempNode.innerHTML = document.querySelector('[data-slide=' + slideType + ']').innerHTML;
  var node = this.node = tempNode.firstElementChild;

  return node;
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

  if (!this._config.complete) return;

  return Object.keys(this._config.complete).some(function(key){
    if (key === 'score'){
      return attemptObj.score >= this._config.complete.score;
    } else if (key === 'correct'){
      return attemptObj.score === 100
    } else if (key === 'incorrect'){
      return attemptObj.score === 0
    } else if (key === 'partiallyCorrect'){
      return attemptObj.score > 0 && attemptObj.score < 100
    }
  }.bind(this))
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
    if (key === 'correct'){
      if (attemptObj.score === 100) ret.push(this._config.feedback.correct)
    } else if (key === 'incorrect'){
      if (attemptObj.score === 0) ret.push(this._config.feedback.incorrect)
    } else if (key === 'partiallyCorrect'){
      if (attemptObj.score > 0 && attemptObj.score < 100) ret.push(this._config.feedback.partiallyCorrect)
    } else if (key === 'complete'){
      if (attemptObj.complete) ret.push(this._config.feedback.complete)
    }
  }.bind(this))

  return ret;
}
