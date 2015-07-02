bso.Screen.Episode = function(id){
  this.id = id;
  bso.Screen.call(this, 'Episode');
}

bso.extend(bso.Screen, bso.Screen.Episode);
