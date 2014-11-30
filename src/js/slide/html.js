bso.slide.html = function(config, sectionType){
        
    var template = document.querySelector('[data-slide=html]');    
    var clone = document.importNode(template.content, true);
    clone.querySelector('.slide-inner').setAttribute('class', 'slide-inner ' + sectionType);
    clone.querySelector('.content').innerHTML = config.content;

    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;        
        
    this.enter = function(){
        bso.next.enable();        
    }
    
    this.exit = function(){}
}
