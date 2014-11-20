bso.runEpisode = function(episodeData){
  
  var sectionIndex = 0;
  var slideIndex = -1;
  
  //setup top-nav  
  document.querySelector('.top-nav div.title').innerHTML = episodeData.title;
  
  var topNav = document.querySelector('.top-nav');
  var sectionDiv;
  var classAttr;
  for (var i in episodeData.sections){
    sectionDiv = document.createElement('div');
    
    classAttr = 'section ' + episodeData.sections[i].type;    
    if (i==0) classAttr += ' active';   
    sectionDiv.setAttribute('class', classAttr);    
    sectionDiv.innerHTML = episodeData.sections[i].title;    
    topNav.appendChild(sectionDiv);    
    episodeData.sections[i].topNavNode = sectionDiv;
  }
  
  function next(){
  
    ++slideIndex;
    if(slideIndex === episodeData.sections[sectionIndex].slides.length){
        episodeData.sections[sectionIndex].topNavNode.setAttribute(
            'class',
            episodeData.sections[sectionIndex].topNavNode.getAttribute('class').replace(' active', '')    
        );
        ++sectionIndex;        
        episodeData.sections[sectionIndex].topNavNode.setAttribute(
            'class',
            episodeData.sections[sectionIndex].topNavNode.getAttribute('class') + ' active'
        );        
        slideIndex = 0;
    }        
     
    if(!(slideIndex === episodeData.sections[sectionIndex].slides.length-1 && sectionIndex === episodeData.sections.length-1)){
       bso.next.hide();
    }
    
    var type = episodeData.sections[sectionIndex].slides[slideIndex].type;
    var config = episodeData.sections[sectionIndex].slides[slideIndex];
    if (type === 'audio') config.audioUrl = episodeData.audioUrl;
    
    var slide = new bso.slide[type](config);

    bso.slideTransition(slide, 'right'); 
  }  
  
  bso.next.create(next);
  
  next();
};
