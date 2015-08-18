$.screen.loading = function(){
  $.screen.slide.call(this, {type: 'loading'});
}

$.extend($.screen.slide, $.screen.loading);
