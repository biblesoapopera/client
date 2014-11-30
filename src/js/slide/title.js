bso.slide.title = function(config, sectionType){
        
    var template = document.querySelector('[data-slide=title]');    
    var clone = document.importNode(template.content, true);
    clone.querySelector('.slide-inner').setAttribute('class', 'slide-inner ' + sectionType);        
    clone.querySelector('.title h1').innerHTML = config.title;
    clone.querySelector('.subtitle').innerHTML = config.subtitle;

    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;      
        
    this.enter = function(){
        bso.next.enable();        
    }
    
    this.exit = function(){}
}


