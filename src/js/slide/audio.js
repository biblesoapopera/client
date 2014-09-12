bso.slide.audio = function(config){
    this.config = config;
    
    var player = new Audio();
    player.src = config.audioUrl;
 
    var template = document.querySelector('[data-slide=audio]');    
    var clone = document.importNode(template.content, true);
    clone.querySelector('[data-attach=play]').addEventListener('click', function(){
        player.play();
    });
    clone.querySelector('[data-attach=pause]').addEventListener('click', function(){
        player.pause();
    });
    clone.querySelector('[data-attach=plus]').addEventListener('click', function(){
        if (player.volume > 0.8) player.volume = 1
        player.volume+=0.2;
    });
    clone.querySelector('[data-attach=minus]').addEventListener('click', function(){        
        if (player.volume < 0.2) player.volume = 0
        else player.volume-=0.2;
    });
    
    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;        
}

//                    <button data-attach='play' ick="document.getElementById('demo').play()">Play the Audio</button>
//                    <button onclick="document.getElementById('demo').pause()">Pause the Audio</button>
//                    <button onclick="document.getElementById('demo').volume+=0.1">Increase Volume</button>
//                    <button onclick="document.getElementById('demo').volume-=0.1">Decrease Volume</button>
