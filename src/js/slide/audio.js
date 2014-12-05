bso.slide.audio = function(config, sectionType){
       
    var template = document.querySelector('[data-slide=audio]');      
    var clone = document.importNode(template.content, true);
    
    clone.querySelector('.slide-inner').setAttribute('class', 'slide-inner ' + sectionType);      
    clone.querySelector('.text').innerHTML = config.text;
    
    var player = new Audio();   
    player.src = config.audioUrl; 

    function setStartTime(){      
        player.removeEventListener('canplay', setStartTime);
        player.currentTime = config.start;             
    }
    player.addEventListener('canplay', setStartTime);
    
    function togglePlay(){
        
        var cls = playPauseBtn.getAttribute('class');

        if (cls === 'btn sprite rewind'){            
            player.currentTime = config.start;
            playPauseBtn.setAttribute('class', 'btn sprite play');                                             
        } else if (cls === 'btn sprite pause'){
            player.pause();
            playPauseBtn.setAttribute('class', 'btn sprite play');
        } else if (cls === 'btn sprite play'){
            player.play();
            playPauseBtn.setAttribute('class', 'btn sprite pause');             
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
        
    player.addEventListener('timeupdate', function(){
        if (player.currentTime >= config.end) {
            player.pause();
            playPauseBtn.setAttribute('class', 'btn sprite rewind');
            this.complete = true;
            this.emit('complete');
        } 
        var gripPosition = Math.round(300*(player.currentTime - config.start)/(config.end - config.start)) - 2.5;
        if (gripPosition < -2.5) gripPosition = -2.5
        else if (gripPosition > 297.5) gripPosition = 297.5
        grip.style.left = gripPosition + 'px';
    }.bind(this))
                 
    this.enter = function(){
        setTimeout(function(){
           togglePlay();
        }, 1400);        
    }
    
    this.exit = function(){
        player.pause();
    }
    
    bso.evented(this);
}
