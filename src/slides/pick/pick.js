bso.slide.pick = function(config, sectionType){
    
    var clone = bso.clone(document.querySelector('[data-slide=pick]'));
    clone.querySelector('.slide-inner').setAttribute('class', 'slide-inner ' + sectionType);     
    clone.querySelector('.question').innerHTML = config.question;
    
    var answerList = clone.querySelector('.answers');

    for (var i=0; i<config.answers.length; i++){
       var answer = config.answers[i];
       var li = document.createElement('li');
       li.innerHTML = answer;
       li.addEventListener('click', function(event){
         for(var i=0; i<answerList.children.length; i++) answerList.children[i].removeAttribute('class')
         event.target.setAttribute('class', 'active'); 
         this.complete = true;
         this.emit('complete');  
       }.bind(this));
       answerList.appendChild(li);
    }
                    
    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;
    
    bso.evented(this);
}
