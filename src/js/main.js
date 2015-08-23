function $(){ //jshint ignore:line

  $.analytics.setup();

  var from = location.hash.slice(1).split('/');
  var go = function(to){

    to = to.split('/');

    for(var i=0;i<$.transition.length;i++){
      if($.transition[i](from, to)) break
    }

    from = to;
    $.analytics.nav();
  }

  go(location.hash.slice(1))

  window.onhashchange = function(){
    go(location.hash.slice(1))
  };
}

