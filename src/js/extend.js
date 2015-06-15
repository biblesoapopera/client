bso.extend = function(ctr){
    ctr.prototype = Object.create(bso.slide.prototype);    
    ctr.prototype.constructor = ctr;
}
