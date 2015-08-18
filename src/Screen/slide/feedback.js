$.screen.feedback = function(config){
  $.screen.slide.call(this, config);

  this.feedback = this.content.querySelector('.feedback');
  this.feedback.innerHTML = document.querySelector('.template.feedback').innerHTML;

  this.feedbackText = this.feedback.querySelector('.feedback-text');
  this.feedbackArrow = this.feedback.querySelector('.feedback-arrow');
  this.feedbackNext = this.feedback.querySelector('.next');
  this.feedbackRedo = this.feedback.querySelector('.redo');

  this.feedback.addEventListener('transitionend', this.feedbackAnimateDone.bind(this));
  this.feedbackNext.addEventListener('click', this.nextClick.bind(this));
  this.feedbackRedo.addEventListener('click', this.redoClick.bind(this));
}

$.extend($.screen.slide, $.screen.feedback);

$.screen.feedback.prototype.redoClick = function(){
  this.hideFeedback();
}

$.screen.feedback.prototype.nextClick = function(){
  document.querySelector('.nav').querySelector('.next').click();
}

$.screen.feedback.prototype.showFeedback = function(target, attemptObj){
  if (attemptObj.feedback.length === 0) return;

  var i, p;
  this.feedbackText.innerHTML = '';
  for(i=0; i<attemptObj.feedback.length; i++){
    p = document.createElement('p');
    p.innerHTML = attemptObj.feedback[i];
    this.feedbackText.appendChild(p);
  }

  if (attemptObj.complete) this.feedbackNext.classList.add('active');

  this.feedback.style.height = (100 * this.feedback.scrollHeight / document.documentElement.clientHeight + 5)  + 'vh';
  this.scrollTo(this.answerList.offsetTop);

  var arrowMid = this.feedbackArrow.getBoundingClientRect().left + this.feedbackArrow.getBoundingClientRect().width/2;
  var targetMid = target.getBoundingClientRect().left + target.getBoundingClientRect().width/2;

  this.feedbackArrow.style.left = 100 * (targetMid - arrowMid) / document.documentElement.clientWidth + 'vw';
}

$.screen.feedback.prototype.hideFeedback = function(){
  this.feedback.style.height = 0;
}

$.screen.feedback.prototype.feedbackAnimateDone = function(){
  if (this.feedback.style.height === '0px') {
    this.feedbackArrow.style.left = 0;
    this.feedbackNext.classList.remove('active');
  }
}

$.screen.feedback.prototype.scrollTo = function(val){
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
