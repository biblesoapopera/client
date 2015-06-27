bso.slide.html = function(config){

    var node = bso.slide.call(this, 'html', config);
    node.querySelector('.content').innerHTML = config.content;

    this._complete();
}

bso.extend(bso.slide.html)
