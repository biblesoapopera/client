bso.runEpisode = function(episodeData){
  
  var groupIndex = 0;
  var slideIndex = 0;
  
  //setup top-nav  
  document.querySelector('.top-nav div.title').innerHTML = episodeData.title;
  
  function next(){
    
    if(!(slideIndex === episodeData.groups[groupIndex].slides.length-1 && groupIndex === episodeData.groups.length-1)){
       bso.next.hide();
    }
    
    var type = episodeData.groups[groupIndex].slides[slideIndex].type;
    var config = episodeData.groups[groupIndex].slides[slideIndex];
    if (type === 'audio') config.audioUrl = episodeData.audioUrl;
    
    var slide = new bso.slide[type](config);

    bso.slideTransition(slide, 'right');
    
    ++slideIndex;    
    if(slideIndex === episodeData.groups[groupIndex].slides.length){
        ++groupIndex;
        slideIndex = 0;
    }
  }  
  
  bso.next.create(next);
  
  next();
};
