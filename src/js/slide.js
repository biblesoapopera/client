bso.slide = function(slideType, sectionType){    
    
    bso.evented(this);
    
    var tempNode = document.createElement('div');      
    tempNode.innerHTML = document.querySelector('[data-slide=' + slideType + ']').innerHTML;
    var node = this.node = tempNode.firstElementChild;    
    node.querySelector('.slide-inner').setAttribute('class', 'slide-inner ' + sectionType);         
    
    return node;
}

bso.slide.prototype._complete = function(){    
    this.complete = true;
    this.emit('complete');  
}
