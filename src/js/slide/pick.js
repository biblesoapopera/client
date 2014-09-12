bso.slide.pick = function(config, nextFn){
    this.config = config;
    this.nextFn = nextFn;
    
    var template = document.querySelector('[data-slide=pick]');    
    var clone = document.importNode(template.content, true);
    clone.querySelector('[data-var=question]').innerHTML = config.question;
    
    var answerList = clone.querySelector('[data-var=answers]');

    config.answers.forEach(function(answer){
       var li = document.createElement('li');
       li.innerHTML = answer;
       answerList.appendChild(li);
    })
                    
    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;
}
