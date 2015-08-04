$.series = [
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

$.screen.menu = function(){
  $.screen.call(this, 'menu');

  var data,
    i,
    epNode,
    node = this.node,
    episodeHTML = node.innerHTML;

  node.innerHTML = '<div class="wrap"></div>';
  node = node.children[0];

  for(i=0;i<$.series.length;i++){
    data = $.series[i];
    epNode = document.createElement('div');
    epNode.setAttribute('class', 'episode');
    epNode.innerHTML = episodeHTML;
    epNode.querySelector('.title').innerHTML = '<a href="#menu/' + (i+1) + '">' + (i+1) + '. ' + data.title + '</a>';
    epNode.querySelector('.subtitle').innerHTML = data.subtitle;
    epNode.querySelector('.summary').innerHTML = data.summary;
    node.appendChild(epNode);
  }
}

$.extend($.screen, $.screen.menu);

$.screen.menu.prototype.show = function(id, index, animate){
  if (!animate) this.node.classList.remove('animate')
  else this.node.classList.add('animate')

  this.node.classList.add('episode-active');
  var epNode = this.node.children[0].children[id-1];
  epNode.querySelector('.start').href = '#episode/' + id + '/' + index;
  epNode.classList.add('active');
  this.node.children[0].style.top = this.node.scrollTop - epNode.offsetTop + 'px';
}

$.screen.menu.prototype.enter = function(){
  this.node.classList.add('animate');
  this.node.classList.remove('episode-active');
  this.node.children[0].style.top = 0;
  for(var i = 0; i < this.node.children[0].children.length; i++){
    this.node.children[0].children[i].classList.remove('active')
  }
}
