bso.next = {
    create: function(goFn){
       var btn = document.createElement('button');
       btn.setAttribute('class', 'btn next');
       btn.addEventListener('click', goFn);
       document.body.appendChild(btn);
    },
    show: function(){
        
    },
    hide: function(){
        
    },
    enable: function(){
        
    },
    disable: function(){
        
    }    
}



