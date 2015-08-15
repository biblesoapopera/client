$.screen.audio = function(config){
  $.screen.slide.call(this, config);

  this.content.querySelector('.text').innerHTML = config.text;

  this.player = $.player(config.id);
  this.action = this.content.querySelector('.btn');
  this.action.addEventListener('click', this);

  this.track = this.content.querySelector('.track');
  this.grip = this.content.querySelector('.grip');
  this.grip.addEventListener('mousedown', this);
  this.grip.addEventListener('touchstart', this);

  this.progress = this.content.querySelector('.progress');
  this.progress.addEventListener('click', this);

  this.progressTime = config.start;
  this.currentTime = config.start;
}

$.extend($.screen.slide, $.screen.audio);

$.screen.audio.prototype.enter = function(){

  //TODO remove this line. It makes audio skippable for demo purposes only
  this.complete = true;

  $.screen.slide.prototype.enter.call(this);

  if ($.player.canplay){
    this.player.currentTime = this.currentTime;
    this.player.addEventListener('timeupdate', this);
  } else {
    //TODO this polling is really yuck coding.
    // this will be replaced when the offline handling of audio and .bso files is brought in (issue #22)
    var pollCanPlay = function(){
      setTimeout(function(){
        if ($.player.canplay){
          this.player.currentTime = this.currentTime;
          this.player.addEventListener('timeupdate', this);
        } else {
          pollCanPlay();
        }
      }.bind(this), 300);
    }.bind(this);
    pollCanPlay();
  }
}

$.screen.audio.prototype.exit = function(){
  this.player.removeEventListener('timeupdate', this);
  if (this.action.classList.contains('pause')) this.pause();
  this.currentTime = this.player.currentTime;
}

$.screen.audio.prototype.handleEvent = function(evt){
  if (evt.type === 'click') this.handleClick(evt)
  else if (evt.type === 'timeupdate') this.timeupdate(evt)
  else if (evt.type === 'mousedown') this.dragstart(evt)
  else if (evt.type === 'touchstart') this.dragstart(evt)
  else if (evt.type === 'mouseup') this.dragend(evt)
  else if (evt.type === 'touchend') this.dragend(evt)
  else if (evt.type === 'mousemove') this.dragmove(evt)
  else if (evt.type === 'touchmove') this.dragmove(evt)
}

$.screen.audio.prototype.handleClick = function(evt){
  if (evt.target === this.action) this.actionClick(evt)
  else if (evt.target === this.progress) this.progressClick(evt)
}

$.screen.audio.prototype.actionClick = function(){
  if (this.action.classList.contains('play')) this.play()
  else this.pause()
}

$.screen.audio.prototype.progressClick = function(evt){
  var currentTime =
    this.config.start +
    (evt.clientX - this.progress.getBoundingClientRect().left) * (this.config.end - this.config.start) / this.track.getBoundingClientRect().width;

  if (currentTime < this.config.start) currentTime = this.config.start
  else if (currentTime > this.config.end) currentTime = this.config.end
  this.player.currentTime = currentTime;
}

$.screen.audio.prototype.play = function(){
  this.player.play();
  this.action.classList.remove('play');
  this.action.classList.add('pause');
}

$.screen.audio.prototype.pause = function(){
  this.player.pause();
  this.action.classList.remove('pause');
  this.action.classList.add('play');
}

$.screen.audio.prototype.timeupdate = function(){
  if (this.player.currentTime >= this.config.end) {
    this.pause();
    this.player.currentTime = this.config.start;
    this.progress.style.width = this.track.getBoundingClientRect().width * 100 / document.documentElement.clientWidth + 'vw';
    this.complete = true;
  }

  var percProgress = (this.player.currentTime - this.config.start)/(this.config.end - this.config.start);

  if (percProgress < 0) percProgress = 0
  else if (percProgress > 1) percProgress = 1

  this.grip.style.left = (this.track.getBoundingClientRect().width * percProgress - this.grip.getBoundingClientRect().width / 2) * 100 / document.documentElement.clientWidth + 'vw';

  if (this.progressTime < this.player.currentTime){
    this.progressTime = this.player.currentTime;
    this.progress.style.width = this.track.getBoundingClientRect().width * percProgress * 100 / document.documentElement.clientWidth + 'vw';
  }
}

$.screen.audio.prototype.dragstart = function(evt){
  this.isPlaying = !this.player.paused;
  this.player.pause();
  this.gripDragPosition = {
    left: parseFloat(this.grip.style.left.replace('vw', '')) * document.documentElement.clientWidth / 100,
    client: $.getClientX(evt)
  };
  ['mouseup','mousemove','touchend','touchmove'].forEach(function(name){
    document.addEventListener(name, this)
  }.bind(this));
}

$.screen.audio.prototype.dragend = function(){
  ['mouseup','mousemove','touchend','touchmove'].forEach(function(name){
    document.removeEventListener(name, this)
  }.bind(this));

  var currentTime =
    this.config.start + (this.gripDragPosition.left + this.grip.getBoundingClientRect().width / 2) * (this.config.end - this.config.start) / this.track.getBoundingClientRect().width;

  if (currentTime < this.config.start) currentTime = this.config.start
  else if (currentTime > this.config.end) currentTime = this.config.end

  this.player.currentTime = currentTime;
  if (this.isPlaying) this.player.play();
}

$.screen.audio.prototype.dragmove = function(evt){
  var clientX = $.getClientX(evt);
  var newLeft = this.gripDragPosition.left + clientX - this.gripDragPosition.client;

  if (newLeft < -this.grip.getBoundingClientRect().width / 2){
    newLeft = -this.grip.getBoundingClientRect().width / 2;
  } else if (newLeft > this.progress.getBoundingClientRect().width - this.grip.getBoundingClientRect().width / 2){
    newLeft = this.progress.getBoundingClientRect().width - this.grip.getBoundingClientRect().width / 2;
  }

  this.grip.style.left = newLeft * 100 / document.documentElement.clientWidth + 'vw';
  this.gripDragPosition.left = newLeft;
  this.gripDragPosition.client = clientX;
}
