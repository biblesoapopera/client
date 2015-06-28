bso.Screen.Menu = function(){
  bso.Screen.call(this, 'Menu');

  var episodes = [
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

  var data,
    i,
    epNode,
    menuNode = this.node.querySelector('.Menu'),
    episodeHTML = menuNode.innerHTML;

  menuNode.innerHTML = '';

  for(i=0;i<episodes.length;i++){
    data = episodes[i];
    epNode = document.createElement('div');
    epNode.setAttribute('class', 'episode');
    epNode.innerHTML = episodeHTML;
    epNode.querySelector('.title').innerHTML = (i+1) + '. ' + data.title;
    epNode.querySelector('.subtitle').innerHTML = data.subtitle;
    epNode.querySelector('.summary').innerHTML = data.summary;
    menuNode.appendChild(epNode);
  }
}

bso.extend(bso.Screen.Menu);
