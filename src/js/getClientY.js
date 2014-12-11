bso.getClientY = function(evt){
    if (evt.touches) return evt.touches[0].clientY;
    else return evt.clientY;        
}
