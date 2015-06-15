bso.slide.pick = function (config, sectionType) {

  var node = bso.slide.call(this, 'pick', config, sectionType);

  node.querySelector('.question').innerHTML = config.question;

  var answerList = this._answerList = node.querySelector('.answers');

  for (var i = 0; i < config.answers.length; i++) {
    var answer = config.answers[i];
    var li = document.createElement('li');
    li.innerHTML = answer.value;
    li.answerIndex = i;
    li.addEventListener('click', this._itemClick.bind(this));
    answerList.appendChild(li);
  }
}

bso.extend(bso.slide.pick)

bso.slide.pick.prototype._itemClick = function (evt) {
  var answerList = this._answerList;
  var target = evt.target;

  for (var i = 0; i < answerList.children.length; i++) answerList.children[i].removeAttribute('class')
  target.setAttribute('class', 'active');

  var feedback = this._attempt(this._config.answers[target.answerIndex]).feedback;

  //TODO show feedback in ui
  console.log(feedback);
}
