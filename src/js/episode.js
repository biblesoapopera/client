$.episode = function(id){
  this.id = id;

  //load episode config
  $.load(id, this.ready.bind(this));
}

$.episode.prototype.show = function(index, animate){
  this.index = index;
  var dir = animate ? 'bottom' : 'instant';
  var slide = $.getScreen('episode/' + this.id + '/' + index);
  if (slide){
    $.nav.id = this.id;
    $.nav.length = this.config.slides.length;
    $.nav.index = this.index;
    $.animate(slide, dir);
  } else {
    $.animate($.getScreen('loading'), dir);
  }
  $.nav.show(animate);
}

$.episode.prototype.hide = function(){
  $.nav.hide();
}

$.episode.prototype.getSlide = function(index){
  if (this.config) {
    if (this.config.slides[index].type === 'audio') this.config.slides[index].id = this.id;
    return new $.screen[this.config.slides[index].type](this.config.slides[index])
  }
}

$.episode.prototype.ready = function(config){
  this.config = config;
  $.nav.id = this.id;
  $.nav.length = this.config.slides.length;
  $.nav.index = this.index;
  $.animate($.getScreen('episode/' + this.id + '/' + this.index), 'instant');
}

$.episode.prototype.changeSlide = function(index){
  var dir = index > this.index ? 'right' : 'left';
  this.index = index;
  $.nav.index = index;
  $.animate($.getScreen('episode/' + this.id + '/' + index), dir);
}
