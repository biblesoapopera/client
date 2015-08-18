/*
$.evented = function(context){
  var registry = {};

  context.on = function(eventName, handler){
    if (!registry[eventName]) registry[eventName] = [];
    registry[eventName].push(handler);
  };

  context.off = function(eventName, handler){
    if (!registry[eventName]) return

    var index = registry[eventName].indexOf(handler);
    if (index !== -1) registry[eventName].splice(index, 1);
  }

  context.emit = function(eventName, eventObj){
    if (registry[eventName]) {
      registry[eventName].forEach(function(handler){
        handler(eventObj)
      })
    }
  }
}
*/
