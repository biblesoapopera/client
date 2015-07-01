bso.series = [
  {
    title: 'The drama begins here',
    subtitle: 'episode subtitle',
    summary: 'Summary text about the episode. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah.'
  },
  {
    title: 'Episode 2',
    subtitle: 'episode subtitle',
    summary: 'Summary text about the episode. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah.'
  },
  {
    title: 'Episode 3',
    subtitle: 'episode subtitle',
    summary: 'Summary text about the episode. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah.'
  },
  {
    title: 'Episode 4',
    subtitle: 'episode subtitle',
    summary: 'Summary text about the episode. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah.'
  },
  {
    title: 'Episode 5',
    subtitle: 'episode subtitle',
    summary: 'Summary text about the episode. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah.'
  },
  {
    title: 'Episode 6',
    subtitle: 'episode subtitle',
    summary: 'Summary text about the episode. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah.'
  },
  {
    title: 'Episode 7',
    subtitle: 'episode subtitle',
    summary: 'Summary text about the episode. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah.'
  },
  {
    title: 'Episode 8',
    subtitle: 'episode subtitle',
    summary: 'Summary text about the episode. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah.'
  }
];

bso.Screen.Menu = function(){
  bso.Screen.call(this, 'Menu');

  var data,
    i,
    epNode,
    node = this.node,
    episodeHTML = node.innerHTML;

  node.innerHTML = '';

  for(i=0;i<bso.series.length;i++){
    data = bso.series[i];
    epNode = document.createElement('div');
    epNode.setAttribute('class', 'episode');
    epNode.innerHTML = episodeHTML;
    epNode.querySelector('.title').innerHTML = '<a href="#menu/' + (i+1) + '">' + (i+1) + '. ' + data.title + '</a>';
    epNode.querySelector('.subtitle').innerHTML = data.subtitle;
    epNode.querySelector('.summary').innerHTML = data.summary;
    node.appendChild(epNode);
  }
}

bso.extend(bso.Screen, bso.Screen.Menu);

bso.Screen.Menu.prototype.show = function(index){
  this.node.classList.add('ep' + index);
  this.node.children[index-1].classList.add('active');
}

bso.Screen.Menu.prototype.enter = function(){
  for(var i = 0; i < this.node.children.length; i++){
    this.node.classList.remove('ep' + i);
    this.node.children[i].classList.remove('active')
  }
}
