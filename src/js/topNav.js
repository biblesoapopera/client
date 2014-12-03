bso.topNav = function(episodeData){
  
  var topNav = document.querySelector('.top-nav');
  
  topNav.querySelector('.title').innerHTML = episodeData.title;
  topNav.querySelector('.sub-title').innerHTML = episodeData.subtitle;  
  
  var sectionsTable = topNav.querySelector('.sections-table');
  var thumbs = topNav.querySelector('.thumbs');
  var sectionDiv;
  var slideDiv;
  for (var i in episodeData.sections){
    sectionDiv = document.createElement('div');

    sectionDiv.innerHTML = "<div class='" +  episodeData.sections[i].type + "'><span class='sprite'></span>" + episodeData.sections[i].title + "</div>";     
    sectionsTable.appendChild(sectionDiv);    
  
    for (var j in episodeData.sections[i].slides){
        slideDiv = document.createElement('div');
        if (i == 0 && j == 0){
            slideDiv.setAttribute('class', 'active ' + episodeData.sections[i].type);            
        } else {
            slideDiv.setAttribute('class', episodeData.sections[i].type);
        }
        slideDiv.setAttribute('data-section', i);
        slideDiv.setAttribute('data-slide', j);
        
        thumbs.appendChild(slideDiv);
    }
  }
  
  topNav.querySelector('.toggle').addEventListener('click', function(){
    if (topNav.getAttribute('class').indexOf('active') === -1){
        topNav.setAttribute('class', 'top-nav active');
    } else {
        topNav.setAttribute('class', 'top-nav');        
    }
  });
}
