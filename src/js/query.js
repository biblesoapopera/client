bso.query = function(condition, testObj){

    var ret = true;
    for (var prop in condition){
        if (typeof testObj[prop] === 'undefined') {
            ret = false;
        } else if (typeof prop === 'object'){
            
        } else if (condition[prop] !== testObj[prop]){
            ret = false;
        }
    }
    
    return ret;
}
