bso.slide.audio = function(config){
    this.config = config;
       
    var nextEnable = false;
    var template = document.querySelector('[data-slide=audio]');    
    var clone = document.importNode(template.content, true);
    
    clone.querySelector('.text').innerHTML = config.text;
    
    var player = new Audio();
    player.src = config.audioUrl; 
    
    function togglePlay(){
        var cls = playPauseBtn.getAttribute('class');

        if (cls === 'btn rewind'){            
            player.currentTime = config.start;
            playPauseBtn.setAttribute('class', 'btn play');                                             
        } else if (cls === 'btn pause'){
            player.pause();
            playPauseBtn.setAttribute('class', 'btn play');
        } else if (cls === 'btn play'){
            player.play();
            playPauseBtn.setAttribute('class', 'btn pause');             
        }      
    }
    
    var grip = clone.querySelector('.grip');
    
    var volumeGrip = clone.querySelector('.vol-grip');
    function setVolumeGrip(){        
        volumeGrip.style.height = Math.round(30 * player.volume) + 'px';
        volumeGrip.style.top = Math.round(30 * (1 - player.volume)) + 'px';
    }
       
    var playPauseBtn = clone.querySelector('.play');
    playPauseBtn.addEventListener('click', togglePlay);

    clone.querySelector('.vol-plus').addEventListener('click', function(){
        if (player.volume > 0.9) player.volume = 1
        player.volume+=0.1;
        setVolumeGrip();
    });
    clone.querySelector('.vol-minus').addEventListener('click', function(){        
        if (player.volume < 0.1) player.volume = 0
        else player.volume-=0.1;
        setVolumeGrip();
    });
    setVolumeGrip();
    
    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;       
        
    player.addEventListener('timeupdate', function(evt){
        if (player.currentTime >= config.end) {
            player.pause();
            playPauseBtn.setAttribute('class', 'btn rewind');
            nextEnable = true;
            bso.next.enable();
        } 
        var gripPosition = Math.round(300*(player.currentTime - config.start)/(config.end - config.start)) - 2.5;
        if (gripPosition < -2.5) gripPosition = -2.5
        else if (gripPosition > 297.5) gripPosition = 297.5
        grip.style.left = gripPosition + 'px';
    })
    
    setTimeout(function(){
       player.currentTime = config.start;
       togglePlay();
    }, 1400);
    
    this.show = function(){
        if (nextEnable) bso.next.enable()
        else bso.next.disable()        
    }     
}
