bso.runEpisode = function(episodeData){
  
  var sectionIndex = 0;
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
        thumbs.querySelector('[data-slide-index=i' + sectionIndex + '-' + slideIndex + ']').setAttribute(
            'class', 
            episodeData.sections[sectionIndex].type + (slideCache[sectionIndex][slideIndex].complete ? ' complete' : '')
        );
    }
    
    slideIndex += dir;
    if(slideIndex === -1 || slideIndex === episodeData.sections[sectionIndex].slides.length){
        sectionIndex += dir;              
        if (slideIndex === -1) slideIndex = episodeData.sections[sectionIndex].slides.length - 1
        else slideIndex = 0    
    }        

    if(slideIndex === episodeData.sections[sectionIndex].slides.length-1 && sectionIndex === episodeData.sections.length-1){
       bso.next.hide();
    } else {
       bso.next.show();
    }
    
    if(slideIndex === 0 && sectionIndex === 0){
        bso.previous.hide();
    } else {
        bso.previous.show();
    }
  
    if (!slideCache[sectionIndex]) slideCache[sectionIndex] = []
    if (!slideCache[sectionIndex][slideIndex]){
        var type = episodeData.sections[sectionIndex].slides[slideIndex].type;
        var config = episodeData.sections[sectionIndex].slides[slideIndex];
        if (type === 'title') {
            config.title = episodeData.title;
            config.subtitle = episodeData.subtitle;
        } else if (type === 'audio') {
            config.audioUrl = episodeData.audioUrl;
        }
    
        var newSlide = new bso.slide[type](config, episodeData.sections[sectionIndex].type);
        slideCache[sectionIndex][slideIndex] = newSlide;
        if (newSlide.on) newSlide.on('complete', function(){bso.next.enable()})
    }

    //activate entering slide thumb        
    thumbs.querySelector('[data-slide-index=i' + sectionIndex + '-' + slideIndex + ']').setAttribute(
        'class', 
        episodeData.sections[sectionIndex].type + ' active' + (slideCache[sectionIndex][slideIndex].complete ? ' complete' : '')
    ); 
          
    transitioner.transition(slideCache[sectionIndex][slideIndex], dir === 1 ? 'right' : 'left');     
  }  
  
  bso.previous.create(go);  
  bso.next.create(go);
   
  go(1);  
  
  var loadingSlide = document.querySelector('.slide.loading'); 
  loadingSlide.parentNode.removeChild(loadingSlide);
};
