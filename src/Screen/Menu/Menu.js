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
    menuNode = this.node.querySelector('.Menu'),
    episodeHTML = menuNode.innerHTML;

  menuNode = menuNode.parentNode;
  menuNode.setAttribute('class', 'screen1 Menu');
  menuNode.innerHTML = '';

  for(i=0;i<bso.series.length;i++){
    data = bso.series[i];
    epNode = document.createElement('div');
    epNode.setAttribute('class', 'episode');
    epNode.innerHTML = episodeHTML;
    epNode.querySelector('.title').innerHTML = '<a href="#episode-' + (i+1) + '">' + (i+1) + '. ' + data.title + '</a>';
    epNode.querySelector('.subtitle').innerHTML = data.subtitle;
    epNode.querySelector('.summary').innerHTML = data.summary;
    menuNode.appendChild(epNode);
  }
}

bso.extend(bso.Screen, bso.Screen.Menu);

bso.Screen.Menu.prototype.show = function(index){
  this.node.querySelector('.Menu').children[index-1].setAttribute('class', 'episode active');
}
