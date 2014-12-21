bso.slide.title = function(config, sectionType){
    
    var clone = bso.clone(document.querySelector('[data-slide=title]'));
    clone.querySelector('.slide-inner').setAttribute('class', 'slide-inner ' + sectionType);        
    clone.querySelector('.title h1').innerHTML = config.title;
    clone.querySelector('.subtitle').innerHTML = config.subtitle;

    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;      
    
    this.complete = true;
}
