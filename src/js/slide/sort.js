bso.slide.sort = function(config, sectionType){
     
    var dragNode;
    
    var template = document.querySelector('[data-slide=sort]');    
    var clone = document.importNode(template.content, true);
    clone.querySelector('.slide-inner').setAttribute('class', 'slide-inner ' + sectionType);         
    clone.querySelector('.question').innerHTML = config.question;
                     
    var dragstart = function(event){
        var target = event.target;
        
        target.setAttribute('class', 'answer dragging');
        
        event.dataTransfer.effectAllowed = 'move';
        dragNode = target;
        event.dataTransfer.setData('application/sort', target.getAttribute('data-id'));
    };
    
    var dragend = function(event){        
        event.target.setAttribute('class', 'answer');
        dragNode = undefined;
        this.complete = true;        
        this.emit('complete');
    }.bind(this);
    
    var dragover = function(event){
       
        event.preventDefault();
        event.stopPropagation();
       
        if (event.target === dragNode) return;
       
        if (dragNode.offsetTop - event.target.offsetTop < 0) {
            answerList.insertBefore(dragNode, event.target.nextSibling)
        } else {
            answerList.insertBefore(dragNode, event.target);
        }
    };
    
    var numberList = clone.querySelector('.numbers');
    var answerList = clone.querySelector('.answers');
    
    config.answers.forEach(function(answer, index){
       
       var num = document.createElement('div');
       num.setAttribute('class', 'number');
       num.innerHTML = index + 1;
       
       var txt = document.createElement('div');
       txt.setAttribute('class', 'answer');
       txt.setAttribute('draggable', true);
       txt.setAttribute('data-id', index);
       txt.innerHTML = answer;
       
       txt.addEventListener('dragstart', dragstart);
       txt.addEventListener('dragend', dragend);
       txt.addEventListener('dragover', dragover);
       
       numberList.appendChild(num);
       answerList.appendChild(txt);
    })
    
    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;    
    
    bso.evented(this);
}
