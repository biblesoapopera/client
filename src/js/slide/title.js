bso.slide.title = function(config){
    this.config = config;
    
    var template = document.querySelector('[data-slide=title]');    
    var clone = document.importNode(template.content, true);
    clone.querySelector('[data-var=title]').innerHTML = config.title;
    clone.querySelector('[data-var=subtitle]').innerHTML = config.subtitle;
                    
    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;
}




