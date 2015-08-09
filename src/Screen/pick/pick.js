$.screen.pick = function(config){
  $.screen.slide.call(this, config);

  this.content.querySelector('.question').innerHTML = config.question;
  this.feedback = this.content.querySelector('.feedback');
  this.feedbackText = this.feedback.querySelector('.feedback-text');
  this.feedbackArrow = this.feedback.querySelector('.feedback-arrow');
  this.feedbackNext = this.feedback.querySelector('.next');
  this.feedbackRedo = this.feedback.querySelector('.redo');

  this.feedback.addEventListener('transitionend', this.feedbackAnimateDone.bind(this));
  this.feedbackNext.addEventListener('click', this.nextClick.bind(this));
  this.feedbackRedo.addEventListener('click', this.redoClick.bind(this));

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

$.extend($.screen.slide, $.screen.pick);

$.screen.pick.prototype.itemClick = function (evt) {
  var answerList = this.answerList;
  var target = evt.target;

  for (var i = 0; i < answerList.children.length; i++) answerList.children[i].classList.remove('active')
  target.setAttribute('class', 'active');

  this.showFeedback(target, this.attempt(this.config.answers[target.answerIndex]));
}

$.screen.pick.prototype.showFeedback = function(target, attemptObj){
  if (attemptObj.feedback.length === 0) return;

  var i, p;
  this.feedbackText.innerHTML = '';
  for(i=0; i<attemptObj.feedback.length; i++){
    p = document.createElement('p');
    p.innerHTML = attemptObj.feedback[i];
    this.feedbackText.appendChild(p);
  }

  if (attemptObj.complete) this.feedbackNext.classList.add('active');

  this.answerList.classList.add('inactive');
  this.feedback.style.height = (100 * this.feedback.scrollHeight / document.documentElement.clientHeight + 5)  + 'vh';
  this.scrollTo(this.answerList.offsetTop);

  var arrowMid = this.feedbackArrow.getBoundingClientRect().left + this.feedbackArrow.getBoundingClientRect().width/2;
  var targetMid = target.getBoundingClientRect().left + target.getBoundingClientRect().width/2;

  this.feedbackArrow.style.left = 100 * (targetMid - arrowMid) / document.documentElement.clientWidth + 'vw';
}

$.screen.pick.prototype.redoClick = function(){
  this.hideFeedback();
}

$.screen.pick.prototype.nextClick = function(){
  document.querySelector('.nav').querySelector('.next').click();
}

$.screen.pick.prototype.hideFeedback = function(){
  this.feedback.style.height = 0;
  for(var i=0;i<this.answerList.children.length;i++) this.answerList.children[i].classList.remove('active');
}

$.screen.pick.prototype.feedbackAnimateDone = function(){
  if (this.feedback.style.height === '0px') {
    this.feedbackArrow.style.left = 0;
    this.answerList.classList.remove('inactive');
    this.feedbackNext.classList.remove('active');
  }
}

$.screen.pick.prototype.scrollTo = function(val){
  var initalVal = this.node.scrollTop;
  var start;
  var step = function(timestamp){
    if (!start) start = timestamp;
    var progress = timestamp - start;
    this.node.scrollTop = (val - initalVal) * progress / 1000;

    if (progress < 1000) requestAnimationFrame(step);
  }.bind(this);

  requestAnimationFrame(step);
}
