$.player = function(id){

  if (!$.player._instance){

    if (!Audio) return;

    var player = new Audio();

    var ogg = player.canPlayType('audio/ogg');
    var mp3 = player.canPlayType('audio/mpeg');
    var extension;

    if (mp3 === 'probably') extension = 'mp3'
    else if (ogg === 'probably' || ogg === 'maybe') extension = 'ogg'
    else extension = 'mp3'
    player.src = id + '/audio.' + extension;

    player.addEventListener('canplay', function(){
      //TODO: this won't work if playing multiple different episodes in the same session. Needs to be fixed as part of issue #22
      $.player.canplay = true;
    });

    $.player._instance = player;
  }

  return $.player._instance;
};
