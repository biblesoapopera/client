$.screen.slider = function(config){

  $.screen.slide.call(this, config);

  var answersNode = this.content.querySelector('.answers'),
    answerNode,
    width = Math.round(90/config.answers.length),
    grip = this.grip = this.content.querySelector('.grip'),
    track = this.track = this.content.querySelector('.track'),
    i;

  this.content.querySelector('.question').innerHTML = config.question;


  for (i=0; i<config.answers.length; i++){
    answerNode = document.createElement('div');
    answerNode.style.width = width + 'vw';
    answerNode.innerHTML = config.answers[i].value || '';
    answersNode.appendChild(answerNode);
  }

  grip.addEventListener('mousedown', this);
  grip.addEventListener('touchstart', this);
  track.addEventListener('click', this);

  grip.style.left = (0.30*document.documentElement.clientWidth - 0.05*document.documentElement.clientHeight) + 'px';
}

$.extend($.screen.slide, $.screen.slider);

$.screen.slider.prototype.handleEvent = function(evt){
  if (evt.type === 'mouseup') this.dragend(evt)
  else if (evt.type === 'mousemove') this.dragmove(evt)
  else if (evt.type === 'touchend') this.dragend(evt)
  else if (evt.type === 'touchmove') this.dragmove(evt)
  else if (evt.type === 'mousedown') this.dragstart(evt)
  else if (evt.type === 'touchstart') this.dragstart(evt)
  else if (evt.type === 'click') this.trackClick(evt)
}

$.screen.slider.prototype.dragstart = function(evt){
  this.position = {
    left: parseInt(window.getComputedStyle(this.grip).getPropertyValue('left').replace('px', '')),
    client: $.getClientX(evt)
  };
  ['mouseup','mousemove','touchend','touchmove'].forEach(function(name){
    document.addEventListener(name, this)
  }.bind(this));
  this.grip.setAttribute('class', 'grip active');
}

$.screen.slider.prototype.dragend = function(){
  ['mouseup','mousemove','touchend','touchmove'].forEach(function(name){
    document.removeEventListener(name, this)
  }.bind(this));
  this.grip.setAttribute('class', 'grip');
  this.gripMoved(this.value);
}

$.screen.slider.prototype.dragmove = function(evt){
  var clientX = $.getClientX(evt);
  var newLeft = this.position.left + clientX - this.position.client;

  if (newLeft < -this.grip.getBoundingClientRect().width/2){
    newLeft = -this.grip.getBoundingClientRect().width/2;
  } else if (newLeft > this.track.getBoundingClientRect().width - this.grip.getBoundingClientRect().width/2){
    newLeft = this.track.getBoundingClientRect().width - this.grip.getBoundingClientRect().width/2;
  }

  this.value = (newLeft + this.grip.getBoundingClientRect().width/2) / this.track.getBoundingClientRect().width;

  this.grip.style.left = newLeft + 'px';
  this.position.left = newLeft;
  this.position.client = clientX;
}

$.screen.slider.prototype.trackClick = function(evt){
  var newLeft = evt.clientX - this.track.getBoundingClientRect().left - this.grip.getBoundingClientRect().width/2;
  this.grip.style.left = newLeft + 'px';
  this.gripMoved((newLeft + this.grip.getBoundingClientRect().width/2) / this.track.getBoundingClientRect().width);
}

$.screen.slider.prototype.gripMoved = function(newValue){
  var answer;
  if (newValue === 1) answer = this.config.answers[this.config.answers.length-1]
  else answer = this.config.answers[Math.floor(newValue * this.config.answers.length)]
  var feedback = (this.attempt(answer)).feedback;

  //TODO show feedback in ui
  console.log(feedback);
}
