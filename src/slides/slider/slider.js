bso.slide.slider = function(config, sectionType){
               
    var template = document.querySelector('[data-slide=slider]');    
    var clone = document.importNode(template.content, true);
    clone.querySelector('.slide-inner').setAttribute('class', 'slide-inner ' + sectionType);     
    clone.querySelector('.question').innerHTML = config.question;
         
    var leftAnswer = clone.querySelector('.left');
    leftAnswer.innerHTML = config.left;

    var rightAnswer = clone.querySelector('.right');
    rightAnswer.innerHTML = config.right;
    
    var position;
    var grip = clone.querySelector('.grip');
    
    var getClientX = function(evt){
        if (evt.touches) return evt.touches[0].clientX;
        else return evt.clientX;        
    }
    
    var dragstart = function(evt){          
        position = {
            left: parseInt(window.getComputedStyle(grip).getPropertyValue('left').replace('px', '')),
            client: getClientX(evt)
        }
        document.addEventListener('mouseup', dragend);
        document.addEventListener('mousemove', dragmove);    
        document.addEventListener('touchend', dragend);
        document.addEventListener('touchmove', dragmove);        
        grip.setAttribute('class', 'grip active');
    };
        
    var dragend = function(){
        document.removeEventListener('mousemove', dragmove);        
        document.removeEventListener('mouseup', dragend);
        document.removeEventListener('touchmove', dragmove);        
        document.removeEventListener('touchend', dragend);        
        grip.setAttribute('class', 'grip'); 
        this.complete = true;
        this.emit('complete');
    }.bind(this);
    
    var dragmove = function(evt){
        var clientX = getClientX(evt);
      
        var newLeft = position.left + clientX - position.client;
        
        if (newLeft < -10){
            newLeft = -10;
        } else if (newLeft > 280){
            newLeft = 280;
        }
        
        grip.style.left = newLeft + 'px';        
        position.left = newLeft;
        position.client = clientX;
    }
    
    grip.addEventListener('mousedown', dragstart);
    grip.addEventListener('touchstart', dragstart);
    
    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;
    
    bso.evented(this);    
}
