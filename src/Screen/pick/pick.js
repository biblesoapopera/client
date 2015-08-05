$.screen.pick = function(config){
  $.screen.slide.call(this, config);

  this.content.querySelector('.question').innerHTML = config.question;

  var answerList = this.answerList = this.content.querySelector('.answers');

  for (var i = 0; i < config.answers.length; i++) {
    var answer = config.answers[i];
    var li = document.createElement('li');
    li.innerHTML = answer.value;
    li.answerIndex = i;
    li.addEventListener('click', this.itemClick.bind(this));
    answerList.appendChild(li);
  }
}

$.extend($.screen.slide, $.screen.pick);

$.screen.pick.prototype.itemClick = function (evt) {
  var answerList = this.answerList;
  var target = evt.target;

  for (var i = 0; i < answerList.children.length; i++) answerList.children[i].classList.remove('active')
  target.setAttribute('class', 'active');

  var feedback = this.attempt(this.config.answers[target.answerIndex]).feedback;

  //TODO show feedback in ui
  console.log(feedback);
}
