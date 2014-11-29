bso.slide.info = function(config){
    this.config = config;   
    
    var template = document.querySelector('[data-slide=info]');    
    var clone = document.importNode(template.content, true);
    clone.querySelector('[data-var=content]').innerHTML = config.content;
                
    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;
    
    this.show = function(){
        bso.next.enable();        
    }    
}
