bso.slide.slider = function(config, sectionType){
        
    var nextEnable = false;        
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
    var mousedown = function(evt){
        position = {
            left: parseInt(window.getComputedStyle(grip).getPropertyValue('left').replace('px', '')),
            client: evt.clientX
        }
        document.addEventListener('mouseup', mouseup);
        document.addEventListener('mousemove', mousemove);    
        grip.setAttribute('class', 'grip active');
    };
    var mouseup = function(evt){
        document.removeEventListener('mousemove', mousemove);        
        document.removeEventListener('mouseup', mouseup);
        grip.setAttribute('class', 'grip'); 
        nextEnable = true;
        bso.next.enable();
    };
    var mousemove = function(evt){
        var newLeft = position.left + evt.clientX - position.client;
        
        if (newLeft < -10){
            newLeft = -10;
        } else if (newLeft > 280){
            newLeft = 280;
        }
        
        grip.style.left = newLeft + 'px';        
        position.left = newLeft;
        position.client = evt.clientX;
    }
    
    grip.addEventListener('mousedown', mousedown);
    
    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;
    
    this.enter = function(){
        if (nextEnable) bso.next.enable();      
        else bso.next.disable()        
    }     
    
    this.exit = function(){}
}
