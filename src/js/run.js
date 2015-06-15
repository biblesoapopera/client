bso.run = function(episodeData){

  var message;
  if (!!(message = bso.has())) episodeData.slides.unshift({type: 'support', message: message})

  var slideIndex = -1,
    transitioner = new bso.slideTransitioner(),
    thumbs = document.querySelector('.top-nav .thumbs'),
    slideCache = [];

  //setup top-nav
  bso.topNav(episodeData);

  function getSlide(index){
    if (!slideCache[index]){
      var type = episodeData.slides[index].type;
      var config = episodeData.slides[index];
      if (type === 'title') {
        config.title = episodeData.title;
        config.subtitle = episodeData.subtitle;
      }

      var newSlide = new bso.slide[type](config);
      document.body.appendChild(newSlide.node);
      slideCache[index] = newSlide;
      newSlide.on('complete', function(){bso.next.enable()})
    }
    return slideCache[index];
  }

  function deactivateThumb(index){
    if (index > -1){
      thumbs.querySelector('[data-slide-index=i-' + index + ']').setAttribute(
        'class',
        getSlide(index).complete ? ' complete' : ''
      );
    }
  }

  function activateThumb(index){
    thumbs.querySelector('[data-slide-index=i-' + index + ']').setAttribute(
      'class',
      ' active' + (getSlide(index).complete ? ' complete' : '')
    );
  }

  function go(dir){

    if (dir === 1 && bso.next.disabled) return
    if (dir === -1 && bso.previous.disabled) return

    deactivateThumb(slideIndex);

    slideIndex += dir;

    if (slideIndex <= 0) {
      slideIndex = 0;
      bso.previous.hide();
    } else {
      bso.previous.show();
    }

    if(slideIndex >= episodeData.slides.length - 1) {
      slideIndex = episodeData.slides.length - 1;
      bso.next.hide();
    } else {
      bso.next.show();
    }

    activateThumb(slideIndex);

    transitioner.transition(getSlide(slideIndex), dir === 1 ? 'right' : 'left');
  }

  bso.previous.create(go);
  bso.next.create(go);

  go(1);

  var loadingSlide = document.querySelector('.slide.loading');
  loadingSlide.parentNode.removeChild(loadingSlide);
};
