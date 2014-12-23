bso.slide.support = function(config, sectionType){
    
    var clone = bso.clone(document.querySelector('[data-slide=support]'));
    clone.querySelector('.slide-inner').setAttribute('class', 'slide-inner ' + sectionType);        
    clone.querySelector('.message').innerHTML = config.message;

    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;      

    bso.previous.hide();
    bso.next.hide();
}
