bso.slide.slider = function(config){

  var node = bso.slide.call(this, 'slider', config),
    answerNode,
    width = Math.round(100/(config.answers.length-1)),
    grip = this._grip = node.querySelector('.grip'),
    track = this._track = node.querySelector('.track'),
    i;

  node.querySelector('.question').innerHTML = config.question;

  for (i=0; i<config.answers.length; i++){
    answerNode = document.createElement('div');
    answerNode.setAttribute('class', 'answer');
    answerNode.setAttribute('style', 'width: ' + width + '%; left: ' + (i*width - width/2) + '%');
    answerNode.innerHTML = config.answers[i].value || '';
    node.querySelector('.track-container').appendChild(answerNode);
  }

  grip.addEventListener('mousedown', this);
  grip.addEventListener('touchstart', this);
  track.addEventListener('click', this)
}

bso.extend(bso.slide.slider)

bso.slide.slider.prototype.handleEvent = function(evt){
  if (evt.type === 'mouseup') this._dragend(evt)
  else if (evt.type === 'mousemove') this._dragmove(evt)
  else if (evt.type === 'touchend') this._dragend(evt)
  else if (evt.type === 'touchmove') this._dragmove(evt)
  else if (evt.type === 'mousedown') this._dragstart(evt)
  else if (evt.type === 'touchstart') this._dragstart(evt)
  else if (evt.type === 'click') this._trackClick(evt)
}

bso.slide.slider.prototype._dragstart = function(evt){
  this._position = {
    left: parseInt(window.getComputedStyle(this._grip).getPropertyValue('left').replace('px', '')),
    client: bso.getClientX(evt)
  };
  ['mouseup','mousemove','touchend','touchmove'].forEach(function(name){
    document.addEventListener(name, this)
  }.bind(this));
  this._grip.setAttribute('class', 'grip active');
}

bso.slide.slider.prototype._dragend = function(){
  ['mouseup','mousemove','touchend','touchmove'].forEach(function(name){
    document.removeEventListener(name, this)
  }.bind(this));
  this._grip.setAttribute('class', 'grip');
  this._gripMoved(this._value);
}

bso.slide.slider.prototype._dragmove = function(evt){
  var clientX = bso.getClientX(evt);
  var newLeft = this._position.left + clientX - this._position.client;

  if (newLeft < -this._grip.getBoundingClientRect().width/2){
    newLeft = -this._grip.getBoundingClientRect().width/2;
  } else if (newLeft > this._track.getBoundingClientRect().width - this._grip.getBoundingClientRect().width/2){
    newLeft = this._track.getBoundingClientRect().width - this._grip.getBoundingClientRect().width/2;
  }

  this._value = (newLeft + this._grip.getBoundingClientRect().width/2) / this._track.getBoundingClientRect().width;
  this._grip.style.left = newLeft + 'px';
  this._position.left = newLeft;
  this._position.client = clientX;
}

bso.slide.slider.prototype._trackClick = function(evt){
  var newLeft = evt.clientX - this._track.getBoundingClientRect().left - this._grip.getBoundingClientRect().width/2;
  this._grip.style.left = newLeft + 'px';
  this._gripMoved((newLeft + this._grip.getBoundingClientRect().width/2) / this._track.getBoundingClientRect().width);
}

bso.slide.slider.prototype._gripMoved = function(newValue){

  var answer;
  if (newValue === 1) answer = this._config.answers[this._config.answers.length-1]
  else answer = this._config.answers[Math.floor(newValue * this._config.answers.length)]
  var feedback = (this._attempt(answer)).feedback;

  //TODO show feedback in ui
  console.log(feedback);
}
