bso.Screen.Title = function(){
  bso.Screen.call(this, 'Title');
  this.node.querySelector('button').addEventListener('click', function(){
    console.log('CLICK');
  });
}

bso.extend(bso.Screen.Title);
