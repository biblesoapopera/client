$.screen.html = function(config){
  $.screen.slide.call(this, config);
  this.content.innerHTML = config.content;
}

$.extend($.screen.slide, $.screen.html);

$.screen.html.prototype.enter = function(){
  this.complete = true;
  $.screen.slide.prototype.enter.call(this);
}
