$.screen.audio = function(config){
  $.screen.slide.call(this, config);

  this.content.querySelector('.text').innerHTML = config.text;

  this.player = $.player(config.id);
  this.action = this.content.querySelector('.btn');
  this.action.addEventListener('click', this);

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
  $.screen.slide.prototype.enter.call(this);
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
