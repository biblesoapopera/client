bso.slide.slider = function(config){

  var node = bso.slide.call(this, 'slider', config);

  node.querySelector('.question').innerHTML = config.question;

  var answerNode;
  var width = Math.round(100/config.answers.length);

  for (var i=0; i<config.answers.length; i++){
    answerNode = document.createElement('div');
    answerNode.setAttribute('class', 'answer');
    if (i === 0){
      answerNode.setAttribute('style', 'width: ' + width*2 + '%; left: -' + width + '%');
    } else if (i === config.answers.length-1){
      answerNode.setAttribute('style', 'width: ' + width*2 + '%; left: ' + i*width + '%');
    } else {
      answerNode.setAttribute('style', 'width: ' + width + '%; left: ' + i*width + '%');
    }
    answerNode.innerHTML = config.answers[i].value || '';
    node.querySelector('.track-container').appendChild(answerNode);
  }

  var position;
  var value = 0.5;
  var grip = node.querySelector('.grip');
  var track = node.querySelector('.track');

  var dragstart = function(evt){
    position = {
      left: parseInt(window.getComputedStyle(grip).getPropertyValue('left').replace('px', '')),
      client: bso.getClientX(evt)
    }
    document.addEventListener('mouseup', dragend);
    document.addEventListener('mousemove', dragmove);
    document.addEventListener('touchend', dragend);
    document.addEventListener('touchmove', dragmove);
    grip.setAttribute('class', 'grip active');
  };

  var dragend = function(){
    document.removeEventListener('mousemove', dragmove);
    document.removeEventListener('mouseup', dragend);
    document.removeEventListener('touchmove', dragmove);
    document.removeEventListener('touchend', dragend);
    grip.setAttribute('class', 'grip');
    this._gripMoved(value);
  }.bind(this);

  var dragmove = function(evt){
    var clientX = bso.getClientX(evt);
    var newLeft = position.left + clientX - position.client;

    if (newLeft < -grip.getBoundingClientRect().width/2){
      newLeft = -grip.getBoundingClientRect().width/2;
    } else if (newLeft > track.getBoundingClientRect().width - grip.getBoundingClientRect().width/2){
      newLeft = track.getBoundingClientRect().width - grip.getBoundingClientRect().width/2;
    }

    value = (newLeft + grip.getBoundingClientRect().width/2) / track.getBoundingClientRect().width;
    grip.style.left = newLeft + 'px';
    position.left = newLeft;
    position.client = clientX;
  }

  grip.addEventListener('mousedown', dragstart);
  grip.addEventListener('touchstart', dragstart);

  track.addEventListener('click', function(evt){
    var newLeft = evt.clientX - track.getBoundingClientRect().left - grip.getBoundingClientRect().width/2;
    grip.style.left = newLeft + 'px';
    this._gripMoved((newLeft + grip.getBoundingClientRect().width/2) / track.getBoundingClientRect().width);
  }.bind(this))
}

bso.extend(bso.slide.slider)

bso.slide.slider.prototype._gripMoved = function(newValue){
  var feedback = (this._attempt(this._config.answers[Math.floor(newValue * this._config.answers.length)])).feedback;

  //TODO show feedback in ui
  console.log(feedback);
}
