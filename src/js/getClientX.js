bso.getClientX = function(evt){
    if (evt.touches) return evt.touches[0].clientX;
    else return evt.clientX;        
}
