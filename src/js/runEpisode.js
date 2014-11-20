bso.runEpisode = function(episodeData){
  
  var sectionIndex = 0;
  var slideIndex = 0;
  
  //setup top-nav  
  document.querySelector('.top-nav div.title').innerHTML = episodeData.title;
  
  function next(){
  
    if(!(slideIndex === episodeData.sections[sectionIndex].slides.length-1 && sectionIndex === episodeData.sections.length-1)){
       bso.next.hide();
    }
    
    var type = episodeData.sections[sectionIndex].slides[slideIndex].type;
    var config = episodeData.sections[sectionIndex].slides[slideIndex];
    if (type === 'audio') config.audioUrl = episodeData.audioUrl;
    
    var slide = new bso.slide[type](config);

    bso.slideTransition(slide, 'right');
    
    ++slideIndex;    
    if(slideIndex === episodeData.sections[sectionIndex].slides.length){
        ++sectionIndex;
        slideIndex = 0;
    }
  }  
  
  bso.next.create(next);
  
  next();
};
