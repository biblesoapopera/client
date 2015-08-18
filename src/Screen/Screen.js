$.screen = function(screenType){
  var node = this.node = document.createElement('div');
  node.setAttribute('class', 'screen ' + screenType);
  node.innerHTML = document.querySelector('.template.' + screenType).innerHTML;
}
