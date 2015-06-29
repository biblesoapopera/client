bso.extend = function(parent, child){
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}
