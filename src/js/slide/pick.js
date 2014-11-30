bso.slide.pick = function(config, sectionType){
    
    var nextEnable = false;
    var template = document.querySelector('[data-slide=pick]');    
    var clone = document.importNode(template.content, true);
    clone.querySelector('.slide-inner').setAttribute('class', 'slide-inner ' + sectionType);     
    clone.querySelector('.question').innerHTML = config.question;
    
    var answerList = clone.querySelector('.answers');

    config.answers.forEach(function(answer){
       var li = document.createElement('li');
       li.innerHTML = answer;
       li.addEventListener('click', function(evt){
         for(var i=0; i<answerList.children.length; i++) answerList.children[i].removeAttribute('class')
         li.setAttribute('class', 'active'); 
         nextEnable = true;
         bso.next.enable();   
       });
       answerList.appendChild(li);
    })
                    
    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;
    
    this.enter = function(){
        if (nextEnable) bso.next.enable()
        else bso.next.disable()
    }    
    
    this.exit = function(){}
}
