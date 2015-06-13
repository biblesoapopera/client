bso.slide.audio = function(config){

  var node = bso.slide.call(this, 'audio', config);
  node.querySelector('.text').innerHTML = config.text;

  this._player = bso.player();
  this._actionBtn = node.querySelector('.action');
  this._actionBtn.addEventListener('click', this);

  this._initVol();

  this._grip = node.querySelector('.grip');
  this._grip.addEventListener('mousedown', this);
  this._grip.addEventListener('touchstart', this);

  this._progress = node.querySelector('.progress');
  this._progress.addEventListener('click', this);

  this._progressTime = config.start;
  this._currentTime = config.start;
}

bso.extend(bso.slide.audio)

bso.slide.audio.prototype.enter = function(){
  this._player.currentTime = this._currentTime;
  this._player.addEventListener('timeupdate', this);

  //TODO remove this line. It makes audio skippable for demo purposes only
  this._complete();
}

bso.slide.audio.prototype.exit = function(){
  this._player.removeEventListener('timeupdate', this);
  if (this._actionBtn.getAttribute('class').indexOf('pause') !== -1) this._pause();
  this._currentTime = this._player.currentTime;
}

bso.slide.audio.prototype.handleEvent = function(evt){
  if (evt.type === 'click') this._handleClick(evt)
  else if (evt.type === 'timeupdate') this._timeupdate(evt)
  else if (evt.type === 'mousedown') this._dragstart(evt)
  else if (evt.type === 'touchstart') this._dragstart(evt)
  else if (evt.type === 'mouseup') this._dragend(evt)
  else if (evt.type === 'touchend') this._dragend(evt)
  else if (evt.type === 'mousemove') this._dragmove(evt)
  else if (evt.type === 'touchmove') this._dragmove(evt)
}

bso.slide.audio.prototype._handleClick = function(evt){
  if (evt.target === this._actionBtn) this._action(evt)
  else if (evt.target === this._volPlusBtn) this._volPlus(evt)
  else if (evt.target === this._volMinusBtn) this._volMinus(evt)
  else if (evt.target === this._progress) this._progressClick(evt)
}

bso.slide.audio.prototype._initVol = function(){
  this._volumeGrip = this.node.querySelector('.vol-grip');

  this._volPlusBtn = this.node.querySelector('.vol-plus');
  this._volPlusBtn.addEventListener('click', this);

  this._volMinusBtn = this.node.querySelector('.vol-minus');
  this._volMinusBtn.addEventListener('click', this);

  this._setVolumeGrip();
}

bso.slide.audio.prototype._play = function(){
  this._player.play();
  this._actionBtn.setAttribute('class', 'btn sprite action pause');
}

bso.slide.audio.prototype._pause = function(){
  this._player.pause();
  this._actionBtn.setAttribute('class', 'btn sprite action play');
}

bso.slide.audio.prototype._action = function(){
  var cls = this._actionBtn.getAttribute('class');
  if (cls.indexOf('play') !== -1) this._play()
  else if (cls.indexOf('pause') !== -1) this._pause()
}

bso.slide.audio.prototype._volPlus = function(){
  if (this._player.volume > 0.9) this._player.volume = 1
  else this._player.volume+=0.1;
  this._setVolumeGrip();
};

bso.slide.audio.prototype._volMinus = function(){
  if (this._player.volume < 0.1) this._player.volume = 0
  else this._player.volume-=0.1;
  this._setVolumeGrip();
};

bso.slide.audio.prototype._setVolumeGrip = function(){
  this._volumeGrip.style.height = Math.round(30 * this._player.volume) + 'px';
  this._volumeGrip.style.top = Math.round(30 * (1 - this._player.volume)) + 'px';
}

bso.slide.audio.prototype._timeupdate = function(){
  if (this._player.currentTime >= this._config.end) {
    this._pause();
    this._player.currentTime = this._config.start;
    this._complete();
  }
  var position =
    Math.round(300*(this._player.currentTime - this._config.start)/(this._config.end - this._config.start));

  if (position < 0) position = 0
  else if (position > 300) position = 300

  this._grip.style.left = (position - 2.5) + 'px';

  if (this._progressTime < this._player.currentTime){
    this._progressTime = this._player.currentTime;
    this._progress.style.width = position + 'px';
  }
}

bso.slide.audio.prototype._dragstart = function(evt){
  this._isPlaying = !this._player.paused;
  this._player.pause();
  this._gripDragPosition = {
    left: parseInt(this._grip.style.left.replace('px', '')),
    client: bso.getClientX(evt)
  };
  ['mouseup','mousemove','touchend','touchmove'].forEach(function(name){
    document.addEventListener(name, this)
  }.bind(this));
}

bso.slide.audio.prototype._dragend = function(){
  ['mouseup','mousemove','touchend','touchmove'].forEach(function(name){
    document.removeEventListener(name, this)
  }.bind(this));

  var currentTime =
    this._config.start + (this._gripDragPosition.left + 2.5) * (this._config.end - this._config.start) / 300;

  if (currentTime < this._config.start) currentTime = this._config.start
  else if (currentTime > this._config.end) currentTime = this._config.end

  this._player.currentTime = currentTime;
  if (this._isPlaying) this._player.play();
}

bso.slide.audio.prototype._dragmove = function(evt){
  var clientX = bso.getClientX(evt);
  var newLeft = this._gripDragPosition.left + clientX - this._gripDragPosition.client;

  if (newLeft < -2.5){
    newLeft = -2.5;
  } else if (newLeft > this._progress.style.width.replace('px', '') - 2.5){
    newLeft = this._progress.style.width.replace('px', '') - 2.5;
  }

  this._grip.style.left = newLeft + 'px';
  this._gripDragPosition.left = newLeft;
  this._gripDragPosition.client = clientX;
}

bso.slide.audio.prototype._progressClick = function(evt){
  var currentTime =
    this._config.start +
    (evt.clientX - this._progress.getBoundingClientRect().left) * (this._config.end - this._config.start) / 300;

  if (currentTime < this._config.start) currentTime = this._config.start
  else if (currentTime > this._config.end) currentTime = this._config.end
  this._player.currentTime = currentTime;
}
