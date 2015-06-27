bso.Screen = function(screenType){

  bso.evented(this);

  var tempNode = document.createElement('div');
  tempNode.innerHTML = document.querySelector('.template.abstract').innerHTML;
  var inner = tempNode.querySelector('.screen2');
  inner.setAttribute('class', 'screen2 ' + screenType);
  inner.innerHTML = document.querySelector('.template.' + screenType).innerHTML;
  this.node = tempNode.firstElementChild;
}
