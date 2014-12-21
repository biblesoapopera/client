bso.slide.html = function(config, sectionType){
           
    var clone = bso.clone(document.querySelector('[data-slide=html]'));
    clone.querySelector('.slide-inner').setAttribute('class', 'slide-inner ' + sectionType);
    clone.querySelector('.content').innerHTML = config.content;

    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;        
        
    this.complete = true;
}
