$.screen.pick = function(config){
  $.screen.feedback.call(this, config);

  this.content.querySelector('.question').innerHTML = config.question;

  var answerList = this.answerList = this.content.querySelector('.answers');

  for (var i = 0; i < config.answers.length; i++) {
    var answer = config.answers[i];
    var div = document.createElement('div');
    div.innerHTML = answer.value;
    div.answerIndex = i;
    div.addEventListener('click', this.itemClick.bind(this));
    answerList.appendChild(div);
  }
}

$.extend($.screen.feedback, $.screen.pick);

$.screen.pick.prototype.itemClick = function (evt) {
  var answerList = this.answerList;
  var target = evt.target;

  for (var i = 0; i < answerList.children.length; i++) answerList.children[i].classList.remove('active')
  target.setAttribute('class', 'active');

  this.showFeedback(target, this.attempt(this.config.answers[target.answerIndex]));
}

$.screen.pick.prototype.showFeedback = function(target, attemptObj){
  $.screen.feedback.prototype.showFeedback.call(this, target, attemptObj);
  if (attemptObj.feedback.length !== 0) this.answerList.classList.add('inactive');
}

$.screen.pick.prototype.hideFeedback = function(){
  $.screen.feedback.prototype.hideFeedback.call(this);
  for(var i=0;i<this.answerList.children.length;i++) this.answerList.children[i].classList.remove('active');
}

$.screen.pick.prototype.feedbackAnimateDone = function(){
  if (this.feedback.style.height === '0px') this.answerList.classList.remove('inactive')
  $.screen.feedback.prototype.feedbackAnimateDone.call(this);
}

