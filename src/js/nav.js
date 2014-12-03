bso.nav = function(name, dir){
    return {
        create: function(goFn){
           var btn = document.createElement('a');
           btn.setAttribute('class', 'btn sprite ' + name);
           btn.addEventListener('click', function(){
               goFn(dir);
           });
           document.body.appendChild(btn);
           this.disabled = false;
           this.hidden = false;
        },
        render: function(){
           var cls = 'btn sprite ' + name;
           if (this.disabled) cls += ' disabled'
           if (this.hidden) cls += ' hidden'
           document.querySelector('.btn.' + name).setAttribute('class', cls);        
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
}

bso.next = bso.nav('next', 1);

bso.previous = bso.nav('previous', -1);