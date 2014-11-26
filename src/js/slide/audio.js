bso.slide.audio = function(config){
    this.config = config;
        
    var playing = false;
    var player = new Audio();
    player.src = config.audioUrl; 
    
    function toggle(){
        if (playing){
            player.pause();
            playing = false;
            playPauseBtn.setAttribute('class', 'btn play');
        } else if (player.currentTime < config.end) {
            player.play();
            playing = true;
            playPauseBtn.setAttribute('class', 'btn pause');            
        }        
    }
    
    var template = document.querySelector('[data-slide=audio]');    
    var clone = document.importNode(template.content, true);
    
    var playPauseBtn = clone.querySelector('.play');
    playPauseBtn.addEventListener('click', toggle);

    clone.querySelector('.vol-plus').addEventListener('click', function(){
        if (player.volume > 0.8) player.volume = 1
        player.volume+=0.2;
    });
    clone.querySelector('.vol-minus').addEventListener('click', function(){        
        if (player.volume < 0.2) player.volume = 0
        else player.volume-=0.2;
    });
    
    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;       
    
    player.addEventListener('timeupdate', function(evt){
        if (player.currentTime >= config.end) {
            toggle();
            player.currentTime = config.start;
        }
    })
    
    setTimeout(function(){
       player.currentTime = config.start;
       toggle();
    }, 1000);
}

//                    <button data-attach='play' ick="document.getElementById('demo').play()">Play the Audio</button>
//                    <button onclick="document.getElementById('demo').pause()">Pause the Audio</button>
//                    <button onclick="document.getElementById('demo').volume+=0.1">Increase Volume</button>
//                    <button onclick="document.getElementById('demo').volume-=0.1">Decrease Volume</button>
