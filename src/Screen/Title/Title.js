bso.Screen.Title = function(){
  bso.Screen.call(this, 'Title');
  this.node.querySelector('.title').innerHTML = bso.lang.en.title;
  this.node.querySelector('.tagline').innerHTML = bso.lang.en.tagline;
}

bso.extend(bso.Screen, bso.Screen.Title);
