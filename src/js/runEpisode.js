bso.runEpisode = function(episodeData){
  
  var sectionIndex = 0;
  var slideIndex = -1;

  //setup top-nav     
  bso.topNav(episodeData);
     
  var slideCache = [];
  function go(dir){
  
    if (dir === 1 && bso.next.disabled) return
    if (dir === -1 && bso.previous.disabled) return
    
    slideIndex += dir;
    if(slideIndex === -1 || slideIndex === episodeData.sections[sectionIndex].slides.length){
        episodeData.sections[sectionIndex].topNavNode.setAttribute(
            'class',
            episodeData.sections[sectionIndex].topNavNode.getAttribute('class').replace(' active', '')    
        );
        sectionIndex += dir;        
        episodeData.sections[sectionIndex].topNavNode.setAttribute(
            'class',
            episodeData.sections[sectionIndex].topNavNode.getAttribute('class') + ' active'
        );        

        if (slideIndex === -1){
            slideIndex = episodeData.sections[sectionIndex].slides.length - 1;
        } else {
            slideIndex = 0;
        }
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
        if (type === 'audio') config.audioUrl = episodeData.audioUrl;
    
        slideCache[sectionIndex][slideIndex] = new bso.slide[type](config, episodeData.sections[sectionIndex].type);        
    }
   
    bso.slideTransition(slideCache[sectionIndex][slideIndex], dir === 1 ? 'right' : 'left'); 
  }  
  
  bso.previous.create(go);  
  bso.next.create(go);
  
  go(1);
};
