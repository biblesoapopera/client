bso.previous = {
    create: function(goFn){
       var btn = document.createElement('a');
       btn.setAttribute('class', 'btn previous');
       btn.addEventListener('click', function(){
           goFn(-1);
       });
       document.body.appendChild(btn);
       this.disabled = false;
       this.hidden = false;
    },
    render: function(){
       var cls = 'btn previous';
       if (this.disabled) cls += ' disabled'
       if (this.hidden) cls += ' hidden'
       document.querySelector('.btn.previous').setAttribute('class', cls);        
    },
    show: function(){
       this.hidden = false;
       this.render();
    },
    hide: function(){    
       this.hidden = true;
       this.render();       
    },
    enable: function(){        
       this.disabled = false;
       this.render();       
    },
    disable: function(){
       this.disabled = true;
       this.render();        
    }
}