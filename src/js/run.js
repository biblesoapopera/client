bso.run = function(episodeData){

  var message;
  if (!!(message = bso.has())) episodeData.slides.unshift({type: 'support', message: message})

  var slideIndex = -1;
  var transitioner = new bso.slideTransitioner();

  //setup top-nav
  bso.topNav(episodeData);
  var thumbs = document.querySelector('.top-nav .thumbs');

  var slideCache = [];

  function go(dir){

    if (dir === 1 && bso.next.disabled) return
    if (dir === -1 && bso.previous.disabled) return

    //deactivate exiting slide thumb
    if (slideCache.length > 0){
      thumbs.querySelector('[data-slide-index=i-' + slideIndex + ']').setAttribute(
        'class',
        slideCache[slideIndex].complete ? ' complete' : ''
      );
    }

    slideIndex += dir;
    if (slideIndex === -1) {
      slideIndex = 0;
      bso.previous.hide();
    } else {
      bso.previous.show();
    }

    if(slideIndex === episodeData.slides.length) {
      slideIndex = episodeData.slides.length - 1;
      bso.next.hide();
    } else {
      bso.next.show();
    }

    if (!slideCache[slideIndex]){
      var type = episodeData.slides[slideIndex].type;
      var config = episodeData.slides[slideIndex];
      if (type === 'title') {
        config.title = episodeData.title;
        config.subtitle = episodeData.subtitle;
      }

      var newSlide = new bso.slide[type](config);
      document.body.appendChild(newSlide.node);
      slideCache[slideIndex] = newSlide;
      newSlide.on('complete', function(){bso.next.enable()})
    }

    //activate entering slide thumb
    thumbs.querySelector('[data-slide-index=i-' + slideIndex + ']').setAttribute(
      'class',
      ' active' + (slideCache[slideIndex].complete ? ' complete' : '')
    );

    transitioner.transition(slideCache[slideIndex], dir === 1 ? 'right' : 'left');
  }

  bso.previous.create(go);
  bso.next.create(go);

  go(1);

  var loadingSlide = document.querySelector('.slide.loading');
  loadingSlide.parentNode.removeChild(loadingSlide);
};
