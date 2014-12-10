bso.slideTransitioner = function () {

    var activeSlide;

    var slideTransitionEnd = function(evt){
        evt.target.removeEventListener('transitionend', slideTransitionEnd);
        evt.target.setAttribute('class', 'slide');
    }.bind(this);

    this.transition = function (newSlide, direction) {

        if (!activeSlide) {
            newSlide.node.setAttribute('class', 'slide active');
            activeSlide = newSlide;
            return;
        }

        var activeNode = activeSlide.node;
        var newNode = newSlide.node;

        activeNode.addEventListener('transitionend', slideTransitionEnd);

        //position slide ready for transiton
        newNode.setAttribute('class', 'slide ' + direction);

        if (activeSlide.exit)
            activeSlide.exit()
        if (newSlide.enter)
            newSlide.enter()

        if (newSlide.complete)
            bso.next.enable()
        else
            bso.next.disable()

        //wait for repaint
        setTimeout(function () {
            //now apply the transitions
            var outDirection = direction === 'left' ? 'right' : direction === 'right' ? 'left' : direction === 'up' ? 'down' : 'up';

            activeNode.setAttribute('class', 'slide ' + outDirection);
            newNode.setAttribute('class', 'slide active');
            activeSlide = newSlide;
        }, 80);
    }
}
