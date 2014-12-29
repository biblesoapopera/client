bso.slide = function(slideType, config, sectionType){    

    this._config = config;
    this._sectionType = sectionType;
    this.attempt = -1;
    bso.evented(this);
    
    var tempNode = document.createElement('div');      
    tempNode.innerHTML = document.querySelector('[data-slide=' + slideType + ']').innerHTML;
    var node = this.node = tempNode.firstElementChild;    
    node.querySelector('.slide-inner').setAttribute('class', 'slide-inner ' + sectionType);         
    
    return node;
}

bso.slide.prototype._attempt = function(attemptObj){
    ++this.attempt;    
    attemptObj.attempt = this.attempt;   
    attemptObj.complete = bso.query(this._config.complete, attemptObj);

    this.emit('attempt', attemptObj);      
 
    if (attemptObj.complete) this._complete();
};

bso.slide.prototype._complete = function(){    
    this.complete = true;
    this.emit('complete');  
}

bso.slide.prototype._feedbackContent = function(attemptObj){
    var i, item, ret = [];
    for (i=0; i < this._config.feedback.length; i++){
        item = this._config.feedback[i];
        if (bso.query(item.condition, attemptObj)){
            ret.push(item.content);
        }
    }
    return ret.join('<br>');
}