function $(){ //jshint ignore:line

  var from = location.hash.slice(1).split('/');
  var go = function(to){

    to = to.split('/');

    for(var i=0;i<$.transition.length;i++){
      if($.transition[i](from, to)) break
    }

    from = to;
  }

  go(location.hash.slice(1))

  window.onhashchange = function(){
    go(location.hash.slice(1))
  };
}

