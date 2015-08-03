bso.slide.title = function(config){

    var node = bso.slide.call(this, 'title', config);
    node.querySelector('.title h1').innerHTML = config.title;
    node.querySelector('.subtitle').innerHTML = config.subtitle;

    this._complete();
}

bso.extend(bso.slide, bso.slide.title)
