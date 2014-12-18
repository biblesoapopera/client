bso.load = function () {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', bso.episode + '/slides.json', true);
    xhr.responseType = "json";

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            bso.run(this.response);
        }
    };
    xhr.send();

    bso.player();
}
