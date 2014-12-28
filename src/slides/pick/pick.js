bso.slide.pick = function (config, sectionType) {

    var node = bso.slide.call(this, 'pick', sectionType);

    node.querySelector('.question').innerHTML = config.question;

    var answerList = this._answerList = node.querySelector('.answers');

    for (var i = 0; i < config.answers.length; i++) {
        var answer = config.answers[i];
        var li = document.createElement('li');
        li.innerHTML = answer.value;     
        li.addEventListener('click', this._itemClick.bind(this));
        answerList.appendChild(li);
    }
}

bso.extend(bso.slide.pick)

bso.slide.pick.prototype._itemClick = function (evt) {   
    var answerList = this._answerList;
    for (var i = 0; i < answerList.children.length; i++) answerList.children[i].removeAttribute('class')
    evt.target.setAttribute('class', 'active');
    this._complete();
}
