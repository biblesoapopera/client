$.nav = (function(){
  var node = document.querySelector('.nav');
  var next = node.querySelector('.next');
  var previous = node.querySelector('.previous');
  var exit = node.querySelector('.exit');
  var progress = node.querySelector('.progress');
  var complete = node.querySelector('.complete');
  var active = node.querySelector('.active');
  var id;
  var length;
  var index;
  var maxComplete = -1;

  var nav = {
    show: function(animate){

      if (animate){
        node.classList.add('bottom');
        setTimeout(function () {
          node.classList.add('active');
        }, 80);
      } else {
        node.classList.add('active', 'bottom');
      }
    },

    hide: function(){
      node.classList.remove('active');
    },

    set id(val){
      id = val;
      exit.href = '#menu/' + id;
    },

    set length(val){
      length = val;
      active.style.width = (progress.getBoundingClientRect().width * 100) / (document.documentElement.clientWidth * length) + 'vw';
    },

    set index(val){

      index = val;

      if (index < length -1) {
        next.href = '#episode/' + id + '/' + (parseInt(index) + 1);
        next.classList.remove('enabled', 'disabled');
        next.classList.add('disabled');
      } else {
        next.classList.remove('enabled', 'disabled');
      }

      if (index > 0) {
        previous.href = '#episode/' + id + '/' + (parseInt(index) - 1);
        previous.classList.add('enabled');
      } else {
        previous.classList.remove('enabled', 'disabled');
      }

      active.style.left = (progress.getBoundingClientRect().width * 100 * index) / (document.documentElement.clientWidth * length) + 'vw';
    },

    set complete(val){

      if (!val) return

      next.classList.remove('enabled', 'disabled');
      next.classList.add('enabled');

      if (index > maxComplete) {
        maxComplete = index;
        complete.style.width = (progress.getBoundingClientRect().width * 100 * (maxComplete + 1)) / (document.documentElement.clientWidth * length) + 'vw';
      }
    }
  }

  return nav;
})();
