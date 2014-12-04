bso.evented = function(context){         
    var registry = {};
 
    context.on = function(eventName, handler){
        if (!registry[eventName]) registry[eventName] = [];
        registry[eventName].push(handler);
    };
    
    context.emit = function(eventName, eventObj){
        if (registry[eventName]) {
            registry[eventName].forEach(function(handler){
                handler(eventObj)
            })
        }
    }
}
