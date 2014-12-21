bso.clone = function(template){      
    var clone = document.createElement('div');      
    clone.innerHTML = template.innerHTML;
    return clone.firstElementChild;
}
