bso.topNav = function(episodeData){

  var topNav = document.querySelector('.top-nav');

  topNav.querySelector('.title').innerHTML = episodeData.title;
  if (episodeData.subtitle) topNav.querySelector('.sub-title').innerHTML = episodeData.subtitle;

  var overviewTable = topNav.querySelector('.overview-table'),
    thumbs = topNav.querySelector('.thumbs'),
    overviewDiv;

  for (var i in episodeData.overview){
    overviewDiv = document.createElement('div');

    overviewDiv.innerHTML =
      '<div class="' +
      episodeData.overview[i].type +
      '"><span class="sprite"></span>' +
      episodeData.overview[i].title +
      '</div>';

    overviewTable.appendChild(overviewDiv);
  }

  var slideDiv;
  for (i in episodeData.slides){
    slideDiv = document.createElement('div');
    slideDiv.setAttribute('data-slide-index', 'i-' + i);
    thumbs.appendChild(slideDiv);
  }

  topNav.querySelector('.toggle').addEventListener('click', function(){
    if (topNav.getAttribute('class').indexOf('active') === -1){
        topNav.setAttribute('class', 'top-nav active');
    } else {
        topNav.setAttribute('class', 'top-nav');
    }
  });
}
