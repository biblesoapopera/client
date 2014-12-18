bso.slide.sort = function(config, sectionType){
    
    var template = document.querySelector('[data-slide=sort]');    
    var clone = document.importNode(template.content, true);
    clone.querySelector('.slide-inner').setAttribute('class', 'slide-inner ' + sectionType);         
    clone.querySelector('.question').innerHTML = config.question;
    
    var drag = clone.querySelector('.drag');
    var numberList = clone.querySelector('.numbers');
    var answerList = clone.querySelector('.answers');
    
    var beingDragged;
    var position;    
    
    var dragstart = function(evt){
               
        beingDragged = evt.target;
        position = {
            left: beingDragged.offsetLeft,
            top: beingDragged.offsetTop,
            clientX: bso.getClientX(evt),
            clientY: bso.getClientY(evt)
        };
        drag.style.left = beingDragged.offsetLeft + 'px';        
        drag.style.top = beingDragged.offsetTop + 'px';
        
        document.addEventListener('mouseup', dragend);
        document.addEventListener('mousemove', dragmove);    
        document.addEventListener('touchend', dragend);
        document.addEventListener('touchmove', dragmove); 
        drag.setAttribute('class', 'answer drag');
        drag.innerHTML = beingDragged.innerHTML;
    };
    
    var dragend = function(){           
        document.removeEventListener('mousemove', dragmove);        
        document.removeEventListener('mouseup', dragend);
        document.removeEventListener('touchmove', dragmove);        
        document.removeEventListener('touchend', dragend);        
        drag.setAttribute('class', 'answer hidden drag'); 
        this.complete = true;
        this.emit('complete');
    }.bind(this);
    
    var dragmove = function(evt){
        
        var clientX = bso.getClientX(evt); 
        var clientY = bso.getClientY(evt);
        var newLeft = position.left + clientX - position.clientX;
        var newTop = position.top + clientY - position.clientY;
               
        drag.style.left = newLeft + 'px';        
        drag.style.top = newTop + 'px';
        position.left = newLeft;
        position.top = newTop;
        position.clientX = clientX;               
        position.clientY = clientY;
        
        var i, child, diff = 1000, targetChild;
        for (i=0; i<answerList.children.length; i++){
            child = answerList.children[i];
            if (child===drag) continue; 
            if (Math.abs(drag.offsetTop - child.offsetTop) < Math.abs(diff)){
                diff = drag.offsetTop - child.offsetTop;
                targetChild = child;
            }
        }
       
        if (targetChild !== beingDragged){
            if (diff < 0){
                answerList.insertBefore(beingDragged, targetChild.nextSibling);                 
            } else {
                answerList.insertBefore(beingDragged, targetChild);   
            }
        }
    };
        
    config.answers.forEach(function(answer, index){
       
       var num = document.createElement('div');
       num.setAttribute('class', 'number');
       num.innerHTML = index + 1;
       
       var txt = document.createElement('div');
       txt.setAttribute('class', 'answer');
       txt.innerHTML = answer;
       
       txt.addEventListener('mousedown', dragstart);
       txt.addEventListener('touchstart', dragstart);
       
       numberList.appendChild(num);
       answerList.appendChild(txt);
    })
    
    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;    
    
    bso.evented(this);
}
