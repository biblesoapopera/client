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

  node.innerHTML = '<div class="wrap"></div>';
  node = node.children[0];

  for(i=0;i<bso.series.length;i++){
    data = bso.series[i];
    epNode = document.createElement('div');
    epNode.setAttribute('class', 'episode');
    epNode.innerHTML = episodeHTML;
    epNode.querySelector('.title').innerHTML = '<a href="#menu/' + (i+1) + '">' + (i+1) + '. ' + data.title + '</a>';
    epNode.querySelector('.subtitle').innerHTML = data.subtitle;
    epNode.querySelector('.summary').innerHTML = data.summary;
    epNode.querySelector('.start').href = '#episode/' + (i+1);
    node.appendChild(epNode);
  }
}

bso.extend(bso.Screen, bso.Screen.Menu);

bso.Screen.Menu.prototype.show = function(index){
  this.node.classList.add('episode-active');
  var epNode = this.node.children[0].children[index-1];
  epNode.classList.add('active');
  this.node.children[0].style.top = this.node.scrollTop - epNode.offsetTop + 'px';
}

bso.Screen.Menu.prototype.enter = function(){
  this.node.classList.remove('episode-active');
  this.node.children[0].style.top = 0;
  for(var i = 0; i < this.node.children[0].children.length; i++){
    this.node.children[0].children[i].classList.remove('active')
  }
}
