bso.load = function (episodeName) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', episodeName + '/slides.json', true);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            bso.run(JSON.parse(this.responseText));
        }
    };
    xhr.send();

    bso.player(episodeName);
}
