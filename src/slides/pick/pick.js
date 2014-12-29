bso.slide.pick = function (config, sectionType) {

    var node = bso.slide.call(this, 'pick', config, sectionType);

    node.querySelector('.question').innerHTML = config.question;

    var answerList = this._answerList = node.querySelector('.answers');

    for (var i = 0; i < config.answers.length; i++) {
        var answer = config.answers[i];
        var li = document.createElement('li');
        li.innerHTML = answer.value;
        li.setAttribute('data-score', answer.score);
        li.addEventListener('click', this._itemClick.bind(this));
        answerList.appendChild(li);
    }
    
    var feedbackDiv = this._feedbackDiv = document.createElement('div');
    feedbackDiv.setAttribute('class', 'feedback hidden');
    this.node.appendChild(feedbackDiv);
}

bso.extend(bso.slide.pick)

bso.slide.pick.prototype._itemClick = function (evt) {   
    var answerList = this._answerList;
    var target = evt.target;
    
    for (var i = 0; i < answerList.children.length; i++) answerList.children[i].removeAttribute('class')
    target.setAttribute('class', 'active');
    var attemptObj = {
        value: target.innerHTML, 
        score: parseInt(target.getAttribute('data-score'))
    };
    this._attempt(attemptObj);
    
    var feedbackContent = this._feedbackContent(attemptObj);  
    if (feedbackContent === '') return
    
    var feedbackDiv = this._feedbackDiv;
    feedbackDiv.innerHTML = feedbackContent;    
    feedbackDiv.style.top = (target.offsetTop + target.offsetHeight - 2) + 'px';
    feedbackDiv.style.left = target.offsetLeft + 'px';
    feedbackDiv.setAttribute('class', 'feedback ' + this._sectionType);
}
